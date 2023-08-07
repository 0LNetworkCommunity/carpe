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

// #[tauri::command]
// pub fn demo_tx() -> Result<String, CarpeError> {
//   // let addr: AccountAddress = account.parse()
//   // .map_err(|_|{ CarpeError::misc("can't parse account") })?;

//   let tx_params =
//     configs::get_tx_params()?;
//   // dbg!(&tx_params);
//   match demo_cmd::demo_tx(&tx_params, None) {
//     Ok(r) => Ok(format!("Tx Success: {:?}", r)),
//     Err(e) => Err(CarpeError::misc(&format!(
//       "could not do demo tx, message: {:?}",
//       e
//     ))),
//   }
// }

// #[tauri::command(async)]
// pub fn create_user_account(authkey: String) -> Result<String, CarpeError> {
//   let tx_params =
//     configs::get_tx_params()?;

//   if let Some(key) = authkey.parse::<AuthenticationKey>().ok() {
//     match create_from_auth_and_coin(key, 1, tx_params, None) {
//       Ok(r) => Ok(format!("Tx Success: {:?}", r)),
//       Err(e) => {
//         dbg!(&e);
//         let new_msg = format!(
//           "could not make account creation tx, message: Location {:?}, Code: {:?}",
//           &e.location, &e.abort_code
//         );

//         let mut ce: CarpeError = e.into();

//         dbg!(&ce);
//         ce.msg = new_msg;

//         Err(ce)
//       }
//     }
//   } else {
//     Err(CarpeError::misc("could not parse authentication key"))
//   }
// }

// #[derive(serde::Deserialize, serde::Serialize, Debug)]
// pub enum WalletTypes {
//   Slow = 0,
//   Community = 1,
// }

// #[tauri::command(async)]
// pub fn wallet_type(type_int: u8) -> Result<String, CarpeError> {
//   let tx_params =
//     configs::get_tx_params()?;

//   match libra_txs::commands::wallet_cmd::set_wallet_type(type_int, tx_params, None) {
//     Ok(r) => Ok(format!("Tx Success: {:?}", r)),
//     Err(e) => Err(CarpeError::misc(&format!(
//       "could not set wallet type: {:?}",
//       e
//     ))),
//   }
// }

// let tx_params =
//   configs::get_tx_params()?;
//
//
// let receiver_address: AccountAddress = receiver
//   .parse()
//   .map_err(|_| CarpeError::misc("Invalid receiver account address"))?;
//
// match transfer_cmd::balance_transfer(receiver_address, amount, tx_params, None) {
//   Ok(r) => Ok(format!("Transfer success: {:?}", r)),
//   Err(e) => Err(CarpeError::misc(&format!(
//     "{:}",
//     match e.abort_code {
//       Some(code) => code,
//       None => 0,
//     }
//   ))),
// }

//   let client = Client::default()?;
//   let coint_client = CoinClient::new(&client);
//   let private_key = Ed25519PrivateKey::from_encoded_string(private_key)?;
//   let mut from_account = private_key.get_account(None).await?;
//   let to_account = AccountAddress::from_hex_literal(&receiver).context(format!(
//     "Failed to parse the recipient address {receiver}"
//   ))?;
//   let transfer_options = TransferOptions {
//     max_gas_amount: max_gas.unwrap_or(DEFAULT_MAX_GAS_AMOUNT),
//     gas_unit_price: gas_unit_price.unwrap_or(DEFAULT_GAS_UNIT_PRICE),
//     timeout_secs: DEFAULT_TIMEOUT_SECS,
//     coin_type: "0x1::aptos_coin::AptosCoin",
//   };

//   client
//       .wait_for_transaction(
//         &coint_client
//             .transfer(
//               &mut from_account,
//               to_account,
//               amount,
//               Some(transfer_options),
//             )
//             .await?,
//       )
//       .await?;
//   Ok("OK".to_string())
// }

// #[tauri::command(async)]
// pub async fn claim_make_whole() -> Result<(), CarpeError> {
//   let tx_payload = stdlib::encode_claim_make_whole_script_function();
//   let tx_params =
//     configs::get_tx_params()?;
//   submit_tx::maybe_submit(tx_payload, &tx_params, None)?;
//   Ok(())
// }
