use crate::{
  carpe_error::CarpeError,
  commands::get_onchain_tower_state,
  configs::{get_cfg, get_diem_client, get_tx_params},
  configs_profile::get_local_proofs_this_profile,
};
use anyhow::Error;
use log::{error, warn};
use ol::config::AppCfg;
use ol_types::block::VDFProof;
use serde::{Deserialize, Serialize};
use std::{env, path::PathBuf};
use tauri::Manager;
use tauri::Window;
use tower::{
  backlog::process_backlog,
  commit_proof::commit_proof_tx,
  next_proof::{self, NextProof},
  proof::{get_latest_proof, mine_once},
  tower_errors::TowerError,
};
use txs::tx_params::TxParams;

/// creates one proof and submits
#[tauri::command(async)]
pub fn miner_once(window: Window) -> Result<VDFProof, CarpeError> {
  println!("\nMining one proof\n");

  window
    .emit("proof-start", {})
    .map_err(|_| CarpeError::misc("could not emit window event"))?;

  let mut config = get_cfg()?;
  let client = get_diem_client(&config)?;
  let next = match next_proof::get_next_proof_from_chain(&mut config, client, None) {
    Ok(n) => {
      println!("SUCCESS: fetched next proof params from chain");
      n
    }
    // failover to local mode, if no onchain data can be found.
    // TODO: this is important for migrating to the new protocol.
    // in future versions we should remove this since we may be producing bad proofs, and users should explicitly choose to use local mode.
    Err(e) => {
      dbg!(&e);
      // this may be a genesis proof
      match next_proof::get_next_proof_params_from_local(&mut config) {
        Ok(n) => {
          warn!("WARN: using next proof params from local");
          n
        }
        Err(_) => {
          warn!("WARN: no local proofs found, assuming genesis proof");
          NextProof::genesis_proof(&config)
        }
      }
    }
  };

  println!("next proof params: {:?}", next.diff);

  let vdf = mine_once(&config, next).map_err(|e| {
    CarpeError::tower(
      &format!("could not mine one proof, message: {:?}", &e),
      TowerError::ProverError.value(),
    )
  })?;

  // TODO: Unsure why this is not triggering
  // window.emit("send-backlog", {})
  //   .map_err(|_| { CarpeError::misc("could not emit window event") })?;

  Ok(vdf)
}
#[derive(Clone, serde::Serialize)]
pub struct BacklogSuccess {
  success: bool,
}

// When the user turns on the toggle, they will be prompted for OS password.
// the backlog listener prevents the user from having to re-enter the password everytime
// a new proof needs to be submitted.
// The backlog listener then should be started at the time the user toggles the mining.

#[tauri::command(async)]
pub async fn start_backlog_sender_listener(window: Window) -> Result<(), CarpeError> {
  println!("\nSTARTING BACKLOG LISTENER\n");
  // prepare listener to receive events
  // TODO: this is gross. Prevent cloning when using in closures
  let window_clone = window.clone();
  let config = get_cfg()?;
  let tx_params = get_tx_params()?;
  // This is tauri's event listener for the tower proof.
  // the front-ent/window will keep calling it when it needs a new proof done.
  let h = window.listen("send-backlog", move |_e| {
    println!("\nRECEIVED BACKLOG EVENT\n");
    window_clone.emit("ack-backlog-request", {}).unwrap();

    match maybe_send_backlog(&config, &tx_params) {
      Ok(_) => {
        println!("backlog success");
        window_clone
          .emit("backlog-success", BacklogSuccess { success: true })
          .unwrap()
      }
      Err(e) => {
        error!("backlog error, msg: {:?}", &e);

        window_clone
          .emit("backlog-error", CarpeError::from(e))
          .unwrap();
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
pub async fn submit_backlog(_window: Window) -> Result<BacklogSuccess, CarpeError> {
  let config = get_cfg()?;
  let tx_params = get_tx_params()
    .map_err(|_e| CarpeError::config("could not fetch tx_params while sending backlog."))?;

  maybe_send_backlog(&config, &tx_params).map_err(|e| e.into())
}

pub fn maybe_send_backlog(
  config: &AppCfg,
  tx_params: &TxParams,
) -> Result<BacklogSuccess, CarpeError> {
  // check if this is a genesis block
  if get_onchain_tower_state(tx_params.owner_address.to_owned()).is_err() {
    warn!("cannot get tower state, maybe TowerState not initialized");
    maybe_send_genesis_proof(tx_params)
  } else {
    println!("\nprocessing backlog\n");

    match process_backlog(config, tx_params) {
      Ok(_) => Ok(BacklogSuccess { success: true }),
      Err(e) => Err(CarpeError::from(e)),
    }
  }
}

pub fn maybe_send_genesis_proof(tx_params: &TxParams) -> Result<BacklogSuccess, CarpeError> {
  // check if the tower state has been initialized.
  // otherwise this is a genesis proof.

  // check if any proof_0.json has been mined
  if let Some(proof) = get_proof_zero().ok() {
    match commit_proof_tx(tx_params, proof) {
      Ok(_) => {
        println!("submitted proof zero");
        Ok(BacklogSuccess { success: true })
      }
      Err(e) => {
        dbg!(&e);
        Err(CarpeError::from(e))
      }
    }
  } else {
    error!("No genesis proof found in vdf_proofs dir");
    Ok(BacklogSuccess { success: false })
  }
}

fn get_proof_zero() -> Result<VDFProof, Error> {
  let cfg = get_cfg()?;
  let path = cfg
    .workspace
    .node_home
    .join(cfg.workspace.block_dir)
    .join("proof_0.json");
  let string = std::fs::read_to_string(path)?;
  let proof: VDFProof = serde_json::from_str(&string)?;

  Ok(proof)
}

#[tauri::command(async)]
pub fn submit_proof_zero() -> Result<(), CarpeError> {
  let tx_params =
    get_tx_params().map_err(|_e| CarpeError::config("could not get configs from file"))?;
  let proof = get_proof_zero()?;
  commit_proof_tx(&tx_params, proof)?;
  Ok(())
}

#[tauri::command(async)]
pub fn get_local_height() -> Result<u64, CarpeError> {
  let cfg = get_cfg()?;

  match get_latest_proof(&cfg, true) {
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
  let cfg = get_cfg()?;

  Ok(get_latest_proof(&cfg, true).map_err(|e| {
    CarpeError::misc(&format!(
      "could not get a local proof, message: {:?}",
      e.to_string()
    ))
  })?)
}

#[tauri::command(async)]
pub fn get_local_proofs() -> Result<Vec<PathBuf>, CarpeError> {
  get_local_proofs_this_profile()
    // TODO: Why is the CarpeError From anyhow not working?
    .map_err(|e| {
      CarpeError::misc(&format!(
        "could not get local files, message: {:?}",
        e.to_string()
      ))
    })
}

#[tauri::command(async)]
pub fn debug_highest_proof_path() -> Result<PathBuf, CarpeError> {
  let config = get_cfg()?;
  
  let (_, path) = tower::proof::get_highest_block(&config.get_block_dir())
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
  pub lower: u64,
  pub upper: u64,
  pub difficulty: u64,
  pub security: u64,
}

#[tauri::command(async)]
pub fn get_epoch_rules() -> Result<EpochRules, CarpeError> {
  Ok(EpochRules {
    lower: tower::EPOCH_MINING_THRES_LOWER,
    upper: tower::EPOCH_MINING_THRES_UPPER,
    difficulty: 0, // TODO: get from chain
    security: 0,   // TODO: get from chain
  })
}

#[tauri::command(async)]
pub fn set_env(env: String) -> Result<String, CarpeError> {
  match env.as_ref() {
    "test" => env::set_var("NODE_ENV", "test"),
    "prod" => env::set_var("NODE_ENV", "prod"),
    _ => {}
  }

  let v = env::var("NODE_ENV")
    .map_err(|_| CarpeError::misc("environment variable NODE_ENV is not set"))?;
  Ok(v)
}

#[tauri::command(async)]
pub fn get_env() -> Result<String, CarpeError> {
  let v = env::var("NODE_ENV").unwrap_or("prod".to_owned());
  Ok(v)
}
