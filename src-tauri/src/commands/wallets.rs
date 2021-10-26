use crate::{configs, key_manager};
use diem_types::account_address::AccountAddress;
use diem_types::transaction::authenticator::AuthenticationKey;
use diem_wallet::WalletLibrary;
use ol::config::AppCfg;
use ol_keys::scheme::KeyScheme;
use ol_keys::wallet;
use ol_types::account::UserConfigs;
use ol_types::block::VDFProof;
/**
 * OK - get all accounts
 * OK - add account
 * - remove account
 * - update account
 *
 **/

use std::fs::{self, create_dir_all, File};
use std::io::prelude::*;

use std::path::{Path, PathBuf};
use tower::proof::write_genesis;
use serde::{Deserialize, Serialize};


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


/// Keygen output
#[derive(Serialize, Deserialize)]
struct Output {
  mnemonic: String,
  account: AccountAddress,
  authkey: AuthenticationKey,
}

/// Keygen handler
#[tauri::command]
pub fn keygen() -> Result<String, String> {
  dbg!("keygen");
  let wallet = WalletLibrary::new();
  let mnemonic_string = wallet.mnemonic();

  let (authkey, account, _) = wallet::get_account_from_mnem(mnemonic_string.clone())
  .map_err(|e| e.to_string() )?;

  let output = Output {
    mnemonic: mnemonic_string,
    account,
    authkey,
  };
  return match serde_json::to_string(&output) {
    Ok(t) => Ok(t),
    Err(e) => Err(e.to_string()),
  };
}

#[tauri::command]
pub fn get_all_accounts(app_handle: tauri::AppHandle) -> Result<Accounts, String> {
  let app_dir = app_handle.path_resolver().app_dir().unwrap();
  Ok(read_accounts(&app_dir))
}

#[tauri::command]
pub fn add_account(
  title: String,
  address: String,
  app_handle: tauri::AppHandle,
) -> Result<Accounts, String> {
  let app_dir = app_handle.path_resolver().app_dir().unwrap();

  insert_account_db(title, address, app_dir)
}

fn insert_account_db(title: String, address: String, app_dir: PathBuf) -> Result<Accounts, String> {
  // get all accounts
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
  file
    .write_all(&serialized)
    .expect("DB_FILE should be writen!");

  Ok(all)
}

#[tauri::command]
pub fn remove_accounts(app_handle: tauri::AppHandle) -> Result<String, String> {
  // Note: this only removes the account tracking, doesn't delete account on chain.
  let app_dir = app_handle.path_resolver().app_dir().unwrap();
  let db_path = Path::new(&app_dir).join(DB_FILE);
  dbg!(&db_path);
  if db_path.exists() {
    match fs::remove_file(&db_path) {
      Ok(_) => return Ok("removed all accounts".to_owned()),
      _ => return Err(format!("unable to delete account file found at {:?}", &db_path).to_owned()),
    }
  }
  return Err(
    format!(
      "No accounts to remove. No account file found at {:?}",
      &db_path
    )
    .to_owned(),
  );
}

#[tauri::command]
pub fn init_from_mnem(mnem: String, app_handle: tauri::AppHandle) -> String {
  let app_dir = app_handle.path_resolver().app_dir().unwrap();
  // get all accounts
  // let app_dir = app_handle.path_resolver().app_dir().unwrap();

  let acc = danger_init_from_mnem(mnem).unwrap();
  let name = acc.to_string(); //TODO: Don't clone here.
  insert_account_db(name[..3].to_owned(), name, app_dir).unwrap();
  acc.to_string()
}

#[test]
// danger_init_from_mnem
fn test_init_mnem() {
  use ol_types::config::parse_toml;
  let alice = "talent sunset lizard pill fame nuclear spy noodle basket okay critic grow sleep legend hurry pitch blanket clerk impose rough degree sock insane purse".to_string();
  danger_init_from_mnem(alice).unwrap();
  let path = dirs::home_dir().unwrap().join(".0L").join("0L.toml");
  let cfg = parse_toml(path.to_str().unwrap().to_owned());
  dbg!(&cfg);
}
pub fn danger_init_from_mnem(mnem: String) -> Result<AccountAddress, anyhow::Error> {
  dbg!("init from mnem");


  // TODO: refactor upstream wallet::get_account so that it returns a result
  let (_key, acc, _wl) = wallet::get_account_from_mnem(mnem.clone())?;

  let priv_key = KeyScheme::new_from_mnemonic(mnem)
    .child_0_owner
    .get_private_key();

  key_manager::set_private_key(&acc.to_string(), priv_key)?;

  configs::maybe_init_configs();

  Ok(acc)
}

fn read_accounts(app_dir: &Path) -> Accounts {
  let db_path = Path::new(&app_dir).join(DB_FILE);
  if db_path.exists() {
    let file = File::open(db_path).expect("DB_FILE should be found!");
    serde_json::from_reader(file).expect("file should be proper JSON")
  } else {
    Accounts { accounts: vec![] }
  }
}

pub fn danger_get_keys(mnemonic: String) -> Result<WalletLibrary, anyhow::Error> {
  let (_, _, wl) = wallet::get_account_from_mnem(mnemonic)?;
  Ok(wl)
}

//TODO:
fn _create_account(app_cfg: AppCfg, path: PathBuf, block_zero: &Option<PathBuf>) {
  let block = match block_zero {
    Some(b) => VDFProof::parse_block_file(b.to_owned()),
    None => write_genesis(&app_cfg),
  };

  UserConfigs::new(block).create_manifest(path);
}


// /// Wizard User Check Handler
// #[tauri::command]
// pub fn wizard_user_check(home: String) -> bool {
//   let home_path = if home.is_empty() {
//     PathBuf::from(".")
//   } else {
//     PathBuf::from(home)
//   };
//   check(home_path)
// }


// /// Wizard init handler
// #[tauri::command]
// pub fn init_user(authkey: String, account: String) -> String {
//   dbg!("init");
//   let _path = dirs::home_dir().unwrap().join(".0L");

//   let _key = match authkey.parse::<AuthenticationKey>() {
//     Ok(k) => k,
//     Err(_) => {
//       return "could not parse Authentication Key from string.".to_string()
//     }
//   };

//   let _acc = match account.parse::<AccountAddress>() {
//     Ok(a) => a,
//     Err(_) => {
//       return "could not parse Account from string.".to_string()
//     }
//   };

  
//   // If upstream is valid, then we don't need to pass an epoch and waypoint.
//   // let mut waypoint = None;
//   // let mut starting_epoch = None;

//   // let upstream = Url::try_from(UPSTREAM).ok();
//   // if upstream.is_none(){
//   //   waypoint = MAINNET_GENESIS_WAYPOINT.parse().ok();
//   //   starting_epoch = Some(0);
//   // }
//   // // let path = PathBuf::from(path);
//   // ol_types::config::AppCfg::init_app_configs(
//   //   key, 
//   //   acc,
//   //   // TODO: how to pick a URL to fetch upstream data from
//   //   &upstream,
//   //   &Some(path), 
//   //   &starting_epoch, 
//   //   &waypoint, 
//   //   &None, // No need for source path
//   //   Some("Test".to_string()), // TODO
//   //   Some(Ipv4Addr::new(1, 1, 1, 1)), // TODO
//   // );

//   account
// }