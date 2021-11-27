//! seed peers for connecting to various networks.

use url::Url;
use std::time::Duration;

// Note: peers are hardcoded for beta testing.

/// get testnet seed peers
pub fn get_testnet() -> Vec<Url> {
  vec![
    Url::parse("http://64.225.2.108:8080").unwrap()
  ]
}

/// get mainnet seed peers
pub fn get_mainnet() -> Vec<Url> {
  let options= vec![
    "http://35.184.98.21:8080",
    "http://176.57.189.120:8080",
    "http://34.130.188.187:8080",
  ];
  let mut seeds: Vec<Url> = Vec::new();
  for i in 0..options.len() {
    if is_available(options.get(i).unwrap() ) {
      seeds.push(Url::parse(options.get(i).unwrap()).unwrap())
    }
  }
  seeds
}

fn is_available( url: &str) -> bool {
  let client = reqwest::blocking::Client::builder()
    .timeout(Duration::from_secs(2))
    .build().unwrap();
  let response = client.get(url).send();
  match response {
    Ok(response) =>   // full nodes answer 40* are ok for GET"
      response.status().as_u16() == 200 || (
      response.status().as_u16() >= 400 && response.status().as_u16() <= 405 ),
    Err(_) => false,
  }
}
