use crate::{carpe_error::CarpeError, configs::get_cfg};
use libra_types::{
  legacy_types::mode_ol::MODE_0L,
};

use std::env;

use libra_types::legacy_types::network_playlist::NetworkPlaylist;

#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct Preferences {
  pub locale: Option<String>,
  // pub network: Option<UpstreamStats>
}

/*
  get preferences
*/
#[tauri::command]
pub fn get_preferences() -> Result<Preferences, CarpeError> {
  let app_cfg = get_cfg()?;
  Ok(Preferences { locale: app_cfg.profile.locale })
}

/*
  set preferences
*/
#[tauri::command(async)]
pub fn set_preferences_locale(locale: String) -> Result<(), CarpeError> {
  let mut app_cfg = get_cfg()?;
  app_cfg.profile.locale = Some(locale);
  Ok(())
}



// pub fn read_preferences() -> Result<Preferences, Error> {
//   let app_cfg = get_cfg()?;
//   match app_cfg.profile.locale {
//     Some(s) => Ok(Preferences { locale: s }),
//     _ => Ok(Preferences { locale: None }),
//   }
// }

// fn preferences_db_path() -> PathBuf {
//   global_config_dir().join(PREFERENCES_DB_FILE)
// }

// fn update_preferences(preferences: &Preferences) -> Result<(), CarpeError> {
//   let mut app_cfg = get_cfg()?;
//   app_cfg.profile.locale = preferences.locale;
//   Ok(())
// }


#[tauri::command(async)]
/// refreshes statistics and returns all the network playlist
pub async fn refresh_upstream_peer_stats() -> Result<NetworkPlaylist, CarpeError> {
  let mut app_cfg = get_cfg()?;
  app_cfg.refresh_network_profile_and_save(None).await?; // uses app_cfg.chain_info_chain_id
  Ok(app_cfg.get_network_profile(None)?) // uses app_cfg.chain_info_chain_id
}


#[tauri::command(async)]
pub fn get_env() -> Result<String, CarpeError> {
  let env = MODE_0L.clone();
  Ok(env.to_string())
}


#[tauri::command(async)]
pub fn set_env(env: String) -> Result<String, CarpeError> {
  match env.as_ref() {
    "test" => env::set_var("MODE_0L", "testing"),
    "prod" => env::set_var("MODE_0L", "mainnet"),
    _ => {}
  }

  let v = env::var("MODE_0L")
    .map_err(|_| CarpeError::misc("environment variable MODE_0L is not set"))?;
  Ok(v)
}
