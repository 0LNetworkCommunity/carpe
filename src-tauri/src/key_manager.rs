//! key management tools, leveraging OS keyrings.
//! 
extern crate keyring;
use std::{convert::TryInto};
use diem_crypto::{ed25519::{Ed25519PrivateKey, Ed25519PublicKey}, test_utils::KeyPair};
use keyring::KeyringError;

const KEYRING_APP_NAME: &str = "carpe";

pub fn set_private_key(ol_address: &str, private_key_str: &str) -> Result<(), KeyringError> {
  let kr = keyring::Keyring::new(KEYRING_APP_NAME, &ol_address);
  kr.set_password(&private_key_str)
}

pub fn get_private_key(ol_address: &str) -> Result<String, KeyringError> {
  let kr = keyring::Keyring::new(KEYRING_APP_NAME, &ol_address);
  kr.get_password()
}

pub fn get_keypair(ol_address: &str) -> Result<KeyPair<Ed25519PrivateKey, Ed25519PublicKey>, KeyringError> {
  let kr = keyring::Keyring::new(KEYRING_APP_NAME, &ol_address);
  let priv_string = kr.get_password()?;
  let k: Ed25519PrivateKey = priv_string.as_bytes().try_into().unwrap();
  let p: KeyPair<Ed25519PrivateKey, Ed25519PublicKey> = k.try_into().unwrap();
  Ok(p)
}

#[test]
#[ignore] // TODO: this needs to be hand tested since it requires OS password input.
fn test_set() -> Result<(), Box<dyn Error>> {
  
  let ol_address = "0x0";

  let password = "topS3cr3tP4$$w0rd";
  set_private_key(ol_address, password);

  Ok(())
}


#[test]
#[ignore] // TODO: this needs to be hand tested since it requires OS password input.

fn test_get() -> Result<(), Box<dyn Error>> {

  let ol_address = "0x123";
  let password = "topS3cr3tP4$$w0rd";
  set_private_key(ol_address, password);

  let text = get_private_key(ol_address).unwrap();
  assert_eq!(&text, password);
  // let password = keyring.get_password()?;
  // println!("The password is '{}'", password);

  Ok(())
}





// NOTE: Deprecated implementation, for reference only

// pub fn danger_write_priv_key(mnem: String, user_pin_hash: &[u8]) -> Result<(), anyhow::Error> {
//   let pkey = KeyScheme::new_from_mnemonic(mnem).child_0_owner.get_private_key();
  
//   let nonce = b"unique nonce";

//   let enc = encrypt(&pkey.to_bytes(), user_pin_hash, nonce).unwrap();

//   let db_path = dirs::home_dir().unwrap().join("test.key");
//   let mut file = File::create(db_path).expect("DB_FILE should be created!");
//   file.write_all(&enc).expect("DB_FILE should be writen!");

//   Ok(())
// }


// pub fn danger_read_key(user_pin_hash: &[u8], nonce: &[u8]) -> Result<Ed25519PrivateKey, anyhow::Error>{
//   let db_path = dirs::home_dir().unwrap().join("test.key");
//   let contents = fs::read(db_path)
//     .expect("Something went wrong reading the file");

//   let secret_key = b"an example very very secret key.";
//   let nonce = b"unique nonce";
//   match decrypt(contents.as_slice(), user_pin_hash, nonce) {
//     Ok(v) => {
//       match Ed25519PrivateKey::try_from(v.as_slice()) {
//         Ok(k) => Ok(k),
//         Err(e) => bail!(e),
//     }
//     },
//     Err(e) => bail!(e),
//   }
// }

// fn encrypt(msg: &[u8], key: &[u8], nonce: &[u8] ) -> Result<Vec<u8>, aes_gcm::Error>{

//   let k = GenericArray::from_slice(key);
//   let n = GenericArray::from_slice(nonce); // 96-bits; unique per message
//   let cipher = Aes256Gcm::new(k);

//   cipher.encrypt(n, msg)
// }

// fn decrypt(ciphertext: &[u8], key: &[u8], nonce: &[u8] ) -> Result<Vec<u8>, aes_gcm::Error>{

//   let k = GenericArray::from_slice(key);
//   let n = GenericArray::from_slice(nonce); // 96-bits; unique per message
//   Aes256Gcm::new(k).decrypt(n, ciphertext)
// }

// #[test]
// fn round_trip_encrypt() {

//   let msg = b"plaintext message".as_ref();
//   let secret_key = b"an example very very secret key.";
//   let nonce = b"unique nonce";

//   // Encrypt
//   let ciphertext = encrypt(msg, secret_key, nonce).expect("cannot encrypt");

//   // Decrypt it
//   let plaintext = decrypt(&ciphertext, secret_key, nonce).unwrap();

//   assert_eq!(plaintext, msg);
// }

// #[test]
// fn test_write_private_key() {
//   let alice_mnem = "talent sunset lizard pill fame nuclear spy noodle basket okay critic grow sleep legend hurry pitch blanket clerk impose rough degree sock insane purse".to_string();

//   let secret_key = b"an example very very secret key.";

//   danger_write_priv_key(alice_mnem.clone(), secret_key);

//   let db_path = dirs::home_dir().unwrap().join("test.key");
//   let contents = fs::read(db_path)
//         .expect("Something went wrong reading the file");

//   let secret_key = b"an example very very secret key.";
//   let nonce = b"unique nonce";

//   let pkey = KeyScheme::new_from_mnemonic(alice_mnem).child_0_owner.get_private_key();

//   let decr = decrypt(contents.as_slice(), secret_key, nonce).unwrap();
//   assert_eq!(&decr, &pkey.to_bytes().to_vec())
// }


// #[test]
// fn test_read_private_key() {
//   let alice_mnem = "talent sunset lizard pill fame nuclear spy noodle basket okay critic grow sleep legend hurry pitch blanket clerk impose rough degree sock insane purse".to_string();

//   let user_pin_hash = b"an example very very secret key.";
//   let nonce = b"unique nonce";

//   danger_write_priv_key(alice_mnem.clone(), user_pin_hash);
//   let k = danger_read_key(user_pin_hash, nonce).unwrap();
  
//   let pkey = KeyScheme::new_from_mnemonic(alice_mnem).child_0_owner.get_private_key();

//   assert_eq!(&k, &pkey)
// }