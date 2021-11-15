import { invoke } from "@tauri-apps/api/tauri";
import { getCurrent } from "@tauri-apps/api/window";
import { get } from "svelte/store";
import { raise_error } from "./carpeError";
import { responses } from "./debug";
import { backlog_in_progress, ProofProgress, tower, TowerStateView } from "./miner";


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
  await invoke("get_onchain_tower_state", {})
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

export const getLocalProofs = async () => {
  await invoke("get_local_proofs", {})
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

export const towerOnce = async () => {
  console.log("mine tower once")

  let previous_duration = 30 * 60 * 1000;
  // let previous_duration = 5 * 1000; // for test net
  let t = get(tower);
  if (t.latest_proof && t.latest_proof.elapsed_secs) {
    previous_duration = t.latest_proof.elapsed_secs * 1000
  }

  let progress: ProofProgress = {
    time_start: Date.now(),
    previous_duration,
    complete: false,
    error: false,
    pct_complete: 0
  }
  t.progress = progress;
  tower.set(t);
  current_window.emit('tower-make-proof', 'Tauri is awesome!');

};


// function incrementMinerStatus(new_proof: VDFProof): ClientTowerStatus {
//   let m = get(tower);
//   m.latest_proof = new_proof;
//   m.count_proofs_this_session = m.count_proofs_this_session + 1;
//   tower.set(m);
//   return m;
// }





export function proofError() {
  let t = get(tower);
  t.progress.error = true;
  tower.set(t);
}

export function proofComplete() {
  let t = get(tower);
  t.progress.complete = true;
  tower.set(t);
}

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

