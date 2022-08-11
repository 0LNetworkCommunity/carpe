import { get } from "svelte/store";
import { loadAccounts } from "./accountActions";
import { getEpochRules, getLocalHeight, getTowerChainView, maybeEmitBacklog, maybeStartMiner } from "./miner_invoke";
import { refreshWaypoint, scanning_fullnodes } from "./networks";

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
    if (!get(scanning_fullnodes)) { // don't try to connect while we are booting up the app and looking for fullnodes
      refreshWaypoint()
        .then(loadAccounts)
        .then(getTowerChainView)
        .then(maybeEmitBacklog)
        .then(maybeStartMiner)
        .finally(() => {
          has_run = false;
        });
    }

  } else {
    console.log("deduplicate tick");
  }

}
