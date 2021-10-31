use crate::{
  carpe_error::CarpeError,
  configs::{get_cfg, get_diem_client},
};
use diem_json_rpc_types::views::TowerStateResourceView;
use ol::config::AppCfg;
use ol_types::block::VDFProof;

use tower::{commit_proof, proof::mine_once};
use txs::submit_tx::{eval_tx_status, TxParams};

// #[tauri::command]
// pub async fn start_tower_listener(window: Window) -> Result<(), CarpeError> {
//   println!("starting tower builder, listening for events");
//   // prepare listener to receive events
//   let window_clone = window.clone();
//   let config = get_cfg();
//   let tx_params = get_tx_params(None).unwrap();

//   let _h = window.listen("tower-make-proof", move |e| {
//     println!("received tower-make-proof event");
//     match mine_and_commit_one_proof(&config, &tx_params) {
//       Ok(proof) => {
//         window_clone.emit("tower-event", proof).unwrap();
//       }
//       Err(e) => {
//         window_clone.emit("tower-error", e).unwrap();
//       }
//     }
//     println!("received event {:?}", e);
//   });
//   // let _handle = spawn(wrap_tower(window));
//   Ok(())
// }

/// creates one proof and submits
pub fn mine_and_commit_one_proof(
  config: &AppCfg,
  tx_params: &TxParams,
) -> Result<VDFProof, CarpeError> {
  match mine_once(&config) {
    Ok(b) => match commit_proof::commit_proof_tx(&tx_params, b.clone(), false) {
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
