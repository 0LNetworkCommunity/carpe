//! Carpe error type for client


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
  uid: u8,
  msg: String,
  trace: String,
}

impl From<anyhow::Error> for CarpeError {
    fn from(e: anyhow::Error) -> Self {
        CarpeError::misc(&format!("misc error, message: {:?}", e.to_string()))
    }
}

const E_MISC: u8 = 100;


// Client Errors
const E_RPC_FAIL: u8 = 101;

// Tower Errors
const E_TOWER: u8 = 120;
const E_TOWER_LIMIT: u8 = 121;


impl CarpeError {
  pub fn new(category: ErrorCat, uid: u8, msg: String, trace: String) -> Self {
    CarpeError {
      category,
      uid,
      msg,
      trace,
    }
  }
  pub fn tower(msg: &str) -> Self {
    CarpeError {
      category: ErrorCat::Tower,
      uid: E_TOWER,
      msg: msg.to_owned(),
      trace: msg.to_owned(),
    }
  }

  pub fn tower_at_epoch_limit() -> Self {
    CarpeError {
      category: ErrorCat::Tower,
      uid: E_TOWER_LIMIT,
      msg: "Tower is at epoch limit".to_owned(),
      trace: "Tower is at epoch limit".to_owned(),
    }
  }

  pub fn client(msg: &str) -> Self {
    CarpeError {
      category: ErrorCat::Misc,
      uid: E_MISC,
      msg: msg.to_owned(),
      trace: msg.to_owned(),
    }
  }

  pub fn rpc_fail(msg: &str) -> Self {
    CarpeError {
      category: ErrorCat::Client,
      uid: E_RPC_FAIL,
      msg: "Network Unreacheable".to_owned(),
      trace: msg.to_owned(),
    }
  }

  pub fn misc(msg: &str) -> Self {
    CarpeError {
      category: ErrorCat::Misc,
      uid: E_MISC,
      msg: msg.to_owned(),
      trace: msg.to_owned(),
    }
  }
}
