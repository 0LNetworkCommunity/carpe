//! networks to connect to

use url::Url;

use crate::configs;

// #[derive(serde::Deserialize, serde::Serialize, Debug)]
// pub struct Networks {
//   pub url: Url,
//   pub nickname: String,
// }

#[tauri::command]
pub fn update_upstream(url: Url) -> Result<String, String> {
  match configs::set_default_node(url) {
    Ok(_) => Ok("ok".to_string()), // TODO: use Carpe return types
    Err(_) => Ok("err".to_string()),
  }
}
