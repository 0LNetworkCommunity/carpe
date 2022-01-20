//! networks to connect to



use diem_types::waypoint::Waypoint;
use url::Url;

use crate::{carpe_error::CarpeError, configs_network::{NetworkProfile, Networks, set_default_node, set_network_configs, set_waypoint, set_waypoint_from_upstream}};

#[tauri::command]
pub fn toggle_network(network: Networks) -> Result<NetworkProfile, CarpeError> {
  set_network_configs(network)
}

#[tauri::command(async)]
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

