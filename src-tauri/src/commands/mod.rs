use std::path::PathBuf;
use ol::commands::init_cmd::InitCmd;
use ol::prelude::Runnable;
use libra_types::waypoint::Waypoint;
use url::Url;
use std::str::FromStr;
use serde::{Serialize, Deserialize};

use libra_wallet::{Mnemonic, WalletLibrary};
use libra_types::account_address::AccountAddress;
use onboard::commands::wizard_user_cmd::{check, wizard};

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

/// Keygen handler
#[tauri::command]
pub fn wizard_user(home: String, block_zero: String) -> (AccountAddress, String) {
    let home_path = if home.is_empty(){
        PathBuf::from("~/.ol")
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

#[tauri::command]
pub fn wizard_user_check(home: String) -> bool {
    let home_path = if home.is_empty(){
        PathBuf::from("~/.0L")
    }else{
        PathBuf::from(home )
    };
    check(home_path)
}

#[tauri::command]
pub fn init_cmd(
    path: String,
    upstream_peer: String,
    skip_app: bool,
    skip_val: bool,
    fix: bool,
    waypoint: String,
    source_path: String
) -> String {

    InitCmd {
        path: if !path.is_empty() {
            Some(PathBuf::from(path))
        } else {
            None
        },
        upstream_peer: if let Ok(u) = Url::parse(upstream_peer.as_str()) {
            Some(u)
        } else{
            None
        },
        skip_app,
        skip_val,
        fix,
        waypoint: if let Ok(w) = Waypoint::from_str(waypoint.as_str()) {
            Some( w )
        } else {
            None
        },
        source_path:if !source_path.is_empty() {
            Some(PathBuf::from(source_path ))
        } else {
            None
        }
    }.run();
    return "OK".into()
}

// #[tauri::command]
// fn onboard(
//     autopilot: bool,
//     next: bool,
//     trigger_actions: bool,
// ) -> String {
//     OnboardCmd {
//         autopilot,
//         next,
//         trigger_actions,
//     }.run();
//     return "OK".into()
// }