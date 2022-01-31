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
  category: ErrorCat,
  uid: u64,
  msg: String,
  trace: String,
}

impl From<anyhow::Error> for CarpeError {
    fn from(e: anyhow::Error) -> Self {
        CarpeError::misc(&format!("misc error, message: {:?}", e.to_string()))
    }
}

impl From<TxError> for CarpeError {
    fn from(e: TxError) -> Self {
      // check if the is a tower error
      match tower::tower_errors::parse_error(e){
        tower::tower_errors::TowerError::Unknown => CarpeError::tx("unknown tx error submitting tower"),
        tower::tower_errors::TowerError::Other(v) => CarpeError::tx(&format!("unknown tx error submitting tower, message: {}", &v)),

        a => {
          CarpeError::tower(&a.to_string(), a.value())
        }
      }
    }
}

const E_UNKNOWN: u64 = 100; // consistent with TowerError.rs

const E_APP_CONFIG: u64 = 103; // consistent with TowerError.rs

// Client Errors
const E_CLIENT_CX: u64 = 404; // consistent with TowerError.rs


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
