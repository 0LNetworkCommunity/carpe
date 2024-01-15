use crate::{
  carpe_error::CarpeError,
  commands::query,
  configs::{self, get_cfg, get_client},
  configs_profile,
  key_manager::{self, inject_private_key_to_cfg},
};

use anyhow::anyhow;
use libra_cached_packages::libra_stdlib;
use libra_txs::submit_transaction::Sender;
use libra_types::{
  exports::{AccountAddress, AuthenticationKey, Ed25519PrivateKey, ValidCryptoMaterialStringExt},
  legacy_types::app_cfg::Profile,
  move_resource::gas_coin::SlowWalletBalance,
  type_extensions::client_ext::ClientExt,
};
use libra_wallet::account_keys::{self, KeyChain};
use serde::{Deserialize, Serialize};

#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct NewKeygen {
  entry: Profile,
  mnem: String,
}

/// a subset of AppCfg::Profile, dropping the private key
#[derive(Debug, Serialize, Deserialize)]
pub struct CarpeProfile {
  account: AccountAddress,
  auth_key: AuthenticationKey,
  nickname: String,
  on_chain: bool,
  balance: SlowWalletBalance,
  locale: Option<String>, // TODO: refactor, tauri now offers locale of the OS
}

impl From<&Profile> for CarpeProfile {
  fn from(core_profile: &Profile) -> Self {
    Self {
      account: core_profile.account,
      auth_key: core_profile.auth_key,
      nickname: core_profile.nickname.clone(),
      on_chain: core_profile.on_chain,
      balance: SlowWalletBalance {
        unlocked: core_profile.balance.unlocked,
        total: core_profile.balance.total,
      }, // TODO: refactor upstream to have Clone
      locale: core_profile.locale.clone(),
    }
  }
}

/// Keygen handler
#[tauri::command]
pub fn keygen() -> Result<NewKeygen, CarpeError> {
  let legacy_key = account_keys::legacy_keygen(false)?;
  let mnemonic_string = legacy_key.mnemonic;

  let keys = account_keys::get_keys_from_mnem(mnemonic_string.clone())?;

  let res = NewKeygen {
    entry: Profile::new(keys.child_0_owner.auth_key, keys.child_0_owner.account),
    mnem: mnemonic_string,
  };

  Ok(res)
}

/// default way accounts get initialized in Carpe
#[tauri::command(async)]
pub fn is_init() -> Result<bool, CarpeError> {
  Ok(configs::is_initialized())
}

/// default way accounts get initialized in Carpe
#[tauri::command(async)] // don't want this to be async. We want it to block before moving back to the wallets page (and then needing a refresh), it's a smoother UI.
pub async fn init_from_mnem(mnem: String) -> Result<CarpeProfile, CarpeError> {
  let wallet = account_keys::get_keys_from_mnem(mnem.clone())?;
  init_from_private_key(wallet.child_0_owner.pri_key.to_encoded_string()?).await
}

#[tauri::command(async)]
pub async fn init_from_private_key(pri_key_string: String) -> Result<CarpeProfile, CarpeError> {
  let pri = Ed25519PrivateKey::from_encoded_string(&pri_key_string)
    .map_err(|_| anyhow!("cannot parse encoded private key"))?;
  let acc_struct = account_keys::get_account_from_private(&pri);
  let authkey = acc_struct.auth_key;

  // IMPORTANT
  // let's check if this account has had a rotated authkey,
  // so the address we derive may not be the expected one.
  let address = get_originating_address(authkey)
    .await
    .unwrap_or(acc_struct.account); // the account may not have been created on chain. If we can't get the address, we'll just use the one we derived from the private key

  key_manager::set_private_key(&address, acc_struct.pri_key)
    .map_err(|e| CarpeError::config(&e.to_string()))?;

  configs_profile::set_account_profile(address, authkey).await?;
  let core_profile = &Profile::new(authkey, address);
  Ok(core_profile.into())
}

/// read all accounts from profile
#[tauri::command(async)]
pub fn get_all_accounts() -> Result<Vec<CarpeProfile>, CarpeError> {
  let app_cfg = get_cfg()?;
  let mapped: Vec<CarpeProfile> = app_cfg.user_profiles.iter().map(|p| p.into()).collect();
  Ok(mapped)
}

/// read all accounts from profile
#[tauri::command(async)]
pub fn get_default_profile() -> Result<CarpeProfile, CarpeError> {
  let app_cfg = get_cfg()?;
  let p = app_cfg.get_profile(None)?;
  Ok(p.into())
}

#[tauri::command(async)]
pub async fn refresh_accounts() -> Result<Vec<CarpeProfile>, CarpeError> {
  // let mut all = Accounts::read_from_file()?;
  let mut app_cfg = get_cfg()?;

  // while we are here check if the accounts are on chain
  // under a different address than implied by authkey
  map_get_originating_address(&mut app_cfg.user_profiles).await?;
  map_get_balance(&mut app_cfg.user_profiles).await?;
  app_cfg.save_file()?;

  let mapped: Vec<CarpeProfile> = app_cfg.user_profiles.iter().map(|p| p.into()).collect();
  Ok(mapped)
}

async fn map_get_originating_address(list: &mut [Profile]) -> Result<(), CarpeError> {
  futures::future::join_all(list.iter_mut().map(|e| async {
    if let Ok(addr) = get_originating_address(e.auth_key).await {
      e.account = addr;
      e.nickname = get_short(addr);
      e.on_chain = true;
    }
  }))
  .await;
  Ok(())
}

async fn map_get_balance(list: &mut [Profile]) -> anyhow::Result<(), CarpeError> {
  futures::future::join_all(list.iter_mut().map(|e| async {
    // if query::get_seq_num(e.account).await.is_ok() {
    //   // e.on_chain = true;
    // }
    if let Ok(b) = query::get_balance(e.account).await {
      e.balance = b;
      // e.on_chain = true;
    }
  }))
  .await;
  Ok(())
}

pub async fn get_originating_address(
  auth_key: AuthenticationKey,
) -> Result<AccountAddress, CarpeError> {
  let client = get_client()?;
  Ok(client.lookup_originating_address(auth_key).await?)
}

/// Switch tx profiles, change 0L.toml to use selected account
#[tauri::command(async)]
// IMPORTANT: don't return the profile, since it has keys
pub async fn switch_profile(account: AccountAddress) -> Result<CarpeProfile, CarpeError> {
  let mut app_cfg = get_cfg()?;
  let p = app_cfg.get_profile(Some(account.to_string()))?;
  app_cfg.workspace.set_default(p.nickname.clone());
  app_cfg.save_file()?;
  // TODO: gross, fix upstream `app_cfg.rs` to prevent the borrow issues here
  let profile = app_cfg.get_profile(Some(account.to_string()))?;
  Ok(profile.into())
}

// remove all accounts which are being tracked.
#[tauri::command]
pub fn remove_accounts() -> Result<String, CarpeError> {
  // Note: this only removes the account tracking, doesn't delete account on chain.
  let mut cfg = configs::get_cfg()?;
  cfg.user_profiles = vec![];
  cfg.save_file()?;
  Ok("removed all accounts".to_owned())
}

pub fn danger_get_keys(mnemonic: String) -> Result<KeyChain, anyhow::Error> {
  let keys = account_keys::get_keys_from_mnem(mnemonic)?;
  Ok(keys)
}

fn get_short(acc: AccountAddress) -> String {
  // let's check if this is a legacy/founder key, it will have 16 zeros at the start, and that's not a useful nickname
  if acc.to_string()[..32] == *"00000000000000000000000000000000" {
    return acc.to_string()[32..35].to_owned();
  }
  acc.to_string()[..3].to_owned()
}

#[tokio::test]
async fn test_init_mnem() {
  use libra_types::legacy_types::app_cfg::AppCfg;
  let alice = "talent sunset lizard pill fame nuclear spy noodle basket okay critic grow sleep legend hurry pitch blanket clerk impose rough degree sock insane purse".to_string();
  init_from_mnem(alice).await.unwrap();
  let _cfg = AppCfg::load(None).unwrap();
}

#[tokio::test]
async fn test_fetch_originating() {
  let a = AuthenticationKey::from_encoded_string(
    "53113e2c0edc2bd6b9cccd4c6ab84064847e3ab53d3a46c4139c6d0834f18634",
  )
  .unwrap();
  let r = get_originating_address(a).await.unwrap();
  dbg!(&r);
}

#[tauri::command(async)]
pub async fn set_slow_wallet() -> Result<(), CarpeError> {
  // NOTE: unsure Serde was catching all cases check serialization
  let mut config = get_cfg()?;
  inject_private_key_to_cfg(&mut config)?;
  let mut sender = Sender::from_app_cfg(&config, None).await?;

  let payload = libra_stdlib::slow_wallet_user_set_slow();
  sender.sign_submit_wait(payload).await?;
  Ok(())
}
