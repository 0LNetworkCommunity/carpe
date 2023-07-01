import { navigate } from 'svelte-navigator'
import { getDefaultProfile, isCarpeInit, migrate, refreshAccounts } from '../modules/accountActions'
import { Level, logger } from '../modules/carpeError'
import { getEnv } from '../modules/debug'
import { getMetadata, getNetwork, refreshUpstreamPeerStats } from '../modules/networks'
import { getVersion } from '../modules/version'
import { carpeTick } from '../modules/tick'

export const boot_up = () => {
  logger(Level.Warn, 'Webview is starting')

  getEnv() // load env var
  getVersion() // git commit and version

  // try to migrate carpe files from v5-6 to v7
  migrate()

  // try to connect to a chain eagerly.
  // if not we will be scanning for peers below
  isCarpeInit()
    .then(getDefaultProfile)
    .then(getNetwork)
    .then(getMetadata) // try to connect to a chain eagerly.
    .then(refreshAccounts) // should only try to refresh accounts if we are connected to a chain
    // .then(updateMakeWhole) // check for make whole only once on startup
    .finally(refreshUpstreamPeerStats) // if not we will be scanning for peers
    .finally(() => navigate('wallet'))

  setInterval(carpeTick, 30000) // do a healthcheck, this is async
}
