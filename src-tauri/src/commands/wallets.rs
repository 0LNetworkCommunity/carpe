use crate::key_manager;
use diem_types::account_address::AccountAddress;
use diem_wallet::WalletLibrary;
use miner::block::write_genesis;
use ol::config::AppCfg;
use ol_keys::scheme::KeyScheme;
use ol_keys::wallet;
use ol_types::account::UserConfigs;
use ol_types::block::Block;
/**
 * OK - get all accounts
 * OK - add account
 * - remove account
 * - update account
 *
 **/
use std::convert::TryFrom;
use std::fs::{create_dir_all, File};
use std::io::prelude::*;
use std::net::Ipv4Addr;
use std::path::{Path, PathBuf};
use url::Url;

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
pub fn add_account(
  title: String,
  address: String,
  app_handle: tauri::AppHandle,
) -> Result<Accounts, String> {
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
  file
    .write_all(&serialized)
    .expect("DB_FILE should be writen!");

  Ok(all)
}

#[tauri::command]
pub fn init_from_mnem(mnem: String, _app_handle: tauri::AppHandle) -> String {
  // get all accounts
  // let app_dir = app_handle.path_resolver().app_dir().unwrap();

  let acc = danger_init_from_mnem(mnem).unwrap(); //TODO: Don't clone here.
  acc.to_string()
}

#[test]
// danger_init_from_mnem
fn test_init_mnem() {
  use ol_types::config::parse_toml;
  let alice = "talent sunset lizard pill fame nuclear spy noodle basket okay critic grow sleep legend hurry pitch blanket clerk impose rough degree sock insane purse".to_string();
  danger_init_from_mnem(alice);
  let path = dirs::home_dir().unwrap().join(".0L").join("0L.toml");
  let cfg = parse_toml(path.to_str().unwrap().to_owned());
  dbg!(&cfg);
}
pub fn danger_init_from_mnem(mnem: String) -> Result<AccountAddress, anyhow::Error> {
  dbg!("init from mnem");
  dbg!(&mnem);

  let path = dirs::home_dir().unwrap().join(".0L");

  // TODO: refactor get_account so that it doesn't fail.
  let (key, acc, _wl) = wallet::get_account_from_mnem(mnem.clone());

  // If upstream is valid, then we don't need to pass an epoch and waypoint.
  let mut waypoint = None;
  let mut starting_epoch = None;

  let upstream = Url::try_from(super::UPSTREAM).ok();
  if upstream.is_none() {
    waypoint = super::MAINNET_GENESIS_WAYPOINT.parse().ok();
    starting_epoch = Some(0);
  }

  let priv_key = KeyScheme::new_from_mnemonic(mnem)
    .child_0_owner
    .get_private_key();

  key_manager::set_private_key(&acc.to_string(), priv_key)?;

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
    &None,                           // No need for source path
    Some("Test".to_string()),        // TODO
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
    Accounts { accounts: vec![] }
  }
}

pub fn danger_get_keys(mnemonic: String) -> WalletLibrary {
  let (_, _, wl) = wallet::get_account_from_mnem(mnemonic);
  wl
}

fn create_account(app_cfg: AppCfg, path: PathBuf, block_zero: &Option<PathBuf>) {

  let block = match block_zero {
    Some(b) => Block::parse_block_file(b.to_owned()),
    None => write_genesis(&app_cfg),
  };

  UserConfigs::new(block).create_manifest(path);
}
