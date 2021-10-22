//! Carpe error type for client


enum ErrorCat {
  Client,
  Tx,
  Configs,
  Misc
}

#[derive(Serialize, Deserialize)]
pub struct CarpeError {
  category: ErrorCat,
  uid: u8,
  msg: String,
}

const E_MISC: u8 = 100;

impl CarpeError {
  pub fn new(category: ErrorCat, uid: u8, msg: String ) -> Self {
    CarpeError {
      category,
      uid,
      msg,
    }
  }

  pub fn misc(msg: &str) -> Self {
    CarpeError {
      category: ErrorCat(Misc),
      uid: E_MISC,
      msg.to_owned()
    }
  }
}