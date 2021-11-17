//! query the chain
use diem_types::account_address::AccountAddress;
use ol::node::query::QueryType;
use crate::{carpe_error::CarpeError, configs::get_node_obj};

#[tauri::command]
pub fn query_balance(account: AccountAddress) -> Result<u64, CarpeError>{
  get_balance(account)
}

pub fn get_balance(account: AccountAddress) -> Result<u64, CarpeError>{
  let mut node = get_node_obj()?;
  let bal = node.query(QueryType::Balance{ account });
  bal.parse::<u64>().map_err(|_|{ CarpeError::misc(&format!("could parse get balance from account: {}", account))})
}