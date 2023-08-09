//! 0L configs file

use libra_types::{
  exports::Client,
  legacy_types::app_cfg::{AppCfg, CONFIG_FILE_NAME},
};
use once_cell::sync::Lazy;
use std::path::{Path, PathBuf};

// Set up paths for the canary builds
#[cfg(feature = "carpe-canary")]
static CONFIG_DIR: Lazy<PathBuf> = Lazy::new(|| {
  let os_path = directories::ProjectDirs::from("com", "carpe", "CarpeCanary").unwrap();
  os_path.config_dir().to_path_buf()
});

#[cfg(not(feature = "carpe-canary"))]
static CONFIG_DIR: Lazy<PathBuf> = Lazy::new(|| {
  let os_path = directories::ProjectDirs::from("com", "carpe", "Carpe").unwrap();
  os_path.config_dir().to_path_buf()
});

/// get the config path for files
// NOTE: update in V1 we are now using OS specific paths.
// Lin: /home/alice/.config/carpe
// Win: C:\Users\Alice\AppData\Roaming\carpe\Carpe\config
// Mac: /Users/Alice/Library/Application Support/com.carpe.Carpe
pub fn default_config_path() -> &'static Path {
  &CONFIG_DIR
}

pub fn config_file_path() -> PathBuf {
  CONFIG_DIR.join(CONFIG_FILE_NAME)
}

/// Where carpe pre V1 used to be located
pub fn legacy_config_path() -> PathBuf {
  let base = directories::BaseDirs::new().unwrap();
  base.home_dir().join(".0L")
}

pub fn new_cfg() -> anyhow::Result<AppCfg> {
  // use carpe default system config path
  let mut c = AppCfg::default();
  c.workspace.node_home = default_config_path().to_path_buf();
  c.save_file()?;
  Ok(c)
}

pub fn get_cfg() -> anyhow::Result<AppCfg> {
  AppCfg::load(Some(config_file_path()))
}

pub fn get_client() -> anyhow::Result<Client> {
  let app_cfg = get_cfg()?;
  Ok(Client::new(app_cfg.pick_url(None)?))
}

pub fn is_initialized() -> bool {
  default_config_path().exists()
}
