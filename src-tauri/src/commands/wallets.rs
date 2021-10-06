use std::convert::TryFrom;
/**
 * OK - get all accounts 
 * OK - add account
 * - remove account
 * - update account 
 * 
 **/
use aes_gcm::Aes256Gcm; // Or `Aes128Gcm`
use aes_gcm::aead::{Aead, NewAead, generic_array::GenericArray};
use anyhow::bail;
use diem_crypto::ed25519::Ed25519PrivateKey;
use std::fs::{self, File, create_dir_all};
use std::io::prelude::*;
use std::net::Ipv4Addr;
use std::path::Path;
use diem_wallet::WalletLibrary;
use ol_keys::scheme::KeyScheme;
use ol_keys::wallet;
use url::Url;
use diem_types::account_address::AccountAddress;
use diem_crypto;

static DB_FILE: &str = "accounts.json";

#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct Accounts {
  pub accounts: Vec<AccountEntry>,
}

#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct AccountEntry {
  pub address: String,
  pub title: String,
  pub balance: Option<u64>,
}


#[tauri::command] 
pub fn get_all_accounts(app_handle: tauri::AppHandle) -> Result<Accounts, String> {
  let app_dir = app_handle.path_resolver().app_dir().unwrap();
  Ok(read_accounts(&app_dir)) 
}

#[tauri::command] 
pub fn add_account(title: String, address: String, app_handle: tauri::AppHandle) -> Result<Accounts, String> {
  // get all accounts
  let app_dir = app_handle.path_resolver().app_dir().unwrap();
  let mut all = read_accounts(&app_dir);

  // push new account
  let new_account = AccountEntry {
    title: title, 
    address: address, 
    balance: None,
  };
  all.accounts.push(new_account);
  
  // write to db file
  create_dir_all(&app_dir).unwrap();
  let serialized = serde_json::to_vec(&all).expect("Struct Accounts should be converted!");
  let db_path = Path::new(&app_dir).join(DB_FILE);
  let mut file = File::create(db_path).expect("DB_FILE should be created!");
  file.write_all(&serialized).expect("DB_FILE should be writen!");

  Ok(all)
}

#[tauri::command] 
pub fn init_from_mnem(mnem: String, user_pin_hash: String, app_handle: tauri::AppHandle) -> String {
  // get all accounts
  // let app_dir = app_handle.path_resolver().app_dir().unwrap();

  danger_init_from_mnem(mnem.clone()).unwrap(); //TODO: Don't clone here.
  danger_write_priv_key(mnem, user_pin_hash.as_bytes()).unwrap();

  "Account initialized".to_string()
}

pub fn danger_write_priv_key(mnem: String, user_pin_hash: &[u8]) -> Result<(), anyhow::Error> {
  let pkey = KeyScheme::new_from_mnemonic(mnem).child_0_owner.get_private_key();
  
  let nonce = b"unique nonce";

  let enc = encrypt(&pkey.to_bytes(), user_pin_hash, nonce).unwrap();

  let db_path = dirs::home_dir().unwrap().join("test.key");
  let mut file = File::create(db_path).expect("DB_FILE should be created!");
  file.write_all(&enc).expect("DB_FILE should be writen!");

  Ok(())
}


pub fn danger_read_key(user_pin_hash: &[u8], nonce: &[u8]) -> Result<Ed25519PrivateKey, anyhow::Error>{
  let db_path = dirs::home_dir().unwrap().join("test.key");
  let contents = fs::read(db_path)
    .expect("Something went wrong reading the file");

  let secret_key = b"an example very very secret key.";
  let nonce = b"unique nonce";
  match decrypt(contents.as_slice(), user_pin_hash, nonce) {
    Ok(v) => {
      match Ed25519PrivateKey::try_from(v.as_slice()) {
        Ok(k) => Ok(k),
        Err(e) => bail!(e),
    }
    },
    Err(e) => bail!(e),
  }
}

fn encrypt(msg: &[u8], key: &[u8], nonce: &[u8] ) -> Result<Vec<u8>, aes_gcm::Error>{

  let k = GenericArray::from_slice(key);
  let n = GenericArray::from_slice(nonce); // 96-bits; unique per message
  let cipher = Aes256Gcm::new(k);

  cipher.encrypt(n, msg)
}

fn decrypt(ciphertext: &[u8], key: &[u8], nonce: &[u8] ) -> Result<Vec<u8>, aes_gcm::Error>{

  let k = GenericArray::from_slice(key);
  let n = GenericArray::from_slice(nonce); // 96-bits; unique per message
  Aes256Gcm::new(k).decrypt(n, ciphertext)
}

#[test]
fn round_trip_encrypt() {

  let msg = b"plaintext message".as_ref();
  let secret_key = b"an example very very secret key.";
  let nonce = b"unique nonce";

  // Encrypt
  let ciphertext = encrypt(msg, secret_key, nonce).expect("cannot encrypt");

  // Decrypt it
  let plaintext = decrypt(&ciphertext, secret_key, nonce).unwrap();

  assert_eq!(plaintext, msg);
}

#[test]
fn test_write_private_key() {
  let alice_mnem = "talent sunset lizard pill fame nuclear spy noodle basket okay critic grow sleep legend hurry pitch blanket clerk impose rough degree sock insane purse".to_string();

  let secret_key = b"an example very very secret key.";

  danger_write_priv_key(alice_mnem.clone(), secret_key);

  let db_path = dirs::home_dir().unwrap().join("test.key");
  let contents = fs::read(db_path)
        .expect("Something went wrong reading the file");

  let secret_key = b"an example very very secret key.";
  let nonce = b"unique nonce";

  let pkey = KeyScheme::new_from_mnemonic(alice_mnem).child_0_owner.get_private_key();

  let decr = decrypt(contents.as_slice(), secret_key, nonce).unwrap();
  assert_eq!(&decr, &pkey.to_bytes().to_vec())
}


#[test]
fn test_read_private_key() {
  let alice_mnem = "talent sunset lizard pill fame nuclear spy noodle basket okay critic grow sleep legend hurry pitch blanket clerk impose rough degree sock insane purse".to_string();

  let user_pin_hash = b"an example very very secret key.";
  let nonce = b"unique nonce";

  danger_write_priv_key(alice_mnem.clone(), user_pin_hash);
  let k = danger_read_key(user_pin_hash, nonce).unwrap();
  
  let pkey = KeyScheme::new_from_mnemonic(alice_mnem).child_0_owner.get_private_key();

  assert_eq!(&k, &pkey)
}


pub fn danger_init_from_mnem(mnem: String) -> Result<AccountAddress, anyhow::Error> {
  dbg!("init from mnem");
  dbg!(&mnem);

  
  let path = dirs::home_dir().unwrap().join(".0L");

  // TODO: refactor get_account so that it doesn't fail.
  let (key, acc, _) = wallet::get_account_from_mnem(mnem);
  
  // If upstream is valid, then we don't need to pass an epoch and waypoint.
  let mut waypoint = None;
  let mut starting_epoch = None;

  let upstream = Url::try_from(super::UPSTREAM).ok();
  if upstream.is_none(){
    waypoint = super::MAINNET_GENESIS_WAYPOINT.parse().ok();
    starting_epoch = Some(0);
  }
  // let path = PathBuf::from(path);
  // TODO: refactor init_app_configs so that it returns a result so we can catch errors.
  ol_types::config::AppCfg::init_app_configs(
    key, 
    acc.clone(),
    // TODO: how to pick a URL to fetch upstream data from
    &upstream,
    &Some(path), 
    &starting_epoch, 
    &waypoint, 
    &None, // No need for source path
    Some("Test".to_string()), // TODO
    Some(Ipv4Addr::new(1, 1, 1, 1)), // TODO
  );

  Ok(acc)
}


fn read_accounts(app_dir: &Path) -> Accounts {
  let db_path = Path::new(&app_dir).join(DB_FILE);
  if db_path.exists() {
    let file = File::open(db_path).expect("DB_FILE should be found!");
    serde_json::from_reader(file).expect("file should be proper JSON")
  } else {
    Accounts{accounts: vec![]}
  }
}

pub fn danger_get_keys(mnemonic: String) -> WalletLibrary {
  let (_, _, wl) = wallet::get_account_from_mnem(mnemonic);
  wl
}