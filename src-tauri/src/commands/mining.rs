


use std::{thread, time};

use ol_types::block::VDFProof;
use tauri::Window;
use tower::{backlog::get_remote_state, commit_proof, proof::mine_once};
use txs::submit_tx::{eval_tx_status};
use crate::{carpe_error::CarpeError, configs::{get_cfg, get_tx_params}};
use diem_json_rpc_types::views::{TowerStateResourceView};

#[tauri::command]
pub fn demo_mining_loop(_window: Window) -> Result<String, CarpeError> {
  let config = get_cfg();
  let tx_params = get_tx_params(None);
  match mine_once(&config) {
    Ok(b) => match commit_proof::commit_proof_tx(&tx_params.unwrap(), b, false) {
      Ok(tx_view) => match eval_tx_status(tx_view) {
        Ok(r) => Ok(format!("Success: Proof committed to chain \n {:?}", r)),
        Err(e) => Err(CarpeError::tower(&format!("ERROR: Proof NOT committed to chain, message: \n{:?}", e)))
      },
      Err(e) => Err(CarpeError::tower(&format!("Miner transaction rejected, message: \n{:?}", e)))
    },
    Err(e) => Err(CarpeError::tower(&format!("Error mining proof, message: {:?}", e)))
  }
}


#[tauri::command]
pub fn demo_miner_once(_window: Window) -> Result<String, CarpeError> {
  let config = get_cfg();
  let tx_params = get_tx_params(None);
  match mine_once(&config) {
    Ok(b) => match commit_proof::commit_proof_tx(&tx_params.unwrap(), b, false) {
      Ok(tx_view) => match eval_tx_status(tx_view) {
        Ok(r) => Ok(format!("Success: Proof committed to chain \n {:?}", r)),
        Err(e) => Err(CarpeError::tower(&format!("ERROR: Proof NOT committed to chain, message: \n{:?}", e)))
      },
      Err(e) => Err(CarpeError::tower(&format!("Miner transaction rejected, message: \n{:?}", e)))
    },
    Err(e) => Err(CarpeError::tower(&format!("Error mining proof, message: {:?}", e)))
  }
}



async fn mock_tower() -> Result<VDFProof, CarpeError> {
  let time = time::Duration::from_secs(5);
  thread::sleep(time);
  dbg!("time!");
  let proof = VDFProof {
      height: 1,
      elapsed_secs: 100,
      preimage: "a".as_bytes().to_vec(),
      proof: "b".as_bytes().to_vec(),
      difficulty: Some(2),
      security: Some(3),
  };
  Ok(proof)
}

#[tauri::command]
pub async fn build_tower(mock: bool, window: Window) -> Result<(), CarpeError>{
    loop {
      let future = if mock { mock_tower().await } 
      else { mock_tower().await }; // TODO: need to offload this work onto another thread.

      match future {
          Ok(p) => window.emit("tower-event", p).unwrap(),
          Err(e) => {
            window.emit("tower-event", e.clone()).unwrap();
            return Err(e)
          },
      };
    }
    
    // Ok(threadpool_future)
}

#[tauri::command]
pub fn get_onchain_tower_state() -> Result<TowerStateResourceView, CarpeError> {
  let tx_params = get_tx_params(None)
    .map_err(|_| CarpeError::tower("could not get tx params"))?;

  get_remote_state(&tx_params)
    .map_err(|_| CarpeError::tower("could not get tower state from chain"))

}