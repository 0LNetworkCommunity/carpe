mod wallets;
mod swarm;
mod mining;
mod client;
mod tx;

pub use wallets::*;
pub use swarm::*;
pub use mining::*;
pub use client::*;
pub use tx::*;


use diem_types::transaction::authenticator::AuthenticationKey;
use tower::block::{
  // mine_and_submit,
  mine_once
};

use tower::commit_proof::commit_proof_tx;
use ol_types::config::{self, TxType};
use serde::{Deserialize, Serialize};
use txs::submit_tx::{TxParams, eval_tx_status, get_tx_params_from_swarm, tx_params};



use std::path::{Path, PathBuf};
// use diem_config::config::NodeConfig;
use diem_types::account_address::AccountAddress;
use diem_wallet::WalletLibrary;
use ol::config::AppCfg;
use ol_keys::wallet;
use onboard::commands::wizard_user_cmd::check;
use tauri::Error;

pub const UPSTREAM: &str = "http://64.225.2.108:8080";
pub const MAINNET_GENESIS_WAYPOINT: &str = "0:3c6cea7bf248248735cae3e9425c56e09c9a625e912da102f244e2b5820f9622";

#[tauri::command]
pub fn hello(hello: String) -> String {
  return format!("Hello: {}", hello);
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

  let (authkey, account, _) = wallet::get_account_from_mnem(mnemonic_string.clone());

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

/// Wizard init handler
#[tauri::command]
pub fn init_user(authkey: String, account: String) -> String {
  dbg!("init");
  let _path = dirs::home_dir().unwrap().join(".0L");

  let _key = match authkey.parse::<AuthenticationKey>() {
    Ok(k) => k,
    Err(_) => {
      return "could not parse Authentication Key from string.".to_string()
    }
  };

  let _acc = match account.parse::<AccountAddress>() {
    Ok(a) => a,
    Err(_) => {
      return "could not parse Account from string.".to_string()
    }
  };

  
  // If upstream is valid, then we don't need to pass an epoch and waypoint.
  // let mut waypoint = None;
  // let mut starting_epoch = None;

  // let upstream = Url::try_from(UPSTREAM).ok();
  // if upstream.is_none(){
  //   waypoint = MAINNET_GENESIS_WAYPOINT.parse().ok();
  //   starting_epoch = Some(0);
  // }
  // // let path = PathBuf::from(path);
  // ol_types::config::AppCfg::init_app_configs(
  //   key, 
  //   acc,
  //   // TODO: how to pick a URL to fetch upstream data from
  //   &upstream,
  //   &Some(path), 
  //   &starting_epoch, 
  //   &waypoint, 
  //   &None, // No need for source path
  //   Some("Test".to_string()), // TODO
  //   Some(Ipv4Addr::new(1, 1, 1, 1)), // TODO
  // );

  account
}

/// Wizard User Check Handler
#[tauri::command]
pub fn wizard_user_check(home: String) -> bool {
  let home_path = if home.is_empty() {
    PathBuf::from(".")
  } else {
    PathBuf::from(home)
  };
  check(home_path)
}


#[tauri::command]
/// mine for swarm
// https://github.com/OLSF/libra/blob/main/ol/documentation/devs/swarm_qa_tools.md
pub fn demo(config_dir: String, mnemonic: String) -> String {
    let toml = Path::new(&config_dir).join("0/0L.toml");
    dbg!(&toml);
    let wl = wallets::danger_get_keys(mnemonic);
    let appcfg = config::parse_toml(toml.to_str().unwrap().to_string()).unwrap();
    let tx_params = tx_params(
        appcfg,
        None,
        None,
        Some(PathBuf::from(&config_dir)),
        Some("alice".to_string()),
        TxType::Miner,
        false, //  TODO: should be true in production
        false,
        Some(&wl),
      ).unwrap();

  txs::commands::demo_cmd::demo_tx(&tx_params, false, None).unwrap();

  "Demo tx submitted".to_string()
}
