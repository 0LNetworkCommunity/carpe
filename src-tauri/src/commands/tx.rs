//! transaction scripts
use crate::carpe_error::CarpeError;
use crate::commands::networks::get_metadata;
use crate::configs::get_client;
use crate::key_manager::get_private_key;

use libra_txs::submit_transaction::Sender;
use libra_types::exports::{AccountAddress, AccountKey, ChainId, IndexResponse};

fn make_account_key(address: &AccountAddress) -> anyhow::Result<AccountKey> {
  let pk = get_private_key(address)?;
  Ok(AccountKey::from_private_key(pk))
}

#[tauri::command(async)]
pub async fn coin_transfer(
  sender: AccountAddress,
  receiver: AccountAddress,
  amount: u64,
) -> Result<(), CarpeError> {
  let ak = make_account_key(&sender)?;
  let m: IndexResponse = get_metadata().await?; // get the actual chain we are connected to
  let client_opt = get_client().ok();
  let mut sender = Sender::new(ak, ChainId::new(m.chain_id), client_opt).await?;
  Ok(sender.transfer(receiver, amount).await?)
}

// #[tauri::command(async)]
// pub async fn claim_make_whole() -> Result<(), CarpeError> {
//   let tx_payload = stdlib::encode_claim_make_whole_script_function();
//   let tx_params =
//     configs::get_tx_params()?;
//   submit_tx::maybe_submit(tx_payload, &tx_params, None)?;
//   Ok(())
// }
