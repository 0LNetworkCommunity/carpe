import { navigate } from 'svelte-navigator'
import { getDefaultProfile, isCarpeInit, tryMigrate, refreshAccounts } from './accountActions'
import { Level, logger } from './carpeError'
import { getEnv } from './debug'
import { getMetadata, getNetwork, refreshUpstreamPeerStats } from './networks'
import { getVersion } from './version'
import { carpeTick } from './tick'
import { writable } from 'svelte/store'

export const isBooted = writable(false);


export const bootUp = () => {
  logger(Level.Warn, 'Webview is starting')

  getEnv() // load env var
  getVersion() // git commit and version

  // try to migrate carpe files from v5-6 to v7
  tryMigrate()

  // try to connect to a chain eagerly.
  // if not we will be scanning for peers below
  isCarpeInit()
    .then(getDefaultProfile)
    .then(getNetwork)
    .then(getMetadata) // try to connect to a chain eagerly.
    .then(refreshAccounts) // should only try to refresh accounts if we are connected to a chain
    // .then(updateMakeWhole) // check for make whole only once on startup
    .finally(() => {
      refreshUpstreamPeerStats();
      setInterval(carpeTick, 30000) // do a healthcheck, this is async
      isBooted.set(true);
      navigate('wallet');
    })

}
