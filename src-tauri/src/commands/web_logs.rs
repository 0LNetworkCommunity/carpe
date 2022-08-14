use log::{error, warn};
use simplelog::LevelFilter;

#[tauri::command]
pub fn log_this(level: LevelFilter, msg: String) {
  match level {
    LevelFilter::Error => error!("webview: {}", msg),
    LevelFilter::Warn => warn!("webview: {}", msg),
    _ => {}
  }
}
