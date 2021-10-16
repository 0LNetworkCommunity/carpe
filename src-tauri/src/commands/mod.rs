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
use ol::commands::init_cmd::initialize_host_swarm;
use ol_types::config::{self, TxType};
use serde::{Deserialize, Serialize};
use sysinfo::{ProcessExt, SystemExt};
use txs::submit_tx::{TxParams, eval_tx_status, get_tx_params_from_swarm, tx_params};
use url::Url;
use std::convert::TryFrom;
use std::net::Ipv4Addr;
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
pub fn init_swarm(swarm_path: String, swarm_persona: String, source_path: String) -> String {
  let swarm_path = PathBuf::from(&swarm_path);
  let persona_dir = swarm_path.join("0"); // TODO: alice has directory swarm_path/0, bob 1, carol 2... hard-coding this for demo.
  let source_path = PathBuf::from(&source_path); // TODO: this is not necessary for swarm, but lib requires it.
  initialize_host_swarm(swarm_path, persona_dir, Some(swarm_persona), &Some(source_path));

  "ok".to_string()
}

/// Wizard init handler
#[tauri::command]
pub fn swarm_process() -> bool {
  check_process("diem-swarm")
}

fn check_process(process_str: &str) -> bool {
    // get processes from sysinfo
    let mut system = sysinfo::System::new_all();
    system.refresh_all();
    for (_, process) in system.get_processes() {
        if process.name() == process_str {
            // TODO: doesn't always catch `miner` running, see get by name below.
            return true;
        }
    }
    // also try by name (yield different results), most reliable.
    let p = system.get_process_by_name(process_str);
    !p.is_empty()
}

/// Wizard init handler
#[tauri::command]
pub fn swarm_files(swarm_dir: String) -> String {
  let swarm_path = Path::new(&swarm_dir);


  format!(
    "{path}: {path_exists}\n
    /0/0L.toml: {toml_exists},\n
    /0/blocks/block_0.json: {block_exists}", 
    path = swarm_dir,
    path_exists = swarm_path.exists().to_string(),
    toml_exists = swarm_path.join("0/0L.toml").exists().to_string(),
    block_exists = swarm_path.join("0/blocks/block_0.json").exists().to_string()
  )

  // TODO: make this JSON not string
  // struct Output {
  //   path_exists: String,
  //   toml_exists: String
  //   block_exists: String,
  // }
  // let output = Output {
  //   path_exists: mnemonic_string,
  //   toml_exists,
  //   block_exists,
  // };
  // return match serde_json::to_string(&output) {
  //   Ok(t) => Ok(t),
  //   Err(e) => Err(e.to_string()),
  // };

}

/// Wizard init handler
#[tauri::command]
pub fn init_user(authkey: String, account: String) -> String {
  dbg!("init");
  let path = dirs::home_dir().unwrap().join(".0L");

  let key = match authkey.parse::<AuthenticationKey>() {
    Ok(k) => k,
    Err(_) => {
      return "could not parse Authentication Key from string.".to_string()
    }
  };

  let acc = match account.parse::<AccountAddress>() {
    Ok(a) => a,
    Err(_) => {
      return "could not parse Account from string.".to_string()
    }
  };

  
  // If upstream is valid, then we don't need to pass an epoch and waypoint.
  let mut waypoint = None;
  let mut starting_epoch = None;

  let upstream = Url::try_from(UPSTREAM).ok();
  if upstream.is_none(){
    waypoint = MAINNET_GENESIS_WAYPOINT.parse().ok();
    starting_epoch = Some(0);
  }
  // let path = PathBuf::from(path);
  ol_types::config::AppCfg::init_app_configs(
    key, 
    acc,
    // TODO: how to pick a URL to fetch upstream data from
    &upstream,
    &Some(path), 
    &starting_epoch, 
    &waypoint, 
    &None, // No need for source path
    Some("Test".to_string()), // TODO
    Some(Ipv4Addr::new(1, 1, 1, 1)), // TODO
  );

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

// Get configs from swarm
pub fn swarm_params(swarm_path: String) -> Result<TxParams, Error> {
  let txp = get_tx_params_from_swarm(
    PathBuf::from(swarm_path),
    "alice".to_string(),
    false, 
  ).unwrap();
  Ok(txp)
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

// fn get_swarm_cfg(config_dir: String) -> AppCfg {
//   let toml = Path::new(&config_dir).join("0/0L.toml");
//   config::parse_toml(toml.to_str().unwrap().to_string()).unwrap()
// }

fn get_cfg(config_dir: &str, is_swarm: bool) -> AppCfg {
  let mut toml = PathBuf::from(config_dir);
  if is_swarm { toml.push("0/") };
  toml.push("0L.toml");
  config::parse_toml(toml.to_str().unwrap().to_string()).unwrap()
}

#[tauri::command]
/// mine for swarm
pub fn swarm_miner(swarm_dir: String, swarm_persona: String) -> String {

  let tx_params = get_tx_params_from_swarm(
    PathBuf::from(&swarm_dir),
    swarm_persona, 
    false
  );

  let appcfg = get_cfg(&swarm_dir, true);
  
  // TODO(Ping): mine_and_submit(config, tx_params, is_operator)
  
  match mine_once(&appcfg) {
    Ok(b) => {
      match commit_proof_tx(&tx_params.unwrap(), b.preimage, b.proof, false) {
          Ok(tx_view) => match eval_tx_status(tx_view) {
              Ok(r) => format!("Success: Proof committed to chain \n {:?}", r),
              Err(e) => format!("ERROR: Proof NOT committed to chain, message: \n{:?}", e),
          },
          Err(e) => format!("Miner transaction rejected, message: \n{:?}", e),
      }
    },
    Err(e) => format!("Error mining proof, message: {:?}", e),
  }
}

// /// Start Node handler
// #[tauri::command]
// pub async fn start_node(home: PathBuf) -> Result<bool, String> {
//   match NodeConfig::load(home) {
//     Ok(config) => {
//       libra_node::start(&config, None);
//       Ok(true)
//     }
//     Err(e) => Err(format!("Config was not loaded from: {:?}", e)),
//   }
// }

/// Stop Mining handler
#[tauri::command]
pub async fn stop_mining() -> bool {
  true
}

/// Stop Mining handler
#[tauri::command]
pub async fn stop_node() -> bool {
  true
}
