import { get } from "svelte/store";
import { loadAccounts } from "./accountActions";
import { getTowerChainView, maybeEmitBacklog, maybeStartMiner } from "./miner_invoke";
import {getMetadata, scanning_fullnodes } from "./networks";

let tick_in_progress = false;

export const carpeTick = async () => {
  if (!tick_in_progress) {
    console.log("carpeTick");
    tick_in_progress = true;
    
    await getMetadata(); // this will check for a network connection

    // fetch a waypoint to see if we can connect to any fullnode.
    // If successful this will set the `network.connected` bool to true. And wallet will display a view.
    if (!get(scanning_fullnodes)) { // don't try to connect while we are booting up the app and looking for fullnodes
      loadAccounts()
        .then(getTowerChainView)
        .then(() => {
          maybeEmitBacklog(); // do this no matter what
          maybeStartMiner();
          tick_in_progress = false;
        });
    }

  } else {
    console.log("deduplicate tick");
  }

}
