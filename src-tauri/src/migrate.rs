use crate::configs;
use anyhow::bail;
use libra_types::core_types::network_playlist;
use libra_types::core_types::{
  app_cfg::{get_nickname, Profile},
  network_playlist::NetworkPlaylist,
};
use libra_types::exports::{
  AccountAddress, AuthenticationKey, NamedChain, ValidCryptoMaterialStringExt,
};
use libra_types::move_resource::gas_coin::SlowWalletBalance;
use log::info;
use serde::{Deserialize, Deserializer};
use std::path::Path;

#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct Accounts {
  pub accounts: Vec<AccountEntry>,
}

#[derive(serde::Deserialize, serde::Serialize, Debug, PartialEq)]
pub struct AccountEntry {
  #[serde(deserialize_with = "deserialize_acc")]
  pub account: AccountAddress,
  #[serde(deserialize_with = "deserialize_authkey")]
  pub authkey: AuthenticationKey,
  pub nickname: String,
  pub on_chain: Option<bool>,
  pub balance: Option<u64>,
}

// hard to believe this doesn't exist
fn deserialize_authkey<'de, D>(deserializer: D) -> Result<AuthenticationKey, D::Error>
where
  D: Deserializer<'de>,
{
  let buf = String::deserialize(deserializer)?;
  AuthenticationKey::from_encoded_string(&buf).map_err(serde::de::Error::custom)
}

// hard to believe this doesn't exist
fn deserialize_acc<'de, D>(deserializer: D) -> Result<AccountAddress, D::Error>
where
  D: Deserializer<'de>,
{
  let buf = String::deserialize(deserializer)?;
  let prepended = format!("0x{}", &buf);
  AccountAddress::from_hex_literal(&prepended).map_err(serde::de::Error::custom)
}

pub fn read_accounts(legcy_dir: &Path) -> anyhow::Result<Accounts> {
  let account_file = legcy_dir.join("accounts.json");
  if account_file.exists() {
    let file = std::fs::read_to_string(account_file)?;
    Ok(serde_json::from_str(&file)?)
  } else {
    bail!("no accounts.json file found");
  }
}

pub async fn maybe_migrate_data() -> anyhow::Result<()> {
  let legacy_dir = configs::legacy_config_path();
  info!("legacy data path: {}", &legacy_dir.display());
  if !legacy_dir.exists() {
    bail!("legacy configs not found.")
  }

  let mut app_cfg = configs::new_cfg()?;
  if let Ok(list) = read_accounts(&legacy_dir) {
    list.accounts.iter().for_each(|a| {
      info!("found account: {}", a.account);
      let mut p = Profile::new(a.authkey, a.account);
      p.balance = SlowWalletBalance {
        unlocked: 0,
        total: a.balance.unwrap_or(0),
      };
      p.on_chain = a.on_chain.unwrap_or(false);
      p.nickname = a.nickname.clone();

      if !app_cfg.user_profiles.iter().any(|e| a.account == e.account) {
        // if we don't find the account in the list
        app_cfg.user_profiles.push(p);

        if let Ok(p) = app_cfg.get_profile(None) {
          app_cfg.workspace.default_profile = Some(get_nickname(p.account));
        };
      }
    });

    backup_legacy_dir()?;
  }

  // now load the network info
  let playlist_url = network_playlist::find_default_playlist(None)?;
  let np = NetworkPlaylist::from_playlist_url(playlist_url, Some(NamedChain::MAINNET)).await?;
  app_cfg.network_playlist = vec![np];

  app_cfg.save_file()?;

  Ok(())
}

pub fn backup_legacy_dir() -> anyhow::Result<()> {
  let legacy_dir = configs::legacy_config_path();
  if !legacy_dir.exists() {
    bail!("legacy files do not exist")
  };
  let dt = std::time::SystemTime::now();
  let filename = format!(
    ".0L_migrated_{}",
    dt.duration_since(std::time::UNIX_EPOCH)?.as_secs()
  );
  let backup_path = legacy_dir.parent().unwrap().join(filename);
  // if we are successful we should deprecate the old path, so we don't try to migrate again.
  std::fs::rename(&legacy_dir, &backup_path)?;
  info!(
    "renamed {}, to {}",
    &legacy_dir.display(),
    &backup_path.display()
  );
  Ok(())
}

#[test]
fn read_legacy_accounts() {
  use serde_json::json;
  use std::path::Path;
  let j = json!({"accounts":[{"account":"69a385e1744e33fbb24a42ecbd1603e3","authkey":"740ddad55b8947fbcc11ea9a3cd3e67169a385e1744e33fbb24a42ecbd1603e3","nickname":"69A","on_chain":true,"balance":5040175781585u64}]});

  let temp = Path::new(&env!("CARGO_MANIFEST_DIR")).join("temp.json");

  std::fs::write(&temp, serde_json::to_string_pretty(&j).unwrap()).unwrap();

  let acc = read_accounts(&temp).unwrap();
  assert!(
    acc.accounts.first().unwrap().account
      == AccountAddress::from_hex_literal("0x69a385e1744e33fbb24a42ecbd1603e3").unwrap()
  );
  std::fs::remove_file(temp).unwrap();
}
