//! account configurations

use glob::glob;
use std::{fs, path::PathBuf};

use crate::configs::{self, get_cfg};
use crate::default_config_path;
use configs::CONFIG_MUTEX;
use libra_types::core_types::app_cfg::get_nickname;
use libra_types::core_types::app_cfg::Profile;
use libra_types::exports::{AccountAddress, AuthenticationKey};

/// For switching between profiles in the Account DB.
pub async fn set_account_profile(
  account: AccountAddress,
  authkey: AuthenticationKey,
) -> anyhow::Result<()> {
  let configs_exist = configs::is_initialized();
  let _cfg = match configs_exist {
    true => configs::get_cfg()?,
    false => configs::new_cfg()?,
  };

  // Lock the mutex before making any changes
  let mut cfg_guard = CONFIG_MUTEX.lock().await;

  // set as default profile
  cfg_guard.workspace.default_profile = Some(get_nickname(account));
  let profile = Profile::new(authkey, account);
  // add if we have not already
  cfg_guard.maybe_add_profile(profile)?;

  cfg_guard.workspace.node_home = default_config_path().to_path_buf();

  if !cfg_guard.workspace.node_home.exists() {
    fs::create_dir_all(&cfg_guard.workspace.node_home)?;
    fs::create_dir_all(cfg_guard.get_block_dir(None)?)?;
  }
  cfg_guard.save_file()?;
  Ok(())
}

/// helper to get local proofs
pub fn get_local_proofs_this_profile() -> anyhow::Result<Vec<PathBuf>> {
  println!("fetching local proofs");
  // Default is to fetch last 10 proofs.
  let cfg = get_cfg()?;
  let block_dir = cfg.get_block_dir(None)?;
  let str_path = block_dir.to_str().unwrap();
  let p = glob(str_path)?.filter_map(Result::ok).collect();
  Ok(p)
}

#[tokio::test]

async fn test_create() {
  let a = AuthenticationKey::random();
  set_account_profile(a.derived_address(), a).await.unwrap();
}
