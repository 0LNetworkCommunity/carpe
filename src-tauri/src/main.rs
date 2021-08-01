#![cfg_attr(
	all(not(debug_assertions), target_os = "windows"),
	windows_subsystem = "windows"
)]

pub mod commands;
use crate::commands::*;

#[tauri::command]
fn my_custom_command(invoke_message: String) -> String{
	format!("Yo! I was invoked from JS, with this message: {}", invoke_message)
}

fn main() {
	tauri::Builder::default()
	.invoke_handler(tauri::generate_handler![
			hello,
			keygen,
      init_user,
      init_swarm,
      swarm_miner,
      swarm_files,
      swarm_process,
      demo,
			// wizard_user,
			// wizard_user_check,
			// start_mining,
			// start_node,
			// stop_mining,
			// stop_node,
      // start_swarm,
			// init_swarm_miner,
		])
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}
