//! transaction scripts
use std::str::FromStr;

use crate::key_manager::{get_private_key, inject_private_key_to_cfg};
use crate::{carpe_error::CarpeError, configs::get_cfg};

use libra_txs::submit_transaction::Sender;
use libra_txs::txs_cli;
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
  legacy: bool,
) -> Result<(), CarpeError> {
  // NOTE: unsure Serde was catching all cases check serialization
  let mut receiver_account = match AccountAddress::from_str(receiver) {
    Ok(a) => a,
    Err(e) => {
      dbg!(e);
      // try prepending
      AccountAddress::from_str(&format!("0x{}", receiver))?
    }
  };
  
  // Handle legacy address conversion if needed
  if legacy {
    use libra_txs::txs_cli::to_legacy_address;
    receiver_account = to_legacy_address(&receiver_account)?;
    println!("Using legacy address format: {}", receiver_account);
  }

  let mut config = get_cfg()?;
  inject_private_key_to_cfg(&mut config, _sender)?;
  let mut sender = Sender::from_app_cfg(&config, Some(_sender.to_string())).await?;
  sender
    .transfer(receiver_account, amount as f64, legacy)
    .await?;
  Ok(())
}

#[tauri::command(async)]
pub async fn vouch_transaction(_sender: AccountAddress, receiver: &str) -> Result<(), CarpeError> {
  let receiver_account = match AccountAddress::from_str(receiver) {
    Ok(a) => a,
    Err(e) => {
      println!(
        "Failed to parse receiver address: {}, trying with 0x prefix",
        e
      );
      AccountAddress::from_str(&format!("0x{}", receiver))?
    }
  };

  let mut config = get_cfg()?;
  inject_private_key_to_cfg(&mut config, _sender)?;

  let mut sender = Sender::from_app_cfg(&config, Some(_sender.to_string())).await?;

  // Try the revoke vouch function path
  let function_path = "0x1::vouch_txs::vouch_for";

  // Format address as a Move address literal (with 0x prefix)
  let formatted_address = format!("0x{}", receiver_account.to_hex());

  match sender
    .generic(
      function_path,
      &None,                            // No type arguments
      &Some(formatted_address.clone()), // Use the properly formatted address
    )
    .await
  {
    Ok(_) => {
      println!("Successfully called {}", function_path);
      return Ok(());
    }
    Err(e) => {
      println!("Failed to call {}: {}", function_path, e);
    }
  }
  // If we get here, all attempts failed
  Err(CarpeError::misc(
    "Failed to call vouch function with any known path or argument format",
  ))
}

#[tauri::command(async)]
pub async fn rejoin_transaction(_sender: AccountAddress) -> Result<(), CarpeError> {
  let mut config = get_cfg()?;
  inject_private_key_to_cfg(&mut config, _sender)?;

  let mut sender = Sender::from_app_cfg(&config, Some(_sender.to_string())).await?;

  match sender
    .generic(
      "0x1::filo_migration::maybe_migrate",
      &None, // No type arguments
      &None,
    )
    .await
  {
    Ok(_) => Ok(()),
    Err(e) => {
      println!("Failed to call 0x1::filo_migration::maybe_migrate {}", e);
      // Continue to try the next path
      Err(CarpeError::misc(&format!("Failed to migrate: {}", e)))
    }
  }
}

#[tauri::command(async)]
pub async fn revoke_vouch_transaction(
  _sender: AccountAddress,
  receiver: &str,
) -> Result<(), CarpeError> {
  let receiver_account = match AccountAddress::from_str(receiver) {
    Ok(a) => a,
    Err(e) => {
      println!(
        "Failed to parse receiver address: {}, trying with 0x prefix",
        e
      );
      AccountAddress::from_str(&format!("0x{}", receiver))?
    }
  };

  let mut config = get_cfg()?;
  inject_private_key_to_cfg(&mut config, _sender)?;

  let mut sender = Sender::from_app_cfg(&config, Some(_sender.to_string())).await?;

  // Try the revoke vouch function path
  let function_path = "0x1::vouch_txs::revoke";

  // Format address as a Move address literal (with 0x prefix)
  let formatted_address = format!("0x{}", receiver_account.to_hex());

  match sender
    .generic(
      function_path,
      &None,                            // No type arguments
      &Some(formatted_address.clone()), // Use the properly formatted address
    )
    .await
  {
    Ok(_) => {
      println!("Successfully called {}", function_path);
      Ok(())
    }
    Err(e) => {
      println!("Failed to call {}: {}", function_path, e);
      Err(CarpeError::misc(&format!("Failed to revoke vouch: {}", e)))
    }
  }
}

#[tauri::command(async)]
pub async fn cw_reauth_transaction(
  _sender: AccountAddress,
  wallet_address: &str,
) -> Result<(), CarpeError> {
  // Parse the wallet address
  let wallet_account = match AccountAddress::from_str(wallet_address) {
    Ok(a) => a,
    Err(e) => {
      println!(
        "Failed to parse wallet address: {}, trying with 0x prefix",
        e
      );
      AccountAddress::from_str(&format!("0x{}", wallet_address))?
    }
  };

  let mut config = get_cfg()?;
  inject_private_key_to_cfg(&mut config, _sender)?;

  let mut sender = Sender::from_app_cfg(&config, Some(_sender.to_string())).await?;

  // Try the community wallet reauthorization function path
  let function_path = "0x1::donor_voice_txs::vote_reauth_tx";

  // Format address as a Move address literal (with 0x prefix)
  let formatted_address = format!("0x{}", wallet_account.to_hex());

  match sender
    .generic(
      function_path,
      &None,                            // No type arguments
      &Some(formatted_address.clone()), // Pass the wallet address as an argument
    )
    .await
  {
    Ok(_) => {
      println!("Successfully called {}", function_path);
      Ok(())
    }
    Err(e) => {
      println!("Failed to call {}: {}", function_path, e);
      Err(CarpeError::misc(&format!(
        "Failed to reauthorize community wallet: {}",
        e
      )))
    }
  }
}
