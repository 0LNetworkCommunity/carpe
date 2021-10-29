

use ol_types::block::VDFProof;
use tauri::{Window, async_runtime::spawn};

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
      window.emit("test-event", Payload{ message: threadpool_future}).unwrap();
    }
    
    // Ok(threadpool_future)
}

#[tauri::command]
pub async fn receive_event(window: Window) -> Result<String, String> {

        // window.emit("test-event", Payload{ message: threadpool_future}).unwrap();
  window.listen("hello-rust", |event|{ 
    dbg!("event received: {:?}", event);
  });
  Ok("waited".to_string())
}



async fn mock_tower(success: bool, window: Window) -> Result<VDFProof, CarpeError> {
  let time = time::Duration::from_secs(5);
  thread::sleep(time);
  dbg!("time!");
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
    let e = CarpeError::tower("mock error");
    window.emit("tower-error", e.clone()).unwrap();
    Err(e)
  }
}

#[tauri::command]
pub async fn mock_build_tower(success: bool, window: Window) -> Result<(), CarpeError>{
    let _handle = spawn(mock_tower(success, window));
    Ok(())
}




// #[tauri::command]
// pub async fn start_forever_task(window: Window) -> Result<String, String>{
//     let atomic_bool  = AtomicBool::new(true);

//     let h = window.once("receive_event", |_| {
//       atomic_bool.store(false, Ordering::Relaxed)
//     });

//     while atomic_bool.load(Ordering::Relaxed) {
//        let time = time::Duration::from_secs(5);
//       thread::sleep(time);
//       dbg!("time!");
//     }
//     Ok("done".to_string())
// }


