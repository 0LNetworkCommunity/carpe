use libra_types::exports::{AccountAddressParseError, RestError};

// catch all
pub const E_UNKNOWN: u64 = 100;
// config errors
pub const E_APP_CONFIG: u64 = 103; // consistent with TowerError.rs
pub const E_KEY_NOT_REGISTERED: u64 = 104; // consistent with TowerError.rs

// Client Errors
pub const E_CLIENT_UNKNOWN: u64 = 500;
pub const E_CLIENT_CX: u64 = 404;

// Transaction Errors
pub const E_TX_UNKNOWN: u64 = 300;

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

impl From<AccountAddressParseError> for CarpeError {
  fn from(e: AccountAddressParseError) -> Self {
    CarpeError::misc(&format!("misc error, message: {:?}", e.to_string()))
  }
}

impl From<RestError> for CarpeError {
  fn from(e: RestError) -> Self {
    match e {
      RestError::Api(e) => {
        let code = e.status_code.as_u16();
        let msg = format!(
          "Transaction Error: AbortCode: {:?}, Message: {:?}",
          &e.state, &e.error
        );
        let trace = format!("TxView: {:?}", &e);

        CarpeError::new(ErrorCat::Tx, code as u64, msg, trace)
      }
      RestError::Bcs(e) => {
        let msg = "Transaction Error:".to_string();
        let trace = format!("TxView: {:?}", &e);

        CarpeError::new(ErrorCat::Tx, E_UNKNOWN, msg, trace)
      }
      RestError::Json(e) => {
        let msg = format!("Transaction Error: Message: {:?}", &e);
        let trace = format!("TxView: {:?}", &e);

        CarpeError::new(ErrorCat::Tx, E_UNKNOWN, msg, trace)
      }
      RestError::UrlParse(e) => {
        let msg = format!("Transaction Error: Message: {:?}", &e);
        let trace = format!("TxView: {:?}", &e);

        CarpeError::new(ErrorCat::Tx, E_UNKNOWN, msg, trace)
      }
      RestError::Timeout(e) => {
        let msg = format!("Transaction Error: Message: {:?}", &e);
        let trace = format!("TxView: {:?}", &e);

        CarpeError::new(ErrorCat::Tx, E_UNKNOWN, msg, trace)
      }
      RestError::Unknown(e) => {
        let msg = format!("Transaction Error: Message: {:?}", &e);
        let trace = format!("TxView: {:?}", &e);

        CarpeError::new(ErrorCat::Tx, E_UNKNOWN, msg, trace)
      }
      RestError::Http(s, e) => {
        let uid = s.as_u16();
        let msg = format!("Transaction Error: Message: {:?}", &e);
        let trace = format!("TxView: {:?}", &e);

        CarpeError::new(ErrorCat::Tx, uid as u64, msg, trace)
      }
    }
  }
}

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

  pub fn tx_unknown(msg: &str) -> Self {
    CarpeError {
      category: ErrorCat::Tx,
      uid: E_TX_UNKNOWN,
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

  pub fn client_unknown_err(msg: &str) -> Self {
    CarpeError {
      category: ErrorCat::Client,
      uid: E_CLIENT_UNKNOWN,
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
