import { get } from 'svelte/store'
import { signingAccount } from './accounts'
import { raise_error, ErrMap } from './carpeError'
import { notify_success } from './carpeNotify'
import { minerLoopEnabled, tower, minerEventReceived } from './miner'
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
  minerEventReceived.set(false)
  killBacklogListener() // TODO: how do we prevent zombie listeners from making duplicates.
  clearInterval(looper)
  tower.update((b) => {
    b.progress = null
    return b
  })
  return true
}

export async function toggleMining() {
  const account = get(signingAccount)

  // Check if the account exists and has an unlocked balance sufficient for mining
  if (!account || account.balance.unlocked < 10) {
    // Customizing the variable for the error message based on the specific condition
    let errorMessage = 'Your balance is too low to start mining.'
    if (!account) {
      errorMessage += ' Account does not exist or is not currently active on-chain.'
    } else if (account.balance.unlocked < 10) {
      errorMessage += ' You need at least 10 tokens in your wallet to start mining.'
    }

    // Construct a CarpeError object according to the CarpeError interface
    const error = {
      category: ErrMap.InsufficientBalance, // Assuming this is the correct category for this error
      uid: ErrMap.InsufficientBalance, // This should be a unique identifier, using the same value for simplicity
      msg: errorMessage,
    }

    raise_error(error, false, 'toggleMining')
    return // Exit the function to prevent further execution
  }

  // enableMining and disableMining functions
  if (get(minerLoopEnabled)) {
    disableMining()
  } else {
    enableMining()
    notify_success('Mining status toggled.') // Notify the user of successful operation
  }
}
