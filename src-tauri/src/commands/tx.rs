//! transaction scripts



use diem_types::account_address::AccountAddress;

use txs::{commands::demo_cmd};



use crate::carpe_error::CarpeError;

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
pub fn debug_error(debug_err: bool) -> Result<String, CarpeError> {
  dbg!(&debug_err);
  match debug_err {
    true => Ok("good".to_owned()),
    false => Err(CarpeError::misc("test"))
  }
}
