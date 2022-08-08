import { invoke } from "@tauri-apps/api/tauri";
import { writable } from "svelte/store";
import { raise_error } from "./carpeError";
import { loadAccounts } from "./accountActions";


  // This matches a subset of NamedChain enum in Rust.
export enum Networks {
  MAINNET = "MAINNET",
  TESTNET = "TESTNET",
  TESTING = "TESTING",
}

export const network_profile = writable<NetworkProfile>({
  chain_id: Networks.MAINNET, // Todo, use the Network Enum
  urls: ["string"],
  waypoint: "string",
  profile: "string",
});

export const connected = writable<boolean>(true);

export const scanning_fullnodes = writable<boolean>(true);

// should match the Rust type Network Profile
export interface NetworkProfile {
  chain_id: Networks, // Todo, use the Network Enum
  urls: [string],
  waypoint: string,
  profile: string,
}

export function setNetwork(network: Networks) {
  invoke("toggle_network", { network: Networks[network] })
      .then((res: NetworkProfile) => {
        network_profile.set(res);
        // update accounts from current network
        loadAccounts(); // TODO notify as an event dependency
      })
    .catch((error) => raise_error(error, false, "setNetwork"));
}

export function getNetwork() {
  invoke("get_networks", {})
    .then((res: NetworkProfile) => network_profile.set(res))
    .catch((error) => raise_error(error, false, "getNetwork"));
}

export const refreshWaypoint = async () =>{
  console.log("refreshWaypoint");
  return invoke("refresh_waypoint", {})
    .then((res: NetworkProfile) => {
      network_profile.set(res);
      connected.set(true);
      // scanning_fullnodes.set(false);
    })
    .catch((error) => {
      connected.set(false);
      raise_error(error, true, "refreshWaypoint"); // we have a purpose-built error component for this
    })
}

export const refreshUpstreamPeerStats = async () => {
  console.log(">>> calling refresh_upstream_peer_stats");
  return invoke("refresh_upstream_peer_stats", {})
    .then((res: boolean) => {
      console.log("update peers finished");

      // network_profile.set(res);
      connected.set(res);
      scanning_fullnodes.set(false);
    })
    .catch((error) => {
      connected.set(false);
      raise_error(error, true, "refreshUpstreamPeerStats"); // we have a purpose-built error component for this
    })
}