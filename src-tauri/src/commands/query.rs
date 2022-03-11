//! query the chain
use diem_json_rpc_types::views::TowerStateResourceView;
use diem_types::{account_address::AccountAddress, event::EventKey};
use diem_client::views::EventView;
use ol::node::query::QueryType;
use crate::{carpe_error::CarpeError, configs::get_node_obj};

#[tauri::command(async)]
pub fn query_balance(account: AccountAddress) -> Result<u64, CarpeError>{
  get_balance(account)
}

#[tauri::command(async)]
pub fn get_onchain_tower_state(account: AccountAddress) -> Result<TowerStateResourceView, CarpeError> {
  // println!("fetching onchain tower state");
  let node = get_node_obj()?;

  match node.client.get_miner_state(&account) {
    Ok(Some(t)) => {
      Ok(t)
    }
    _ => Err(CarpeError::client("Could not get tower state from chain")),
  }
}

pub fn get_balance(account: AccountAddress) -> Result<u64, CarpeError>{
  let mut node = get_node_obj()?;
  let bal = node.query(QueryType::Balance{ account })?;
  bal.parse::<u64>().map_err(|_|{ CarpeError::misc(&format!("Could not get balance from account: {}", account))})
}

pub fn get_events(account: AccountAddress, start_seq: u64, limit: u64) -> Result<Vec<EventView>, CarpeError> {
  let node = get_node_obj()?;
  let events = node.client.get_events(
    EventKey::new_from_address(&account, 0),
    start_seq, 
    limit
  );

  /* 
    TODO catch case where node DB is currupted:
    Error { inner: Inner { kind: JsonRpcError, source: None, json_rpc_error: Some(JsonRpcError { code: -32000, message: "Server error: DB corrupt: Sequence number not continuous, expected: 0, actual: 5.", data: None }) } }
  */

  match events {
    Ok(all) => Ok(all),
    _ => Err(CarpeError::client("Could not get account events from the chain"))
  }  
}