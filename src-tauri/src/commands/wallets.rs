use crate::{
  carpe_error::CarpeError,
  commands::query,
  configs::{self, get_client, get_cfg}, 
  configs_profile,
  key_manager,
};

use std::fs::{self, create_dir_all, File};
use std::io::prelude::*;

use anyhow::{anyhow, bail, Error};
use libra_types::{
  legacy_types::mode_ol::MODE_0L,
  exports::{AccountAddress, AuthenticationKey, Ed25519PrivateKey, ValidCryptoMaterialStringExt},
};
use libra_wallet::account_keys::{
  self,
  KeyChain,
};

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
    let legacy_key = account_keys::legacy_keygen()?;
    let mnemonic_string = legacy_key.mnemonic;

    let keys = account_keys::get_keys_from_mnem(mnemonic_string.clone())?;

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
#[tauri::command(async)] // don't want this to be async. We want it to block before moving back to the wallets page (and then needing a refresh), it's a smoother UI.
pub async fn init_from_mnem(mnem: String) -> Result<AccountEntry, CarpeError> {
    let wallet = account_keys::get_keys_from_mnem(mnem.clone())?;
    init_from_private_key(wallet.child_0_owner.pri_key.to_encoded_string()?).await
}


#[tauri::command(async)]

pub async fn init_from_private_key(pri_key_string: String) -> Result<AccountEntry, CarpeError> {

  let pri = Ed25519PrivateKey::from_encoded_string(&pri_key_string)
  .map_err(|_| anyhow!("cannot parse encoded private key"))?;
  let acc_struct = account_keys::get_account_from_private(&pri);
  let authkey = acc_struct.auth_key;

  // IMPORTANT
  // let's check if this account has had a rotated authkey,
  // so the address we derive may not be the expected one.
  let address = get_originating_address(authkey).await
  .unwrap_or_else(|_| acc_struct.account); // the account may not have been created on chain. If we can't get the address, we'll just use the one we derived from the private key

  insert_account_db(get_short(address), address, authkey)?;

  key_manager::set_private_key(&address.to_string(), acc_struct.pri_key)
      .map_err(|e| CarpeError::config(&e.to_string()))?;

  configs_profile::set_account_profile(address.clone(), authkey.clone()).await?;

  Ok(AccountEntry::new(address, authkey))

}

/// read all accounts from ACCOUNTS_DB_FILE
#[tauri::command(async)]
pub fn get_all_accounts() -> Result<Accounts, CarpeError> {
    let all = Accounts::read_from_file()?;
    Ok(all)
}

#[tauri::command(async)]
pub async fn refresh_accounts() -> Result<Accounts, CarpeError> {
    let mut all = Accounts::read_from_file()?;
    // while we are here check if the accounts are on chain
    // under a different address than implied by authkey
    all.map_get_originating_address().await?;
    all.map_get_balance().await?;
    all.update_accounts_db()?;
    Ok(all)
}

impl Accounts {
  pub fn read_from_file() -> anyhow::Result<Self> {
    let db_path = configs::default_accounts_db_path();
    if db_path.exists() {
        let file = File::open(db_path)?;
        Ok(serde_json::from_reader(file)?)
    } else {
        Ok(Accounts { accounts: vec![] })
    }
  }
  // maybe we have a wrong address identifier because a rotation happened
  // (in band or out of band);
  async fn map_get_originating_address(&mut self) -> Result<(), CarpeError> {
      futures::future::join_all(
        self
          .accounts
          .iter_mut()
          .map(|e| async {
              match get_originating_address(e.authkey).await {
                  Ok(addr) => {
                      e.account = addr;
                      e.nickname = get_short(addr);
                  },
                  _ => {} // ignore
              }
          })
      ).await;
      Ok(())
  }

  async fn map_get_balance(&mut self) -> anyhow::Result<(), CarpeError>{
      futures::future::join_all(
        self
          .accounts
          .iter_mut()
          .map( | e| async {
              e.balance = query::get_balance(e.account).await.ok();
              e.on_chain = Some(query::get_seq_num(e.account).await.is_ok());
          })
      ).await;
      Ok(())
  }

  fn update_accounts_db(&self) -> Result<(), CarpeError> {
      let app_dir = configs::default_accounts_db_path();
      let serialized = serde_json::to_vec(self)
          .map_err(|e| CarpeError::config(&format!("json account db should serialize, {:?}", &e)))?;

      File::create(app_dir)
          .map_err(|e| CarpeError::config(&format!("carpe DB_FILE should be created!, {:?}", &e)))?
          .write_all(&serialized)
          .map_err(|e| CarpeError::config(&format!("carpe DB_FILE should be written!, {:?}", &e)))?;
      Ok(())
  }

}


pub async fn get_originating_address(auth_key: AuthenticationKey) -> Result<AccountAddress, CarpeError> {
    let client = get_client().await?;
    Ok(libra_query::account_queries::lookup_originating_address(&client, auth_key).await?)
}

fn find_account_data(account: AccountAddress) -> Result<AccountEntry, CarpeError> {
    let all = Accounts::read_from_file()?;
    match all.accounts.into_iter().find(|a| a.account == account) {
        Some(entry) => Ok(entry),
        None => Err(CarpeError::misc("could not find an account")),
    }
}

/// Add an account (for tracking only).
#[tauri::command(async)]
pub async fn add_account(
    nickname: String,
    authkey: AuthenticationKey,
    mut address: AccountAddress,
) -> Result<Accounts, CarpeError> {
   let mut app_cfg = get_cfg()?;

    // this may be the first account and may not yet be initialized.
    if !configs::is_initialized() {
        // will default to MAINNET, unless the ENV is set to MODE_0L=TESTING (for local development) or MODE_0L=TESTNET
        let _ = app_cfg.update_network_playlist(Some(MODE_0L.clone()), None)
        .await
        .map_err(|_| CarpeError::config("cannot set network configs"));
    }

    // maybe the address has been rotated previously
    // or its a legacy (founder) account
    match get_originating_address(authkey.clone()).await {
      Ok(a) => address = a,
      Err(_) => {} // ignore the error, maybe couldn't connect we'll just use the address as is
    }

    // // Todo: Does tauri parse the types automatically?
    // let parsed_address: AccountAddress = address
    //     .parse()
    //     .map_err(|_| CarpeError::misc("cannot parse account address"))?;

    // let parsed_auth: AuthenticationKey = authkey
    //     .parse()
    //     .map_err(|_| CarpeError::misc("cannot parse authkey"))?;

    insert_account_db(nickname, address, authkey).map_err(|e| {
        CarpeError::misc(&format!(
            "could not add account, message {:?}",
            e.to_string()
        ))
    })
}

/// Switch tx profiles, change 0L.toml to use selected account
#[tauri::command(async)]
pub async fn switch_profile(account: AccountAddress) -> Result<AccountEntry, CarpeError> {
    match find_account_data(account) {
        Ok(entry) => {
            configs_profile::set_account_profile(account, entry.authkey.clone())
                .await
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
    let mut all = Accounts::read_from_file()?;

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

// fn read_accounts() -> Result<Accounts, Error> {
//     let db_path = configs::default_accounts_db_path();
//     if db_path.exists() {
//         let file = File::open(db_path)?;
//         Ok(serde_json::from_reader(file)?)
//     } else {
//         Ok(Accounts { accounts: vec![] })
//     }
// }

pub fn danger_get_keys(mnemonic: String) -> Result<KeyChain, anyhow::Error> {
    let keys = account_keys::get_keys_from_mnem(mnemonic)?;
    Ok(keys)
}

fn get_short(acc: AccountAddress) -> String {
    // let's check if this is a legacy/founder key, it will have 16 zeros at the start, and that's not a useful nickname
    if acc.to_string()[..32] == "00000000000000000000000000000000".to_string() {
        return acc.to_string()[33..36].to_owned()
    }

    acc.to_string()[..3].to_owned()
}

#[tokio::test]
async fn test_init_mnem() {
    use crate::types::app_cfg::parse_toml;
    let alice = "talent sunset lizard pill fame nuclear spy noodle basket okay critic grow sleep legend hurry pitch blanket clerk impose rough degree sock insane purse".to_string();
    init_from_mnem(alice).await.unwrap();
    let path = dirs::home_dir().unwrap().join(".0L").join("0L.toml");
    let cfg = parse_toml(path);
    dbg!(&cfg);
}

#[tokio::test]
async fn test_fetch_originating() {
  let a = AuthenticationKey::from_encoded_string("53113e2c0edc2bd6b9cccd4c6ab84064847e3ab53d3a46c4139c6d0834f18634").unwrap();
  let r = get_originating_address(a).await.unwrap();
  dbg!(&r);
}
