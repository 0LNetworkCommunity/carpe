use crate::{
  carpe_error::CarpeError,
  // commands::get_onchain_tower_state,
  // configs::{get_cfg, get_client, get_tx_params},
  configs::{get_cfg, get_client}, key_manager::inject_private_key_to_cfg,
  // types::AppCfg,
};
use std::path::PathBuf;

use libra_tower::core::backlog::process_backlog;
use libra_tower::core::backlog::submit_or_delete;
use libra_types::legacy_types::app_cfg::AppCfg;
use tokio::task::block_in_place;
use crate::commands::query::get_onchain_tower_state;

use tauri::{
  Window,
  Runtime, async_runtime::block_on
};

use libra_tower::core::{
  proof,
  next_proof::{self, NextProof},
  tower_error::TowerError,
};


use libra_types::{
  legacy_types::block::VDFProof,
  type_extensions::client_ext::ClientExt,
};

use log::{warn, error, info};
use serde::{Deserialize, Serialize};

// use tower::{
//   backlog::process_backlog,
//   commit_proof::commit_proof_tx,
//   next_proof::{self, NextProof},
//   proof::{get_latest_proof, mine_once},
//   tower_errors::TowerError,
// };

/// creates one proof and submits
#[tauri::command(async)]
pub async fn miner_once<R: Runtime>(window: Window<R>) -> Result<VDFProof, CarpeError> {
  println!("\nMining one proof\n");
  let mut app_cfg = get_cfg()?;
  let client = get_client()?;

  window
    .emit("proof-start", {})
    .map_err(|_| CarpeError::misc("could not emit window event"))?;
  
  // let client = get_client();
  let next = match next_proof::get_next_proof_from_chain(&mut app_cfg, &client).await {
    Ok(n) => {
      println!("SUCCESS: fetched next proof params from chain");
      n
    }
    // failover to local mode, if no onchain data can be found.
    // TODO: this is important for migrating to the new protocol.
    // in future versions we should remove this since we may be producing bad proofs, and users should explicitly choose to use local mode.
    Err(e) => {
      warn!("cannot connect to network, message: {}", e.to_string());
      // this may be a genesis proof
      match next_proof::get_next_proof_params_from_local(&mut app_cfg) {
        Ok(n) => {
          warn!("WARN: using next proof params from local");
          n
        }
        Err(_) => {
          warn!("WARN: no local proofs found, assuming genesis proof");
          NextProof::genesis_proof(&app_cfg)?
        }
      }
    }
  };

  println!("next proof params: {:?}", next.diff);

  let vdf = proof::mine_once(&app_cfg, next).map_err(|e| {
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

// // When the user turns on the toggle, they will be prompted for OS password.
// // the backlog listener prevents the user from having to re-enter the password everytime
// // a new proof needs to be submitted.
// // The backlog listener then should be started at the time the user toggles the mining.

#[tauri::command(async)]
pub async fn start_backlog_sender_listener<R: Runtime>(window: Window<R>) -> Result<(), CarpeError> {
  println!("\nSTARTING BACKLOG LISTENER\n");
  // prepare listener to receive events
  // TODO: this is gross. Prevent cloning when using in closures
  let window_clone = window.clone();
  // let tx_params = get_tx_params()?;
  // This is tauri's event listener for the tower proof.
  // the front-ent/window will keep calling it when it needs a new proof done.
  let h = window.listen("send-backlog",  move |_e| {
    println!("\nRECEIVED BACKLOG EVENT\n");
    window_clone.emit("ack-backlog-request", {}).unwrap();
    
    match maybe_send_backlog_blocking() {
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
pub async fn submit_backlog<R: Runtime>(_window: Window<R>) -> Result<BacklogSuccess, CarpeError> {
  let mut config = get_cfg()?;
  // let tx_params = get_tx_params()
    // .map_err(|_e| CarpeError::config("could not fetch tx_params while sending backlog."))?;

  Ok(maybe_send_backlog(&mut config).await?)
}

/// function to send backlog
/// Note: needed to use tauri's block_on here because the event listeners
/// use simple closures.
pub async fn maybe_send_backlog(
  app_cfg_mut: &mut AppCfg,
  // tx_params: &TxParams,
) -> Result<BacklogSuccess, CarpeError> {
  // check if this is a genesis block
  let profile = app_cfg_mut.get_profile(None)?;
  let state = get_onchain_tower_state(profile.account.to_hex_literal()).await;

  inject_private_key_to_cfg(app_cfg_mut)?;

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

fn maybe_send_backlog_blocking() -> Result<BacklogSuccess, CarpeError> {
  let mut app_cfg = get_cfg()?;

  block_in_place(|| { block_on(maybe_send_backlog(&mut app_cfg))})
}

pub async fn maybe_send_genesis_proof(config: &AppCfg) -> Result<BacklogSuccess, CarpeError> {
  // check if the tower state has been initialized.
  // otherwise this is a genesis proof.

  // check if any proof_0.json has been mined
  if let Some((proof, path)) = get_proof_zero().ok() {
    match submit_or_delete(config, proof, path).await {
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

// #[tauri::command(async)]
// pub fn submit_proof_zero() -> Result<(), CarpeError> {
//   let tx_params =
//     get_tx_params().map_err(|_e| CarpeError::config("could not get configs from file"))?;
//   let proof = get_proof_zero()?;
//   commit_proof_tx(&tx_params, proof)?;
//   Ok(())
// }

#[tauri::command(async)]
pub fn get_local_height() -> Result<u64, CarpeError> {
  let cfg = get_cfg()?;

  match VDFProof::get_latest_proof(&cfg, true) {
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

// #[tauri::command(async)]
// pub fn get_local_proofs() -> Result<Vec<PathBuf>, CarpeError> {
//   get_local_proofs_this_profile()
//     // TODO: Why is the CarpeError From anyhow not working?
//     .map_err(|e| {
//       CarpeError::misc(&format!(
//         "could not get local files, message: {:?}",
//         e.to_string()
//       ))
//     })
// }

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
pub struct EpochRules { // TODO: rename to VDFDifficulty as in tower_state
  pub difficulty: u64,
  pub security: u64,
}

#[tauri::command(async)]
pub async fn get_epoch_rules() -> Result<EpochRules, CarpeError> {
  let client = get_client()?;

  let res = client.view_ext("0x1::tower_state::get_difficulty", None, None).await?;

  if res.len() != 2 {
    return Err(CarpeError::rpc_fail("could not get the current tower difficulty from chain"))
  }

  let difficulty: u64 = serde_json::from_value(res.clone().into_iter().nth(0).unwrap()).map_err(|_| CarpeError::rpc_fail("could not parse tower_state::get_difficulty"))?;

  let security: u64 = serde_json::from_value(res.into_iter().nth(1).unwrap())
  .map_err(|_| CarpeError::rpc_fail("could not parse tower_state::get_difficulty"))?;


  Ok(EpochRules {
    difficulty,
    security,
  })
}


