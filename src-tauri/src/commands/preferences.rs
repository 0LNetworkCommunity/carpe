use crate::configs::default_config_path;
use crate::migrate;
use crate::{carpe_error::CarpeError, configs::get_cfg};
use libra_types::legacy_types::mode_ol::MODE_0L;
use std::env;
use std::path::PathBuf;
use url::Url;
#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct Preferences {
  pub locale: Option<String>,
}

#[tauri::command]
/// fetch the preferences struct. Note it is only locale for now.
pub fn get_preferences() -> Result<Preferences, CarpeError> {
  let app_cfg = get_cfg()?;
  let profile = app_cfg.get_profile(None)?;
  Ok(Preferences {
    locale: profile.locale,
  })
}

#[tauri::command(async)]
/// set the locale preference
pub fn set_preferences_locale(locale: String) -> Result<(), CarpeError> {
  let mut app_cfg = get_cfg()?;
  let mut profile = app_cfg.get_profile(None)?;

  profile.locale = Some(locale);
  app_cfg.maybe_add_profile(profile)?;
  app_cfg.save_file()?;
  Ok(())
}

#[tauri::command]
/// global config dir for convenience
pub fn debug_preferences_path() -> Result<PathBuf, CarpeError> {
  Ok(default_config_path())
}

#[tauri::command(async)]
/// refreshes statistics and returns the synced peers
pub async fn refresh_upstream_peer_stats() -> Result<Vec<Url>, CarpeError> {
  let mut app_cfg = get_cfg()?;
  app_cfg.refresh_network_profile_and_save(None).await?; // uses app_cfg.chain_info_chain_id
  let np = app_cfg.get_network_profile(None)?;
  app_cfg.save_file()?;
  Ok(np.the_good_ones()?) // uses app_cfg.chain_info_chain_id
}

#[tauri::command(async)]
pub fn get_env() -> Result<String, CarpeError> {
  let env = *MODE_0L;
  Ok(env.to_string())
}

#[tauri::command(async)]
pub fn set_env(env: String) -> Result<String, CarpeError> {
  match env.as_ref() {
    "test" => env::set_var("MODE_0L", "testing"),
    "prod" => env::set_var("MODE_0L", "mainnet"),
    _ => {}
  }

  let v =
    env::var("MODE_0L").map_err(|_| CarpeError::misc("environment variable MODE_0L is not set"))?;
  Ok(v)
}

#[tauri::command(async)]
pub async fn maybe_migrate() -> Result<(), CarpeError> {
  println!("attempting migration");
  Ok(migrate::maybe_migrate_data().await?)
}
