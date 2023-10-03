//! transaction scripts
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
  receiver: AccountAddress,
  amount: u64,
) -> Result<(), CarpeError> {
  let mut config = get_cfg()?;
  inject_private_key_to_cfg(&mut config)?;
  let mut sender = Sender::from_app_cfg(&config, None).await?;
  sender.transfer(receiver, amount as f64, false).await?;
  Ok(())
}

// #[tauri::command(async)]
// pub async fn claim_make_whole() -> Result<(), CarpeError> {
//   let tx_payload = stdlib::encode_claim_make_whole_script_function();
//   let tx_params =
//     configs::get_tx_params()?;
//   submit_tx::maybe_submit(tx_payload, &tx_params, None)?;
//   Ok(())
// }
