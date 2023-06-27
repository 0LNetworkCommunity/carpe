//! account configurations

use glob::glob;
use std::{fs, path::PathBuf};

// use zapatos_types::transaction::authenticator::AuthenticationKey;
use libra_types::{
  legacy_types::{
    mode_ol::MODE_0L,
    app_cfg::AppCfg,
  },
  exports::{AccountAddress, AuthenticationKey}
};

// use zapatos_types::account_address::AccountAddress;
use crate::{configs::{self, get_cfg}, configs_network, carpe_error::CarpeError};

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

  // this may be the first account and may not yet be initialized.
  if is_newbie {
      // will default to MAINNET, unless the ENV is set to MODE_0L=TESTING (for local development) or MODE_0L=TESTNET
      let _ = configs_network::set_network_configs(MODE_0L.clone(), None)
      .await
      .map_err(|_| CarpeError::config("cannot set network configs"));
  }

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
