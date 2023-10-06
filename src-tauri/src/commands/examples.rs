use crate::carpe_error::CarpeError;
use ol_types::block::VDFProof;
use std::{thread, time};
use tauri::{Runtime, Window};
use tauri::Manager;

#[tauri::command]
pub fn debug_error<R: Runtime>(debug_err: bool, _window: Window<R>) -> Result<String, CarpeError> {
  match debug_err {
    true => Ok("good".to_owned()),
    false => Err(CarpeError::misc("test")),
  }
}

#[tauri::command]
pub async fn receive_event<R: Runtime>(window: Window<R>) -> Result<String, String> {
  window.listen("hello-rust", |event| {
    dbg!("event received: {:?}", event);
  });
  Ok("waited".to_string())
}

#[derive(Clone, serde::Serialize)]
struct Payload {
  message: String,
}

#[tauri::command]
pub fn debug_emit_event<R: Runtime>(window: Window<R>) -> Result<String, CarpeError> {

  window
    .emit(
      "event-name",
      Payload {
        message: "Tauri is awesome!".into(),
      },
    )
    .map_err(|_| CarpeError::misc("emit event error"))?;

  Ok("good".to_owned())
}

async fn delay() -> String {
  let time = time::Duration::from_secs(3);
  thread::sleep(time);
  "time done".to_string()
}

#[tauri::command]
pub async fn delay_async<R: Runtime>(window: Window<R>) {
  loop {
    let threadpool_future = delay().await; // TODO: need to offload this work onto another thread.
    window
      .emit(
        "test-event",
        Payload {
          message: threadpool_future,
        },
      )
      .unwrap();
  }
}

#[tauri::command]
pub async fn debug_start_listener<R: Runtime>(window: Window<R>) -> Result<String, String> {
  println!("started the emit-from-window listener");
  let _h = window.listen("emit-from-window", |e| {
    println!("received event {:?}", e);
  });

  Ok("started the listener".to_string())
}

#[tauri::command]
pub async fn start_forever_task<R: Runtime>(window: Window<R>) -> Result<String, String> {
  let _h = window.listen("do_delay", move |e| {
    println!("received event {:?}", e);
  });

  Ok("forever() task started".to_string())
}

fn mock_one_proof<R: Runtime>(success: bool, window: &Window<R>) -> Result<VDFProof, CarpeError> {
  println!("start mock proof");

  let time = time::Duration::from_secs(3);
  thread::sleep(time);
  println!("proof mined!");

  if success {
    let proof = VDFProof {
      height: 1,
      elapsed_secs: 100,
      preimage: "a".as_bytes().to_vec(),
      proof: "b".as_bytes().to_vec(),
      difficulty: Some(2),
      security: Some(3),
    };
    window.emit("tower-event", proof.clone()).unwrap();
    Ok(proof)
  } else {
    let e = CarpeError::tower("mock error", 0);
    window.emit("tower-error", e.clone()).unwrap();
    Err(e)
  }
}

#[tauri::command]
pub async fn mock_build_tower<R: Runtime>(success: bool, window: Window<R>) -> Result<(), CarpeError> {
  println!("starting mock tower builder");
  let window_clone = window.clone();
  let _h = window.listen("mock-tower-make-proof", move |e| {
    println!("received tower-make-proof event");
    println!("received event {:?}", e);

    mock_one_proof(success, &window_clone).unwrap();
    println!("proof complete");
  });
  Ok(())
}
