//! seed peers for connecting to various networks.
use anyhow::{Error, bail};
use serde::{Deserialize};
use url::Url;
use std::time::Duration;

#[derive(Deserialize)]
pub struct FullnodePlaylist {
    ///
    pub nodes: Vec<HostInfo>
}

#[derive(Deserialize)]
pub struct HostInfo {
    ///
    pub note: String,
    ///
    pub url: Url,
}

// try to fetch current fullnodes for mainnet from github
pub fn get_known_fullnodes(seed_url: Option<Url>) -> Result<Vec<HostInfo>, Error> {

  let url = seed_url.unwrap_or("https://raw.githubusercontent.com/OLSF/carpe/main/seed_peers/fullnode_seed_playlist.json".parse().unwrap());

  let client = reqwest::blocking::Client::builder()
    .timeout(Duration::from_secs(2))
    .build().unwrap();
  let result = client.get(url).send();

  let response = match result {
    Ok(res) => res,
    Err(err) => bail!("error reading from url: {:?}", err),
  };

  // Don't need to check here if the fullnodes are working. This should be done by the txs sender in real time.
  let data: FullnodePlaylist = serde_json::from_str(&response.text()?)?;

  Ok(data.nodes)
}
