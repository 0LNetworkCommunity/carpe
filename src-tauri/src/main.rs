#![cfg_attr(
	all(not(debug_assertions), target_os = "windows"),
	windows_subsystem = "windows"
)]

pub mod commands;
pub mod key_manager;

use crate::commands::*;


fn main() {
	tauri::Builder::default()
	.invoke_handler(tauri::generate_handler![
		get_all_accounts,
		add_account,
		hello,
		keygen,
    init_user,
    init_swarm,
    swarm_miner,
    swarm_files,
    swarm_process,
    demo,
    init_from_mnem,
    easy_swarm,
		demo_tx,
    debug_error,
	])
	.run(tauri::generate_context!())
	.expect("error while running tauri application");
}
