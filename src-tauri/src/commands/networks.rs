//! networks to connect to

use diem_types::waypoint::Waypoint;
use url::Url;

use crate::{carpe_error::CarpeError, configs};

#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct Networks {
  pub url: Url,
  pub waypoint: Waypoint,
  pub profile: String,
}

impl Networks {
  pub fn new() -> Result<Self, CarpeError> {
    let cfg = configs::get_cfg();
    if let Some(url) = cfg.profile.default_node {
      Ok(Networks {
        url: url,
        waypoint: cfg.chain_info.base_waypoint.unwrap_or_default(),
        profile: "default".to_string(),
      })
    } else {
      Err(CarpeError::misc("could not retrive network profile"))
    }
  }
}

#[tauri::command]
pub fn get_networks() -> Result<Networks, CarpeError> {
  Networks::new()
}

#[tauri::command]
pub fn update_upstream(url: Url, wp: Waypoint) -> Result<Networks, CarpeError> {
  configs::set_default_node(url).map_err(|e| CarpeError::misc(&e.to_string()))?;
  configs::set_waypoint(wp).map_err(|e| CarpeError::misc(&e.to_string()))?;
  Networks::new()
}
