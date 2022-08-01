//! 0L configs file

use std::path::PathBuf;

use anyhow::Error;
use cli::diem_client::DiemClient;
use diem_types::chain_id::NamedChain;
use dirs;
use ol::{
  config::AppCfg,
  node::{client::find_a_remote_jsonrpc, node::Node},
};

use ol_types::config::{self, TxType};
use txs::tx_params::TxParams;

use crate::{carpe_error::CarpeError, key_manager};

static APP_CONFIG_FILE: &str = "0L.toml";

static ACCOUNTS_DB_FILE: &str = "accounts.json";
static ACCOUNTS_DB_FILE_REX_TESTNET: &str = "accounts-rex-testnet.json";
static ACCOUNTS_DB_FILE_SWARM_DEVNET: &str = "accounts-swarm-devnet.json";

// get the config path for files
pub fn default_config_path() -> PathBuf {
  dirs::home_dir().unwrap().join(".0L").join(APP_CONFIG_FILE)
}

/// Get all the 0L configs. For tx sending and upstream nodes
pub fn get_cfg() -> Result<AppCfg, Error> {
  config::parse_toml(None) // gets default toml path.
}

pub fn default_accounts_db_path() -> PathBuf {
  let db_file = match get_cfg() {
    Ok(cfg) => match cfg.chain_info.chain_id {
      NamedChain::TESTNET => ACCOUNTS_DB_FILE_REX_TESTNET,
      NamedChain::DEVNET => ACCOUNTS_DB_FILE_SWARM_DEVNET,
      _ => ACCOUNTS_DB_FILE,
    },
    Err(_) => ACCOUNTS_DB_FILE,
  };
  dirs::home_dir().unwrap().join(".0L").join(db_file)
}

/// get transaction parameters from config file
pub fn get_tx_params() -> Result<TxParams, anyhow::Error> {
  // TODO: Should the Error type be a CarpeError?
  let config = get_cfg()?;

  // Requires user input to get OS keyring
  let keypair = key_manager::get_keypair(&config.profile.account.to_string())?;

  TxParams::get_tx_params_from_keypair(config.clone(), TxType::Miner, keypair, None, false, false)
}

pub fn get_node_obj() -> Result<Node, CarpeError> {
  let cfg = get_cfg()?;
  let client = get_diem_client(&cfg)?;

  Ok(Node::new(client, &cfg, false))
}

pub fn get_diem_client(cfg: &AppCfg) -> Result<DiemClient, CarpeError> {
  find_a_remote_jsonrpc(
    cfg,
    cfg
      .clone()
      .chain_info
      .base_waypoint
      .ok_or(CarpeError::config("could not load base_waypoint"))?,
  )
  .map_err(|_| CarpeError::client("could not make a client"))
}

/// For devs, get the source path, needed to initialize swarm
pub fn dev_get_source_path() -> Result<Option<PathBuf>, Error> {
  let c = get_cfg()?;
  Ok(c.workspace.source_path)
}

/// Where the swarm_temp folder is created, defaults to .0L/swarm_temp
pub fn dev_get_swarm_temp() -> Result<PathBuf, Error> {
  Ok(get_cfg()?.workspace.node_home.join("swarm_temp"))
}

pub fn is_initialized() -> bool {
  default_config_path().exists()
}
