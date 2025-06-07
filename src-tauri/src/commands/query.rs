//! query the chain
use crate::{carpe_error::CarpeError, configs::get_client};
use anyhow::anyhow;
use libra_query::account_queries::get_account_balance_libra;
use libra_query::query_view::get_view;
use libra_types::{
  exports::{AccountAddress, AuthenticationKey},
  move_resource::gas_coin::SlowWalletBalance,
  type_extensions::client_ext::ClientExt,
};

#[tauri::command(async)]
pub async fn query_balance(account: AccountAddress) -> Result<SlowWalletBalance, CarpeError> {
  get_balance(account).await
}

#[tauri::command(async)]
pub async fn check_account_migration_status(account: AccountAddress) -> Result<bool, CarpeError> {
  let client = get_client()?;
  let res = get_view(
    &client,
    "0x1::activity::is_pre_v8",
    None,
    Some(account.to_string()),
  )
  .await
  .map_err(|e| CarpeError::misc(&format!("Failed to check migration status: {}", e)))?;
  let is_migrated = res
    .as_array()
    .and_then(|arr| arr.first())
    .and_then(|val| val.as_bool())
    .unwrap_or(false);

  Ok(is_migrated)
}

#[tauri::command(async)]
pub async fn is_not_valid_vouch_score(account: AccountAddress) -> Result<bool, CarpeError> {
  let client = get_client()?;

  let result = get_view(
    &client,
    "0x1::founder::check_voucher_score_valid",
    None,
    Some(account.to_string()),
  )
  .await;

  match result {
    Ok(res) => {
      let is_valid = res
        .as_array()
        .and_then(|arr| arr.first())
        .and_then(|val| val.as_bool())
        .unwrap_or(false);

      Ok(is_valid)
    }
    Err(e) => {
      // Check if the error is the specific abort code we're seeing
      if e.to_string().contains("196609") {
        // This specific error code might indicate the account isn't eligible
        Ok(false)
      } else {
        Err(CarpeError::misc(&format!(
          "Failed to check vouch score: {}",
          e
        )))
      }
    }
  }
}

// Add this function to query.rs
#[tauri::command(async)]
pub async fn is_founder(account: AccountAddress) -> Result<bool, CarpeError> {
  let client = get_client()?;

  let result = get_view(
    &client,
    "0x1::founder::is_founder",
    None,
    Some(account.to_string()),
  )
  .await;

  match result {
    Ok(res) => {
      let is_founder = res
        .as_array()
        .and_then(|arr| arr.first())
        .and_then(|val| val.as_bool())
        .unwrap_or(false);

      Ok(is_founder)
    }
    Err(e) => {
      // In case of errors, log and return false
      println!("Error checking if account is founder: {}", e);
      Ok(false)
    }
  }
}

#[tauri::command(async)]
pub async fn get_vouch_limit(account: AccountAddress) -> Result<u64, CarpeError> {
  let client = get_client()?;
  let result = get_view(
    &client,
    "0x1::vouch_limits::get_vouch_limit",
    None,
    Some(account.to_string()),
  )
  .await;

  match result {
    Ok(res) => {
      let vouch_limit: u64 = res
        .as_array()
        .and_then(|arr| arr.first())
        .and_then(|val| val.as_str())
        .and_then(|str_val| str_val.parse::<u64>().ok())
        .unwrap_or(0);
      Ok(vouch_limit)
    }
    Err(e) => {
      // In case of errors, log and return false
      println!("Error checking vouch limit: {}", e);
      Ok(0)
    }
  }
}

#[tauri::command(async)]
pub async fn get_given_vouches(account: AccountAddress) -> Result<Vec<String>, CarpeError> {
  let client = get_client()?;

  // Format the address with 0x prefix which is required by the Move function
  let formatted_address = format!("0x{}", account.to_hex());

  let result = get_view(
    &client,
    "0x1::vouch::get_given_vouches",
    None,
    Some(formatted_address),
  )
  .await;

  match result {
    Ok(res) => {
      // The response should be an array with two elements:
      // 1. A vector of addresses
      // 2. A vector of epochs when they were vouched for
      if let Some(outer_arr) = res.as_array() {
        if outer_arr.len() >= 1 {
          if let Some(addresses) = outer_arr[0].as_array() {
            let vouched_addresses: Vec<String> = addresses
              .iter()
              .filter_map(|v| v.as_str().map(|s| s.to_string()))
              .collect();

            return Ok(vouched_addresses);
          }
        }
      }

      // If we couldn't parse the response, return empty vector
      Ok(vec![])
    }
    Err(e) => {
      println!("Error checking given vouches: {}", e);
      Err(CarpeError::misc(&format!(
        "Failed to check given vouches: {}",
        e
      )))
    }
  }
}

// #[tauri::command(async)]
// pub async fn get_onchain_tower_state(account: String) -> Result<TowerProofHistoryView, CarpeError> {
//   let account: AccountAddress = account.parse()?;
//   let client = get_client()?;
//   let tower_access_path = "0x1::tower_state::TowerProofHistory";
//   let res = client
//     .get_account_resource_bcs::<TowerProofHistoryView>(account, tower_access_path)
//     .await?;
//   let epoch = res.state().epoch;
//   let mut state = res.into_inner();
//   if state.latest_epoch_mining != epoch {
//     state.count_proofs_in_epoch = 0;
//   }

//   Ok(state)
// }
// //
// #[tauri::command(async)]
// pub async fn query_makewhole(account: AccountAddress) -> Result<Vec<CreditResource>, CarpeError> {
//   let client = get_client()?;
//   let access_path = "0x1::make_whole::MakeWhole";
//   let res = client
//     .get_account_resource_bcs::<MakeWholeResource>(account, access_path)
//     .await?;
//   let credits = res.into_inner().credits;
//   Ok(credits)
// }

pub async fn get_balance(account: AccountAddress) -> Result<SlowWalletBalance, CarpeError> {
  let client = get_client()?;
  get_account_balance_libra(&client, account)
    .await
    .map_err(|e| {
      CarpeError::misc(&format!(
        "Could not get balance from account{}: {}",
        account, e
      ))
    })
}

pub async fn get_seq_num(account: AccountAddress) -> Result<u64, CarpeError> {
  let client = get_client()?;
  let res = client.get_account(account).await.map_err(|e| {
    CarpeError::misc(&format!(
      "Could not get balance from account{}: {}",
      account, e
    ))
  })?;

  Ok(res.into_inner().sequence_number)
}

pub async fn get_auth_key(account: AccountAddress) -> Result<AuthenticationKey, CarpeError> {
  let client = get_client()?;
  let res = client.get_account(account).await.map_err(|e| {
    CarpeError::misc(&format!(
      "Could not get authentication_key from account{}: {}",
      account, e
    ))
  })?;

  Ok(res.into_inner().authentication_key)
}

#[tauri::command(async)]
pub async fn get_recovery_mode() -> Result<u64, CarpeError> {
  let client = get_client()?;

  // TODO: write a Move view for this

  let res = client
    .view_ext("0x1::recovery_mode::get_end_epoch", None, None)
    .await?;

  let value: u64 = serde_json::from_value::<Vec<String>>(res)
    .map_err(|_| anyhow!("cannot parse recovery mode view"))?[0]
    .parse()
    .map_err(|_| anyhow!("cannot parse recovery mode view"))?;

  Ok(value)
}
//
//
// pub fn get_payment_events(account: AccountAddress) -> Result<Vec<EventView>, CarpeError> {
//   dbg!("get_payment_events");
//
//   // get payments received
//   match get_events(account, 0) {
//     Ok(mut received) => {
//       // get payments sent
//       match get_events(account, 1) {
//         Ok(mut sent) => {
//           received.append(&mut sent);
//           Ok(received)
//         }
//         Err(e) => Err(CarpeError::misc(&e.msg)),
//       }
//     }
//     Err(e) => Err(CarpeError::misc(&e.msg)),
//   }
// }

// Waiting for get event query to be implemented on txs side
// pub fn get_events(account: AccountAddress, event_key: u64) -> Result<Vec<EventView>, CarpeError> {
//   let client = get_client();
//   let limit = 1000;
//   let mut events_count = limit;
//   let mut start = 0;
//   let mut ret: Vec<EventView> = vec![];
//   let mut error = None;
//
//   while events_count == limit {
//     let result = client.get_events(
//       EventKey::new(event_key, account),
//       start,
//       limit,
//     );
//
//     match result {
//       Ok(events) => {
//         let mut event_views =  events.into_inner();
//         events_count = event_views.len() as u64;
//         start = start + events_count;
//         ret.append(&mut event_views);
//       }
//       Err(e) => {
//         error = Some(e);
//         break;
//       }
//     };
//   }
//
//   match error {
//     Some(e) => {
//       if e.to_string().contains("DB corrupt") {
//         return try_again_get_events(account, event_key, &client);
//       }
//       Err(CarpeError::misc(&format!(
//         "Could not query account events, message: {:?}",
//         e
//       )))
//     }
//     None => {
//       if ret.is_empty() {
//         return try_again_get_events(account, event_key, &client);
//       }
//       Ok(ret)
//     }
//   }
// }

// fn try_again_get_events(
//   account: AccountAddress,
//   event_key: u64,
//   current_client: &Client,
// ) -> Result<Vec<EventView>, CarpeError> {
//   match remove_node(current_client.url().to_string()) {
//     Err(e) => {
//       if e.to_string().contains("Cannot remove last node") {
//         Err(CarpeError::misc("corrupted_db"))
//       } else {
//         Err(CarpeError::misc(&format!(
//           "Could not query account events, message: {:?}",
//           e
//         )))
//       }
//     }
//     Ok(_) => get_events(account, event_key),
//   }
// }

#[tokio::test]
pub async fn query_test() {
  // need to start a node in test mode first.
  let client = get_client().unwrap();
  let m = client.get_index().await.unwrap();
  println!("query_test: {:?}", m);

  let m = client.get_block_by_height(1407, false).await.unwrap();
  println!("query_test: {:?}", m);
}
