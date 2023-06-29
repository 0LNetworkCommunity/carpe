import { invoke } from "@tauri-apps/api/tauri";
import { get, writable } from "svelte/store";
import { raise_error } from "./carpeError";
import { refreshAccounts } from "./accountActions";


export interface NetworkPlaylist {
  chain_id: NamedChain, // Todo, use the Network Enum
  nodes: [HostProfile],
}

export interface HostProfile {
  url: string,
  note: string,
  version: number,
  is_api: boolean,
  is_sync: boolean,
}

// chain metadata matches the index of node api
export interface IndexResponse {
  chain_id: number,
  epoch: number,
  ledger_version: number,
  oldest_ledger_version: number,
  ledger_timestamp: number,
  node_role: string,
  oldest_block_height: number,
  block_height: number,
  git_hash: string
}


  // This matches a subset of NamedChain enum in Rust.
export enum NamedChain {
  MAINNET = "MAINNET",
  TESTNET = "TESTNET",
  TESTING = "TESTING",
}

export const network_profile = writable<NetworkPlaylist>();
export const connected = writable<boolean>(true);
export const scanning_fullnodes = writable<boolean>();
export const scanning_fullnodes_backoff = writable<number>(new Date().getSeconds());
export const scanning_fullnodes_retries= writable<number>(0);

export const synced_fullnodes = writable<[string]>();
export const network_metadata = writable<IndexResponse>();
// should match the Rust type Network Profile


export function setNetwork(network: NamedChain) {
  invoke("toggle_network", { chainId: network})
    .then((res: NetworkPlaylist) => {
      network_profile.set(res);
      // update accounts from current network
      refreshAccounts();
    })
    .catch((error) => raise_error(error, false, "setNetwork"));
}

export function getNetwork() {
  invoke("get_networks", {})
    .then((res: NetworkPlaylist) => {
      console.log(res);
      network_profile.set(res)
    })
    .catch((error) => raise_error(error, false, "getNetwork"));
}

// export const refreshWaypoint = async () =>{
//   console.log("refreshWaypoint");
//   get_metadata();

//   return invoke("refresh_waypoint", {})
//     .then((res: NetworkProfile) => {
//       network_profile.set(res);
//       connected.set(true);
//       // scanning_fullnodes.set(false);
//     })
//     .catch((error) => {
//       connected.set(false);
//       raise_error(error, true, "refreshWaypoint"); // we have a purpose-built error component for this
//     })
// }



export const getMetadata = async (): Promise<IndexResponse>  => {
  console.log(">>> get_metadata");
  return invoke("get_metadata", {})
    .then((res: IndexResponse ) => {
      network_metadata.set(res);
      connected.set(true);
      // lets stop scanning for fullnodes if we got a good connection.
      scanning_fullnodes.set(false);
      scanning_fullnodes_backoff.set(new Date().getSeconds());
      return res;
    })
    .catch((e) => {
      raise_error(e, true, "getMetadata");
      network_metadata.set(null);
      connected.set(false);

      incrementBackoff();
      refreshUpstreamPeerStats(); // update the metadata and if we are connected
    });
}

export const refreshUpstreamPeerStats = async () => {
  if (new Date().getSeconds() < get(scanning_fullnodes_backoff)) {
    return;
  }

  scanning_fullnodes.set(true);
  console.log(">>> calling refresh_upstream_peer_stats");
  return invoke("refresh_upstream_peer_stats", {})
    .then((res: [string]) => { // Urls
      console.log("update peers finished");
      synced_fullnodes.set(res);
      getMetadata(); // check the metadata and if we are connected
      scanning_fullnodes.set(false);
      scanning_fullnodes_retries.set(0);
    })
    .catch((error) => {
      getMetadata(); // update the metadata and if we are connected
      raise_error(error, true, "refreshUpstreamPeerStats"); // we have a purpose-built error component for this
    })
}

export const incrementBackoff = () => {
  scanning_fullnodes_retries.set(get(scanning_fullnodes_retries) + 1);
  let new_time = new Date();
  new_time.setSeconds(new_time.getSeconds() + 2 * get(scanning_fullnodes_retries));
  scanning_fullnodes_backoff.set(new_time.getSeconds());
}