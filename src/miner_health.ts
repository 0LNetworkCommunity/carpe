import { get } from "svelte/store";
import { refreshAccounts } from "./accounts";
import { backlog_in_progress, miner_loop_enabled } from "./miner";
import { getEpochRules, getLocalHeight, getTowerChainView, maybeEmitBacklogDelta, towerOnce } from "./miner_invoke";
import { refreshWaypoint } from "./networks";

export function refreshStats() {
  console.log("refreshStats");
  refreshAccounts();
  // fetch a waypoint to see if we can connect to any fullnode.
  // If successful this will set the `network.connected` bool to true. And wallet will display a view.
  refreshWaypoint();
  getTowerChainView();
  getLocalHeight();
  getEpochRules();
  maybeEmitBacklogDelta();

  if (get(miner_loop_enabled) && !get(backlog_in_progress)) {
    towerOnce();
  }
}


/// get cpu usage

/// get latest file in local
