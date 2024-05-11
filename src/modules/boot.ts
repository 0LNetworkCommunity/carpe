import { navigate } from 'svelte-navigator'
import {
  getDefaultProfile,
  isCarpeInit,
  refreshAccounts,
  isLegacy,
  getAccounts,
} from './accountActions'
import { Level, logger } from './carpeError'
import { getEnv } from './debug'
import { getMetadata, getNetwork, refreshUpstreamPeerStats, initNetwork } from './networks'
import { getVersion } from './version'
import { carpeTick } from './tick'
import { writable } from 'svelte/store'
import { isCarpeTickRunning } from './accounts'

export const isBooted = writable(false)

export const bootUp = async () => {
  logger(Level.Warn, 'webview is starting')
  await getEnv() // load env var
  getVersion() // git commit and version

  // try to migrate carpe files from v5-6 to v7
  // tryMigrate()
  if (await isCarpeInit()) {
    await initNetwork()
    // try to connect to a chain eagerly.
    // if not we will be scanning for peers below

    await getAccounts()
      .then(getDefaultProfile)
      .then(getNetwork)
      .then(getMetadata) // try to connect to a chain eagerly.
      .then(refreshAccounts) // should only try to refresh accounts if we are connected to a chain
      // .then(updateMakeWhole) // check for make whole only once on startup
      .finally(() => {
        refreshUpstreamPeerStats()
        setInterval(carpeTick, 30000) // start the carpe tick for every 30 secs, this is async
        isCarpeTickRunning.set(true)
        isBooted.set(true)
        navigate('wallet')
      })
  } else {
    logger(Level.Warn, 'carpe settings not initialized')
    await isLegacy().finally(() => {
      navigate('wallet')
    })
  }
}
