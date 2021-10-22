//! 0L configs file

use std::{fs, path::PathBuf, process::exit};

use anyhow::{Error, bail};
use dirs;
use ol::{
  config::AppCfg,
  node::{client, node::Node},
};
use ol_types::config;


// get the config path for files
fn default_config_path() -> PathBuf {
  dirs::home_dir().unwrap().join(".0L").join("0L.toml")
}

/// Get all the 0L configs. For tx sending and upstream nodes
pub fn get_cfg() -> AppCfg {
  let config_toml = default_config_path();
  config::parse_toml(config_toml.to_str().unwrap().to_string()).unwrap()
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
