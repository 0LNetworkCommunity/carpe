mod swarm;
pub use swarm::*;

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
use miner::commands::MinerCmd;
use ol::entrypoint::EntryPoint;
use libra_config::config::NodeConfig;
use miner::commands::start_cmd::StartCmd;
use std::env::Args;
use std::process::Command;
use miner::prelude::Application;
use onboard::application::OnboardApp;

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
pub async fn wizard_user(home: String, block_zero: Option<PathBuf>) -> (AccountAddress, String) {
    let home_path = if home.is_empty(){
        PathBuf::from(".")
    }else{
        PathBuf::from(home )
    };

    wizard(home_path, false, &block_zero )
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
pub async fn start_mining(
    home:Option<PathBuf>,
    swarm_path: Option<PathBuf>,
    swarm_persona: Option<String>,
    is_operator: bool
) -> bool {
    let args = ["start".to_string()];
    miner::application::MinerApp::run(&miner::application::APPLICATION, args);

    true
}

/// Start Node handler
#[tauri::command]
pub async fn start_node(home: PathBuf) -> Result<bool, String> {
    match NodeConfig::load( home ) {
        Ok(config) => {
            libra_node::start(&config, None);
            Ok(true)
        },
        Err(e) => {
            Err(format!("Config was not loaded from: {:?}", e))
        }
    }
}

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