//! transaction scripts

use diem_types::{
  transaction::authenticator::AuthenticationKey,
  account_address::AccountAddress
};
use txs::commands::{create_account_cmd::create_from_auth_and_coin, demo_cmd, transfer_cmd};
use crate::{carpe_error::CarpeError, configs};


#[tauri::command]
pub fn demo_tx() -> Result<String, CarpeError> {
  // let addr: AccountAddress = account.parse()
  // .map_err(|_|{ CarpeError::misc("can't parse account") })?;

  let tx_params =
    configs::get_tx_params().map_err(|_| CarpeError::misc("could not load tx params"))?;
  dbg!(&tx_params);
  match demo_cmd::demo_tx(&tx_params, None) {
    Ok(r) => Ok(format!("Tx Success: {:?}", r)),
    Err(e) => Err(CarpeError::misc(&format!(
      "could not do demo tx, message: {:?}",
      e
    ))),
  }
}

#[tauri::command(async)]
pub fn create_user_account(authkey: String) -> Result<String, CarpeError> {
  let tx_params = configs::get_tx_params()
    .map_err(|_| CarpeError::misc("could not load tx params"))?;

  if let Some(key) = authkey.parse::<AuthenticationKey>().ok() {
    match create_from_auth_and_coin(key, 1, tx_params, None) {
      Ok(r) => Ok(format!("Tx Success: {:?}", r)),
      Err(e) => { 
        dbg!(&e);
        let new_msg = format!("could not make account creation tx, message: Location {:?}, Code: {:?}", &e.location, &e.abort_code);

        let mut ce: CarpeError  = e.into();

        dbg!(&ce);
        ce.msg = new_msg;
        
        Err(ce)
      },
    }
  } else {
    Err(CarpeError::misc("could not parse authentication key"))
  }
}

#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub enum WalletTypes {
  Slow = 0,
  Community = 1,
}

#[tauri::command(async)]
pub fn wallet_type(type_int: u8) -> Result<String, CarpeError> {
  let tx_params =
    configs::get_tx_params().map_err(|_| CarpeError::misc("could not load tx params"))?;

  match txs::commands::wallet_cmd::set_wallet_type(type_int, tx_params, None) {
    Ok(r) => Ok(format!("Tx Success: {:?}", r)),
    Err(e) => Err(CarpeError::misc(&format!(
      "could not set wallet type: {:?}",
      e
    ))),
  }
}

#[tauri::command(async)]
pub fn coin_transfer(
  receiver: String, 
  amount: u64
) -> Result<String, CarpeError> {
  
  let tx_params = configs::get_tx_params()
    .map_err(|_| CarpeError::misc("Could not load tx params"))?;
  
  let receiver_address: AccountAddress = receiver
    .parse()
    .map_err(|_| CarpeError::misc("Invalid receiver account address"))?;

  match transfer_cmd::balance_transfer(receiver_address, amount, tx_params, None) {
    Ok(r) => Ok(format!("Transfer success: {:?}", r)),
    Err(e) => Err(CarpeError::misc(&format!(
      "{:}",
      match e.abort_code {
        Some(code) => code,
        None => 0
      }
    )))
  }
}
