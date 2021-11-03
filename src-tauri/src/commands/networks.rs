//! networks to connect to



use diem_types::waypoint::Waypoint;
use url::Url;

use crate::{carpe_error::CarpeError, configs_network::{NetworkProfile, Networks, set_default_node, set_network_configs, set_waypoint, set_waypoint_from_upstream}};

// use diem_types::waypoint::Waypoint;
// use url::Url;
// use rand::seq::SliceRandom;
// use crate::{carpe_error::CarpeError, configs::{self, set_waypoint_from_upstream}, seed_peers};

// #[derive(serde::Deserialize, serde::Serialize, Debug)]
// pub struct NetworkProfile {
//   pub chain_id: String, // Todo, use the Network Enum
//   pub url: Url,
//   pub waypoint: Waypoint,
//   pub profile: String, // tbd, to use default node, or to use upstream, or a custom url.
// }

// impl NetworkProfile {
//   pub fn new() -> Result<Self, CarpeError> {
//     let cfg = configs::get_cfg()?;
//     if let Some(url) = cfg.profile.default_node {
//       Ok(NetworkProfile {
//         chain_id: cfg.chain_info.chain_id,
//         url: url,
//         waypoint: cfg.chain_info.base_waypoint.unwrap_or_default(),
//         profile: "default".to_string(),
//       })
//     } else {
//       Err(CarpeError::misc("could not retrive network profile"))
//     }
//   }
// }

// #[derive(serde::Deserialize, serde::Serialize, Debug)]
// pub enum Networks {
//   Mainnet,
//   Rex,
//   Custom,
// }

// impl fmt::Display for Networks {
//     fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
//         write!(f, "{:?}", self)
//         // or, alternatively:
//         // fmt::Debug::fmt(self, f)
//     }
// }


#[tauri::command]
pub fn toggle_network(network: Networks) -> Result<NetworkProfile, CarpeError> {
  set_network_configs(network)
}



#[tauri::command]
pub fn get_networks() -> Result<NetworkProfile, CarpeError> {
  NetworkProfile::new()
}

#[tauri::command]
pub fn update_upstream(url: Url, wp: Waypoint) -> Result<NetworkProfile, CarpeError> {
  set_default_node(url).map_err(|e| CarpeError::misc(&e.to_string()))?;
  set_waypoint(wp).map_err(|e| CarpeError::misc(&e.to_string()))?;
  NetworkProfile::new()
}


#[tauri::command]
pub fn refresh_waypoint() -> Result<NetworkProfile, CarpeError> {
  
  set_waypoint_from_upstream()?;
  NetworkProfile::new()
}

