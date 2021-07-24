use std::path::PathBuf;
use ol::commands::init_cmd::InitCmd;
use ol::prelude::{Runnable, app_config};
use libra_types::waypoint::Waypoint;
use url::Url;
use std::str::FromStr;
use serde::{Serialize, Deserialize};

use libra_wallet::{Mnemonic, WalletLibrary};
use libra_types::account_address::AccountAddress;
use onboard::commands::wizard_user_cmd::{check, wizard};
use std::thread;
use std::time::Duration;
use ol::node::node::Node;
use ol::node::client;
use ol::mgmt::management::NodeMode;
use ol::config::AppCfg;
use tauri::Error;

#[tauri::command]
pub fn hello(hello: String) ->String {
    return format!("Hello: {}", hello)
}

/// Keygen output
#[derive(Serialize, Deserialize)]
struct Output {
    mnemonic: String,
    account: AccountAddress,
}

/// Keygen handler
#[tauri::command]
pub fn keygen() ->Result<String, String> {
    let mut wallet = WalletLibrary::new();
    let mnemonic_string = wallet.mnemonic();
    // NOTE: Authkey uses the child number 0 by default
    let auth_key = match wallet.new_address() {
        Ok( (k, _)) => k,
        Err(e) => return Err(e.to_string())
    };
    let account = auth_key.derived_address();
    let output = Output {
        mnemonic: mnemonic_string,
        account,
    };
    return match serde_json::to_string(&output) {
        Ok(t) => Ok(t),
        Err(e) => Err(e.to_string()),
    }
}

/// Wizard User handler
#[tauri::command]
pub async fn wizard_user(home: String, block_zero: String) -> (AccountAddress, String) {
    let home_path = if home.is_empty(){
        PathBuf::from(".")
    }else{
        PathBuf::from(home )
    };

    let zero_path = if block_zero.is_empty(){
        None
    }else {
        Some(PathBuf::from(block_zero))
    };
    wizard(home_path, false, &zero_path )
}

/// Wizard User Check Handler
#[tauri::command]
pub fn wizard_user_check(home: String) -> bool {
    let home_path = if home.is_empty(){
        PathBuf::from(".")
    }else{
        PathBuf::from(home )
    };
    check(home_path)
}

/// Start Mining handler
#[tauri::command]
pub async fn start_mining(swarm_path: Option<PathBuf>) -> bool {
    let is_swarm = swarm_path.is_some();
    let mut cfg = AppCfg::default();
    let client = client::pick_client(swarm_path, &mut cfg).unwrap();
    let mut node = Node::new(client, cfg, is_swarm);
    node.start_miner(false);
    true
}

/// Start Node handler
#[tauri::command]
pub async fn start_node(swarm_path: Option<PathBuf>) -> bool {
    let is_swarm = swarm_path.is_some();
    let mut cfg = AppCfg::default();
    let client = client::pick_client(swarm_path, &mut cfg).unwrap();
    let mut node = Node::new(client, cfg, is_swarm);
    let node_type = if node.vitals.items.validator_set {
        NodeMode::Validator
    } else {
        NodeMode::Fullnode
    };
    node.start_node( node_type ,false);
    true
}

/// Stop Mining handler
#[tauri::command]
pub async fn stop_mining() -> bool {
    let mut cfg = AppCfg::default();
    let client = client::pick_client(None, &mut cfg).unwrap();
    let node = Node::new(client, cfg, false);
    node.stop_miner();
    true
}

/// Stop Mining handler
#[tauri::command]
pub async fn stop_node() -> bool {
    let mut cfg = AppCfg::default();
    let client = client::pick_client(None, &mut cfg).unwrap();
    let node = Node::new(client, cfg, false);
    node.stop_node();
    true
}