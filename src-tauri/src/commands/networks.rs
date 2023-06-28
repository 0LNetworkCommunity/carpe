//! networks to connect to

use crate::configs::get_cfg;
use crate::{
  carpe_error::CarpeError,
  // configs_network::{
  //   override_upstream_node, set_network_configs,
  //   NetworkPlaylist,
  // }, 
};
use libra_types::exports::{NamedChain};
use libra_types::legacy_types::network_playlist::NetworkPlaylist;
use url::Url;

#[tauri::command(async)]
pub async fn toggle_network(chain_id: NamedChain, custom_playlist: Option<Url>) -> Result<NetworkPlaylist, CarpeError> {
  let mut app_cfg = get_cfg()?;
  app_cfg.set_chain_id(chain_id);
  Ok(app_cfg.update_network_playlist(Some(chain_id), custom_playlist).await?)
}

#[tauri::command(async)]
pub fn get_networks() -> Result<NetworkPlaylist, CarpeError> {
  let app_cfg = get_cfg()?;
  Ok(app_cfg.get_network_profile(None)?)
}

// #[tauri::command(async)]
// pub async fn override_playlist(url: Url) -> Result<NetworkPlaylist, CarpeError> {
//   let fpl = rpc_playlist::FullnodePlaylist::http_fetch_playlist(url).await?;
//   fpl.update_config_file(Some(configs::default_config_path()))?;
//   NetworkPlaylist::read_from_cfg()
// }

// #[tauri::command]
// pub fn force_upstream(url: Url) -> Result<NetworkPlaylist, CarpeError> {
//   override_upstream_node(url).map_err(|e| CarpeError::misc(&e.to_string()))?;
//   NetworkPlaylist::read_from_cfg()
// }

// #[tauri::command]
// pub fn force_waypoint(wp: Waypoint) -> Result<NetworkPlaylist, CarpeError> {
//   set_waypoint(wp).map_err(|e| CarpeError::misc(&e.to_string()))?;
//   NetworkPlaylist::new()
// }

// #[tauri::command(async)]
// pub async fn refresh_waypoint() -> Result<NetworkPlaylist, CarpeError> {
//   // dbg!("refresh_waypoint");
//   set_waypoint_from_upstream().await?;
//   NetworkPlaylist::new()
// }
