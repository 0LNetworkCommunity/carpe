


use tauri::Window;
use tower::{proof::mine_once, commit_proof};
use txs::submit_tx::{eval_tx_status};

use crate::{carpe_error::CarpeError, configs::{get_cfg, get_tx_params}};

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
