//! transaction scripts

use txs::commands::demo_cmd;

use super::client;

#[tauri::command]
pub fn demo_tx(mnemonic: String) -> String {
  let tx_params = client::get_tx_params(mnemonic).expect("could not load tx params");
  match demo_cmd::demo_tx(&tx_params, false, None) {
    Ok(r) => format!("{:?}", r),
    Err(e) => format!("{:?}", e)
  }
}
