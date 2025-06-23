//! transaction scripts
use std::str::FromStr;

use crate::key_manager::get_private_key;
use crate::{carpe_error::CarpeError, configs::get_cfg};

use libra_types::exports::ChainId;
use libra_types::exports::{AccountAddress, AccountKey};

fn make_account_key(address: &AccountAddress) -> anyhow::Result<AccountKey> {
  let pk = get_private_key(address)?;
  Ok(AccountKey::from_private_key(pk))
}

/// Creates a new Sender with proper handling of legacy addresses.
/// This function centralizes the logic for creating a transaction sender
/// with proper chain ID and legacy address support.
async fn create_sender_with_legacy(
  sender_address: AccountAddress,
  legacy: bool,
) -> Result<
  (
    libra_txs::submit_transaction::Sender,
    libra_types::core_types::app_cfg::AppCfg,
  ),
  CarpeError,
> {
  // Get configuration
  let config = get_cfg()?;

  // Get private key for the sender
  let pk = get_private_key(&sender_address)?;
  let account_key = AccountKey::from_private_key(pk);

  // Get URL from config
  let url = config.pick_url(None)?;

  // Create the client
  let client = libra_types::exports::Client::new(url.clone());

  // Get chain ID from the live network with fallback to config
  println!("Fetching current chain ID from network...");
  let chain_id = match client.get_index().await {
    Ok(metadata) => {
      let chain_id_value = metadata.into_inner().chain_id;
      println!("Network chain ID: {}", chain_id_value);
      ChainId::new(chain_id_value)
    }
    Err(e) => {
      println!(
        "Warning: Failed to get chain ID from network: {}. Using default from config.",
        e
      );
      // Fallback to config chain ID
      let config_chain_id = config.workspace.default_chain_id.id();
      println!("Using config chain ID: {}", config_chain_id);
      ChainId::new(config_chain_id)
    }
  };

  // Initialize the sender with the legacy flag
  let mut sender = libra_txs::submit_transaction::Sender::new(
    account_key,
    chain_id,
    Some(client),
    legacy, // Pass the legacy flag here
  )
  .await?;

  // Set the transaction cost
  let tx_cost = config.tx_configs.get_cost(None);
  sender.set_tx_cost(&tx_cost);

  Ok((sender, config))
}

#[tauri::command(async)]
pub async fn coin_transfer(
  _sender: AccountAddress,
  receiver: &str,
  amount: u64,
  legacy: bool,
) -> Result<(), CarpeError> {
  // Parse receiver address, add 0x prefix if needed
  let receiver_account = match AccountAddress::from_str(receiver) {
    Ok(a) => a,
    Err(e) => {
      dbg!(e);
      // try prepending
      AccountAddress::from_str(&format!("0x{}", receiver))?
    }
  };

  // Use the common function to create a sender with legacy address support
  let (mut sender, _) = create_sender_with_legacy(_sender, legacy).await?;

  println!(
    "Attempting transfer from {} to {} of {} coins",
    _sender, receiver_account, amount
  );

  // Use the transfer method - the last parameter is 'estimate_only'
  match sender
    .transfer(receiver_account, amount as f64, false)
    .await
  {
    Ok(_) => {
      println!("Transaction completed successfully");
      Ok(())
    }
    Err(e) => {
      println!("Transaction failed: {}", e);
      Err(CarpeError::misc(&format!("Transaction failed: {}", e)))
    }
  }
}

#[tauri::command(async)]
pub async fn vouch_transaction(
  _sender: AccountAddress,
  receiver: &str,
  legacy: bool,
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

  // Use the common function to create a sender with legacy address support
  let (mut sender, _) = create_sender_with_legacy(_sender, legacy).await?;

  // Function path for vouching
  let function_path = "0x1::vouch_txs::vouch_for";

  // Format address as a Move address literal (with 0x prefix)
  let formatted_address = format!("0x{}", receiver_account.to_hex());
  println!(
    "Calling {} with argument: {}",
    function_path, formatted_address
  );

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
      Err(CarpeError::misc(&format!(
        "Failed to call vouch function: {}",
        e
      )))
    }
  }
}

#[tauri::command(async)]
pub async fn rejoin_transaction(_sender: AccountAddress, legacy: bool) -> Result<(), CarpeError> {
  // Use the common function to create a sender with legacy address support
  let (mut sender, _) = create_sender_with_legacy(_sender, legacy).await?;

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
  legacy: bool,
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

  // Use the common function to create a sender with legacy address support
  let (mut sender, _) = create_sender_with_legacy(_sender, legacy).await?;

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
  legacy: bool,
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

  // Use the common function to create a sender with legacy address support
  let (mut sender, _) = create_sender_with_legacy(_sender, legacy).await?;

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
