use crate::configs::get_cfg;

use anyhow::bail;
use libra_types::exports::{AccountAddress, AuthenticationKey, NamedChain};
use libra_types::legacy_types::app_cfg::AppCfg;
use libra_types::legacy_types::network_playlist;
use libra_types::{
  global_config_dir,
  legacy_types::{
    app_cfg::{get_nickname, Profile},
    network_playlist::NetworkPlaylist,
  },
};
use std::path::PathBuf;

#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct Accounts {
  pub accounts: Vec<AccountEntry>,
}

#[derive(serde::Deserialize, serde::Serialize, Debug, PartialEq)]
pub struct AccountEntry {
  pub account: AccountAddress,
  pub authkey: AuthenticationKey,
  pub nickname: String,
  pub on_chain: Option<bool>,
  pub balance: Option<u64>,
}

fn read_accounts(dir: &PathBuf) -> anyhow::Result<Accounts> {
  let db_path = dir.join("accounts.json");
  if db_path.exists() {
    let file = std::fs::read_to_string(&db_path)?;
    Ok(serde_json::from_str(&file)?)
  } else {
    bail!("no accounts.json file found");
  }
}

pub async fn migrate_data() -> anyhow::Result<()> {
  let mut app_cfg = get_cfg().ok();
  if let Some(list) = read_accounts(&global_config_dir()).ok() {
    list.accounts.iter().for_each(|a| {
      let mut p = Profile::new(a.authkey, a.account);
      p.balance = a.balance.unwrap_or(0);
      p.on_chain = a.on_chain.unwrap_or(false);
      p.nickname = a.nickname.clone();

      // if we do
      if let Some(c) = &mut app_cfg {
        if c
          .user_profiles
          .iter()
          .find(|e| a.account == e.account)
          .is_none()
        {
          // if we don't find the account in the list

          c.user_profiles.push(p);
          // app_cfg = Some(c);
        }
      } else {
        let mut c = AppCfg::default();
        c.user_profiles.push(p);
        app_cfg = Some(c);
      }
    });

    // now load the network info
    if let Some(c) = &mut app_cfg {
      let playlist_url = network_playlist::find_default_playlist(None)?;
      c.network_playlist =
        vec![NetworkPlaylist::from_url(playlist_url, Some(NamedChain::MAINNET)).await?];

      let a = c.get_profile(None)?.account;
      c.workspace.default_profile = get_nickname(a);
    }
  }

  Ok(())
}
