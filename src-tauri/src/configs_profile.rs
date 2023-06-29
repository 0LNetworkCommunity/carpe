//! account configurations

use glob::glob;
use std::{fs, path::PathBuf};

use libra_types::{
  legacy_types::{
    app_cfg::AppCfg,
  },
  exports::{AccountAddress, AuthenticationKey}
};
use crate::configs::{self, get_cfg};
use libra_types::legacy_types::app_cfg::Profile;
use libra_types::legacy_types::app_cfg::get_nickname;
/// For switching between profiles in the Account DB.
pub async fn set_account_profile(
  account: AccountAddress,
  authkey: AuthenticationKey,
) -> anyhow::Result<AppCfg> {
  let is_newbie = configs::is_initialized();
  let mut cfg = match is_newbie {
    true => configs::get_cfg()?,
    false => AppCfg::default(),
  };

  // set as default profile
  cfg.workspace.default_profile_nickname = Some(get_nickname(account));
  let profile = Profile::new(authkey, account);
  // add if we have not already
  cfg.maybe_add_profile(profile)?;

  let vdf_dir_name = format!("vdf_proofs_{}", &account.to_string());

  cfg.workspace.node_home = configs::default_config_path().parent().unwrap().to_owned();

  cfg.workspace.block_dir = vdf_dir_name.clone();
  let vdf_path = cfg.workspace.node_home.join(&cfg.workspace.block_dir);

  if !cfg.workspace.node_home.exists() {
    fs::create_dir_all(&cfg.workspace.node_home)?;
  }
  if !vdf_path.exists() {
    fs::create_dir_all(&vdf_path)?;
  }

  cfg.save_file()?;

  Ok(cfg)
}

/// helper to get local proofs
pub fn get_local_proofs_this_profile() -> anyhow::Result<Vec<PathBuf>> {
  println!("fetching local proofs");
  // Default is to fetch last 10 proofs.
  let cfg = get_cfg()?;
  let block_dir = cfg.workspace.node_home.join(cfg.workspace.block_dir);
  let str_path = block_dir.to_str().unwrap();
  let p = glob(str_path)?.filter_map(Result::ok).collect();
  dbg!(&p);
  Ok(p)
}
