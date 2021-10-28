use std::path::PathBuf;

use diem_types::waypoint::Waypoint;
use tauri::Window;
use tower::{proof::mine_once, commit_proof};
use ol::config::AppCfg;
use ol_types::config::{self, TxType};
use txs::submit_tx::{eval_tx_status, tx_params};
use url::Url;

use crate::{carpe_error::CarpeError, commands::wallets, configs::{get_cfg, get_tx_params}};

#[tauri::command]
/// mine
pub fn demo_miner_once(mnemonic: String) -> String {
  // let tx_params = get_tx_params_from_swarm(
  //   PathBuf::from(&swarm_dir),
  //   swarm_persona,
  //   false
  // );
  let config_dir = "$HOME/.0L/";

  let config = get_cfg();
  let wl = wallets::danger_get_keys(mnemonic).unwrap();

  let waypoint: Option<Waypoint> = "0:3c6cea7bf248248735cae3e9425c56e09c9a625e912da102f244e2b5820f9622"
    .parse()
    .ok();
  let url_opt: Option<Url> = "http://64.225.2.108/".parse().ok();

  let tx_params = tx_params(
    config.clone(),
    url_opt,
    waypoint,
    None,
    None,
    TxType::Miner,
    false,
    true,
    Some(&wl),
  );

  // TODO(Ping): mine_and_submit(config, tx_params, is_operator)

  match mine_once(&config) {
    Ok(b) => match commit_proof::commit_proof_tx(&tx_params.unwrap(), b, false) {
      Ok(tx_view) => match eval_tx_status(tx_view) {
        Ok(r) => format!("Success: Proof committed to chain \n {:?}", r),
        Err(e) => format!("ERROR: Proof NOT committed to chain, message: \n{:?}", e),
      },
      Err(e) => format!("Miner transaction rejected, message: \n{:?}", e),
    },
    Err(e) => format!("Error mining proof, message: {:?}", e),
  }
}



#[tauri::command]
pub fn demo_mining_loop(window: Window) -> Result<String, CarpeError> {
  let config = get_cfg();
  let tx_params = get_tx_params(None);
  let res = match mine_once(&config) {
    Ok(b) => match commit_proof::commit_proof_tx(&tx_params.unwrap(), b, false) {
      Ok(tx_view) => match eval_tx_status(tx_view) {
        Ok(r) => format!("Success: Proof committed to chain \n {:?}", r),
        Err(e) => format!("ERROR: Proof NOT committed to chain, message: \n{:?}", e),
      },
      Err(e) => format!("Miner transaction rejected, message: \n{:?}", e),
    },
    Err(e) => format!("Error mining proof, message: {:?}", e),
  };

  Ok(res)

}
