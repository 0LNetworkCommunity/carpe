use crate::{
  carpe_error::CarpeError,
  configs::{get_cfg, get_diem_client, get_tx_params},
};
use diem_json_rpc_types::views::TowerStateResourceView;
use ol_types::block::VDFProof;
use tauri::{async_runtime::spawn, Window};
use tower::{commit_proof, proof::mine_once};
use txs::submit_tx::eval_tx_status;

#[tauri::command]
pub async fn build_tower(window: Window) -> Result<(), CarpeError> {
  let _handle = spawn(wrap_tower(window));
  Ok(())
}

async fn wrap_tower(window: Window) {
  // Todo: resubmit  backlog.
  match mine_and_commit_one_proof() {
    Ok(proof) => {
      window.emit("tower-event", proof).unwrap();
    }
    Err(e) => {
      window.emit("tower-error", e).unwrap();
    }
  }
}

pub fn mine_and_commit_one_proof() -> Result<VDFProof, CarpeError> {
  let config = get_cfg();
  let tx_params = get_tx_params(None);
  match mine_once(&config) {
    Ok(b) => match commit_proof::commit_proof_tx(&tx_params.unwrap(), b.clone(), false) {
      Ok(tx_view) => match eval_tx_status(tx_view) {
        Ok(_) => Ok(b),
        Err(e) => {
          let msg = format!(
            "ERROR: Tower proof NOT committed to chain, message: \n{:?}",
            e
          );
          println!("{}", &msg);
          Err(CarpeError::tower(&msg))
        }
      },
      Err(e) => {
        let msg = format!("Tower transaction rejected, message: \n{:?}", e);
        println!("{}", &msg);
        Err(CarpeError::tower(&msg))
      }
    },
    Err(e) => {
      let msg = format!("Error mining tower proof, message: {:?}", e);
      println!("{}", &msg);
      Err(CarpeError::tower(&msg))
    }
  }
}

// TODO: Resubmit backlog

#[tauri::command]
pub fn get_onchain_tower_state() -> Result<TowerStateResourceView, CarpeError> {
  println!("fetching onchain tower state");
  let cfg = get_cfg();
  let client = get_diem_client(&cfg)?;

  match client.get_miner_state(&cfg.profile.account) {
    Ok(Some(t)) => {
      dbg!(&t);
      Ok(t)
    }
    _ => Err(CarpeError::tower("could not get tower state from chain")),
  }
}
