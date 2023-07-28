//! networks to connect to

use crate::configs::{get_client, get_cfg};

use crate::{
  carpe_error::CarpeError,
};
use libra_types::exports::{NamedChain};
use libra_types::legacy_types::network_playlist::NetworkPlaylist;
use libra_types::legacy_types::network_playlist::HostProfile;
use libra_types::exports::IndexResponse;

use url::Url;
use libra_types::legacy_types::app_cfg::AppCfg;

#[tauri::command(async)]
pub async fn toggle_network(chain_id: NamedChain) -> Result<NetworkPlaylist, CarpeError> {
  let mut app_cfg = get_cfg()?;
  app_cfg.set_chain_id(chain_id);
  app_cfg.save_file()?;

  maybe_create_playlist(&mut app_cfg, chain_id).await.ok();

  get_networks().await
}

async fn maybe_create_playlist(app_cfg: &mut AppCfg, chain_id: NamedChain) -> anyhow::Result<NetworkPlaylist>{

  let np = if chain_id == NamedChain::TESTING {
  let mut playlist = NetworkPlaylist::default();
   playlist.chain_id = NamedChain::TESTING;
   app_cfg.maybe_add_custom_playlist(&playlist.clone());
   playlist
  } else {
    app_cfg.update_network_playlist(Some(chain_id), None).await?
  };
  app_cfg.workspace.default_chain_id = chain_id;
  app_cfg.save_file()?;
  Ok(np)
}

#[tauri::command(async)]
pub async fn get_networks() -> Result<NetworkPlaylist, CarpeError> {
  let app_cfg = get_cfg()?;
  Ok(app_cfg.get_network_profile(None)?)
  // always return a network profile
  // match app_cfg.get_network_profile(None) {
  //   Ok(p) => Ok(p),
  //   _ => {
  //     Ok(maybe_create_playlist(&mut app_cfg, NamedChain::MAINNET).await?)
  //   }
  // }
}

#[tauri::command(async)]
pub async fn get_metadata() -> Result<IndexResponse, CarpeError> { // Todo return the IndexResponse
    let client = get_client()?;
    let m = client.get_index().await?;
    // .map_err(|e| CarpeError::client_unknown_err(&e.to_string()))?;
    // dbg!(&m);
    Ok(m.into_inner())
}

#[tauri::command(async)]
pub async fn override_playlist(url: Url) -> Result<NetworkPlaylist, CarpeError> {
    let mut app_cfg = get_cfg()?;
    let np = app_cfg.update_network_playlist(None, Some(url)).await?;
    app_cfg.save_file()?;
    Ok(np)
}

#[tauri::command(async)]
/// we want to elimated the entire playlist and use a single fullnode
pub async fn force_upstream(url: Url) -> Result<NetworkPlaylist, CarpeError> {
  let mut app_cfg = get_cfg()?;
  dbg!(&app_cfg);
  let mut dummy_playlist = NetworkPlaylist::default();
  dummy_playlist.chain_id = app_cfg.workspace.default_chain_id;
  dummy_playlist.nodes = vec![HostProfile::new(url)];
  dbg!(&dummy_playlist);

  app_cfg.network_playlist = vec![dummy_playlist.clone()];
  dbg!(&app_cfg);
  app_cfg.save_file()?;
  Ok(dummy_playlist)
}

#[tokio::test]
async fn read_write() {
let raw_yaml = r"
workspace:
  default_profile: '636'
  default_chain_id: TESTING
  node_home: ~/.carpe
user_profiles:
- account: 63609dfa4c8786bef29b201500064b2864689de724ca134f4e975784e3642776
  auth_key: 0x63609dfa4c8786bef29b201500064b2864689de724ca134f4e975784e3642776
  test_private_key: null
  nickname: '636'
  on_chain: false
  balance: 0
  locale: null
  statement: Protests rage across the nation
  upstream_nodes: null
- account: 4cca8361dfcab8ab5d80523cfea7d9fca5103e070ed7023d6b80a27eea2acc5d
  auth_key: 0x4cca8361dfcab8ab5d80523cfea7d9fca5103e070ed7023d6b80a27eea2acc5d
  test_private_key: null
  nickname: 4cc
  on_chain: false
  balance: 0
  locale: null
  statement: Protests rage across the nation
  upstream_nodes: null
- account: 771dcb53b7f69e0f3f7b0d2a6b7bd8d5ec44a1cca079fd501f7b3228360f3f92
  auth_key: 0x771dcb53b7f69e0f3f7b0d2a6b7bd8d5ec44a1cca079fd501f7b3228360f3f92
  test_private_key: null
  nickname: '771'
  on_chain: false
  balance: 0
  locale: null
  statement: Protests rage across the nation
  upstream_nodes: null
network_playlist:
- chain_id: MAINNET
  nodes:
  - url: http://204.186.74.42:8080/
    note: w
    version: 0
    is_api: false
    is_sync: false
- chain_id: TESTING
  nodes:
  - url: http://localhost:8080/
    note: default
    version: 0
    is_api: false
    is_sync: false
tx_configs:
  baseline_cost:
    max_gas_unit_for_tx: 10000
    coin_price_per_unit: 1
    user_tx_timeout: 5000
  critical_txs_cost:
    max_gas_unit_for_tx: 1000000
    coin_price_per_unit: 1
    user_tx_timeout: 5000
  management_txs_cost:
    max_gas_unit_for_tx: 100000
    coin_price_per_unit: 1
    user_tx_timeout: 5000
  miner_txs_cost:
    max_gas_unit_for_tx: 10000
    coin_price_per_unit: 1
    user_tx_timeout: 5000
  cheap_txs_cost:
    max_gas_unit_for_tx: 1000
    coin_price_per_unit: 1
    user_tx_timeout: 5000
";

  let cfg: AppCfg = serde_yaml::from_str(&raw_yaml).unwrap();
  assert!(cfg.workspace.default_chain_id == NamedChain::TESTING);
  let np = toggle_network(NamedChain::TESTING).await.unwrap();
  assert!(np.chain_id == NamedChain::TESTING);
}