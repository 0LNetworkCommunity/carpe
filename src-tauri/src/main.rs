#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#![allow(dead_code)]

// use url;
// use crate::commands::*;
use log::{error, warn};
use simplelog::{
  ColorChoice, CombinedLogger, Config, LevelFilter, TermLogger, TerminalMode, WriteLogger,
};
use std::fs::{self, File};
use tauri::{Menu, MenuItem, Submenu, AboutMetadata};

pub(crate) mod carpe_error;
pub(crate) mod commands;
pub(crate) mod configs;
// pub(crate) mod configs_network;
pub(crate) mod configs_profile;
pub(crate) mod key_manager;
// pub(crate) mod waypoint;

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
      Config::default(),
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

  // example menu https://github.com/probablykasper/mr-tagger/blob/b40fa319055d83b57f8ce59e82a14c0863f256ac/src-tauri/src/main.rs#L28-L78
  let metadata = AboutMetadata::new();
  let menu = Menu::new()
    .add_submenu(Submenu::new(
      "Carpe",
      Menu::new()
        .add_native_item(MenuItem::About("Carpe".to_string(), metadata))
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
      // // Accounts
      commands::wallets::is_init,
      commands::wallets::refresh_accounts,
      commands::wallets::get_all_accounts,
      // //get_account_events,
      // add_account,
      commands::wallets::keygen,
      commands::wallets::init_from_mnem,
      commands::wallets::init_from_private_key,

      commands::wallets::remove_accounts,
      commands::wallets::switch_profile,
      // Networks
      commands::preferences::refresh_upstream_peer_stats,
      commands::networks::force_upstream,
      commands::networks::override_playlist,
      commands::networks::get_networks,
      commands::networks::toggle_network,
      // // Queries
      commands::query::query_balance,
      commands::query::query_makewhole,
      commands::query::get_recovery_mode,
      commands::query::get_metadata,
      // // Transactions
      // demo_tx,
      // create_user_account,
      // wallet_type,
      commands::tx::coin_transfer,
      // //claim_make_whole,
      // // Tower
      // miner_once,
      // start_backlog_sender_listener,
      // get_local_height,
      commands::mining::get_epoch_rules,
      // submit_backlog,
      commands::mining::get_last_local_proof,
      commands::preferences::get_env,
      // submit_proof_zero,
      // // Version
      commands::app_version::get_app_version,
      // // Debug
      commands::web_logs::log_this,
      // init_swarm,
      // swarm_miner,
      // swarm_files,
      // swarm_process,
      // easy_swarm,
      // debug_error,
      // debug_emit_event,
      // delay_async,
      commands::query::get_onchain_tower_state,
      // receive_event,
      // mock_build_tower,
      // start_forever_task,
      // debug_start_listener,
      commands::mining::debug_highest_proof_path,
      // // Preferences
      commands::preferences::debug_preferences_path,
      commands::preferences::get_preferences,
      // set_env,
      // set_preferences_locale
    ])
    .menu(menu)
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
