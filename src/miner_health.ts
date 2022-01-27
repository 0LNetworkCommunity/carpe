import { getEpochRules, getLocalHeight, getTowerChainView } from "./miner_invoke";

export function refreshStats() {
  console.log("refreshStats");
  getTowerChainView();
  getLocalHeight();
  getEpochRules();
}


/// get cpu usage

/// get latest file in local
