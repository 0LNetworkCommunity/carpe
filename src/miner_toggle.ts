import { get } from "svelte/store";
import { miner_loop_enabled, tower } from "./miner";
import { killTowerListener, startBacklogListener, towerLoop } from "./miner_invoke";

export async function enableMining(): Promise<boolean> {
  // careful to not start the miner twice.
  // the miner may be turned off, but a proof may still be running in the background.
  // if (isInProgress()) return false;

  // start the event listener on the rust side.
  // wait for it to be ready
  // let started = await startTowerListener()
  //   .then((r) => {
  //     towerOnce();
  //     miner_loop_enabled.set(true);
  //     return true;
  //   })
  //   .catch(e => { return false })
  // return started;

  
  miner_loop_enabled.set(true);
  // When the user turns on the toggle, they will be prompted for OS password.
  // the backlog listener prevents the user from having to re-enter the password everytime
  // a new proof needs to be submitted.
  // The backlog listener then should be started at the time the user toggles the mining.
  startBacklogListener();
  // towerLoop needs the "enabled" bit == true
  towerLoop();
  return true;
}

export async function disableMining(): Promise<boolean> {
  // stop the envent listener.

  // await killTowerListener()
  //   .catch(e => {
  //     raise_error(e, false);
  //     return false
  //   });
  // set mining to disabled
  miner_loop_enabled.set(false);
  killTowerListener();
  return true;
}

export function toggleMining() {
  let enabled = get(miner_loop_enabled)
  if (enabled) {
    disableMining();
  } else {
    enableMining();
  };
}

function isInProgress(): boolean {
  let t = get(tower);
  if (
    t.progress.time_start &&
    t.progress.time_start > 0 &&
    !t.progress.complete &&
    !t.progress.error
  ) {
    return true
  }
  return false;
}