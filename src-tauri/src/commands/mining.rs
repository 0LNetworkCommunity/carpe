use crate::{
  carpe_error::CarpeError,
  configs::{get_cfg, get_tx_params},
  configs_profile::get_local_proofs_this_profile,
};
use anyhow::Error;
use ol_types::block::VDFProof;
use serde::{Serialize, Deserialize};
use std::{env, path::PathBuf};
use tauri::Manager;
use tauri::Window;
use tower::{
  backlog::process_backlog,
  commit_proof::commit_proof_tx,
  proof::{mine_once, parse_block_height}, tower_errors::TowerError,
};

/// creates one proof and submits
#[tauri::command(async)]
pub fn miner_once(window: Window) -> Result<VDFProof, CarpeError> {
  println!("\nMining one proof\n");
  
  window.emit("proof-start", {})
  .map_err(|_| { CarpeError::misc("could not emit window event") })?;

  let config = get_cfg()?;
  mine_once(&config)
    .map_err(|e| {
      dbg!(&e);
      CarpeError::tower(&format!("could not mine one proof, message: {:?}", &e), TowerError::ProverError.value())
    })

}
#[derive(Clone, serde::Serialize)]
struct BacklogSuccess {
  success: bool,
}


// When the user turns on the toggle, they will be prompted for OS password.
// the backlog listener prevents the user from having to re-enter the password everytime
// a new proof needs to be submitted.
// The backlog listener then should be started at the time the user toggles the mining.

#[tauri::command(async)]
pub async fn start_backlog_sender_listener(window: Window) -> Result<(), CarpeError> {
  println!("starting backlog listener");
  // prepare listener to receive events
  // TODO: this is gross. Prevent cloning when using in closures
  let window_clone = window.clone();
  let config = get_cfg()?;
  let tx_params = get_tx_params().expect("could not load tx params");
  // This is tauri's event listener for the tower proof.
  // the front-ent/window will keep calling it when it needs a new proof done.
  let h = window.listen("send-backlog", move |_e| {
      println!("received backlog event");

      match process_backlog(&config, &tx_params, false) {
        Ok(_) => {
          println!("backlog success");
          window_clone.emit("backlog-success", BacklogSuccess { success: true } ).unwrap()
        },
        Err(e) => {
          
          window_clone
            .emit("backlog-error", CarpeError::from(e))
            .unwrap();
        }
      }
  });

  let window_clone = window.clone();
  window.once("kill-backlog-listener", move |_| {
    println!("received kill listener event");
    window_clone.unlisten(h);
  });

  Ok(())
}


#[tauri::command(async)]
pub async fn submit_backlog(_window: Window) -> Result<(), CarpeError> {
  let config = get_cfg()?;
  let tx_params = get_tx_params()
    .map_err(|_e| CarpeError::config("could not fetch tx_params while sending backlog."))?;

  process_backlog(&config, &tx_params, false)
  .map_err(|e| e.into())
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
  dbg!(&proof);
  // .parse();
  Ok(proof)
}

#[tauri::command]
pub fn debug_submit_proof_zero() -> Result<(), CarpeError> {
  let tx_params = get_tx_params()
    .map_err(|_e| CarpeError::config("could not get configs from file"))?;
  let proof = get_proof_zero()?;
  commit_proof_tx(&tx_params, proof, false)?;
  Ok(())
}


#[tauri::command(async)]
pub fn get_local_height() -> Result<u64, CarpeError> {
  let cfg = get_cfg()?;
  let block_dir = cfg.workspace.node_home.join(cfg.workspace.block_dir);
  match parse_block_height(&block_dir).0 {
      Some(h) => Ok(h),
      None => Err(CarpeError::tower("could not get block height", TowerError::NoLocalBlocks.value())),
  }
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
#[derive(Debug, Clone, Serialize, Deserialize)]
/// the parameter e.g. upper and lower thresholds
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
      security: 0, // TODO: get from chain
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
  let v = env::var("NODE_ENV")
    .unwrap_or("prod".to_owned());
  Ok(v)
}
