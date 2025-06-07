//! transaction scripts
use std::str::FromStr;

use crate::key_manager::{get_private_key, inject_private_key_to_cfg};
use crate::{carpe_error::CarpeError, configs::get_cfg};

use libra_txs::submit_transaction::Sender;
use libra_types::exports::{AccountAddress, AccountKey};

fn make_account_key(address: &AccountAddress) -> anyhow::Result<AccountKey> {
  let pk = get_private_key(address)?;
  Ok(AccountKey::from_private_key(pk))
}

#[tauri::command(async)]
pub async fn coin_transfer(
  _sender: AccountAddress,
  receiver: &str,
  amount: u64,
  _legacy: bool,
) -> Result<(), CarpeError> {
  // NOTE: unsure Serde was catching all cases check serialization
  let receiver_account = match AccountAddress::from_str(receiver) {
    Ok(a) => a,
    Err(e) => {
      dbg!(e);
      // try prepending
      AccountAddress::from_str(&format!("0x{}", receiver))?
    }
  };

  let mut config = get_cfg()?;
  inject_private_key_to_cfg(&mut config, _sender)?;
  let mut sender = Sender::from_app_cfg(&config, Some(_sender.to_string())).await?;
  sender
    .transfer(receiver_account, amount as f64, false)
    .await?;
  Ok(())
}

#[tauri::command(async)]
pub async fn vouch_transaction(
  _sender: AccountAddress,
  receiver: &str,
  _legacy: bool,
) -> Result<(), CarpeError> {
  println!(
    "Starting vouch transaction from {} to {}",
    _sender, receiver
  );

  let receiver_account = match AccountAddress::from_str(receiver) {
    Ok(a) => {
      println!("Successfully parsed receiver address: {}", a);
      a
    }
    Err(e) => {
      println!(
        "Failed to parse receiver address: {}, trying with 0x prefix",
        e
      );
      AccountAddress::from_str(&format!("0x{}", receiver))?
    }
  };

  println!("Getting configuration and injecting private key");
  let mut config = get_cfg()?;
  inject_private_key_to_cfg(&mut config, _sender)?;

  println!("Creating sender from app config");
  let mut sender = Sender::from_app_cfg(&config, Some(_sender.to_string())).await?;

  // Try different function paths and argument formats
  let function_paths = ["0x1::vouch_txs::vouch_for"];

  for &path in &function_paths {
    // Format address as a Move address literal (with 0x prefix)
    let formatted_address = format!("0x{}", receiver_account.to_hex());

    println!(
      "Attempting to call function: {} with argument: {}",
      path, formatted_address
    );

    match sender
      .generic(
        path,
        &None,                            // No type arguments
        &Some(formatted_address.clone()), // Use the properly formatted address
      )
      .await
    {
      Ok(_) => {
        println!("Successfully called {}", path);
        return Ok(());
      }
      Err(e) => {
        println!("Failed to call {}: {}", path, e);
        // Continue to try the next path
      }
    }
  }

  // If we get here, all attempts failed
  Err(CarpeError::misc(
    "Failed to call vouch function with any known path or argument format",
  ))
}

// #[tauri::command(async)]
// pub async fn claim_make_whole() -> Result<(), CarpeError> {
//   let tx_payload = stdlib::encode_claim_make_whole_script_function();
//   let tx_params =
//     configs::get_tx_params()?;
//   submit_tx::maybe_submit(tx_payload, &tx_params, None)?;
//   Ok(())
// }
