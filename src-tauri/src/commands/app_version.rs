use crate::carpe_error::CarpeError;

mod built_info {
  include!(concat!(env!("OUT_DIR"), "/built.rs"));
}

#[derive(serde::Deserialize, serde::Serialize, Debug, PartialEq)]
pub struct AppVersion {
  version: String,
  hash: String,
  head: String,
}

/// get app version
#[tauri::command]
pub fn get_app_version() -> Result<AppVersion, CarpeError> {
  let ret: AppVersion = AppVersion {
    version: get_pkg_version(),
    head: get_head_ref(),
    hash: get_commit_hash(),
  };
  Ok(ret)
}

pub fn get_pkg_version() -> String {
  built_info::PKG_VERSION.to_string()
}

pub fn get_head_ref() -> String {
  let head: &str = match built_info::GIT_HEAD_REF {
    Some(t) => t,
    None => "",
  };
  head.to_string()
}

pub fn get_commit_hash() -> String {
  built_info::GIT_VERSION.unwrap_or("").to_owned()
}
