//! client
use anyhow::Error;
use ol::config::AppCfg;
use ol_types::config::{self, TxType};
use txs::submit_tx::tx_params;
use dirs;
use txs::submit_tx::TxParams;
use diem_types::account_address::AccountAddress;

use crate::{commands::wallets, key_manager};


fn get_cfg() -> AppCfg {
  let config_toml = dirs::home_dir().unwrap().join(".0L").join("0L.toml");
  // let mut toml = PathBuf::from(config_dir);
  // toml.push("0L.toml");
  config::parse_toml(config_toml.to_str().unwrap().to_string()).unwrap()
}

pub fn get_tx_params(address: AccountAddress) -> Result<TxParams, Error> {
  let config = get_cfg();
  dbg!(&config);

  // let wl = wallets::danger_get_keys(mnemonic);
  // let waypoint: Option<W aypoint> = "0:3c6cea7bf248248735cae3e9425c56e09c9a625e912da102f244e2b5820f9622"
  //   .parse()
  //   .ok();
  // // let url_opt: Option<Url> = "http://64.225.2.108/".parse().ok();
  // WalletLibrary::mnemonic
  match tx_params(
    config.clone(),
    None,
    None,
    None,
    None,
    TxType::Miner,
    false,
    true,
    None,
  ){
      Ok(r) =>{
        Ok(r)
        // let private = key_manager::get_private_key(address.to_string()).unwrap();

        // r.keypair
      },
      Err(_) => todo!(),
  }
}

#[tauri::command]
pub fn show_tx_params(account: AccountAddress) -> String {
  let txp = get_tx_params(account);
  format!("{:?}", txp)
}

// #[test]
// fn test() {
//   get_tx();
// }
