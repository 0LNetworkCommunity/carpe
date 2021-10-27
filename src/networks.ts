import { get, writable } from "svelte/store";


  // Note: the string initialized should match the enum in Rust, networks.rs, to easily de/serialize
export enum Networks {
  Mainnet = "Mainnet",
  Rex = "Rex"
}

// should match the Rust type Network Profile
export interface NetworkProfile {
  chain_id: string, // Todo, use the Network Enum
  url: string,
  waypoint: string,
  profile: string,
}


export const network_profile = writable<NetworkProfile>({
  chain_id: "string", // Todo, use the Network Enum
  url: "string",
  waypoint: "string",
  profile: "string",
});



export function get_profile(account: string): NetworkProfile {
  return get(network_profile)
}