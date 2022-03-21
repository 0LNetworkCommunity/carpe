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
        println!(">>> Current Node URL: {:?}", node.client.url().unwrap().host().unwrap());
        error = Some(e);
        break;        
      }
    };
  }
  
  match error {
    Some(e) => {
      /*if e.to_string().contains("DB corrupt") {
        println!(">>> Retry fetch_events with different node");
        match remove_node(node.url) {
          Err(e) => Err(CarpeError::misc(&error.to_string())),
          Ok(_) => get_events(account)
        }        
      } else {*/
      Err(CarpeError::misc(&e.to_string()))      
    },
    None => Ok(ret)
  }
}