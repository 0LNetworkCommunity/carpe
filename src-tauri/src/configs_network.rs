//! network configs

use std::fmt;

use crate::{
  carpe_error::CarpeError,
  configs::{self},
  seed_peers::{self, FullnodePlaylist},
};
use anyhow::{bail, Error};
use diem_types::waypoint::Waypoint;
use ol::config::AppCfg;
use ol_types::config::bootstrap_waypoint_from_rpc;
use rand::{seq::SliceRandom, thread_rng};
use url::Url;

#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct NetworkProfile {
  pub chain_id: String, // Todo, use the Network Enum
  pub url: Url,
  pub waypoint: Waypoint,
  pub profile: String, // tbd, to use default node, or to use upstream, or a custom url.
}

impl NetworkProfile {
  pub fn new() -> Result<Self, CarpeError> {
    let cfg = configs::get_cfg()?;

    Ok(NetworkProfile {
      chain_id: cfg.chain_info.chain_id,
      url: "http://0.0.0.0".parse().unwrap(), // TODO: This information is not used on the client side. Remove?
      waypoint: cfg.chain_info.base_waypoint.unwrap_or_default(),
      profile: "default".to_string(),
    })
  }
}

#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub enum Networks {
  Mainnet,
  Rex,
  Custom { playlist_url: Url },
}

impl fmt::Display for Networks {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    write!(f, "{:?}", self)
    // or, alternatively:
    // fmt::Debug::fmt(self, f)
  }
}

pub fn set_network_configs(network: Networks) -> Result<NetworkProfile, CarpeError> {
  dbg!("toggle network");
  let hostinfo = match &network {
    Networks::Mainnet => seed_peers::get_known_fullnodes(None)?,

    Networks::Rex => seed_peers::get_known_fullnodes(Some("https://raw.githubusercontent.com/OLSF/carpe/main/seed_peers/fullnode_seed_playlist_testnet.json".parse().unwrap()))?,
    Networks::Custom { playlist_url } => seed_peers::get_known_fullnodes(Some(playlist_url.to_owned()))?,
  };

  let mut peers: Vec<Url> = hostinfo.into_iter().map(|h| h.url).collect();

  // Ensure the upstream_peers list is random, and the default peer is also random.
  let mut rng = thread_rng();
  peers.shuffle(&mut rng);

  set_upstream_nodes(peers).map_err(|e| {
    let err_msg = format!("could not set upstream nodes, message: {}", &e.to_string());
    CarpeError::misc(&err_msg)
  })?;

  // TODO: I don't think chain ID needs to change.
  set_chain_id(network.to_string()).map_err(|e| {
    let err_msg = format!("could not set chain id, message: {}", &e.to_string());
    CarpeError::misc(&err_msg)
  })?;

  set_waypoint_from_upstream()?;

  NetworkProfile::new()
}

pub fn set_waypoint_from_upstream() -> Result<AppCfg, Error> {
  let cfg = configs::get_cfg()?;

  // try getting waypoint from upstream nodes
  // no waypoint is necessary in advance.
  let wp: Option<Waypoint> = cfg
    .profile
    .upstream_nodes
    .clone()
    .into_iter()
    .find_map(|url| bootstrap_waypoint_from_rpc(url.to_owned()).ok());

  if let Some(w) = wp {
    if cfg.chain_info.base_waypoint != wp {
      set_waypoint(w)?;
    }
    
    Ok(cfg)
  } else {
    bail!("no waypoint found while querying upstream nodes")
  }
}

/// Set the base_waypoint used for client connections.
pub fn set_waypoint(wp: Waypoint) -> Result<AppCfg, Error> {
  let mut cfg = configs::get_cfg()?;
  cfg.chain_info.base_waypoint = Some(wp);
  cfg.save_file();
  Ok(cfg)
}

/// Set upstream nodes from playlist.
pub fn set_playlist(url: Url) -> Result<AppCfg, Error> {
  let mut cfg = configs::get_cfg()?;
  let fpl = FullnodePlaylist::http_fetch_playlist(url)?;

  cfg.profile.upstream_nodes = fpl.get_urls();
  cfg.save_file();
  Ok(cfg) 
}

/// Get all the 0L configs. For tx sending and upstream nodes
/// Note: The default_node key in 0L is not used by Carpe. Carpe randomly tests
/// all the endpoints in upstream_peers on every TX.
pub fn override_upstream_node(url: Url) -> Result<AppCfg, Error> {
  let mut cfg = configs::get_cfg()?;
  cfg.profile.upstream_nodes = vec![url];
  cfg.save_file();
  Ok(cfg)
}

// the 0L configs. For tx sending and upstream nodes
pub fn set_chain_id(chain_id: String) -> Result<AppCfg, Error> {
  let mut cfg = configs::get_cfg()?;
  cfg.chain_info.chain_id = chain_id;
  cfg.save_file();
  Ok(cfg)
}

/// Set the list of upstream nodes
pub fn set_upstream_nodes(vec_url: Vec<Url>) -> Result<AppCfg, Error> {
  let mut cfg = configs::get_cfg()?;
  cfg.profile.upstream_nodes = vec_url;
  cfg.save_file();
  Ok(cfg)
}

// // TODO:
// /// fetch upstream peers.
// pub fn refresh_upstream_peers() -> Result<(), Error> {
//   let mut cfg = configs::get_cfg()?;
//   let client = match client::pick_client(None, &mut cfg) {
//     Ok(c) => c,
//     Err(e) => {
//       println!(
//         "ERROR: Could not create a client to connect to network, exiting. Message: {:?}",
//         e
//       );
//       bail!("cannot connect to a client");
//       // exit(1);
//     }
//   };

//   let mut node = Node::new(client, &cfg, false);

//   let path = configs::default_config_path();
//   node.refresh_peers_update_toml(path)
// }
