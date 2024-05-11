import { invoke } from '@tauri-apps/api/tauri'
import { get, writable } from 'svelte/store'
import { Level, logger, raise_error } from './carpeError'
import type { CarpeError } from './carpeError'
import { refreshAccounts } from './accountActions'
import { notify_success } from './carpeNotify'
import { nodeEnvIsTest } from './debug'

// matches rust equivalent
export interface NetworkPlaylist {
  chain_id: NamedChain // Todo, use the Network Enum
  nodes: HostProfile[]
  chain_name?: NamedChain
}

// matches rust equivalent
export interface HostProfile {
  url: string
  note: string
  version: number
  is_api: boolean
  is_sync: boolean
}

// default playlist which is provided in Carpe.
export const playlistJsonUrl =
  'https://raw.githubusercontent.com/0LNetworkCommunity/seed-peers/main/fullnode_seed_playlist.json'

export const updateNetwork = async (url: string, notice = true) => {
  // check input data
  // submit
  await invoke('override_playlist', { url })
    .then((res: NetworkPlaylist) => {
      network_profile.set(res)
      notice && notify_success('Network Settings Updated')
    })
    .catch((error) => {
      raise_error(error as CarpeError, true, 'override_playlist')
      invoke('force_upstream', { url: 'https://rpc.openlibra.space:8080/' })
        .then((res: NetworkPlaylist) => {
          network_profile.set(res)
          notice && notify_success('Network Settings Updated')
        })
        .catch((error) => {
          notice && raise_error(error as CarpeError, false, 'force_upstream')
        })
    })
}
export const defaultPlaylist = (): NetworkPlaylist => {
  const h: HostProfile = {
    url: 'http://localhost:8080',
    note: 'local-net',
    version: 0,
    is_api: false,
    is_sync: false,
  }

  const np: NetworkPlaylist = {
    chain_id: NamedChain.TESTING,
    nodes: [h],
  }

  return np
}

// chain metadata matches the index of node api
export interface IndexResponse {
  chain_id: number
  epoch: number
  ledger_version: number
  oldest_ledger_version: number
  ledger_timestamp: number
  node_role: string
  oldest_block_height: number
  block_height: number
  git_hash: string
}

// This matches a subset of NamedChain enum in Rust.
export enum NamedChain {
  MAINNET = 'MAINNET',
  TESTNET = 'TESTNET',
  TESTING = 'TESTING',
}

export const network_profile = writable<NetworkPlaylist>(defaultPlaylist())
export const connected = writable<boolean>(true)
export const scanningForFullnodes = writable<boolean>(false)
export const scanning_fullnodes_backoff = writable<number>(new Date().getSeconds())
export const scanning_fullnodes_retries = writable<number>(0)

export const synced_fullnodes = writable<string[]>([])
export const networkMetadata = writable<IndexResponse>()

export function setNetwork(network: NamedChain) {
  invoke('toggle_network', { chainIdStr: network })
    .then((res: NetworkPlaylist) => {
      network_profile.set(res)
      // update accounts from current network
      refreshAccounts()
    })
    .catch((error) => raise_error(error, false, 'setNetwork'))
}

export const getNetwork = async () => {
  invoke('get_networks', {})
    .then((res: NetworkPlaylist) => {
      network_profile.set(res)
    })
    .catch((error) => raise_error(error, true, 'getNetwork'))
}

export const getMetadata = async () => {
  logger(Level.Info, ' get_metadata')
  return invoke('get_metadata', {})
    .then((res: IndexResponse) => {
      networkMetadata.set(res)
      connected.set(true)
      // lets stop scanning for fullnodes if we got a good connection.
      scanningForFullnodes.set(false)
      scanning_fullnodes_backoff.set(new Date().getSeconds())
      return res
    })
    .catch((e) => {
      raise_error(e, true, 'getMetadata')
      networkMetadata.set(null)
      connected.set(false)

      refreshUpstreamPeerStats() // update the metadata and if we are connected
      incrementBackoff()
    })
}

export const refreshUpstreamPeerStats = async () => {
  if (new Date().getSeconds() < get(scanning_fullnodes_backoff)) {
    return
  }

  scanningForFullnodes.set(true)
  logger(Level.Info, 'refresh_upstream_peer_stats')
  return invoke('refresh_upstream_peer_stats', {})
    .then((res: string[]) => {
      // Urls
      synced_fullnodes.set(res)
      getMetadata() // check the metadata and if we are connected
      scanningForFullnodes.set(false)
      scanning_fullnodes_retries.set(0)
    })
    .catch((error) => {
      raise_error(error, true, 'refreshUpstreamPeerStats')
    })
}

export const incrementBackoff = () => {
  scanning_fullnodes_retries.set(get(scanning_fullnodes_retries) + 1)
  const new_time = new Date()
  new_time.setSeconds(new_time.getSeconds() + 2 * get(scanning_fullnodes_retries))
  scanning_fullnodes_backoff.set(new_time.getSeconds())
}

let isTest = false
nodeEnvIsTest.subscribe((value) => {
  isTest = value
})
export const initNetwork = async () => {
  logger(Level.Info, 'initNetwork')
  if (!isTest) {
    await getNetwork()

    return await updateNetwork(playlistJsonUrl, false)
  }
  return true
}

export function pickChainIdFromNetworkPlaylist(np: NetworkPlaylist) {
  return (np.chain_name || np.chain_id).toUpperCase()
}
