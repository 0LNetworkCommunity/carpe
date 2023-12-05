import { get } from 'svelte/store'
import { minerLoopEnabled } from './miner'
import {
  killBacklogListener,
  startBacklogListener,
  maybeTowerOnce,
  setProofPercent,
} from './miner_invoke'
import { carpeTick } from './tick'

let looper

export const enableMining = async (): Promise<void> => {
  if (!get(minerLoopEnabled)) {
    // When the user turns on the toggle, they will be prompted for OS password.
    // the backlog listener prevents the user from having to re-enter the
    // password every time
    // a new proof needs to be submitted.

    // The backlog listener requires the OS login of the user.
    // we should only ask for this once. We ask for it when the user toggles the miner.
    // if the user has stuck proofs, we will show an error screen with a button for
    // manually triggering the backlog.

    startBacklogListener().then(carpeTick).then(maybeTowerOnce)

    looper = setInterval(() => setProofPercent(), 5000)
  }
}

export async function disableMining(): Promise<boolean> {
  // stop the event listener.
  // set mining to disabled
  minerLoopEnabled.set(false)
  killBacklogListener() // TODO: how do we prevent zombie listeners from making duplicates.
  clearInterval(looper)
  return true
}

export function toggleMining() {
  if (get(minerLoopEnabled)) {
    disableMining()
  } else {
    enableMining()
  }
}
