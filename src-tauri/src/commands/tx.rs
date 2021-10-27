//! transaction scripts



use diem_types::{transaction::authenticator::AuthenticationKey};

use txs::{commands::{create_account_cmd::create_from_auth_and_coin, demo_cmd}};



use crate::carpe_error::CarpeError;

use super::client;

#[tauri::command]
pub fn demo_tx() -> Result<String, CarpeError> {
  // let addr: AccountAddress = account.parse()
  // .map_err(|_|{ CarpeError::misc("can't parse account") })?;
  
  let tx_params = client::get_tx_params(None)
  .map_err(|_|{ CarpeError::misc("could not load tx params") })?;
  dbg!(&tx_params);
  match demo_cmd::demo_tx(&tx_params, false, None) {
    Ok(r) => Ok(format!("Tx Success: {:?}", r)),
    Err(e) => Err(CarpeError::misc(&format!("could not do demo tx, message: {:?}", e.to_string())))
  }
}


#[tauri::command]
pub fn create_user_account(authkey: String) -> Result<String, CarpeError> {
  let tx_params = client::get_tx_params(None)
  .map_err(|_|{ CarpeError::misc("could not load tx params") })?;
  dbg!(&tx_params);
  if let Some(key) = authkey.parse::<AuthenticationKey>().ok() {
    match create_from_auth_and_coin(key, 1, false,None) {
      Ok(r) => Ok(format!("Tx Success: {:?}", r)),
      Err(e) => Err(CarpeError::misc(&format!("could make account creation tx message: {:?}", e.to_string())))
    }
  } else {
    Err(CarpeError::misc("could not parse authentication key"))
      
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
