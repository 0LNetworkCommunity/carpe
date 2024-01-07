//! key management tools, leveraging OS keyrings.

extern crate keyring;

use std::convert::TryInto;

use libra_types::exports::AccountAddress;
use libra_types::legacy_types::app_cfg::AppCfg;

use anyhow::{anyhow, bail};
use libra_types::exports::{Ed25519PrivateKey, Ed25519PublicKey, KeyPair};

use crate::carpe_error::{CarpeError, ErrorCat, E_KEY_NOT_REGISTERED};

const KEYRING_APP_NAME: &str = "carpe";

fn keyring_addr_string_format(address: &AccountAddress) -> String {
  address.short_str_lossless().to_uppercase()
}

/// overwrite then delete
pub fn erase_keyring_address(address: &AccountAddress) -> anyhow::Result<()> {
  let ol_address: String = keyring_addr_string_format(address);
  let kr = keyring::Entry::new(KEYRING_APP_NAME, &ol_address);

  let bytes = &[0u8, 64];
  let encoded = hex::encode(bytes);

  kr.set_password(&encoded)?;
  kr.delete_password()?;
  Ok(())
}
/// send the encoded private key to OS keyring
pub fn set_private_key(
  address: &AccountAddress,
  key: Ed25519PrivateKey,
) -> Result<(), keyring::Error> {
  let ol_address: String = keyring_addr_string_format(address);
  let kr = keyring::Entry::new(KEYRING_APP_NAME, &ol_address);

  let bytes: &[u8] = &(key.to_bytes());
  let encoded = hex::encode(bytes);

  kr.set_password(&encoded)
}

/// retrieve a private key from OS keyring
pub fn get_private_key(address: &AccountAddress) -> Result<Ed25519PrivateKey, anyhow::Error> {
  let ol_address: String = keyring_addr_string_format(address);
  let kr = keyring::Entry::new(KEYRING_APP_NAME, &ol_address);
  match kr.get_password() {
    Ok(s) => {
      let ser = hex::decode(s)?;
      match ser.as_slice().try_into() {
        Ok(k) => Ok(k),
        Err(e) => bail!(e),
      }
    }
    Err(e) => Err(anyhow!("{:?}", e)),
  }
}

// retrieve a keypair from OS keyring
pub fn get_keypair(
  address: &AccountAddress,
) -> Result<KeyPair<Ed25519PrivateKey, Ed25519PublicKey>, anyhow::Error> {
  match get_private_key(address) {
    Ok(k) => {
      let p: KeyPair<Ed25519PrivateKey, Ed25519PublicKey> = match k.try_into() {
        Ok(p) => p,
        Err(e) => bail!(e),
      };
      Ok(p)
    }
    Err(e) => bail!(e),
  }
}

/// insert the public key into the AppCfg temporarily so that we don't need
/// to prompt user for mnemonic.
// NOTE to future devs: DANGER: make sure this is never called in a flow that uses save_file(). The upstream prevents the key from serializing, but it should be guarded here as well.
pub fn inject_private_key_to_cfg(app_cfg_mut: &mut AppCfg) -> anyhow::Result<(), CarpeError> {
  // gets the default profile
  let profile = app_cfg_mut.get_profile_mut(None)?;
  let pri_key = get_private_key(&profile.account).map_err(|e| CarpeError {
    category: ErrorCat::Configs,
    uid: E_KEY_NOT_REGISTERED,
    msg: "no keys found on OS keychain".to_string(),
    trace: e.to_string(),
  })?;
  profile.set_private_key(&pri_key);
  // NOTE: intentionally not saving profile
  Ok(())
}

#[test]
fn test_keyring_addr_format() {
  use std::str::FromStr;

  let addr = AccountAddress::from_str("0x4c613c2f4b1e67ca8d98a542ee3f59f5").unwrap();

  let s = keyring_addr_string_format(&addr);
  assert!("4C613C2F4B1E67CA8D98A542EE3F59F5" == s);
}
