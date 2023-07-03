import { get } from 'svelte/store'
import { refreshAccounts } from './accountActions'
import { getTowerChainView, maybeEmitBacklog, maybeStartMiner } from './miner_invoke'
import { getMetadata, scanning_fullnodes } from './networks'
import { isInit } from './accounts'

let tick_in_progress = false

export const carpeTick = async () => {
  if (!tick_in_progress) {
    console.log('>>> carpeTick')
    tick_in_progress = true

    // This will check for a network connection
    // If successful this will set the `network.connected` bool to true. And wallet will display a view.
    // will also refresh peer stats looking for good peers.
    await getMetadata()

    if (!get(scanning_fullnodes) && get(isInit)) {
      // don't try to connect while we are booting up the app and looking for fullnodes
      refreshAccounts()
        .then(getTowerChainView)
        .then(() => {
          maybeEmitBacklog() // do this no matter what
          maybeStartMiner()
          tick_in_progress = false
        })
    }
  }
}
