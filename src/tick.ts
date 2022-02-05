import { loadAccounts } from "./accounts";
import { emitBacklog, getEpochRules, getLocalHeight, getTowerChainView, maybeEmitBacklog, maybeStartMiner } from "./miner_invoke";
import { refreshWaypoint } from "./networks";

export const carpeTick = async () => {
  console.log("carpeTick");

  // this should be instant
  await getEpochRules()

  // also should be instant
  await getLocalHeight()
  // fetch a waypoint to see if we can connect to any fullnode.
  // If successful this will set the `network.connected` bool to true. And wallet will display a view.
  
  await refreshWaypoint()

  await loadAccounts()
    // .finally(refreshAccounts)
  // await refreshAccounts()

  await getTowerChainView()
    .finally(() => { // it's possible this is a newbie, and the tower view returns error
      maybeEmitBacklog()
      // maybe a proof needs to be started
      // NOTE: There is no other loop. If we don't start it here, no proof will be created.
      maybeStartMiner()
    })
}
