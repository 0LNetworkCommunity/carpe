import { get } from "svelte/store";
import { refreshAccounts } from "./accounts";
import { backlogInProgress, minerLoopEnabled } from "./miner";
import { getEpochRules, getLocalHeight, getTowerChainView, maybeEmitBacklogDelta, maybeStartMiner, towerOnce } from "./miner_invoke";
import { refreshWaypoint } from "./networks";

export function refreshStats() {
  console.log("refreshStats");
  refreshAccounts();
  // fetch a waypoint to see if we can connect to any fullnode.
  // If successful this will set the `network.connected` bool to true. And wallet will display a view.
  console.log("refreshWaypoint");
  refreshWaypoint();

  console.log("getTowerChainView");
  getTowerChainView();

  console.log("getLocalHeight");
  getLocalHeight();

  console.log("getEpochRules");
  getEpochRules();

  console.log("maybeEmitBacklogDelta");
  maybeEmitBacklogDelta();

  // maybe a proof needs to be started
  // NOTE: There is no other loop. If we don't start it here, no proof will be created.
  console.log("maybeStartMiner");
  maybeStartMiner();

  
}


/// get cpu usage

/// get latest file in local
