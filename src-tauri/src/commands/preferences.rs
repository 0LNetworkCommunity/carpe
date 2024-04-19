use crate::configs::{default_config_path, legacy_config_path};
use crate::migrate::{self, backup_legacy_dir, read_accounts};
use crate::{carpe_error::CarpeError, configs::get_cfg};
use anyhow::Context;
use libra_types::{legacy_types::app_cfg::TxCost, legacy_types::mode_ol::MODE_0L};
use log::{error, info, warn};
use std::env;
use std::path::PathBuf;
use url::Url;
#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct Preferences {
  pub locale: Option<String>,
}

#[tauri::command(async)]
/// set the locale preference
pub fn set_preferences_locale(locale: String) -> Result<(), CarpeError> {
  let mut app_cfg = get_cfg()?;
  let profile = app_cfg.get_profile_mut(None)?;

  profile.locale = Some(locale);
  app_cfg.save_file()?;
  Ok(())
}

#[tauri::command(async)]
// get the miner_txs_cost
pub fn get_miner_txs_cost() -> Result<TxCost, CarpeError> {
  let app_cfg = get_cfg()?;
  let miner_txs_cost = app_cfg.tx_configs.miner_txs_cost.unwrap();
  Ok(miner_txs_cost)
}

#[tauri::command(async)]
/// set the miner_txs_cost
pub fn set_miner_txs_cost(max_gas_unit_for_tx: u64) -> Result<(), CarpeError> {
  let mut app_cfg = get_cfg()?;
  app_cfg.tx_configs.miner_txs_cost = Some(TxCost {
    max_gas_unit_for_tx,
    coin_price_per_unit: 100,
    user_tx_timeout: 5000,
  });
  app_cfg.tx_configs.baseline_cost = TxCost {
    max_gas_unit_for_tx,
    coin_price_per_unit: 100,
    user_tx_timeout: 5000,
  };
  app_cfg.save_file()?;
  Ok(())
}
#[tauri::command]
/// global config dir for convenience
pub fn debug_preferences_path() -> Result<PathBuf, CarpeError> {
  Ok(default_config_path().to_path_buf())
}

#[tauri::command(async)]
/// refreshes statistics and returns the synced peers
pub async fn refresh_upstream_peer_stats() -> Result<Vec<Url>, CarpeError> {
  let mut app_cfg = get_cfg()?;

  let np = app_cfg.refresh_network_profile_and_save(None).await?; // uses app_cfg.chain_info_chain_id
  app_cfg.network_playlist = vec![np.clone()];
  app_cfg.save_file()?;

  let peers = match np.the_good_ones() {
    Ok(r) => r,
    _ => {
      let first_url = np
        .nodes
        .first()
        .context("no hosts in network playlist")?
        .url
        .to_owned();

      vec![first_url]
    }
  };
  Ok(peers) // uses app_cfg.chain_info_chain_id
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
pub async fn maybe_migrate() -> Result<bool, CarpeError> {
  warn!("attempting migration");
  match migrate::maybe_migrate_data().await {
    Ok(_) => {
      info!("migration success");
      Ok(true)
    }
    Err(e) => {
      error!("migration error {:?}", e);
      Err(CarpeError::from(e))
    }
  }
}

#[tauri::command(async)]
pub async fn ignore_migrate() -> Result<bool, CarpeError> {
  warn!("ignoring migration");
  Ok(backup_legacy_dir().is_ok())
}

#[tauri::command]
/// looks for $HOME/.0L/
///  if a migration happened this will not be found since it will be renamed to .0L_bak
pub async fn has_legacy_configs() -> bool {
  if let Ok(acc) = read_accounts(&legacy_config_path()) {
    info!(
      "legacy configs found at: {}",
      legacy_config_path().display()
    );
    info!("accounts: {:?}", acc);
    return true;
  }
  false
}
