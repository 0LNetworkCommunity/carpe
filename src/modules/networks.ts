import { invoke } from '@tauri-apps/api/tauri'
import { get, writable } from 'svelte/store'
import { Level, logger, raise_error } from './carpeError'
import type { CarpeError } from './carpeError'
import { refreshAccounts } from './accountActions'
import { notify_success } from './carpeNotify'
import { nodeEnvIsTest } from './debug'

// Matches Rust equivalent
export interface NetworkPlaylist {
  chain_id: NamedChain // Todo, use the Network Enum
  nodes: HostProfile[]
}

// matches rust equivalent
export interface HostProfile {
  url: string
  note: string
  version: number
  is_api: boolean
  is_sync: boolean
}

// Default playlist which is provided in Carpe.
export const playlistJsonUrl =
  'https://raw.githubusercontent.com/0LNetworkCommunity/seed-peers/main/fullnode_seed_playlist.json'

// Embedded default node list as a fallback
const embeddedNodeList: HostProfile[] = [
  {
    note: "mainnet-rpc",
    url: "https://rpc.openlibra.space:8080/",
    version: 0,
    is_api: false,
    is_sync: false,
  },
  {
    note: "sirouk",
    url: "http://70.15.242.6:8080",
    version: 0,
    is_api: false,
    is_sync: false,
  },
  {
    note: "Alan Yoon",
    url: "http://222.101.31.242:8080",
    version: 0,
    is_api: false,
    is_sync: false,
  },
  {
    note: "Bethose | SDL",
    url: "http://65.109.80.179:8080",
    version: 0,
    is_api: false,
    is_sync: false,
  }
]

// Function to fetch the node list from the primary source
async function fetchNodeList(): Promise<HostProfile[]> {
  try {
    const response = await fetch(playlistJsonUrl)
    if (!response.ok) throw new Error('Failed to fetch')
    const data = await response.json()
    return data.nodes
  } catch (error) {
    console.error('Error fetching node list from playlistJsonUrl, using embedded list:', error)
    return embeddedNodeList
  }
}

// Chain metadata matches the index of node api
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

// Define the default network settings
export const defaultPlaylist = (): NetworkPlaylist => {
  return {
    chain_id: NamedChain.TESTING, // Adjust based on your needs
    nodes: embeddedNodeList,
  }
}

export const network_profile = writable<NetworkPlaylist>(defaultPlaylist())
export const connected = writable<boolean>(true)
export const scanningForFullnodes = writable<boolean>(false)
export const scanning_fullnodes_backoff = writable<number>(new Date().getSeconds())
export const scanning_fullnodes_retries = writable<number>(0)
export const synced_fullnodes = writable<string[]>([])
export const networkMetadata = writable<IndexResponse>()

// Function to update network settings
export const updateNetwork = async (url: string, notice = true) => {
  try {
    const res = await invoke('override_playlist', { url }) as NetworkPlaylist;
    network_profile.set(res); // Assuming res is of type NetworkPlaylist
    if (notice) {
      notify_success('Network Settings Updated')
    }
  } catch (error) {
    if (notice) {
      raise_error(error as CarpeError, false, 'updateNetwork')
    }
  }
}

export function setNetwork(network: NamedChain) {
  invoke('toggle_network', { chainId: network })
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

      incrementBackoff()
      refreshUpstreamPeerStats() // update the metadata and if we are connected
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

let current_network_profile: NetworkPlaylist = defaultPlaylist()
network_profile.subscribe((value) => {
  current_network_profile = value
})

let isTest = false
nodeEnvIsTest.subscribe((value) => {
  isTest = value
})



// Initialize and update the network settings based on fetched data
export const initNetwork = async () => {
  logger(Level.Info, 'initNetwork')
  if (!isTest) {
    const nodeList = await fetchNodeList() // Fetch node list with fallback
    const updatedNetworkPlaylist: NetworkPlaylist = {
      chain_id: current_network_profile.chain_id || NamedChain.TESTING,
      nodes: nodeList,
    }
    await updateNetwork(JSON.stringify(updatedNetworkPlaylist), false)
    await getNetwork() // Refresh network settings
    if (current_network_profile.chain_id === NamedChain.TESTING) {
      logger(Level.Info, 'Network set to TESTING mode')
    }
  }
  return true
}
