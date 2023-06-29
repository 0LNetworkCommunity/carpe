//! 0L configs file

use std::path::PathBuf;

use libra_types::{
  legacy_types::app_cfg::{self, AppCfg},
  type_extensions::client_ext::ClientExt,
  exports::{Client, NamedChain}, global_config_dir
};

// get the config path for files
pub fn default_config_path() -> PathBuf {
    app_cfg::default_file_path()
}

pub fn get_cfg() -> anyhow::Result<AppCfg> {
    AppCfg::parse_toml(app_cfg::default_file_path())
    // return;  // gets default toml path.
}

pub async fn get_client() -> anyhow::Result<Client> {
    Ok(Client::default().await?)
}

pub fn is_initialized() -> bool {
    default_config_path().exists()
}
