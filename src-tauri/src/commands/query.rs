//! query the chain
use diem_json_rpc_types::views::TowerStateResourceView;
use ol::node::query::{QueryType, WalletType};
use ol::commands::query_cmd;
use diem_types::{account_address::AccountAddress, event::EventKey};
use diem_client::views::EventView;
use crate::{carpe_error::CarpeError, configs::get_node_obj};

#[tauri::command(async)]
pub fn query_balance(account: AccountAddress) -> Result<u64, CarpeError>{
  get_balance(account)
}

#[tauri::command(async)]
pub fn query_wallet_type(account: AccountAddress) -> Result<WalletType, CarpeError> {
  get_wallet_type(account)
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
  bal.parse::<u64>().map_err(|_|{ CarpeError::misc(&format!("could not get balance from account: {}", account))})
}

pub fn get_wallet_type(account: AccountAddress) -> Result<WalletType, CarpeError>{
  if let Ok(node) = get_node_obj() {
    Ok(query_cmd::get_wallet_type(account, node))
  }
  else {
    Err(CarpeError::misc("Could not get node object"))
  }
}

pub fn get_events(account: AccountAddress) -> Result<Vec<EventView>, CarpeError> {
  let node = get_node_obj()?;
  
  let limit = 1000;
  let mut events_count = limit;
  let mut start = 0;
  let mut ret: Vec<EventView> = vec!();
  let mut error = None;

  while events_count == limit {    
    
    let result = node.client.get_events(
      EventKey::new_from_address(&account, 0),
      start, 
      limit
    );

    match result {
      Ok(mut events) => {
        events_count = events.len() as u64;
        start = start + events_count;
        ret.append(&mut events);
      },
      Err(e) => {
        error = Some(e);
        break;        
      }
    };
  }
  
  /* 
    TODO catch case where node DB is currupted:
    Error { inner: Inner { kind: JsonRpcError, source: None, json_rpc_error: Some(JsonRpcError { code: -32000, message: "Server error: DB corrupt: Sequence number not continuous, expected: 0, actual: 5.", data: None }) } }
  */
  match error {
    Some(_) => Err(CarpeError::client("Could not get account events from the chain")),
    None => Ok(ret)
  }
}
