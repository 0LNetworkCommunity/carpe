//! query the chain
use diem_json_rpc_types::views::TowerStateResourceView;
use diem_types::account_address::AccountAddress;
use ol::node::query::QueryType;
use crate::{carpe_error::CarpeError, configs::get_node_obj};

#[tauri::command(async)]
pub fn query_balance(account: AccountAddress) -> Result<u64, CarpeError>{
  get_balance(account)
}

#[tauri::command(async)]
pub fn get_onchain_tower_state(account: AccountAddress) -> Result<TowerStateResourceView, CarpeError> {
  println!("fetching onchain tower state");
  let node = get_node_obj()?;

  match node.client.get_miner_state(&account) {
    Ok(Some(t)) => {
      Ok(t)
    }
    _ => Err(CarpeError::client("could not get tower state from chain")),
  }
}

pub fn get_balance(account: AccountAddress) -> Result<u64, CarpeError>{
  let mut node = get_node_obj()?;
  let bal = node.query(QueryType::Balance{ account })?;
  bal.parse::<u64>().map_err(|_|{ CarpeError::misc(&format!("could not get balance from account: {}", account))})
}