import { WindowManager } from "@tauri-apps/api/window";
import { loadAccounts } from "./accountActions";
import { getEpochRules, getLocalHeight, getTowerChainView, maybeEmitBacklog, maybeStartMiner } from "./miner_invoke";
import { refreshWaypoint } from "./networks";

let has_run = false;

export const carpeTick = async () => {
  if (!has_run) {
    console.log("carpeTick");
    has_run = true;

    // this should be instant
    await getEpochRules()

    // also should be instant
    await getLocalHeight()
    // fetch a waypoint to see if we can connect to any fullnode.
    // If successful this will set the `network.connected` bool to true. And wallet will display a view.

    refreshWaypoint()
      .then(loadAccounts)
      .then(getTowerChainView)
      .finally(() => {
        maybeEmitBacklog();
        maybeStartMiner();
        has_run = false;
      })

    // await loadAccounts()

    // await getTowerChainView()
    //   .finally(() => { // it's possible this is a newbie, and the tower view returns error
    //     maybeEmitBacklog()
    //     // maybe a proof needs to be started
    //     // NOTE: There is no other loop. If we don't start it here, no proof will be created.
    //     maybeStartMiner()
    //   })
    
  } else {
    console.log("deduplicate tick");
  }

}
