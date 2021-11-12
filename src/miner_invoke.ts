import { invoke } from "@tauri-apps/api/tauri";
import { getCurrent } from "@tauri-apps/api/window";
import { get } from "svelte/store";
import { raise_error } from "./carpeError";
import { responses } from "./debug";
import { backlog_in_progress, tower, TowerStateView } from "./miner";


const current_window = getCurrent();
// Starts a tower listener on the Rust side.
// The listener will catch events sent from the window.
// this listener will wait events that trigger a new proof to be built.
// TODO: One major issue is that multiple listeners could be created. If so multiple proofs would be started on every event. We need additional checks here.
export const startTowerListener = async () => {
  await invoke("start_tower_listener", {})
    .then((res) => {
      console.log("tower listener response");
      console.log(res);
      responses.set(res as string);
      return res
    })
    .catch((e) => raise_error(e, false));
}


// Stop listening on the rust side for new requests to mine a proof.
export const killTowerListener = async () => {
  console.log("kill listener");
  return current_window.emit("kill-listener")
}

export const getTowerChainView = async () => {
  invoke("get_onchain_tower_state", {})
    .then((res: TowerStateView) => {
      console.log(res);
      // if res.
      let t = get(tower);
      t.on_chain = res;
      tower.set(t);
      responses.set(JSON.stringify(res));
    })
    .catch((e) => {
      let t = get(tower);
      t.on_chain = {};
      tower.set(t);

      raise_error(e, true)
    });
};

// submit any transactions that are in the backlog. Proofs that have been mined but for any reason were not committed.
export const submitBacklog = async () => {
  backlog_in_progress.set(true);
  invoke("submit_backlog", {})
    .then((res) => {
      console.log("backlog response");
      console.log(res);
      responses.set(res as string);
      backlog_in_progress.set(false);
      return res
    })
    .catch((e) => {
      raise_error(e, false);
      backlog_in_progress.set(false);
    });
}


// For debugging or rescue purposes. Sometimes the user may have a proof that for some reason was not committed to the chain.

export const submitProofZero = async () => {
  backlog_in_progress.set(true);
  invoke("debug_submit_proof_zero", {})
    .then((res) => {
      console.log(res);
      responses.set(res as string);
      return res
    })
    .catch((e) => {
      raise_error(e, false);
    });
}

