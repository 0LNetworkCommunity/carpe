use std::fs::{self, create_dir_all, File};
use std::io::prelude::*;
use std::str::FromStr;

use anyhow::{bail, Error};
use libra_wallet::legacy::LegacyKeys;
use libra_types::exports::{AccountAddress, AuthenticationKey, NamedChain};


use crate::{configs, configs_network, configs_profile, key_manager};

use crate::carpe_error::CarpeError;
// use crate::configs::default_accounts_db_path;

use crate::commands::query::get_balance;
//use super::get_payment_events;

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

impl AccountEntry {
    pub fn new(address: AccountAddress, authkey: AuthenticationKey) -> Self {
        AccountEntry {
            account: address.clone(),
            authkey,
            nickname: get_short(address),
            on_chain: None,
            balance: None,
        }
    }
}

#[derive(serde::Deserialize, serde::Serialize, Debug, PartialEq)]
pub struct NewKeygen {
    entry: AccountEntry,
    mnem: String,
}

/// Keygen handler
#[tauri::command]
pub fn keygen() -> Result<NewKeygen, CarpeError> {
    dbg!("keygen");
    let legacy_key = libra_wallet::legacy::legacy_keygen()?;
    let mnemonic_string = legacy_key.mnemonic;

    let keys = libra_wallet::legacy::get_keys_from_mnem(mnemonic_string.clone())?;
    // let conv_authkey = AuthenticationKey::from_str(&keys.child_0_owner.auth_key.to_string())?;
    // let conv_address = AccountAddress::from_hex_literal(&keys.child_0_owner.account.to_string())?;

    let res = NewKeygen {
        entry: AccountEntry::new(keys.child_0_owner.account, keys.child_0_owner.auth_key),
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
#[tauri::command]
pub fn init_from_mnem(mnem: String) -> Result<AccountEntry, CarpeError> {
    danger_init_from_mnem(mnem)
}

pub fn danger_init_from_mnem(mnem: String) -> Result<AccountEntry, CarpeError> {
    dbg!("init from mnem");
    let init = configs::is_initialized();
    // TODO: refactor upstream wallet::get_account so that it returns a result

    let wallet = libra_wallet::legacy::get_keys_from_mnem(mnem.clone())?;

    let authkey = wallet.child_0_owner.auth_key;
    let address = wallet.child_0_owner.account;
    // first try to insert into DB.
    // it will error if the account already exists.
    insert_account_db(get_short(address), address, authkey)?;

    key_manager::set_private_key(&address.to_string(), wallet.child_0_owner.pri_key)
        .map_err(|e| CarpeError::config(&e.to_string()))?;

    configs_profile::set_account_profile(address.clone(), authkey.clone())?;

    // this may be the first account and may not yet be initialized.
    if !init {
        configs_network::set_network_configs(NamedChain::MAINNET, None)?;
    }

    Ok(AccountEntry::new(address, authkey))
}

/// read all accounts from ACCOUNTS_DB_FILE
#[tauri::command(async)]
pub fn get_all_accounts() -> Result<Accounts, CarpeError> {
    let all = read_accounts()?;
    Ok(all)
}

// #[tauri::command(async)]
// pub fn get_account_events(account: AccountAddress) -> Result<Vec<EventView>, CarpeError> {
//     let events = get_payment_events(account)?;
//     Ok(events)
// }

#[tauri::command(async)]
pub async fn refresh_accounts() -> Result<Accounts, CarpeError> {
    let all = read_accounts()?;
    let updated = map_get_balance(all).await?;
    update_accounts_db(&updated)?;
    Ok(updated)
}

async fn map_get_balance(mut my_accounts: Accounts) -> Result<Accounts, CarpeError> {

    let acc = futures::future::join_all(
      my_accounts
        .accounts
        .into_iter()
        .map( |mut e| async {
            e.balance = get_balance(e.account).await.ok();
            e.on_chain = Some(e.balance.is_some());
            e
        })
    );
    my_accounts.accounts = acc.await;
    Ok(my_accounts)
}

fn find_account_data(account: AccountAddress) -> Result<AccountEntry, CarpeError> {
    let all = read_accounts()?;
    match all.accounts.into_iter().find(|a| a.account == account) {
        Some(entry) => Ok(entry),
        None => Err(CarpeError::misc("could not find an account")),
    }
}

/// Add an account (for tracking only).
#[tauri::command]
pub fn add_account(
    nickname: String,
    authkey: String,
    address: String,
) -> Result<Accounts, CarpeError> {
    // Todo: Does tauri parse the types automatically?
    let parsed_address: AccountAddress = address
        .parse()
        .map_err(|_| CarpeError::misc("cannot parse account address"))?;

    let parsed_auth: AuthenticationKey = authkey
        .parse()
        .map_err(|_| CarpeError::misc("cannot parse authkey"))?;

    insert_account_db(nickname, parsed_address, parsed_auth).map_err(|e| {
        CarpeError::misc(&format!(
            "could not add account, message {:?}",
            e.to_string()
        ))
    })
}

/// Switch tx profiles, change 0L.toml to use selected account
#[tauri::command(async)]
pub fn switch_profile(account: AccountAddress) -> Result<AccountEntry, CarpeError> {
    match find_account_data(account) {
        Ok(entry) => {
            configs_profile::set_account_profile(account, entry.authkey.clone())
                .map_err(|_| CarpeError::misc("could not switch profile"))?;
            Ok(AccountEntry::new(account, entry.authkey))
        }
        Err(_) => Err(CarpeError::misc("could not switch profile")),
    }
}

fn insert_account_db(
    nickname: String,
    address: AccountAddress,
    authkey: AuthenticationKey,
) -> Result<Accounts, Error> {
    let app_dir = configs::default_accounts_db_path();
    // get all accounts
    let mut all = read_accounts()?;

    // push new account
    let new_account = AccountEntry {
        account: address,
        authkey: authkey,
        nickname: nickname,
        on_chain: None,
        balance: None,
    };

    let acc_list: Vec<AccountAddress> = all
        .accounts
        .iter()
        .map(|a| {
            a.account
        })
        .collect();

    if !acc_list.contains(&new_account.account) {
        all.accounts.push(new_account);

        // write to db file
        // in case it doesn't exist
        //TODO: remove this.
        create_dir_all(&app_dir.parent().unwrap()).unwrap();
        let serialized = serde_json::to_vec(&all).expect("Struct Accounts should be converted!");
        let mut file = File::create(app_dir).expect("DB_FILE should be created!");
        file
            .write_all(&serialized)
            .expect("DB_FILE should be writen!");

        Ok(all)
    } else {
        bail!("account already exists")
    }
}

fn update_accounts_db(accounts: &Accounts) -> Result<(), CarpeError> {
    let app_dir = configs::default_accounts_db_path();
    let serialized = serde_json::to_vec(accounts)
        .map_err(|e| CarpeError::config(&format!("json account db should serialize, {:?}", &e)))?;

    File::create(app_dir)
        .map_err(|e| CarpeError::config(&format!("carpe DB_FILE should be created!, {:?}", &e)))?
        .write_all(&serialized)
        .map_err(|e| CarpeError::config(&format!("carpe DB_FILE should be written!, {:?}", &e)))?;
    Ok(())
}

// remove all accounts which are being tracked.
#[tauri::command]
pub fn remove_accounts() -> Result<String, CarpeError> {
    // Note: this only removes the account tracking, doesn't delete account on chain.

    let db_path = configs::default_accounts_db_path();
    dbg!(&db_path);
    if db_path.exists() {
        match fs::remove_file(&db_path) {
            Ok(_) => return Ok("removed all accounts".to_owned()),
            _ => {
                return Err(CarpeError::misc(&format!(
                    "unable to delete account file found at {:?}",
                    &db_path
                )));
            }
        }
    }
    return Err(CarpeError::misc(
        &format!(
            "No accounts to remove. No account file found at {:?}",
            &db_path
        )
            .to_owned(),
    ));
}

fn read_accounts() -> Result<Accounts, Error> {
    let db_path = configs::default_accounts_db_path();
    if db_path.exists() {
        let file = File::open(db_path)?;
        Ok(serde_json::from_reader(file)?)
    } else {
        Ok(Accounts { accounts: vec![] })
    }
}

pub fn danger_get_keys(mnemonic: String) -> Result<LegacyKeys, anyhow::Error> {
    let keys = libra_wallet::legacy::get_keys_from_mnem(mnemonic)?;
    Ok(keys)
}

//TODO:
// fn _create_account(app_cfg: AppCfg, path: PathBuf, block_zero: &Option<PathBuf>) {
//   let block = match block_zero {
//     Some(b) => VDFProof::parse_block_file(b.to_owned()),
//     None => write_genesis(&app_cfg),
//   };

//   UserConfigs::new(block).create_manifest(path);
// }

fn get_short(acc: AccountAddress) -> String {
    acc.to_string()[..3].to_owned()
}

#[test]
// danger_init_from_mnem
fn test_init_mnem() {
    use ol_types::config::parse_toml;
    let alice = "talent sunset lizard pill fame nuclear spy noodle basket okay critic grow sleep legend hurry pitch blanket clerk impose rough degree sock insane purse".to_string();
    danger_init_from_mnem(alice).unwrap();
    let path = dirs::home_dir().unwrap().join(".0L").join("0L.toml");
    let cfg = parse_toml(Some(path));
    dbg!(&cfg);
}
