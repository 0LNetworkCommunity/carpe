use std::path::{Path, PathBuf};
use std::process::Command;
use anyhow::Error;
use ol::config::AppCfg;
use ol_types::config;
use sysinfo::{SystemExt, ProcessExt};

use ol::commands::init_cmd::initialize_host_swarm;
use tower::block::mine_once;
use tower::commit_proof;
use txs::submit_tx;

use crate::configs::get_cfg;

#[tauri::command]
pub async fn easy_swarm(_path: PathBuf) -> Result<String, String>  {

  let cfg = get_cfg();
  let source_path = cfg.workspace.source_path.expect("cant find source path in 0L.toml, to use swarm define it in workspace.source_path");
  let debug_build_diem_node = cfg.workspace.node_home.join("target/debug/diem-node");
  let swarm_temp_path = cfg.workspace.node_home.join("swarm_temp");
  match Command::new("cargo")
    .current_dir(source_path)
    .args(&["run", "-p", "diem-swarm", "--", "--diem-node", debug_build_diem_node.to_str().unwrap(), "-c", swarm_temp_path.to_str().unwrap()])
    .output() {
        Ok(o) => Ok(o.status.success().to_string()),
        Err(e) => Err(e.to_string())
    }
}


/// Wizard init handler
#[tauri::command]
pub fn init_swarm(swarm_path: String, swarm_persona: String, source_path: String) -> Result<String, String>  {
  println!("initializing Alice persona in swarm_path");
  let swarm_path = PathBuf::from(&swarm_path);
  let persona_dir = swarm_path.join("0"); // TODO: alice has directory swarm_path/0, bob 1, carol 2... hard-coding this for demo.
  let source_path = PathBuf::from(&source_path); // TODO: this is not necessary for swarm, but lib requires it.
  match initialize_host_swarm(swarm_path, persona_dir, Some(swarm_persona), &Some(source_path)) {
    Ok(_) => Ok("initialized alice configs on host".to_string()),
    Err(e) => Err(format!("could not initialize alice configs, message: {:?}", e.to_string()))
  }
}

/// Wizard init handler
#[tauri::command]
pub fn swarm_process() -> bool {
  check_process("diem-swarm")
}

fn check_process(process_str: &str) -> bool {
    // get processes from sysinfo
    let mut system = sysinfo::System::new_all();
    system.refresh_all();
    for (_, process) in system.get_processes() {
        if process.name() == process_str {
            // TODO: doesn't always catch `miner` running, see get by name below.
            return true;
        }
    }
    // also try by name (yield different results), most reliable.
    let p = system.get_process_by_name(process_str);
    !p.is_empty()
}

/// Wizard init handler
#[tauri::command]
pub fn swarm_files(swarm_dir: String) -> String {
  let swarm_path = Path::new(&swarm_dir);


  format!(
    "{path}: {path_exists}\n
    /0/0L.toml: {toml_exists},\n
    /0/blocks/block_0.json: {block_exists}", 
    path = swarm_dir,
    path_exists = swarm_path.exists().to_string(),
    toml_exists = swarm_path.join("0/0L.toml").exists().to_string(),
    block_exists = swarm_path.join("0/blocks/block_0.json").exists().to_string()
  )

  // TODO: make this JSON not string
  // struct Output {
  //   path_exists: String,
  //   toml_exists: String
  //   block_exists: String,
  // }
  // let output = Output {
  //   path_exists: mnemonic_string,
  //   toml_exists,
  //   block_exists,
  // };
  // return match serde_json::to_string(&output) {
  //   Ok(t) => Ok(t),
  //   Err(e) => Err(e.to_string()),
  // };

}

// Get configs from swarm
pub fn swarm_params(swarm_path: String) -> Result<submit_tx::TxParams, Error> {
  let txp = submit_tx::get_tx_params_from_swarm(
    PathBuf::from(swarm_path),
    "alice".to_string(),
    false, 
  ).unwrap();
  Ok(txp)
}


// fn get_swarm_cfg(config_dir: String) -> AppCfg {
//   let toml = Path::new(&config_dir).join("0/0L.toml");
//   config::parse_toml(toml.to_str().unwrap().to_string()).unwrap()
// }

fn get_swarm_cfg(config_dir: &str, is_swarm: bool) -> AppCfg {
  let mut toml = PathBuf::from(config_dir);
  if is_swarm { toml.push("0/") };
  toml.push("0L.toml");
  config::parse_toml(toml.to_str().unwrap().to_string()).unwrap()
}

#[tauri::command]
/// mine for swarm
pub fn swarm_miner(swarm_dir: String, swarm_persona: String) -> String {

  let tx_params = submit_tx::get_tx_params_from_swarm(
    PathBuf::from(&swarm_dir),
    swarm_persona, 
    false
  );

  let appcfg = get_swarm_cfg(&swarm_dir, true);
  
  // TODO(Ping): mine_and_submit(config, tx_params, is_operator)
  
  match mine_once(&appcfg) {
    Ok(b) => {
      match commit_proof::commit_proof_tx(&tx_params.unwrap(), b, false) {
          Ok(tx_view) => match submit_tx::eval_tx_status(tx_view) {
              Ok(r) => format!("Success: Proof committed to chain \n {:?}", r),
              Err(e) => format!("ERROR: Proof NOT committed to chain, message: \n{:?}", e),
          },
          Err(e) => format!("Miner transaction rejected, message: \n{:?}", e),
      }
    },
    Err(e) => format!("Error mining proof, message: {:?}", e),
  }
}