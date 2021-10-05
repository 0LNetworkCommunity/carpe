/**
 * OK - get all accounts 
 * OK - add account
 * - remove account
 * - update account 
 * 
 **/

use std::fs::{File, create_dir_all};
use std::io::prelude::*;
use std::path::Path;
use diem_wallet::WalletLibrary;
use ol_keys::wallet;

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
    balance: None
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