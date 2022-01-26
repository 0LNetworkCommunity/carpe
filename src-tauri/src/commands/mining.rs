use crate::{
  carpe_error::CarpeError,
  commands::get_onchain_tower_state,
  configs::{get_cfg, get_tx_params},
  configs_profile::get_local_proofs_this_profile,
};
use anyhow::Error;
// use ol::config::AppCfg;
use ol_types::block::VDFProof;
use std::{env, path::PathBuf};
use tauri::Manager;
use tauri::Window;
// use tokio::task;
use tower::{
  backlog::{process_backlog, MAX_PROOFS_PER_EPOCH},
  commit_proof::commit_proof_tx,
  proof::mine_once, tower_errors::TowerError,
};
// use crate::configs::{get_cfg, get_tx_params};

/// creates one proof and submits
#[tauri::command(async)]
pub fn miner_loop(
  window: Window,
  // config: &AppCfg,
  // tx_params: &TxParams,
) -> Result<VDFProof, CarpeError> {
  println!("Mining one proof");
  let config = get_cfg()?;
  let tx_params = get_tx_params()
    .map_err(|_e| CarpeError::config("could not fetch tx_params while sending backlog."))?;
  dbg!(&tx_params);
  let proof = mine_once(&config)
    .map_err(|e| {
      dbg!(&e);
      CarpeError::tower(&format!("could not mine one proof, message: {:?}", &e), TowerError::ProverError.value())
    })?;
  // tell the client it was successful thus far.
  window.emit("tower-event", &proof).unwrap();
  
  dbg!(&proof);

  let ts = get_onchain_tower_state()?;
  if !(ts.actual_count_proofs_in_epoch < MAX_PROOFS_PER_EPOCH) {
    println!("maximum proofs submitted in epoch, will continue mining but will not send proofs.");


    // tell the client we wont be submitting the proof now
    // window
    //   .emit("tower-error", &CarpeError::tower_at_epoch_limit())
    //   .unwrap();

    return Err(CarpeError::tower_at_epoch_limit())

    // TODO: need to surface this information on client side.
  }

  // Always submit the backlog in case a proof was missed.
  // TODO: Change the order, and have this run before making a proof?
  // match process_backlog(&config, &tx_params, false) {
  //   Ok(_) => {
  //     dbg!("process_backlog");
  //     window.emit("backlog-success", &proof).unwrap()
  //   },
  //   Err(e) => {
      

  //     window
  //       .emit("backlog-error", &CarpeError::tower_at_epoch_limit())
  //       .unwrap();
      
  //     return Err(CarpeError::tower(&format!("could not complete sending of backlog, message: {:?}",&e)));
  //   }
  // }

  Ok(proof)
}

/// A new listener needs to be started whenever the user changes profiles i.e. using a different signing account.
/// This is because the private key gets loaded in member when then listener is initialized.

//TODO: there's a risk of multiple tower listeners being initialized. This is handled on the JS window side, but we likely need more guarantees on the rust side. Unsure how to do this without implementing a proper queue.
// #[tauri::command]
// pub async fn start_tower_listener(window: Window) -> Result<(), CarpeError> {
//   println!("starting tower builder, listening for tower-make-proof");
//   // prepare listener to receive events
//   // TODO: this is gross. Prevent cloning when using in closures
//   let window_clone = window.clone();
//   let new_clone = window_clone.clone();
//   let config = get_cfg()?;

//   // This is tauri's event listener for the tower proof.
//   // the front-ent/window will keep calling it when it needs a new proof done.
//   let h = window.listen("tower-make-proof", move |e| {
//     println!("received tower-make-proof event");
//     println!("received event {:?}", e);

//     let third_clone = window_clone.clone();
//     let config_clone = config.clone();

//     // The VDF by definition will block the thread. The work needs to be sent to a thread that can be blocked.
//     let _ = task::spawn_blocking(move || {
//       // TODO: how to cehck for this before it get here?

//       // always start tower processing backlog
//       // let _ = backlog(
//       //   &config_clone.clone(),
//       //   &get_tx_params().expect("could not load tx params, this should have been checked before")
//       // );

//       // tx params cannot be cloned.
//       let tx_params =
//         get_tx_params().expect("could not load tx params, this should have been checked before");
//       // some blocking work here
//       match mine_and_commit_one_proof(&config_clone, &tx_params) {
//         Ok(proof) => {
//           third_clone.emit("tower-event", proof).unwrap();
//         }
//         Err(e) => {
//           third_clone.emit("tower-error", e).unwrap();
//         }
//       }
//     });
//   });

//   window.once("kill-listener", move |_| {
//     println!("received kill listener event");
//     new_clone.unlisten(h);
//   });

//   Ok(())
// }

#[derive(Clone, serde::Serialize)]
struct BacklogSuccess {
  success: bool,
}



#[tauri::command]
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
      match process_backlog(&config, &tx_params, false) {
        Ok(_) => {
          dbg!("process_backlog");
          window_clone.emit("backlog-success", BacklogSuccess { success: true } ).unwrap()
        },
        Err(e) => {
          

          window_clone
            .emit("backlog-error", tower::tower_errors::parse_error(e))
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

// /// flush a backlog of proofs at once to the chain.
// pub fn backlog(
//   config: &AppCfg,
//   tx_params: &TxParams,
// ) -> Result<(), CarpeError> {
//   // TODO: This does not return an error on transaction failure. Change in upstream.
//   process_backlog(config, tx_params, false)
//     .map_err(|e| {
//       CarpeError::tower(&format!("could not complete sending of backlog, message: {:?}", &e))
//     })?;
//   Ok(())
// }

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

// #[test]
// fn test_proof_zero() {
//   dbg!(&get_proof_zero());
// }

/// creates one proof and submits
// pub fn mine_and_commit_one_proof(
//   config: &AppCfg,
//   tx_params: &TxParams,
// ) -> Result<VDFProof, CarpeError> {
//   println!("Mining one proof");

//   match mine_once(&config) {
//     Ok(b) => {
//       let ts = get_onchain_tower_state()?;
//       if !(ts.actual_count_proofs_in_epoch < MAX_PROOFS_PER_EPOCH) {
//         println!("maximum proofs submitted in epoch, will continue mining but not send proofs.");
//         // TODO: need to surface this information on client side.
//         return Ok(b);
//       }
//       match commit_proof::commit_proof_tx(&tx_params, b.clone(), false) {
//         Ok(tx_view) => match eval_tx_status(tx_view) {
//           Ok(_) => Ok(b),
//           Err(e) => {
//             let msg = format!(
//               "ERROR: Tower proof NOT committed to chain, message: \n{:?}",
//               e
//             );
//             println!("{}", &msg);
//             Err(CarpeError::tower(&msg))
//           }
//         },
//         Err(e) => {
//           let msg = format!("Tower transaction rejected, message: \n{:?}", e);
//           println!("{}", &msg);
//           Err(CarpeError::tower(&msg))
//         }
//       }
//     }
//     Err(e) => {
//       let msg = format!("Error mining tower proof, message: {:?}", e);
//       println!("{}", &msg);
//       Err(CarpeError::tower(&msg))
//     }
//   }
// }




#[tauri::command]
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

#[tauri::command]
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

#[tauri::command]
pub fn get_env() -> Result<String, CarpeError> {
  let v = env::var("NODE_ENV")
    .map_err(|_| CarpeError::misc("environment variable NODE_ENV is not set"))?;
  Ok(v)
}
