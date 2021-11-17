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

pub fn is_available( url: &str) -> bool {
  let client = reqwest::blocking::Client::new();
  match client.post(url).send() {
    Ok(response) => response.status() == 200,
    Err(_) => false,
  }
}
