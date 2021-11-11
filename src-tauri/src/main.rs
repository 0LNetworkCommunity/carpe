#![cfg_attr(
	all(not(debug_assertions), target_os = "windows"),
	windows_subsystem = "windows"
)]

pub mod commands;
pub mod key_manager;
pub mod configs;
pub mod configs_network;
pub mod configs_profile;
pub mod carpe_error;
pub mod seed_peers;
use tauri::{Menu, MenuItem, Submenu};
use crate::{commands::*};


fn main() {
  // example menu https://github.com/probablykasper/mr-tagger/blob/b40fa319055d83b57f8ce59e82a14c0863f256ac/src-tauri/src/main.rs#L28-L78

    let menu = Menu::new()
    .add_submenu(Submenu::new(
      "Carpe",
      Menu::new()
        .add_native_item(MenuItem::About("Carpe".to_string()))
        .add_native_item(MenuItem::Quit),
    ))
    .add_submenu(Submenu::new("Edit", {
      let mut menu = Menu::new();
      menu = menu.add_native_item(MenuItem::Undo);
      menu = menu.add_native_item(MenuItem::Redo);
      menu = menu.add_native_item(MenuItem::Separator);
      menu = menu.add_native_item(MenuItem::Cut);
      menu = menu.add_native_item(MenuItem::Copy);
      menu = menu.add_native_item(MenuItem::Paste);
      #[cfg(not(target_os = "macos"))]
      {
        menu = menu.add_native_item(MenuItem::Separator);
      }
      menu = menu.add_native_item(MenuItem::SelectAll);
      menu
    }));


	tauri::Builder::default()
	.invoke_handler(tauri::generate_handler![
    // Accounts
    is_init,
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
    start_tower_listener,
    submit_backlog,
    get_env,
    set_env,
    debug_submit_proof_zero,
 
    // Debug
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
    start_forever_task,
    debug_start_listener,
	])
  .menu(menu)
	.run(tauri::generate_context!())
	.expect("error while running tauri application");
}
