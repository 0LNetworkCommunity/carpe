//! client
use diem_types::account_address::AccountAddress;


use ol_types::config::{TxType};
use txs::submit_tx::get_tx_params_from_keypair;

use txs::submit_tx::TxParams;
use url::Url;

use crate::configs::get_cfg;
use crate::{key_manager};


pub fn get_tx_params(address: AccountAddress, url: Option<&str>, ) -> Result<TxParams, anyhow::Error> {
  let mut config = get_cfg();
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
