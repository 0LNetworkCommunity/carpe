//! 0L configs file

use std::path::PathBuf;
use crate::types::app_cfg::{AppCfg, self};
// use anyhow::{Error, Result};
use dirs;
// use libra_types::type_extensions::client_ext::ClientExt;
//use ol_types::config::{self, TxType};
//use libra_txs::tx_params::TxParams;
// use zapatos_rest_client::Client;
use libra_types::{
  type_extensions::client_ext::ClientExt,
  exports::{Client, NamedChain}
};
// use crate::{carpe_error::CarpeError, key_manager};

pub static HOME_DIR: &str = ".0L";
static APP_CONFIG_FILE: &str = "0L.toml";

static ACCOUNTS_DB_FILE: &str = "accounts.json";
static ACCOUNTS_DB_FILE_REX_TESTNET: &str = "accounts-rex-testnet.json";
static ACCOUNTS_DB_FILE_SWARM_DEVNET: &str = "accounts-swarm-devnet.json";

// get the config path for files
pub fn default_config_path() -> PathBuf {
    dirs::home_dir().unwrap().join(HOME_DIR).join(APP_CONFIG_FILE)
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
    dirs::home_dir().unwrap().join(HOME_DIR).join(db_file)
}

/// get transaction parameters from config file
/// As we might not need TxParams in V7 this is no commented out

// pub fn get_tx_params() -> Result<TxParams, anyhow::Error> {
//     // TODO: Should the Error type be a CarpeError?
//     let config = get_cfg()?;

//     // Requires user input to get OS keyring
//     let keypair = key_manager::get_keypair(&config.profile.account.to_string())?;

//     TxParams::get_tx_params_from_keypair(config.clone(), TxType::Miner, keypair, None, false, false)
// }

pub fn get_cfg() -> anyhow::Result<AppCfg> {
    app_cfg::parse_toml(app_cfg::default_file_path())
    // return;  // gets default toml path.
}

pub fn get_client() -> anyhow::Result<Client> {
    return Client::default();
}

// /// For devs, get the source path, needed to initialize swarm
// pub fn dev_get_source_path() -> Result<Option<PathBuf>, Error> {
//     let c = get_cfg()?;
//     Ok(c.workspace.source_path)
// }

// /// Where the swarm_temp folder is created, defaults to .0L/swarm_temp
// pub fn dev_get_swarm_temp() -> Result<PathBuf, Error> {
//     Ok(get_cfg()?.workspace.node_home.join("swarm_temp"))
// }

pub fn is_initialized() -> bool {
    default_config_path().exists()
}
