use crate::carpe_error::CarpeError;
use crate::configs;
use crate::configs_network::UpstreamStats;
use anyhow::Error;
use std::fs::File;
use std::io::prelude::*;
use std::path::PathBuf;

const PREFERENCES_DB_FILE: &str = "preferences.json";

#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct Preferences {
  pub locale: Option<String>,
  pub network: Option<UpstreamStats>
}

/*
  get preferences
*/
#[tauri::command]
pub fn get_preferences() -> Result<Preferences, CarpeError> {
  let preferences = read_preferences()?;
  Ok(preferences)
}

/*
  set preferences
*/
#[tauri::command(async)]
pub fn set_preferences_locale(locale: String) -> Result<(), CarpeError> {
  let mut preferences = read_preferences()?;
  preferences.locale = Some(locale);
  update_preferences(&preferences)
}

#[tauri::command(async)]
pub fn debug_preferences_path() -> Result<PathBuf, CarpeError> {
  Ok(preferences_db_path().parent().unwrap().to_path_buf())
}

pub fn read_preferences() -> Result<Preferences, Error> {
  let db_path = preferences_db_path();
  match db_path.exists() {
    true => {
      let file = File::open(db_path)?;
      Ok(serde_json::from_reader(file)?)
    }
    false => Ok(Preferences { locale: None, network: None}),
  }
}

fn preferences_db_path() -> PathBuf {
  dirs::home_dir()
    .unwrap()
    .join(configs::HOME_DIR)
    .join(PREFERENCES_DB_FILE)
}

fn update_preferences(preferences: &Preferences) -> Result<(), CarpeError> {
  let db_path = preferences_db_path();
  let serialized = serde_json::to_vec(preferences)
    .map_err(|e| CarpeError::config(&format!("json preferences db should serialize, {:?}", &e)))?;

  File::create(db_path)
    .map_err(|e| {
      CarpeError::config(&format!(
        "carpe preferences_db_file should be created!, {:?}",
        &e
      ))
    })?
    .write_all(&serialized)
    .map_err(|e| {
      CarpeError::config(&format!(
        "carpe preferences_db_file should be written!, {:?}",
        &e
      ))
    })?;
  Ok(())
}


#[tauri::command(async)]
pub async fn refresh_upstream_peer_stats() -> Result<bool, CarpeError> {
  let cfg = configs::get_cfg()?;
  let stats = UpstreamStats::new(cfg.profile.upstream_nodes);

  let mut preferences = read_preferences()?;
  preferences.network = Some(stats.refresh().await?);
  update_preferences(&preferences)?;

  match preferences.network {
    Some(stats) => Ok(stats.the_good_ones()?.len() > 0),
    None => Err(CarpeError::client_unknown_err("no good upstream to use")),
}
}
