//! network configs

use std::fmt;

use anyhow::{Error, bail};
use diem_types::waypoint::Waypoint;
use ol::{config::AppCfg, node::{client, node::Node}};
use ol_types::config::bootstrap_waypoint_from_rpc;
use url::Url;
use rand::seq::SliceRandom;
use crate::{carpe_error::CarpeError, configs::{self}, seed_peers};

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
    if let Some(url) = cfg.profile.default_node {
      Ok(NetworkProfile {
        chain_id: cfg.chain_info.chain_id,
        url: url,
        waypoint: cfg.chain_info.base_waypoint.unwrap_or_default(),
        profile: "default".to_string(),
      })
    } else {
      Err(CarpeError::misc("could not retrive network profile"))
    }
  }
}

#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub enum Networks {
  Mainnet,
  Rex,
  Custom,
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
  let peers = match network {
    Networks::Mainnet => seed_peers::get_mainnet(),
    Networks::Rex => seed_peers::get_testnet(),
    Networks::Custom => todo!(),
  };

  let random = peers.choose(&mut rand::thread_rng()).unwrap().to_owned();

  set_upstream_nodes(peers).map_err(|e|  {
    let err_msg = format!("could not set upstream nodes, message: {}", &e.to_string());
    CarpeError::misc(&err_msg)
  })?;

  set_default_node(random).map_err(|e|  {
    let err_msg = format!("could not set default node, message: {}", &e.to_string());
    CarpeError::misc(&err_msg)
  })?;

  set_chain_id(network.to_string()).map_err(|e|  {
    let err_msg = format!("could not set chain id, message: {}", &e.to_string());
    CarpeError::misc(&err_msg)
  })?;

  set_waypoint_from_upstream()?;

  NetworkProfile::new()
}

pub fn set_waypoint_from_upstream() -> Result<AppCfg, Error>  {
  let cfg = configs::get_cfg()?;
  if let Some(json_rpc_node) = cfg.profile.default_node.clone() {
    let wp = bootstrap_waypoint_from_rpc(json_rpc_node)?;
    // let (_, wp) = bootstrap_waypoint_from_upstream(&mut json_rpc_node)?;
    set_waypoint(wp)
  } else {
    bail!("could not find default_node in 0L.toml")
  }

}
/// Get all the 0L configs. For tx sending and upstream nodes
pub fn set_waypoint(wp: Waypoint) -> Result<AppCfg, Error>  {
  let mut cfg = configs::get_cfg()?;
  cfg.chain_info.base_waypoint = Some(wp);
  cfg.save_file();
  Ok(cfg)
}


/// Get all the 0L configs. For tx sending and upstream nodes
pub fn set_default_node(url: Url) -> Result<AppCfg, Error> {
  let mut cfg = configs::get_cfg()?;
  cfg.profile.default_node = Some(url);
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
  cfg.profile.upstream_nodes = Some(vec_url);
  cfg.save_file();
  Ok(cfg)
}


// TODO:
/// fetch upstream peers.
pub fn refresh_upstream_peers() -> Result<(), Error> {
  let mut cfg = configs::get_cfg()?;
  let client = match client::pick_client(None, &mut cfg) {
    Ok(c) => c,
    Err(e) => {
      println!(
        "ERROR: Could not create a client to connect to network, exiting. Message: {:?}",
        e
      );
      bail!("cannot connect to a client");
      // exit(1);
    }
  };

  let mut node = Node::new(client, &cfg, false);

  let path = configs::default_config_path();
  node.refresh_peers_update_toml(path)
}
