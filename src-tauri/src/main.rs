#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

extern crate url;
use crate::commands::*;
use log::{error, info, warn};
use simplelog::{
  ColorChoice, CombinedLogger, Config, LevelFilter, TermLogger, TerminalMode, WriteLogger,
};
use std::fs::{self, File};
use tauri::{Menu, MenuItem, Submenu};

pub mod carpe_error;
pub mod commands;
pub mod configs;
pub mod configs_network;
pub mod configs_profile;
pub mod key_manager;
mod waypoint;

fn main() {
  //////// FORCE TEST SETTINGS ON START ////////////////////
  // uncomment below to explicitly set "test" env
  // Tauri builder does not take env variable from terminal
  // set_env("test".to_owned()).unwrap();
  //////////////////////////////////////////////////////////

  match fs::create_dir_all(configs::default_config_path().parent().unwrap()) {
    Ok(_) => (),
    Err(e) => {
      error!("could not create config dir. Message: {}", e);
      std::process::exit(1);
    }
  }
  // logging to file
  CombinedLogger::init(vec![
    TermLogger::new(
      LevelFilter::Debug,
      Config::default(),
      TerminalMode::Mixed,
      ColorChoice::Auto,
    ),
    WriteLogger::new(
      LevelFilter::Warn,
      simplelog::Config::default(),
      File::create(
        configs::default_config_path()
          .parent()
          .unwrap()
          .join("carpe.log"),
      )
      .unwrap(),
    ),
  ])
  .unwrap();

  warn!("Carpe started"); // TODO: debugging only. `log` create features are being inherited from libra repo.
  info!("Carpe started");

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
      refresh_accounts,
      get_all_accounts,
      get_account_events,
      add_account,
      keygen,
      init_from_mnem,
      remove_accounts,
      switch_profile,
      // Networks
      refresh_upstream_peer_stats,
      force_upstream,
      force_waypoint,
      override_playlist,
      get_networks,
      refresh_waypoint,
      toggle_network,
      // Queries
      query_balance,
      query_makewhole,
      get_recovery_mode,
      // Transactions
      demo_tx,
      create_user_account,
      wallet_type,
      coin_transfer,
      claim_make_whole,
      // Tower
      miner_once,
      start_backlog_sender_listener,
      get_local_height,
      get_epoch_rules,
      submit_backlog,
      get_last_local_proof,
      get_env,
      set_env,
      submit_proof_zero,
      // Version
      get_app_version,
      // Debug
      log_this,
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
      debug_highest_proof_path,
      debug_preferences_path,
      // Preferences
      get_preferences,
      set_preferences_locale
    ])
    .menu(menu)
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
