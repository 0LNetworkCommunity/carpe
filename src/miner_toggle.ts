import { get } from "svelte/store";
import { miner_loop_enabled, tower } from "./miner";
import { refreshStats } from "./miner_health";
import { killBacklogListener, startBacklogListener, towerLoop } from "./miner_invoke";

export async function enableMining(): Promise<boolean> {

  if (!get(miner_loop_enabled)) {
    miner_loop_enabled.set(true);
    // When the user turns on the toggle, they will be prompted for OS password.
    // the backlog listener prevents the user from having to re-enter the password everytime
    // a new proof needs to be submitted.
    // The backlog listener then should be started at the time the user toggles the mining.
    startBacklogListener();

    // start the first iteration of the loop.
    refreshStats();

    return true;
  }
}

export async function disableMining(): Promise<boolean> {
  // stop the envent listener.
  // set mining to disabled
  miner_loop_enabled.set(false);
  killBacklogListener(); // TODO: how do we prevent zombie listeners from makeing duplicates.
  return true;
}

export function toggleMining() {
  if (get(miner_loop_enabled)) {
    disableMining();
  } else {
    enableMining();
  };
}

// function isInProgress(): boolean {
//   let t = get(tower);
//   if (
//     t.progress.time_start &&
//     t.progress.time_start > 0 &&
//     !t.progress.complete &&
//     !t.progress.error
//   ) {
//     return true
//   }
//   return false;
// }