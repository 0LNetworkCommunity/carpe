import { invoke } from "@tauri-apps/api/tauri";
import { getCurrent } from "@tauri-apps/api/window";
import { now } from "svelte/internal";
import { get } from "svelte/store";
import { isRefreshingAccounts, signingAccount } from "./accounts";
import { raise_error } from "./carpeError";
import { clearDisplayErrors } from "./carpeErrorUI";
import { notify_success } from "./carpeNotify";
import { responses } from "./debug";
import { backlogListenerReady, backlogInProgress, EpochRules, minerLoopEnabled, ProofProgress, tower, minerProofComplete, minerEventReceived, backlogSubmitted, VDFProof, TowerStateView } from "./miner";
import { network_profile } from "./networks";

const current_window = getCurrent();


export const towerOnce = async () => {
  console.log("mine tower once")
  minerEventReceived.set(false);
  minerProofComplete.set(false);

  let previous_duration = get(network_profile).chain_id == "Mainnet"
    ? 30 * 60 * 1000 // Prod difficulty
    : 5 * 1000;      // Test difficulty

  let t = get(tower);
  if (t.last_local_proof && t.last_local_proof.elapsed_secs) {
    previous_duration = t.last_local_proof.elapsed_secs * 1000;
  }

  let progress: ProofProgress = {
    proof_in_progress: t.local_height ? t.local_height + 1 : 1,
    time_start: Date.now(),
    previous_duration,
    complete: false,
    error: false,
    time_elapsed: 0,
    pct_complete: 0,
  }
  t.progress = progress;
  tower.set(t);

  // This is a long running async call.
  // when miner_once returnsm, it's with the response of the proof, or error.
  return invoke("miner_once", {})
    .then(res => {
      console.log('miner_once proof completed' + res);
      responses.set(res as string);
      setProofComplete();

      // start the sending of txs
      // emitBacklog();

      return res
    })
    .catch(e => {
      console.log('>>> miner_once error: ' + e);
      // disable mining when there is a proof error.
      minerLoopEnabled.set(false);
      raise_error(e, false, "invoke");
      proofError()
      return false
    });

};

export const maybeStartMiner = () => {
  // maybe try to start a new proof
  console.log("maybeStartMiner");

  let t = get(tower);
  let proofComplete = (t && t.progress && t.progress.complete);

  if (
    // user must have set mining switch on
    get(minerLoopEnabled) &&
    // there should be no backlog in progress
    !get(backlogInProgress) &&
    // only try to restart if a proof has completed.
    proofComplete
  ) {
    towerOnce();
  };
}

// Only the backlog service needs a listener
export const startBacklogListener = async () => {
  await invoke("start_backlog_sender_listener", {})
    .then((res) => {
      responses.set(res as string);
      backlogListenerReady.set(true);
      return res
    })
    .catch((e) => raise_error(e, false, "startBacklogListener"));
}

// Stop listening on the rust side for new requests to mine a proof.
export const killBacklogListener = async () => {
  console.log("kill listener");
  return current_window.emit("kill-backlog-listener").then(_ => backlogListenerReady.set(false));
}

export const emitBacklog = async () => {
  console.log("emit backlog");
  backlogInProgress.set(true);
  clearDisplayErrors();
  current_window.emit('send-backlog', 'please...');
}

export const maybeEmitBacklogDelta = async () => {
  console.log("maybeEmitBacklogDelta");
  if (get(backlogListenerReady)) {
    let t = get(tower);
    if (t.local_height && t.on_chain.verified_tower_height) {
      // only do this if there is a delta
      if ((t.local_height - t.on_chain.verified_tower_height) > 0) {
        emitBacklog();
      }
    } else if (t.local_height && !t.on_chain) {
      // of if this is the first proof.
      emitBacklog();
    }
  } else {
    console.log("backlog listener not ready")
  }
}


export const getTowerChainView = async () => {
  console.log("getTowerChainView");
  isRefreshingAccounts.set(true);

  let a = get(signingAccount).account
  if (a) {
    await invoke("get_onchain_tower_state", {
      account: a
    })
    .then((res: TowerStateView) => {
      let t = get(tower);
      t.on_chain = res;
      tower.set(t);
      responses.set(JSON.stringify(res));
      isRefreshingAccounts.set(false);
    })
    .catch((e) => {
      //need to reset, otherwise may be looking at wrong account
      let t = get(tower);
      t.on_chain = {};
      tower.set(t);
      raise_error(e, true, "getTowerChainView");
      isRefreshingAccounts.set(false);

    });
  }
};

// update the `tower.local_proof`
export const getLocalHeight = async () => {
  console.log("getLocalHeight");
  await invoke("get_last_local_proof", {})
    .then((res: VDFProof) => {
      // console.log(res);
      // if res.
      let t = get(tower);
      t.last_local_proof = res;
      t.local_height = res.height;
      tower.set(t);
      responses.set(JSON.stringify(res));
    })
    .catch((e) => {
      let t = get(tower);
      t.local_height = -1;
      tower.set(t);
      raise_error(e, true, "getLocalHeight")
    });
};

export const getEpochRules = async () => {
  console.log("getEpochRules");
  await invoke("get_epoch_rules", {})
    .then((res: EpochRules) => {
      // console.log(res);
      // if res.
      let t = get(tower);
      t.rules = res;
      tower.set(t);
      responses.set(JSON.stringify(res));
    })
    .catch((e) => {
      raise_error(e, true, "getEpochRules")
    });
};



export function proofError() {
  let t = get(tower);
  t.progress.error = true;
  tower.set(t);
}

export function setProofComplete() {
  let t = get(tower);
  t.progress.complete = true;
  tower.set(t);

  minerProofComplete.set(true);
}

export function setProofProgres() {
  let t = get(tower);
  let done = get(minerProofComplete);
  if (t.progress && !done) {
    t.progress.time_elapsed = Date.now() - t.progress.time_start;
    t.progress.pct_complete = t.progress.time_elapsed / t.progress.previous_duration;
    tower.set(t);
  }
}


// submit any transactions that are in the backlog. Proofs that have been mined but for any reason were not committed.
export const submitBacklog = async () => {
  console.log('submitBacklog called');
  clearDisplayErrors();
  backlogInProgress.set(true);
  invoke("submit_backlog", {})
    .then(res => {
      backlogInProgress.set(false);
      backlogSubmitted.set(true);
      console.log('submit_backlog response: ' + res);
      responses.set(res as string);
      notify_success("Backlog submitted");
      return res
    })
    .catch(e => {
      backlogInProgress.set(false);
      backlogSubmitted.set(false);
      console.log('>>> submit_backlog error: ' + e);
      raise_error(e, false, "submitBacklog");
    });
}

// For debugging or rescue purposes. Sometimes the user may have a proof that for some reason was not committed to the chain.

export const submitProofZero = async () => {
  backlogInProgress.set(true);
  invoke("submit_proof_zero", {})
    .then((res) => {
      console.log(res);
      responses.set(res as string);
      return res
    })
    .catch((e) => {
      raise_error(e, false, "submitProofZero");
    });
}

