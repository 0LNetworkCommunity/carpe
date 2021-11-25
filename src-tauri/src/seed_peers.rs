//! seed peers for connecting to various networks.
use serde::{Deserialize};
use url::Url;
use std::time::Duration;

#[derive(Deserialize)]
struct Nodes {
    addresses: Vec<String>,
}

/// get testnet seed peers
pub fn get_testnet() -> Vec<Url> {
  vec![
    Url::parse("http://64.225.2.108:8080").unwrap()
  ]
}

/// get mainnet upstream peers (try from github list, fallback to hardcoded list)
pub fn get_mainnet() -> Vec<Url> {
  let nodes_from_repo = get_known_fullnodes();
  println!("nodes_from_repo = {:?}", nodes_from_repo);

  let options = match nodes_from_repo {
    Some(nodes_from_repo) => nodes_from_repo,
    None => // hard fallback to some well known nodes
      vec![
        String::from("http://35.184.98.21:8080"),   // o-de
        String::from("http://176.57.189.120:8080"), // mb 
        String::from("http://165.232.136.149:8080") // db
    ]
  };

  let mut seeds: Vec<Url> = Vec::new();
  for i in 0..options.len() {
    print!("checking upstream candicate {:?} = {:?}", i, options.get(i).unwrap());
    if is_available(options.get(i).unwrap() ) {
      seeds.push(Url::parse(options.get(i).unwrap()).unwrap());
      println!(" - OK!");
    } else {
      println!(" - NOT OK!");
    }
  }
  seeds
}


// try to fetch current fullnodes for mainnet from github
fn get_known_fullnodes() -> Option<Vec<String>> {

  let url = "https://raw.githubusercontent.com/OLSF/carpe/main/public/fullnodes.json";

  let result = reqwest::blocking::get(url);
  let response = match result {
    Ok(res) => res,
    Err(err) => { println!("error reading from url: {:?}", err); return None },
  };

  let data = response.text().unwrap_or("*".to_string());
  let result: Nodes = match serde_json::from_str(&data) {
    Ok(result)  => result,
    Err(e) => {
      println!("error parsing nodes from json: {:?}", e);
      return None
    }
  };

  if result.addresses.len() > 0 {
    Some(result.addresses)
  } else {
    None
  }
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
