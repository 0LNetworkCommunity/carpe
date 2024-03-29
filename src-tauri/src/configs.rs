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

static LEGACY_ACCOUNTS_FILE: &str = "legacy_accounts.json";

// get the config path for LEGACY_ACCOUNTS_FILE
pub fn default_legacy_account_path() -> PathBuf {
  CONFIG_DIR.join(LEGACY_ACCOUNTS_FILE)
}

/// get the config path for files
// NOTE: update in V1 we are now using OS specific paths.
// Lin: /home/alice/.config/carpe
// Win: C:\Users\Alice\AppData\Roaming\carpe\Carpe\config
// Mac: /Users/Alice/Library/Application Support/com.carpe.Carpe
pub fn default_config_path() -> &'static Path {
  &CONFIG_DIR
}

/// default config path for platform
pub fn config_file_path() -> PathBuf {
  CONFIG_DIR.join(CONFIG_FILE_NAME)
}

/// Where carpe pre V1 used to be located
pub fn legacy_config_path() -> PathBuf {
  let base = directories::BaseDirs::new().unwrap();
  base.home_dir().join(".0L")
}

/// create a new config file for initialization
pub fn new_cfg() -> anyhow::Result<AppCfg> {
  // use carpe default system config path
  let mut c = AppCfg::default();
  c.workspace.node_home = default_config_path().to_path_buf();
  c.save_file()?;
  Ok(c)
}

/// get the AppCfg with the default file path
pub fn get_cfg() -> anyhow::Result<AppCfg> {
  AppCfg::load(Some(config_file_path()))
}

/// get a client struct from default configs
pub fn get_client() -> anyhow::Result<Client> {
  let app_cfg = get_cfg()?;
  Ok(Client::new(app_cfg.pick_url(None)?))
}

/// check if we have a file and it's populated with at least one profile
pub fn is_initialized() -> bool {
  if let Ok(cfg) = get_cfg() {
    cfg.get_profile(None).is_ok()
  } else {
    false
  }
}
