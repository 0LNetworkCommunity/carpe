use crate::configs::get_cfg;

use crate::configs;
use anyhow::bail;
use libra_types::exports::{AccountAddress, AuthenticationKey, NamedChain, ValidCryptoMaterialStringExt};
use libra_types::legacy_types::network_playlist;
use libra_types::legacy_types::{
  app_cfg::{get_nickname, Profile},
  network_playlist::NetworkPlaylist,
};
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
where D: Deserializer<'de> {
    let buf = String::deserialize(deserializer)?;
    AuthenticationKey::from_encoded_string(&buf)
    .map_err(serde::de::Error::custom)
}

// hard to believe this doesn't exist
fn deserialize_acc<'de, D>(deserializer: D) -> Result<AccountAddress, D::Error>
where D: Deserializer<'de> {
    let buf = String::deserialize(deserializer)?;
    let prepended = format!("0x{}", &buf);
    AccountAddress::from_hex_literal(&prepended)
    .map_err(serde::de::Error::custom)
}

fn read_accounts(account_file: &Path) -> anyhow::Result<Accounts> {
  if account_file.exists() {
    let file = std::fs::read_to_string(&account_file)?;
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

  if let Ok(list) = read_accounts(&legacy_dir.join("accounts.json")) {
    list.accounts.iter().for_each(|a| {
      let mut p = Profile::new(a.authkey, a.account);
      p.balance = a.balance.unwrap_or(0);
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

    // if we are successful we should deprecate the old path, so we don't try to migrate again.
    std::fs::rename(&legacy_dir, legacy_dir.parent().unwrap().join(".0L_bak"))?;
  }

  // now load the network info
  let playlist_url = network_playlist::find_default_playlist(None)?;
  app_cfg.network_playlist =
    vec![NetworkPlaylist::from_url(playlist_url, Some(NamedChain::MAINNET)).await?];


  app_cfg.save_file()?;

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
  assert!(acc.accounts.get(0).unwrap().account == AccountAddress::from_hex_literal("0x69a385e1744e33fbb24a42ecbd1603e3").unwrap());
 std::fs::remove_file(temp).unwrap();
}