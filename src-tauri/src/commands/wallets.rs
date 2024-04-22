use crate::{
  carpe_error::CarpeError,
  commands::query,
  configs::{self, default_legacy_account_path, get_cfg, get_client},
  configs_profile,
  key_manager::{self, get_private_key, inject_private_key_to_cfg},
};

use anyhow::{anyhow, Context, Error};
use libra_txs::{submit_transaction::Sender, txs_cli_user::SetSlowTx};
use libra_types::{
  exports::{AccountAddress, AuthenticationKey, Ed25519PrivateKey, ValidCryptoMaterialStringExt},
  legacy_types::app_cfg::Profile,
  move_resource::gas_coin::SlowWalletBalance,
  type_extensions::client_ext::ClientExt,
};
use libra_wallet::account_keys::{self, KeyChain};
use serde::{Deserialize, Serialize};
use std::fs::{self, File};
use std::io::prelude::*;

#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct NewKeygen {
  entry: Profile,
  mnem: String,
}

#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct LegacyAccounts {
  pub accounts: Vec<LegacyAccount>,
}

#[derive(serde::Deserialize, serde::Serialize, Debug, PartialEq)]
pub struct LegacyAccount {
  pub authkey: AuthenticationKey,
}

impl LegacyAccount {
  pub fn new(authkey: AuthenticationKey) -> Self {
    LegacyAccount { authkey }
  }
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
pub async fn init_from_mnem(mnem: String, is_legacy: bool) -> Result<CarpeProfile, CarpeError> {
  let wallet = account_keys::get_keys_from_mnem(mnem.clone())?;
  init_from_private_key(wallet.child_0_owner.pri_key.to_encoded_string()?, is_legacy).await
}

#[tauri::command(async)]
pub async fn init_from_private_key(
  pri_key_string: String,
  is_legacy: bool,
) -> Result<CarpeProfile, CarpeError> {
  let pri = Ed25519PrivateKey::from_encoded_string(&pri_key_string)
    .map_err(|_| anyhow!("cannot parse encoded private key"))?;
  let acc_struct = account_keys::get_account_from_private(&pri);
  let authkey = acc_struct.auth_key;
  if is_legacy {
    let _ = add_legacy_accounts(authkey);
  }
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

#[tauri::command(async)]
/// check if this account is a slow wallet
pub async fn is_slow(account: AccountAddress) -> anyhow::Result<bool, CarpeError> {
  let c = get_client()?;
  println!("is slow");
  let b = c
    .view_ext(
      "0x1::slow_wallet::is_slow",
      None,
      Some(account.to_hex_literal()),
    )
    .await?;
  dbg!(&b);
  match b.as_array().context("no bool found")?[0].as_bool() {
    Some(b) => Ok(b),
    None => Ok(false),
  }
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
    if let Ok(b) = query::get_balance(e.account).await {
      e.balance = b;
    }
  }))
  .await;
  Ok(())
}

pub async fn get_originating_address(
  auth_key: AuthenticationKey,
) -> Result<AccountAddress, CarpeError> {
  let client = get_client()?;
  let all = read_legacy_accounts().unwrap();
  let acc_list: Vec<String> = all.accounts.iter().map(|a| a.authkey.to_string()).collect();
  if acc_list.contains(&auth_key.to_string()) {
    let a = auth_key.to_string()[32..].to_owned();
    let b = String::from("00000000000000000000000000000000");
    Ok(AccountAddress::from_hex_literal(&format!("0x{}{}", b, a)).unwrap())
  } else {
    Ok(client.lookup_originating_address(auth_key).await?)
  }
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
  let _ = remove_legacy_accounts();
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
  init_from_mnem(alice, false).await.unwrap();
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
pub async fn set_slow_wallet(legacy: bool) -> Result<(), CarpeError> {
  // NOTE: unsure Serde was catching all cases check serialization
  let mut config = get_cfg()?;
  inject_private_key_to_cfg(&mut config)?;
  let mut sender = Sender::from_app_cfg(&config, None, legacy).await?;

  let t = SetSlowTx {};
  t.run(&mut sender).await?;
  // let payload = libra_stdlib::slow_wallet_user_set_slow();
  // sender.sign_submit_wait(payload).await?;
  Ok(())
}

#[tauri::command]
pub fn get_private_key_from_os(address: AccountAddress) -> Result<String, CarpeError> {
  let pk = get_private_key(&address)?;
  let acc_struct = account_keys::get_account_from_private(&pk);
  Ok(acc_struct.pri_key.to_encoded_string()?)
}

#[tauri::command(async)]
pub async fn add_watch_account(
  address: AccountAddress,
  is_legacy: bool,
) -> Result<CarpeProfile, CarpeError> {
  let authkey: AuthenticationKey = query::get_auth_key(address).await?;
  if is_legacy {
    let _ = add_legacy_accounts(authkey);
  }
  configs_profile::set_account_profile(address, authkey).await?;
  let core_profile = &Profile::new(authkey, address);
  Ok(core_profile.into())
}

fn read_legacy_accounts() -> Result<LegacyAccounts, Error> {
  let db_path = default_legacy_account_path();
  if db_path.exists() {
    let file = File::open(db_path)?;
    Ok(serde_json::from_reader(file)?)
  } else {
    Ok(LegacyAccounts { accounts: vec![] })
  }
}

fn add_legacy_accounts(authkey: AuthenticationKey) -> Result<LegacyAccounts, CarpeError> {
  let mut all = read_legacy_accounts()?;
  // push new account
  let new_account = LegacyAccount { authkey };
  let acc_list: Vec<String> = all.accounts.iter().map(|a| a.authkey.to_string()).collect();
  if !acc_list.contains(&new_account.authkey.to_string()) {
    all.accounts.push(new_account);
    let _ = update_legacy_accounts(&all);
    Ok(all)
  } else {
    Err(CarpeError::misc("account already exists"))
  }
}
fn update_legacy_accounts(accounts: &LegacyAccounts) -> Result<(), CarpeError> {
  let db_path = default_legacy_account_path();
  let serialized = serde_json::to_vec(accounts)
    .map_err(|e| CarpeError::config(&format!("json legacyAccounts should serialize, {:?}", &e)))?;

  File::create(db_path)
    .map_err(|e| {
      CarpeError::config(&format!(
        "carpe legacyAccounts.json should be created!, {:?}",
        &e
      ))
    })?
    .write_all(&serialized)
    .map_err(|e| {
      CarpeError::config(&format!(
        "carpe legacyAccounts.json should be written!, {:?}",
        &e
      ))
    })?;
  Ok(())
}

pub fn remove_legacy_accounts() -> Result<String, CarpeError> {
  let db_path = default_legacy_account_path();
  dbg!(&db_path);
  if db_path.exists() {
    match fs::remove_file(&db_path) {
      Ok(_) => return Ok("removed all legacy accounts".to_owned()),
      _ => {
        return Err(CarpeError::misc(&format!(
          "unable to delete account file found at {:?}",
          &db_path
        )))
      }
    }
  }
  Err(CarpeError::misc(&format!(
    "No legacy accounts to remove. No account file found at {:?}",
    &db_path
  )))
}
