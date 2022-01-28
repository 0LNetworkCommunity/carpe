import { get } from "svelte/store";
import { backlog_in_progress, miner_loop_enabled } from "./miner";
import { getEpochRules, getLocalHeight, getTowerChainView, towerOnce } from "./miner_invoke";

export function refreshStats() {
  console.log("refreshStats");
  getTowerChainView();
  getLocalHeight();
  getEpochRules();

  if (get(miner_loop_enabled) && !get(backlog_in_progress)) {
    towerOnce();
  }
}


/// get cpu usage

/// get latest file in local
