use crate::{
  carpe_error::CarpeError,
  configs::{get_cfg, get_client},
  key_manager::inject_private_key_to_cfg,
};
use std::path::PathBuf;
use std::sync::{Arc, Mutex};

use crate::commands::query::get_onchain_tower_state;
use libra_tower::core::backlog::process_backlog;
use libra_tower::core::backlog::submit_or_delete;
use libra_types::legacy_types::app_cfg::AppCfg;
use tokio::task::block_in_place;

use tauri::{async_runtime::block_on, Runtime, Window};

use libra_tower::core::{proof, tower_error::TowerError};

use libra_types::legacy_types::block::VDFProof;

use log::{error, info, warn};
use serde::{Deserialize, Serialize};

/// creates one proof and submits
#[tauri::command(async)]
pub async fn miner_once<R: Runtime>(window: Window<R>) -> Result<VDFProof, CarpeError> {
  info!("\nmining one proof");
  let app_cfg = get_cfg()?;
  let client = get_client()?;

  window
    .emit("proof-start", ())
    .map_err(|_| CarpeError::misc("could not emit window event"))?;

  // let client = get_client();
  let next = match proof::get_next_proof(&app_cfg, &client, false).await {
    Ok(p) => p,
    Err(_) => {
      return proof::write_genesis(&app_cfg).map_err(|e| {
        CarpeError::tower(
          &format!("could not mine one proof, message: {:?}", &e),
          TowerError::ProverError.value(),
        )
      });
    }
  };

  info!("next proof params: {:?}", next);

  let path = app_cfg.get_block_dir(None)?;
  let vdf = proof::mine_once(&path, &next).map_err(|e| {
    CarpeError::tower(
      &format!("could not mine one proof, message: {:?}", &e),
      TowerError::ProverError.value(),
    )
  })?;

  Ok(vdf)
}
#[derive(Clone, serde::Serialize)]
pub struct BacklogSuccess {
  success: bool,
}

// // When the user turns on the toggle, they will be prompted for OS password.
// // the backlog listener prevents the user from having to re-enter the
// password every time
// // a new proof needs to be submitted.
// // The backlog listener then should be started at the time the user toggles the mining.

#[tauri::command(async)]
pub async fn start_backlog_sender_listener<R: Runtime>(
  window: Window<R>,
) -> Result<(), CarpeError> {
  info!("\nSTARTING BACKLOG LISTENER");

  let mut app_cfg = get_cfg()?;
  inject_private_key_to_cfg(&mut app_cfg)?;
  let cfg_mutex = Arc::new(Mutex::new(app_cfg));

  // prepare listener to receive events
  // TODO: this is gross. Prevent cloning when using in closures
  let window_clone = window.clone();

  // This is tauri's event listener for the tower proof.
  // the front-ent/window will keep calling it when it needs a new proof done.
  let h = window.listen("send-backlog", move |_e| {
    info!("received backlog event");
    window_clone.emit("ack-backlog-request", ()).unwrap();

    match maybe_send_backlog_blocking(&mut cfg_mutex.lock().unwrap()) {
      Ok(_) => {
        info!("backlog success");
        window_clone
          .emit("backlog-success", BacklogSuccess { success: true })
          .unwrap()
      }
      Err(e) => {
        error!("backlog error, msg: {:?}", &e);

        window_clone.emit("backlog-error", e).unwrap();
      }
    }
  });

  let window_clone = window.clone();
  window.once("kill-backlog-listener", move |_| {
    warn!("received kill listener event");
    window_clone.unlisten(h);
  });

  Ok(())
}

#[tauri::command(async)]
pub async fn submit_backlog<R: Runtime>(_window: Window<R>) -> Result<BacklogSuccess, CarpeError> {
  let mut config = get_cfg()?;
  inject_private_key_to_cfg(&mut config)?;
  maybe_send_backlog(&mut config).await
}

/// function to send backlog
/// Note: needed to use tauri's block_on here because the event listeners
/// use simple closures.
pub async fn maybe_send_backlog(app_cfg_mut: &mut AppCfg) -> Result<BacklogSuccess, CarpeError> {
  let profile = app_cfg_mut.get_profile(None)?;
  let state = get_onchain_tower_state(profile.account.to_hex_literal()).await;

  if state.is_err() {
    warn!("cannot get tower state, maybe TowerState not initialized");
    maybe_send_genesis_proof(app_cfg_mut).await
  } else {
    info!("processing backlog ...\n");
    match process_backlog(app_cfg_mut).await {
      Ok(_) => Ok(BacklogSuccess { success: true }),
      Err(e) => Err(CarpeError::from(e)),
    }
  }
}

fn maybe_send_backlog_blocking(app_cfg: &mut AppCfg) -> Result<BacklogSuccess, CarpeError> {
  block_in_place(|| block_on(maybe_send_backlog(app_cfg)))
}

pub async fn maybe_send_genesis_proof(config: &AppCfg) -> Result<BacklogSuccess, CarpeError> {
  // check if the tower state has been initialized.
  // otherwise this is a genesis proof.

  // check if any proof_0.json has been mined
  if let Ok((proof, path)) = get_proof_zero() {
    match submit_or_delete(config, proof, path).await {
      Ok(_) => {
        println!("submitted proof zero");
        Ok(BacklogSuccess { success: true })
      }
      Err(e) => Err(CarpeError::from(e)),
    }
  } else {
    error!("No genesis proof found in vdf_proofs dir");
    Ok(BacklogSuccess { success: false })
  }
}

fn get_proof_zero() -> anyhow::Result<(VDFProof, PathBuf)> {
  let cfg = get_cfg()?;
  let path = cfg
    .workspace
    .node_home
    .join(cfg.get_block_dir(None)?)
    .join("proof_0.json");
  let string = std::fs::read_to_string(&path)?;
  let proof: VDFProof = serde_json::from_str(&string)?;

  Ok((proof, path))
}

#[tauri::command(async)]
pub fn get_local_height() -> Result<u64, CarpeError> {
  match get_last_local_proof() {
    Ok(proof) => Ok(proof.height),
    Err(_) => Err(CarpeError::tower(
      "could not get block height",
      TowerError::NoLocalBlocks.value(),
    )),
  }
}

#[tauri::command(async)]
/// helper to get the latest local proof
pub fn get_last_local_proof() -> Result<VDFProof, CarpeError> {
  let app_cfg = get_cfg()?;
  Ok(VDFProof::get_latest_proof(&app_cfg, true)?)
}

#[tauri::command(async)]
pub fn debug_highest_proof_path() -> Result<PathBuf, CarpeError> {
  let config = get_cfg()?;

  let (_, path) = VDFProof::get_highest_block(&config.get_block_dir(None)?)
    // TODO: Why is the CarpeError From anyhow not working?
    .map_err(|e| {
      CarpeError::misc(&format!(
        "could not get local files, message: {:?}",
        e.to_string()
      ))
    })?;
  Ok(path)
}

#[derive(Debug, Clone, Serialize, Deserialize)]
/// the parameter e.g. upper and lower thresholds
// TODO: This is deprecated.
pub struct EpochRules {
  // TODO: rename to VDFDifficulty as in tower_state
  pub difficulty: u64,
  pub security: u64,
}

#[tauri::command(async)]
pub async fn get_epoch_rules() -> Result<EpochRules, CarpeError> {
  let client = get_client()?;
  let (difficulty, security) = libra_query::chain_queries::get_tower_difficulty(&client).await?;

  Ok(EpochRules {
    difficulty,
    security,
  })
}
