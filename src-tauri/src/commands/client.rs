//! client

use ol_types::config::{TxType};
use txs::submit_tx::get_tx_params_from_keypair;
use txs::submit_tx::TxParams;
use url::Url;
use crate::configs::get_cfg;
use crate::configs::get_tx_params;
use crate::{key_manager};

#[tauri::command]
pub fn show_tx_params() -> String {
  let txp = get_tx_params( None);
  format!("{:?}", txp)
}
