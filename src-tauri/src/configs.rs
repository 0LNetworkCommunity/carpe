//! 0L configs file

use std::path::PathBuf;

use libra_types::{
  legacy_types::app_cfg::{self, AppCfg},
  exports::Client
};

// get the config path for files
pub fn default_config_path() -> PathBuf {
    app_cfg::default_file_path()
}

pub fn get_cfg() -> anyhow::Result<AppCfg> {
    AppCfg::load(None)
}

pub fn get_client() -> anyhow::Result<Client> {
    let app_cfg = get_cfg()?;
    Ok(Client::new(app_cfg.pick_url(None)?))
}

pub fn is_initialized() -> bool {
    default_config_path().exists()
}
