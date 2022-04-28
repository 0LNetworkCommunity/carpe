//! query the chain
use diem_json_rpc_types::views::TowerStateResourceView;
use diem_types::{account_address::AccountAddress, event::EventKey};
use diem_client::views::EventView;
use ol::node::{query::QueryType, node::Node};
use crate::{carpe_error::CarpeError, configs::get_node_obj};
use crate::configs_network::remove_node;

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

#[tauri::command(async)]
pub async fn get_recovery_mode() -> Result<u64, CarpeError>{
  let mut node = get_node_obj()?;
  let bal = node.query(QueryType::MoveValue{ 
    account: AccountAddress::ZERO,
    module_name: "RecoveryMode".to_owned(),
    struct_name: "RecoveryMode".to_owned(),
    key_name: "epoch_ends".to_owned(), 
})?;

  bal.parse::<u64>().map_err(|_|{ CarpeError::misc(&format!("Could not get balance from account: {}", account))})
}

pub fn get_payment_events(account: AccountAddress) -> Result<Vec<EventView>, CarpeError> {
  // get payments received
  match get_events(account, 0) {
    Ok(mut received) => {
      // get payments sent
      match get_events(account, 1) {
        Ok(mut sent) => {
          received.append(&mut sent);
          Ok(received)
        },
        Err(e) => Err(CarpeError::misc(&e.msg))
      }
    },
    Err(e) => Err(CarpeError::misc(&e.msg))
  }
}

pub fn get_events(account: AccountAddress, event_key: u64) -> Result<Vec<EventView>, CarpeError> {
  let node = get_node_obj()?;
  
  let limit = 1000;
  let mut events_count = limit;
  let mut start = 0;
  let mut ret: Vec<EventView> = vec!();
  let mut error = None;

  while events_count == limit {    
    let result = node.client.get_events(
      EventKey::new_from_address(&account, event_key),
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
  
  match error {
    Some(e) => {
      if e.to_string().contains("DB corrupt") {
        return try_again_get_events(account, event_key, &node)
      }
      Err(CarpeError::misc(&format!("Could not query account events, message: {:?}", e)))
    },
    None => {
      if ret.is_empty() {
        return try_again_get_events(account, event_key, &node)
      }
      Ok(ret)
    }
  }
}

fn try_again_get_events(account: AccountAddress, event_key: u64, current_node: &Node) -> Result<Vec<EventView>, CarpeError> {
  match remove_node(current_node.client.url().unwrap().to_string()) {
    Err(e) => {
      if e.to_string().contains("Cannot remove last node") {
        Err(CarpeError::misc("corrupted_db"))
      } else {
        Err(CarpeError::misc(&format!("Could not query account events, message: {:?}", e)))
      }            
    },
    Ok(_) => get_events(account, event_key)
  }        
}