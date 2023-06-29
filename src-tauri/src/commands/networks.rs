//! networks to connect to

use crate::configs::get_cfg;
use crate::{
  carpe_error::CarpeError,
};
use libra_types::exports::{NamedChain};
use libra_types::legacy_types::network_playlist::NetworkPlaylist;
use libra_types::legacy_types::network_playlist::HostProfile;
use url::Url;
use libra_types::legacy_types::app_cfg::AppCfg;

#[tauri::command(async)]
pub async fn toggle_network(chain_id: NamedChain) -> Result<NetworkPlaylist, CarpeError> {
  println!("toggle_network");
  let mut app_cfg = get_cfg()?;
  app_cfg.set_chain_id(chain_id);
  app_cfg.save_file()?;
  
  maybe_create_playlist(&mut app_cfg, chain_id).await.ok();

  get_networks().await
}

async fn maybe_create_playlist(app_cfg: &mut AppCfg, chain_id: NamedChain) -> anyhow::Result<NetworkPlaylist>{

  let np = if chain_id == NamedChain::TESTING {
  let mut playlist = NetworkPlaylist::default();
   playlist.chain_id = NamedChain::TESTING;
   app_cfg.add_custom_playlist(playlist.clone());
   playlist
  } else { 
    app_cfg.update_network_playlist(Some(chain_id), None).await?
  };
  app_cfg.workspace.default_chain_id = chain_id;
  app_cfg.save_file()?;
  Ok(np)
}

#[tauri::command(async)]
pub async fn get_networks() -> Result<NetworkPlaylist, CarpeError> {
  let app_cfg = get_cfg()?;
  Ok(app_cfg.get_network_profile(None)?)
}

#[tauri::command(async)]
pub async fn override_playlist(url: Url) -> Result<NetworkPlaylist, CarpeError> {
    let mut app_cfg = get_cfg()?;
    let np = app_cfg.update_network_playlist(None, Some(url)).await?;
    app_cfg.save_file()?;
    Ok(np)
}

#[tauri::command(async)]
/// we want to elimated the entire playlist and use a single fullnode
pub async fn force_upstream(url: Url) -> Result<NetworkPlaylist, CarpeError> {
  let mut app_cfg = get_cfg()?;
  dbg!(&app_cfg);
  let mut dummy_playlist = NetworkPlaylist::default();
  dummy_playlist.chain_id = app_cfg.workspace.default_chain_id;
  dummy_playlist.nodes = vec![HostProfile::new(url)];
  dbg!(&dummy_playlist);

  app_cfg.network_playlist = vec![dummy_playlist.clone()];
  dbg!(&app_cfg);
  app_cfg.save_file()?;
  Ok(dummy_playlist)
}
