import { get } from "svelte/store";
import { minerLoopEnabled } from "./miner";
import { killBacklogListener, startBacklogListener, towerOnce } from "./miner_invoke";
import { carpeTick } from "./tick";

export async function enableMining(): Promise<boolean> {

  if (!get(minerLoopEnabled)) {
    minerLoopEnabled.set(true);
    // When the user turns on the toggle, they will be prompted for OS password.
    // the backlog listener prevents the user from having to re-enter the password everytime
    // a new proof needs to be submitted.

    // The backlog listener requires the OS login of the user.
    // we should only ask for this once. We ask for it when the user toggles the miner.
    // if the user has stuck proofs, we will show an error screen with a button for
    // manually triggering the backlog.
    startBacklogListener();

    // start the first iteration of the loop.
    carpeTick();

    towerOnce();

    return true;
  }
}

export async function disableMining(): Promise<boolean> {
  // stop the envent listener.
  // set mining to disabled
  minerLoopEnabled.set(false);
  killBacklogListener(); // TODO: how do we prevent zombie listeners from makeing duplicates.
  return true;
}

export function toggleMining() {
  if (get(minerLoopEnabled)) {
    disableMining();
  } else {
    enableMining();
  };
}