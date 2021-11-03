//! seed peers for connecting to various networks.

use url::Url;

// Note: peers are hardcoded for beta testing.

/// get testnet seed peers
pub fn get_testnet() -> Vec<Url> {
  vec![
    Url::parse("http://64.225.2.108:8080").unwrap()
  ]
}

/// get mainnet seed peers
pub fn get_mainnet() -> Vec<Url> {
  vec![
    Url::parse("http://35.184.98.21:8080").unwrap()
  ]
}
