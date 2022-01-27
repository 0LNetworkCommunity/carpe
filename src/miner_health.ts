import { getLocalHeight, getTowerChainView } from "./miner_invoke";

export function healthCheck() {
  console.log("healthcheck");
  getTowerChainView();
  getLocalHeight();
}


/// get cpu usage

/// get latest file in local

/// get on chain state