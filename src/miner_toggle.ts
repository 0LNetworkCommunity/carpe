import { get } from "svelte/store";
import { miner_loop_enabled } from "./miner";
import { refreshStats } from "./miner_health";
import { getEpochRules, getLocalHeight, getTowerChainView, killBacklogListener, maybeEmitBacklogDelta, startBacklogListener, towerOnce } from "./miner_invoke";

export async function enableMining(): Promise<boolean> {

  if (!get(miner_loop_enabled)) {
    miner_loop_enabled.set(true);
    // When the user turns on the toggle, they will be prompted for OS password.
    // the backlog listener prevents the user from having to re-enter the password everytime
    // a new proof needs to be submitted.

    // The backlog listener requires the OS login of the user.
    // we should only ask for this once. We ask for it when the user toggles the miner.
    // if the user has stuck proofs, we will show an error screen with a button for
    // manually triggering the backlog.
    startBacklogListener();

    // start the first iteration of the loop.
    getTowerChainView();
    getLocalHeight();
    getEpochRules();
    maybeEmitBacklogDelta();
    towerOnce();

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