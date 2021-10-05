#![cfg_attr(
	all(not(debug_assertions), target_os = "windows"),
	windows_subsystem = "windows"
)]

pub mod commands;
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
    // start_swarm,
    easy_swarm,
		demo_tx
	])
	.run(tauri::generate_context!())
	.expect("error while running tauri application");
}
