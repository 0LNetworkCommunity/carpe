//! client
use diem_types::account_address::AccountAddress;
use dirs;
use ol::config::AppCfg;
use ol_types::config::{self, TxType};
use txs::submit_tx::get_tx_params_from_keypair;

use txs::submit_tx::TxParams;
use url::Url;

use crate::{key_manager};

fn get_cfg() -> AppCfg {
  let config_toml = dirs::home_dir().unwrap().join(".0L").join("0L.toml");
  // let mut toml = PathBuf::from(config_dir);
  // toml.push("0L.toml");
  config::parse_toml(config_toml.to_str().unwrap().to_string()).unwrap()
}

pub fn get_tx_params(address: AccountAddress, url: Option<&str>) -> Result<TxParams, anyhow::Error> {
  let mut config = get_cfg();
  // dbg!(&config);

  // let url_opt: Option<Url> = "http://64.225.2.108/".parse().ok();
  if let Some(s) = url {
    match s.parse::<Url>() {
        Ok(u) => config.profile.default_node = Some(u),
        Err(_) => {},
    }
  }

  // Requires user input to get OS keyring
  let keypair = key_manager::get_keypair(&address.to_string())?;
  get_tx_params_from_keypair(
    config.clone(),
    TxType::Miner,
    keypair,
    None,
    false,
    false,
  )
}

#[tauri::command]
pub fn show_tx_params(account: AccountAddress) -> String {
  let txp = get_tx_params(account, None);
  format!("{:?}", txp)
}

// #[test]
// fn test() {
//   get_tx();
// }
