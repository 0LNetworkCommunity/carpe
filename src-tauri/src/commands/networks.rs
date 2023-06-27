//! networks to connect to

use std::str::FromStr;
use crate::{
  carpe_error::CarpeError,
  configs_network::{
    override_upstream_node, set_network_configs,
    NetworkProfile,
  }, 
  configs,
  types::rpc_playlist,
};
use libra_types::exports::{NamedChain};
use url::Url;

#[tauri::command(async)]
pub async fn toggle_network(network: String, custom_playlist: Option<Url>) -> Result<NetworkProfile, CarpeError> {
  let name = NamedChain::from_str(&network)?;
  set_network_configs(name, custom_playlist).await
}

#[tauri::command(async)]
pub fn get_networks() -> Result<NetworkProfile, CarpeError> {
  NetworkProfile::read_from_cfg()
}

#[tauri::command(async)]
pub async fn override_playlist(url: Url) -> Result<NetworkProfile, CarpeError> {
  let fpl = rpc_playlist::FullnodePlaylist::http_fetch_playlist(url).await?;
  fpl.update_config_file(Some(configs::default_config_path()))?;
  NetworkProfile::read_from_cfg()
}

#[tauri::command]
pub fn force_upstream(url: Url) -> Result<NetworkProfile, CarpeError> {
  override_upstream_node(url).map_err(|e| CarpeError::misc(&e.to_string()))?;
  NetworkProfile::read_from_cfg()
}

// #[tauri::command]
// pub fn force_waypoint(wp: Waypoint) -> Result<NetworkProfile, CarpeError> {
//   set_waypoint(wp).map_err(|e| CarpeError::misc(&e.to_string()))?;
//   NetworkProfile::new()
// }

// #[tauri::command(async)]
// pub async fn refresh_waypoint() -> Result<NetworkProfile, CarpeError> {
//   // dbg!("refresh_waypoint");
//   set_waypoint_from_upstream().await?;
//   NetworkProfile::new()
// }
