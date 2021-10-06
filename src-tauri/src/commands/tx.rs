//! transaction scripts

use diem_types::account_address::AccountAddress;
use txs::commands::demo_cmd;

use super::client;

#[tauri::command]
pub fn demo_tx(account: String) -> String {
  let addr: AccountAddress = account.parse().unwrap();
  let tx_params = client::get_tx_params(addr).expect("could not load tx params");
  match demo_cmd::demo_tx(&tx_params, false, None) {
    Ok(r) => format!("{:?}", r),
    Err(e) => format!("{:?}", e)
  }
}
