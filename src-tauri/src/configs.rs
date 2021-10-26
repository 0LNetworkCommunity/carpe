//! 0L configs file

use std::{fs, path::PathBuf};

use anyhow::{Error, bail};
use diem_types::waypoint::Waypoint;
use dirs;
use ol::{
  config::AppCfg,
  node::{client, node::Node},
};
use ol_types::config::{self, bootstrap_waypoint_from_upstream};
use url::Url;

static ACCOUNTS_DB_FILE: &str = "accounts.json";
static APP_CONFIG_FILE: &str = "0L.toml";

// get the config path for files
pub fn default_config_path() -> PathBuf {
  dirs::home_dir().unwrap().join(".0L").join(APP_CONFIG_FILE)
}

pub fn default_accounts_db_path() -> PathBuf {
  dirs::home_dir().unwrap().join(".0L").join(ACCOUNTS_DB_FILE)
}

/// Get all the 0L configs. For tx sending and upstream nodes
pub fn get_cfg() -> AppCfg {
  let config_toml = default_config_path();
  config::parse_toml(config_toml.to_str().unwrap().to_string()).unwrap()
}

/// Get all the 0L configs. For tx sending and upstream nodes
pub fn set_default_node(url: Url) -> Result<AppCfg, Error> {
  let mut cfg = get_cfg();
  cfg.profile.default_node = Some(url);
  cfg.save_file();
  Ok(cfg)
}

/// Get all the 0L configs. For tx sending and upstream nodes
pub fn set_waypoint(wp: Waypoint) -> Result<AppCfg, Error>  {
  let mut cfg = get_cfg();
  cfg.chain_info.base_waypoint = Some(wp);
  cfg.save_file();
  Ok(cfg)
}

/// Refresh the upstream peers in config, from chain data.
pub fn set_refresh_upstream(wp: Waypoint) -> Result<AppCfg, Error>  {
  let mut cfg = get_cfg();
  cfg.chain_info.base_waypoint = Some(wp);
  cfg.save_file();
  Ok(cfg)
}

/// Refresh the upstream peers in config, from chain data.
pub fn set_waypoint_from_upstream() -> Result<AppCfg, Error>  {
  let cfg = get_cfg();
  if let Some(mut json_rpc_node) = cfg.profile.default_node.clone() {
    let (_, wp) = bootstrap_waypoint_from_upstream(&mut json_rpc_node)?;
    set_waypoint(wp)
  } else {
    bail!("could not find default_node in 0L.toml")
  }

}

/// For devs, get the source path, needed to initialize swarm
pub fn dev_get_source_path() -> Option<PathBuf> {
  let c = get_cfg();
  c.workspace.source_path
}

/// Where the swarm_temp folder is created, defaults to .0L/swarm_temp
pub fn dev_get_swarm_temp() -> PathBuf {
  get_cfg().workspace.node_home.join("swarm_temp")
}


pub fn is_initialized() -> bool {
  default_config_path().exists()
}

/// initialize default configs.
pub fn maybe_init_configs() {
  if !is_initialized() {
    let mut default_config = AppCfg::default();
    default_config.workspace.node_home = default_config_path();
    fs::create_dir_all(&default_config.workspace.node_home).unwrap();
    default_config.save_file();
  }
}

/// fetch upstream peers.
pub fn refresh_upstream_peers() -> Result<(), Error> {
  let mut cfg = get_cfg();
  let client = match client::pick_client(None, &mut cfg) {
    Ok(c) => c,
    Err(e) => {
      println!(
        "ERROR: Could not create a client to connect to network, exiting. Message: {:?}",
        e
      );
      bail!("cannot connect to a client");
      // exit(1);
    }
  };

  let mut node = Node::new(client, &cfg, false);

  let path = default_config_path();
  node.refresh_peers_update_toml(path)
}
