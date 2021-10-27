//! query the chain
use diem_types::account_address::AccountAddress;
use ol::node::{client, node::Node, query::QueryType};
use crate::{carpe_error::CarpeError, configs::get_cfg};

#[tauri::command]
pub fn query_balance(account: AccountAddress) -> Result<u64, CarpeError>{
  let mut cfg = get_cfg();
  let client = match client::pick_client(None, &mut cfg) {
    Ok(c) => c,
    Err(e) => {
      let msg = format!(
        "ERROR: Could not create a client to connect to network, exiting. Message: {:?}",
        e
      );
      return Err(CarpeError::misc(&msg))
    }
  };

  let mut node = Node::new(client, &cfg, false);

  let bal = node.query(QueryType::Balance{ account });
  bal.parse::<u64>()
    .map_err(|_| CarpeError::misc("could not parse balance"))
}