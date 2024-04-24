import { get } from 'svelte/store'
import { getAccounts, refreshAccounts } from './accountActions'
// import { getLocalHeight, getTowerChainView, maybeEmitBacklog } from './miner_invoke'
import { getMetadata } from './networks'
import { isInit } from './accounts'
import { Level, logger } from './carpeError'

let tick_in_progress = false

export const carpeTick = async () => {
  // you should always try to refresh accounts, even on error
  getAccounts()

  if (!tick_in_progress) {
    logger(Level.Info, 'carpeTick')

    // This will check for a network connection
    // If successful this will set the `network.connected` bool to true. And wallet will display a view.
    // will also refresh peer stats looking to find good peers.
    if (get(isInit)) {
      tick_in_progress = true

      // don't try to connect while we are booting up the app and looking for fullnodes

      getMetadata()
        .then(refreshAccounts)
        // tower things
        // .then(getTowerChainView)
        // .then(getLocalHeight)
        // .then(maybeEmitBacklog)
        .finally(() => (tick_in_progress = false))
    }
  }
}
