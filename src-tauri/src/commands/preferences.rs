use crate::carpe_error::CarpeError;
use crate::configs;
use crate::configs_network::UpstreamStats;
use anyhow::Error;
use libra_types::{
  global_config_dir,
  legacy_types::mode_ol::MODE_0L,
};
use url::Url;
use std::{
  fs::File,
  io::prelude::*,
  path::PathBuf,
  env,
};


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
  global_config_dir().join(PREFERENCES_DB_FILE)
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
pub async fn refresh_upstream_peer_stats() -> Result<Vec<Url>, CarpeError> {
  let cfg = configs::get_cfg()?;
  let stats = UpstreamStats::new(cfg.profile.upstream_nodes);

  let mut preferences = read_preferences()?;
  preferences.network = Some(stats.refresh().await?);
  update_preferences(&preferences)?;

  match preferences.network {
      Some(stats) => Ok(stats.the_good_ones()?),
      None => Err(CarpeError::client_unknown_err("no good upstream to use")),
  }
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
