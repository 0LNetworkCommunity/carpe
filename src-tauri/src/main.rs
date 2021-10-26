#![cfg_attr(
	all(not(debug_assertions), target_os = "windows"),
	windows_subsystem = "windows"
)]

pub mod commands;
pub mod key_manager;
pub mod configs;
pub mod carpe_error;

use crate::commands::*;


fn main() {
	tauri::Builder::default()
	.invoke_handler(tauri::generate_handler![
		get_all_accounts,
		add_account,
		// hello,
		keygen,
    // init_user,
    init_swarm,
    swarm_miner,
    swarm_files,
    swarm_process,
    init_from_mnem,
    easy_swarm,
    debug_error,
    remove_accounts,
    demo_tx,
    update_upstream,
    get_networks,
    refresh_waypoint,
	])
	.run(tauri::generate_context!())
	.expect("error while running tauri application");
}
