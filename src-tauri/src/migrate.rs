use crate::configs::get_cfg;

use crate::configs;
use anyhow::bail;
use libra_types::exports::{AccountAddress, AuthenticationKey, NamedChain};
use libra_types::legacy_types::network_playlist;
use libra_types::legacy_types::{
  app_cfg::{get_nickname, Profile},
  network_playlist::NetworkPlaylist,
};
use std::path::Path;

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

fn read_accounts(dir: &Path) -> anyhow::Result<Accounts> {
  let db_path = dir.join("accounts.json");
  if db_path.exists() {
    let file = std::fs::read_to_string(&db_path)?;
    Ok(serde_json::from_str(&file)?)
  } else {
    bail!("no accounts.json file found");
  }
}

pub async fn maybe_migrate_data() -> anyhow::Result<()> {
  let legacy_dir = configs::legacy_config_path();

  if !legacy_dir.exists() { bail!("legacy configs not found.")}

  // failover. maybe this was halfway migrated.
  // if we can find a config file in the new format we use that as a starting place
  let mut app_cfg = match get_cfg() {
    Ok(a) => a,
    _ => configs::new_cfg()?,
  };

  if let Ok(list) = read_accounts(&legacy_dir) {
    println!("found an accounts.json file");
    list.accounts.iter().for_each(|a| {
      let mut p = Profile::new(a.authkey, a.account);
      p.balance = a.balance.unwrap_or(0);
      p.on_chain = a.on_chain.unwrap_or(false);
      p.nickname = a.nickname.clone();

      // if we do
      if !app_cfg.user_profiles.iter().any(|e| a.account == e.account) {
        // if we don't find the account in the list
        app_cfg.user_profiles.push(p);

        if let Ok(p) = app_cfg.get_profile(None) {
          app_cfg.workspace.default_profile = Some(get_nickname(p.account));
        };
      }
    });
    // if we are successful we should deprecate the old path, so we don't try to migrate again.
    std::fs::rename(&legacy_dir, legacy_dir.parent().unwrap().join(".0L_bak"))?;
  }

  // now load the network info
  // println!("attempting to fetch new default playlist");
  let playlist_url = network_playlist::find_default_playlist(None)?;
  app_cfg.network_playlist =
    vec![NetworkPlaylist::from_url(playlist_url, Some(NamedChain::MAINNET)).await?];

  app_cfg.save_file()?;

  Ok(())
}
