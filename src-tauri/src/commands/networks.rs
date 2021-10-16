//! networks to connect to


#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct Networks {
  pub url: Url,
  pub nickname: String,
}