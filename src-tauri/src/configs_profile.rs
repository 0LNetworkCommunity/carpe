//! account configurations

use anyhow::Error;
use glob::glob;
use std::{fs, path::PathBuf};

use diem_types::transaction::authenticator::AuthenticationKey;

use diem_types::account_address::AccountAddress;
use ol::config::AppCfg;

use crate::configs::{self, get_cfg};

/// For switching between profiles in the Account DB.
pub fn set_account_profile(
  account: AccountAddress,
  authkey: AuthenticationKey,
) -> Result<AppCfg, Error> {
  let mut cfg = match configs::is_initialized() {
    true => configs::get_cfg()?,
    false => AppCfg::default(),
  };
  let vdf_dir_name = format!("vdf_proofs_{}", &account.to_string());

  cfg.workspace.node_home = configs::default_config_path().parent().unwrap().to_owned();
  cfg.profile.account = account;
  cfg.profile.auth_key = authkey;

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
pub fn get_local_proofs_this_profile() -> Result<Vec<PathBuf>, Error> {
  println!("fetching local proofs");
  // Default is to fetch last 10 proofs.
  let cfg = get_cfg()?;
  let block_dir = cfg.workspace.node_home.join(cfg.workspace.block_dir);
  let str_path = block_dir.to_str().unwrap();
  let p = glob(str_path)?.filter_map(Result::ok).collect();
  dbg!(&p);
  Ok(p)
}
