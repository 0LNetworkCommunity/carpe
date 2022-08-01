//! Carpe error type for client

use txs::submit_tx::TxError;

#[derive(serde::Deserialize, serde::Serialize, Debug, Clone)]
pub enum ErrorCat {
  Client,
  Tx,
  Configs,
  Misc,
  Tower,
}

#[derive(serde::Deserialize, serde::Serialize, Debug, Clone)]
pub struct CarpeError {
  ///
  pub category: ErrorCat,
  ///
  pub uid: u64,
  ///
  pub msg: String,
  ///
  pub trace: String,
}

impl From<anyhow::Error> for CarpeError {
  fn from(e: anyhow::Error) -> Self {
    CarpeError::misc(&format!("misc error, message: {:?}", e.to_string()))
  }
}

impl From<TxError> for CarpeError {
  fn from(e: TxError) -> Self {
    let uid = e.abort_code.unwrap_or(E_UNKNOWN);
    let msg = format!(
      "Transaction Error: Location {:?} AbortCode: {:?}",
      &e.location, &e.abort_code
    );
    let trace = format!("TxView: {:?}", &e.tx_view);
    // check if the is a tower error
    match tower::tower_errors::parse_error(&e) {
      tower::tower_errors::TowerError::Unknown => {
        // this isn't a tower error, so it must be another TX error
        CarpeError::new(ErrorCat::Tx, uid, msg, trace)
      }
      tower::tower_errors::TowerError::Other(_v) => {
        // TODO: Use VMStatusView?
        CarpeError::new(ErrorCat::Tx, uid, msg, trace)
      }

      a => CarpeError::tower(&a.to_string(), a.value()),
    }
  }
}

pub const E_UNKNOWN: u64 = 100; // consistent with TowerError.rs

pub const E_APP_CONFIG: u64 = 103; // consistent with TowerError.rs

// Client Errors
pub const E_CLIENT_CX: u64 = 404; // consistent with TowerError.rs

impl CarpeError {
  pub fn new(category: ErrorCat, uid: u64, msg: String, trace: String) -> Self {
    CarpeError {
      category,
      uid,
      msg,
      trace,
    }
  }

  pub fn config(msg: &str) -> Self {
    CarpeError {
      category: ErrorCat::Configs,
      uid: E_APP_CONFIG,
      msg: msg.to_owned(),
      trace: msg.to_owned(),
    }
  }

  pub fn tx(msg: &str) -> Self {
    CarpeError {
      category: ErrorCat::Tx,
      uid: E_UNKNOWN,
      msg: msg.to_owned(),
      trace: msg.to_owned(),
    }
  }

  pub fn tower(msg: &str, uid: u64) -> Self {
    CarpeError {
      category: ErrorCat::Tower,
      uid,
      msg: msg.to_owned(),
      trace: msg.to_owned(),
    }
  }

  pub fn tower_at_epoch_limit() -> Self {
    CarpeError {
      category: ErrorCat::Tower,
      uid: 130108,
      msg: "Tower is at epoch limit".to_owned(),
      trace: "Tower is at epoch limit".to_owned(),
    }
  }

  pub fn client(msg: &str) -> Self {
    CarpeError {
      category: ErrorCat::Client,
      uid: E_UNKNOWN,
      msg: msg.to_owned(),
      trace: msg.to_owned(),
    }
  }

  pub fn rpc_fail(msg: &str) -> Self {
    CarpeError {
      category: ErrorCat::Client,
      uid: E_CLIENT_CX,
      msg: "Network Unreacheable".to_owned(),
      trace: msg.to_owned(),
    }
  }

  pub fn misc(msg: &str) -> Self {
    CarpeError {
      category: ErrorCat::Misc,
      uid: E_UNKNOWN,
      msg: msg.to_owned(),
      trace: msg.to_owned(),
    }
  }
}
