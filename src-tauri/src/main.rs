#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
#![allow(dead_code)]

use crate::configs::default_config_path;
use log::{error, warn};
use simplelog::{
  ColorChoice, CombinedLogger, Config, LevelFilter, TermLogger, TerminalMode, WriteLogger,
};
use std::fs::{self, File};
use tauri::{AboutMetadata, Menu, MenuItem, Submenu};

pub(crate) mod carpe_error;
pub(crate) mod commands;
pub(crate) mod configs;
pub(crate) mod configs_profile;
pub(crate) mod key_manager;
pub(crate) mod migrate;

#[tokio::main]
async fn main() {
  dbg!(&configs::default_config_path());

  match fs::create_dir_all(default_config_path()) {
    Ok(_) => (),
    Err(e) => {
      error!("could not create config dir. Message: {}", e);
      std::process::exit(1);
    }
  }

  // logging to file
  CombinedLogger::init(vec![
    TermLogger::new(
      LevelFilter::Info,
      Config::default(),
      TerminalMode::Mixed,
      ColorChoice::Auto,
    ),
    WriteLogger::new(
      LevelFilter::Info,
      Config::default(),
      File::create(configs::default_config_path().join("carpe.log"))
        .expect("could not create carpe.log file"),
    ),
  ])
  .expect("could not start simple_log logger");

  //////// FORCE TEST SETTINGS ON START ////////////////////
  // uncomment below to explicitly set "test" env
  // Tauri builder does not take env variable from terminal
  // use crate::commands::preferences::set_env
  // set_env("testnet".to_owned()).unwrap();
  //////////////////////////////////////////////////////////

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

  tauri::async_runtime::set(tokio::runtime::Handle::current());

  warn!("Carpe starting"); // TODO: debugging only. `log` create features are being inherited from libra repo.
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      //////// Accounts ////////
      commands::wallets::is_init,
      commands::wallets::get_default_profile,
      commands::wallets::refresh_accounts,
      commands::wallets::get_all_accounts,
      commands::wallets::keygen,
      commands::wallets::init_from_mnem,
      commands::wallets::init_from_private_key,
      commands::wallets::remove_accounts,
      commands::wallets::switch_profile,
      commands::wallets::is_slow,
      commands::wallets::set_slow_wallet,
      commands::wallets::get_private_key_from_os,
      commands::wallets::add_watch_account,
      //////// Networks ////////
      commands::preferences::refresh_upstream_peer_stats,
      commands::networks::force_upstream,
      commands::networks::override_playlist,
      commands::networks::get_networks,
      commands::networks::toggle_network,
      commands::networks::get_metadata,
      //////// Queries ////////
      commands::query::query_balance,
      commands::query::query_makewhole,
      commands::query::get_recovery_mode,
      //////// Transactions ////////
      commands::tx::coin_transfer,
      // claim_make_whole,
      //////// Tower ////////
      commands::query::get_onchain_tower_state,
      commands::mining::miner_once,
      commands::mining::start_backlog_sender_listener,
      commands::mining::get_local_height,
      commands::mining::get_epoch_rules,
      commands::mining::submit_backlog,
      commands::mining::get_last_local_proof,
      commands::mining::debug_highest_proof_path,
      // submit_proof_zero,

      //////// Preferences ////////
      commands::preferences::debug_preferences_path,
      // commands::preferences::get_preferences,
      commands::preferences::maybe_migrate,
      commands::preferences::ignore_migrate,
      commands::preferences::has_legacy_configs,
      commands::preferences::get_env,
      commands::preferences::set_env,
      commands::preferences::set_preferences_locale,
      commands::preferences::get_miner_txs_cost,
      commands::preferences::set_miner_txs_cost,
      ///////// Debug ////////
      commands::app_version::get_app_version,
      commands::web_logs::log_this,
    ])
    .menu(menu)
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
