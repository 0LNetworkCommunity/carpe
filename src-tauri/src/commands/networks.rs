//! networks to connect to

use crate::configs::get_cfg;
use crate::{
  carpe_error::CarpeError,
};
use libra_types::exports::{NamedChain};
use libra_types::legacy_types::network_playlist::NetworkPlaylist;
use libra_types::legacy_types::network_playlist::HostProfile;
use url::Url;

#[tauri::command(async)]
pub async fn toggle_network(chain_id: NamedChain, custom_playlist: Option<Url>) -> Result<NetworkPlaylist, CarpeError> {
  let mut app_cfg = get_cfg()?;
  app_cfg.set_chain_id(chain_id);
  Ok(app_cfg.update_network_playlist(Some(chain_id), custom_playlist).await?)
}

#[tauri::command(async)]
pub async fn get_networks() -> Result<NetworkPlaylist, CarpeError> {
  let app_cfg = get_cfg()?;
  Ok(app_cfg.get_network_profile(None)?)
}

#[tauri::command(async)]
pub async fn override_playlist(url: Url) -> Result<NetworkPlaylist, CarpeError> {
    let mut app_cfg = get_cfg()?;
    Ok(app_cfg.update_network_playlist(Some(app_cfg.chain_info.chain_id), Some(url)).await?)
}

#[tauri::command(async)]
/// we want to elimated the entire playlist and use a single fullnode
pub async fn force_upstream(url: Url) -> Result<NetworkPlaylist, CarpeError> {
  let mut app_cfg = get_cfg()?;
  dbg!(&app_cfg);
  let mut dummy_playlist = NetworkPlaylist::default();
  dummy_playlist.nodes = vec![HostProfile::new(url)];
  dbg!(&dummy_playlist);

  app_cfg.network_playlist = Some(vec![dummy_playlist.clone()]);
  dbg!(&app_cfg);
  Ok(dummy_playlist)
}
