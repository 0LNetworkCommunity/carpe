import { invoke } from "@tauri-apps/api/tauri";
import { writable } from "svelte/store";
import { raise_error } from "./carpeError";


export interface TeamEntry {
  name: string,
  captain_address: string,
  description: string,
  count_members: number,
  pct_pool: number,
  estimated_epoch_reward: number,
}


export const all_teams = writable<TeamEntry[]>([]);
export const myTeam = writable<TeamEntry>();


export const mockTeam: TeamEntry = {
  name: "test",
  captain_address: "capt",
  description: "asdf",
  count_members: 1,
  pct_pool: 10,
  estimated_epoch_reward: 123
};

export function getAllTeams() {
  invoke('get_all_teams')
    .then((result: object) => {

      // set signingAccount
      if (result.teams.length > 0) {
        all_teams.set(result.teams);
      } else {
        // TODO: Handle this
      }
    })
    .catch((error) => raise_error(error));
}


export function getMyTeam() {
  invoke('get_my_team')
    .then((result: object) => {

      // set signingAccount
      if (result.my_team) {
        myTeam.set(result.my_team);
      } else {
        // TODO: Handle this
      }
    })
    .catch((error) => raise_error(error));
}