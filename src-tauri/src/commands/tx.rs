//! transaction scripts

use std::path::{Path, PathBuf};

use diem_types::account_address::AccountAddress;
use ol_types::config::{self, TxType};
use txs::{commands::demo_cmd, submit_tx};

use crate::commands::wallets;

use super::client;

#[tauri::command]
pub fn demo_tx(account: String) -> String {
  let addr: AccountAddress = account.parse().unwrap();
  let url_str = Some("http://64.225.2.108:8080");
  let tx_params = client::get_tx_params(addr, url_str).expect("could not load tx params");
  dbg!(&tx_params);
  match demo_cmd::demo_tx(&tx_params, false, None) {
    Ok(r) => format!("{:?}", r),
    Err(e) => format!("{:?}", e)
  }
}


#[tauri::command]
pub fn debug_error(debug_err: bool) -> Result<String, String> {
  dbg!(&debug_err);
  match debug_err {
    true => Ok("good".to_owned()),
    false => Err("bad".to_owned())
  }
}

#[tauri::command]
/// mine for swarm
// https://github.com/OLSF/libra/blob/main/ol/documentation/devs/swarm_qa_tools.md
pub fn demo(config_dir: String, mnemonic: String) -> String {
    let toml = Path::new(&config_dir).join("0/0L.toml");
    dbg!(&toml);
    let wl = wallets::danger_get_keys(mnemonic);
    let appcfg = config::parse_toml(toml.to_str().unwrap().to_string()).unwrap();
    let tx_params = submit_tx::tx_params(
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