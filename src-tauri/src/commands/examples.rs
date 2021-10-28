

use tauri::Window;

use crate::{carpe_error::CarpeError};
use std::{thread, time};



// use crate::{carpe_error::CarpeError, configs::{get_cfg, get_tx_params}};



#[tauri::command]
pub fn debug_error(debug_err: bool, _window: Window) -> Result<String, CarpeError> {
  dbg!(&debug_err);

  match debug_err {
    true => Ok("good".to_owned()),
    false => Err(CarpeError::misc("test")),
  }
}



#[derive(Clone, serde::Serialize)]
struct Payload {
  message: String,
}

#[tauri::command]
pub fn debug_emit_event(window: Window) -> Result<String, CarpeError> {
  dbg!(&window.label());
  
  window.emit("event-name", Payload { message: "Tauri is awesome!".into() })
    .map_err(|_| CarpeError::misc("emit event error"))?;

  Ok("good".to_owned())
}

async fn delay() -> String {
  let time = time::Duration::from_secs(5);
  thread::sleep(time);
  dbg!("time!");
  "time done".to_string()
}

#[tauri::command]
pub async fn delay_async(window: Window) {
    loop {
      let threadpool_future = delay().await; // TODO: need to offload this work onto another thread.
      window.emit("tower-event", Payload{ message: threadpool_future}).unwrap();
    }
    
    // Ok(threadpool_future)
}