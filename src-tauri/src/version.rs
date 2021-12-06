use crate::carpe_error::CarpeError;

mod built_info {
    include!(concat!(env!("OUT_DIR"), "/built.rs"));
}

#[derive(serde::Deserialize, serde::Serialize, Debug, PartialEq)]
pub struct AppVersion {
    version: String,
    hash: String,
    head: String
}

/// get app version
#[tauri::command]
pub fn get_version() -> Result<AppVersion, CarpeError> {
    let hash: &str = match built_info::GIT_COMMIT_HASH {
        Some(t) => &t[0..8],
        None => "",
    };
    let head: &str = match built_info::GIT_HEAD_REF {
        Some(t) => t,
        None => "",
    };
    let ret: AppVersion = AppVersion {
        version: built_info::PKG_VERSION.to_string(), 
        head: head.to_string(), 
        hash: hash.to_string()
    };
    Ok(ret)
}