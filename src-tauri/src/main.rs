#![cfg_attr(
	all(not(debug_assertions), target_os = "windows"),
	windows_subsystem = "windows"
)]

pub mod commands;
pub mod key_manager;
pub mod configs;
pub mod carpe_error;
pub mod seed_peers;
use crate::commands::*;

// #[derive(Clone, serde::Serialize)]
// struct Payload {
//   message: String,
// }
fn main() {
	tauri::Builder::default()
	.invoke_handler(tauri::generate_handler![
    // Accounts
		get_all_accounts,
		add_account,
		keygen,
    init_from_mnem,
    remove_accounts,
    switch_profile,
    // Networks
    update_upstream,
    get_networks,
    refresh_waypoint,
    toggle_network,
    // Queries
    query_balance,
    // Transactions
    demo_tx,
    create_user_account,
    wallet_type,
    //Tower
    build_tower,
    
    // Dev
    init_swarm,
    swarm_miner,
    swarm_files,
    swarm_process,
    easy_swarm,
    debug_error,
    debug_emit_event,
    delay_async,
    get_onchain_tower_state,
    receive_event,
    mock_build_tower,
	])
	.run(tauri::generate_context!())
	.expect("error while running tauri application");
}
