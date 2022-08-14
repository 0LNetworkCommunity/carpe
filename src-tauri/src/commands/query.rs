//! query the chain
use crate::configs_network::remove_node;
use crate::{carpe_error::CarpeError, configs::get_node_obj};
use diem_client::views::EventView;
use diem_json_rpc_types::views::TowerStateResourceView;
use diem_types::{account_address::AccountAddress, event::EventKey};
use ol::node::query;
use ol::node::{node::Node, query::QueryType};
use ol_types::makewhole_resource::{CreditResource, MakeWholeResource};
use resource_viewer::AnnotatedMoveValue;

#[tauri::command(async)]
pub fn query_balance(account: AccountAddress) -> Result<u64, CarpeError> {
  get_balance(account)
}

#[tauri::command(async)]
pub fn get_onchain_tower_state(
  account: AccountAddress,
) -> Result<TowerStateResourceView, CarpeError> {
  dbg!("get_onchain_tower_state");
  let node = get_node_obj()?;

  match node.client.get_miner_state(&account) {
    Ok(Some(t)) => Ok(t),
    _ => Err(CarpeError::client_unknown_err("Could not get tower state from chain")),
  }
}

#[tauri::command(async)]
pub async fn query_makewhole(account: AccountAddress) -> Result<Vec<CreditResource>, CarpeError> {
  let node = get_node_obj()?;
  let acc_state = node.get_account_state(account)?;

  match acc_state.get_resource::<MakeWholeResource>()? {
    Some(mk) => Ok(mk.credits),
    None => Ok(Vec::new()),
  }
}

// #[test]
// fn test_makewhole() {
//   get_makewhole("613b6d9599f72134a4fa20bba4c75c36".parse().unwrap());
// }

pub fn get_balance(account: AccountAddress) -> Result<u64, CarpeError> {
  dbg!("get_balance");
  let mut node = get_node_obj()?;
  let bal = node.query(QueryType::Balance { account })?;
  bal
    .parse::<u64>()
    .map_err(|_| CarpeError::misc(&format!("Could not get balance from account: {}", account)))
}

#[tauri::command(async)]
pub async fn get_recovery_mode() -> Result<u64, CarpeError> {
  let node = get_node_obj()?;
  if let Some(state) = node.get_annotate_account_blob(AccountAddress::ZERO)?.0 {
    let recovery = query::find_value_from_state(
      &state,
      "RecoveryMode".to_owned(),
      "RecoveryMode".to_owned(),
      "epoch_ends".to_owned(),
    );
    match recovery {
      Some(AnnotatedMoveValue::U64(v)) => return Ok(v.to_owned()),
      _ => {}
    };
    return Err(CarpeError::misc(&format!(
      "No recovery mode struct. This is the typical case. Result: {:?}",
      &recovery
    )));
  }

  return Err(CarpeError::misc(&format!("Cannot get root account state")));
}


pub fn get_payment_events(account: AccountAddress) -> Result<Vec<EventView>, CarpeError> {
  dbg!("get_payment_events");

  // get payments received
  match get_events(account, 0) {
    Ok(mut received) => {
      // get payments sent
      match get_events(account, 1) {
        Ok(mut sent) => {
          received.append(&mut sent);
          Ok(received)
        }
        Err(e) => Err(CarpeError::misc(&e.msg)),
      }
    }
    Err(e) => Err(CarpeError::misc(&e.msg)),
  }
}

pub fn get_events(account: AccountAddress, event_key: u64) -> Result<Vec<EventView>, CarpeError> {
  let node = get_node_obj()?;

  let limit = 1000;
  let mut events_count = limit;
  let mut start = 0;
  let mut ret: Vec<EventView> = vec![];
  let mut error = None;

  while events_count == limit {
    let result = node.client.get_events(
      EventKey::new_from_address(&account, event_key),
      start,
      limit,
    );

    match result {
      Ok(mut events) => {
        events_count = events.len() as u64;
        start = start + events_count;
        ret.append(&mut events);
      }
      Err(e) => {
        error = Some(e);
        break;
      }
    };
  }

  match error {
    Some(e) => {
      if e.to_string().contains("DB corrupt") {
        return try_again_get_events(account, event_key, &node);
      }
      Err(CarpeError::misc(&format!(
        "Could not query account events, message: {:?}",
        e
      )))
    }
    None => {
      if ret.is_empty() {
        return try_again_get_events(account, event_key, &node);
      }
      Ok(ret)
    }
  }
}

fn try_again_get_events(
  account: AccountAddress,
  event_key: u64,
  current_node: &Node,
) -> Result<Vec<EventView>, CarpeError> {
  match remove_node(current_node.client.url().unwrap().to_string()) {
    Err(e) => {
      if e.to_string().contains("Cannot remove last node") {
        Err(CarpeError::misc("corrupted_db"))
      } else {
        Err(CarpeError::misc(&format!(
          "Could not query account events, message: {:?}",
          e
        )))
      }
    }
    Ok(_) => get_events(account, event_key),
  }
}
