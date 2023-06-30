//! key management tools, leveraging OS keyrings.

extern crate keyring;

use std::convert::TryInto;

use libra_types::exports::AccountAddress;
use libra_types::legacy_types::app_cfg::AppCfg;

use anyhow::{anyhow, bail};
use keyring::KeyringError;
use libra_types::exports::{
  Ed25519PrivateKey, Ed25519PublicKey, KeyPair,
};

const KEYRING_APP_NAME: &str = "carpe";

/// overwrite then delete
pub fn erase_keyring_address(address: AccountAddress) -> anyhow::Result<()>{
    let addr_str = &address.to_string();
    let kr = keyring::Keyring::new(KEYRING_APP_NAME, addr_str);

    let bytes = &[0u8, 64];
    let encoded = hex::encode(bytes);

    kr.set_password(&encoded)?;
    kr.delete_password()?;
    Ok(())
}
/// send the encoded private key to OS keyring
pub fn set_private_key(ol_address: &str, key: Ed25519PrivateKey) -> Result<(), KeyringError> {
    let kr = keyring::Keyring::new(KEYRING_APP_NAME, &ol_address);

    let bytes: &[u8] = &(key.to_bytes());
    let encoded = hex::encode(bytes);

    kr.set_password(&encoded)
}

/// retrieve a private key from OS keyring
pub fn get_private_key(address: &AccountAddress) -> Result<Ed25519PrivateKey, anyhow::Error> {
    let ol_address = address.to_string();
    let kr = keyring::Keyring::new(KEYRING_APP_NAME, &ol_address);
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
    match get_private_key(&address) {
        Ok(k) => {
            let p: KeyPair<Ed25519PrivateKey, Ed25519PublicKey> = match k.try_into() {
                Ok(p) => p,
                Err(e) => bail!(e),
            };
            Ok(p)
        }
        Err(e) => bail!(e),
    }
    // let p: KeyPair<Ed25519PrivateKey, Ed25519PublicKey> = k.try_into().unwrap(); // TODO: just return here.
    // Ok(p)
}

/// insert the public key into the AppCfg temporarily so that we don't need
/// to prompt user for mnemonic.
// NOTE to future devs: DANGER: make sure this is never called in a flow that uses save_file()
pub fn inject_private_key_to_cfg(app_cfg_mut: &mut AppCfg) -> anyhow::Result<()>{
  // gets the default profile
  let mut profile = app_cfg_mut.get_profile_mut(None)?;
  let pri_key = get_private_key(&profile.account)?;
  profile.test_private_key = Some(pri_key);
  Ok(())
}

pub fn clear_private_key_from_cfg(app_cfg_mut: &mut AppCfg) -> anyhow::Result<()> {
    // gets the default profile
  let mut profile = app_cfg_mut.get_profile(None)?;
  profile.test_private_key = None;
  Ok(())
}


// #[test]
// fn encode_keys() {
//     let alice_mnem = "talent sunset lizard pill fame nuclear spy noodle basket okay critic grow sleep legend hurry pitch blanket clerk impose rough degree sock insane purse";
//     use ol_keys::scheme::KeyScheme;
//     let scheme = KeyScheme::new_from_mnemonic(alice_mnem.to_owned());
//     let private = scheme.child_0_owner.get_private_key();
//     let bytes: &[u8] = &(private.to_bytes());

//     let encoded = hex::encode(bytes);

//     let new_bytes = hex::decode(encoded).unwrap();
//     let back: Ed25519PrivateKey = new_bytes.as_slice().try_into().unwrap();

//     assert_eq!(&back, &private);
// }

// #[test]
// #[ignore] // TODO: this needs to be hand tested since it requires OS password input.
// fn test_set() -> Result<(), Box<dyn Error>> {
//     use ol_keys::scheme::KeyScheme;
//     let ol_address = "0x0";

//     let alice_mnem = "talent sunset lizard pill fame nuclear spy noodle basket okay critic grow sleep legend hurry pitch blanket clerk impose rough degree sock insane purse";

//     let scheme = KeyScheme::new_from_mnemonic(alice_mnem.to_owned());
//     let private = scheme.child_0_owner.get_private_key();

//     // let password = "topS3cr3tP4$$w0rd";
//     set_private_key(ol_address, private).unwrap();

//     Ok(())
// }

// #[test]
// #[ignore] // TODO: this needs to be hand tested since it requires OS password input.
// fn test_get() -> Result<(), Box<dyn Error>> {
//     use ol_keys::scheme::KeyScheme;
//     let ol_address = "0x123";

//     let alice_mnem = "talent sunset lizard pill fame nuclear spy noodle basket okay critic grow sleep legend hurry pitch blanket clerk impose rough degree sock insane purse";

//     let scheme = KeyScheme::new_from_mnemonic(alice_mnem.to_owned());
//     let private = scheme.child_0_owner.get_private_key();

//     set_private_key(ol_address, private.clone()).unwrap();

//     let read = get_private_key(ol_address).unwrap();
//     assert_eq!(&read, &private);

//     Ok(())
// }
