//! 0L configs file

use std::{path::PathBuf};

use anyhow::{Error};
use cli::diem_client::DiemClient;
use dirs;
use ol::{
  config::AppCfg,
  node::{node::Node},
};

use ol_types::config::{self, TxType};
use txs::submit_tx::{TxParams, get_tx_params_from_keypair};
use url::Url;

use crate::{carpe_error::CarpeError, key_manager};

static APP_CONFIG_FILE: &str = "0L.toml";

static ACCOUNTS_DB_FILE: &str = "accounts.json";
static ACCOUNTS_DB_FILE_REX: &str = "accounts-rex.json";

// get the config path for files
pub fn default_config_path() -> PathBuf {
  dirs::home_dir().unwrap().join(".0L").join(APP_CONFIG_FILE)
}

/// Get all the 0L configs. For tx sending and upstream nodes
pub fn get_cfg() -> Result<AppCfg, Error> {
  let config_toml = default_config_path();
  dbg!(&config_toml);
  Ok(config::parse_toml(config_toml.to_str().unwrap().to_string())?)
}

pub fn default_accounts_db_path() -> PathBuf {
  let db_file = match get_cfg() {
    Ok(cfg) => {
      match cfg.chain_info.chain_id.as_str() {
        "Rex" => ACCOUNTS_DB_FILE_REX,
        _ => ACCOUNTS_DB_FILE
      }
    },
    Err(_) => ACCOUNTS_DB_FILE
  };
  dirs::home_dir().unwrap().join(".0L").join(db_file)
}

/// get transaction parameters from config file
pub fn get_tx_params(url: Option<&str>, ) -> Result<TxParams, anyhow::Error> { // TODO: Should the Error type be a CarpeError?
  let mut config = get_cfg()?;
  if let Some(s) = url {
    match s.parse::<Url>() {
        Ok(u) => config.profile.default_node = Some(u),
        Err(_) => {},
    }
  }
  // Requires user input to get OS keyring
  let keypair = key_manager::get_keypair(&config.profile.account.to_string())?;
  get_tx_params_from_keypair(
    config.clone(),
    TxType::Miner,
    keypair,
    None,
    false,
    false,
  )
}



pub fn get_node_obj() -> Result<Node, CarpeError> {
  let cfg = get_cfg()?;
  let client = get_diem_client(&cfg)?;

  Ok(Node::new(client, &cfg, false))
}

pub fn get_diem_client(cfg: &AppCfg) -> Result<DiemClient, CarpeError> {

  DiemClient::new(
    cfg.clone().profile.default_node.ok_or(CarpeError::misc("could not load default_node"))?, 
    cfg.clone().chain_info.base_waypoint.ok_or(CarpeError::misc("could not load base_waypoint"))?
  )
  .map_err(|_|{ CarpeError::misc("could not load tx params") })
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




// // TODO: replace this wrappet
// /// initialize default configs.
// pub fn maybe_init_configs(account: AccountAddress, authkey: AuthenticationKey ) -> Result<(), Error>{
//   set_account_profile(account, authkey)?;
//   Ok(())
// }

pub fn is_initialized() -> bool {
  default_config_path().exists()
}


