import { invoke } from "@tauri-apps/api/tauri";
import { getCurrent } from "@tauri-apps/api/window";
import { get } from "svelte/store";
import { isRefreshingAccounts, signingAccount } from "./accounts";
import { raise_error } from "./carpeError";
import { clearDisplayErrors } from "./carpeErrorUI";
import { notify_success } from "./carpeNotify";
import { responses } from "./debug";
import { backlogListenerReady, backlogInProgress, minerLoopEnabled, tower, minerProofComplete, minerEventReceived, backlogSubmitted, isTowerNewbie } from "./miner";

import type { ClientTowerStatus, EpochRules, ProofProgress, TowerStateView, VDFProof } from "./miner";
import { NamedChain, network_profile } from "./networks";
// import { is_empty } from "svelte/internal";

const current_window = getCurrent();


export const towerOnce = async () => {
  console.log("mine tower once")
  minerEventReceived.set(false);
  minerProofComplete.set(false);

  let chain = get(network_profile) ? get(network_profile).chain_id: NamedChain.MAINNET;
  // defaults for newbies
  let previous_duration = chain == NamedChain.TESTING
    ? 5 * 1000  // Test difficulty 
    
    : 60 * 60 * 1000; // Default to Prod difficulty, assume 60 minutes for newbies 

  // if we already have state, otherwise this is a newbie needing proof zero
  let t: ClientTowerStatus = get(tower);
  if (t && t.last_local_proof && t.last_local_proof.elapsed_secs != null) {
    previous_duration = 1 + (t.last_local_proof.elapsed_secs * 1000); // at least 1
  }

  let progress: ProofProgress = {
    proof_in_progress: t && t.local_height ? t.local_height + 1 : 1,
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
    .then((res: VDFProof) => {
      setProofComplete();

      notify_success(`Miner proof ${res.height} complete!`);
      // start the sending of txs
      // TODO: unsure why when it emits immediately thre is no action on rust side, perhaps listener startup.
      setTimeout(emitBacklog, 1000);

      // refresh local proofs view, also wait for file to be written
      setTimeout(getLocalHeight, 1000);

      responses.set(JSON.stringify(res));
      return res
    })
    .catch(e => {
      // console.log('miner_once error: ' + e);
      // disable mining when there is a proof error.
      raise_error(e, false, "towerOnce");
      minerLoopEnabled.set(false);
      proofError();
    });

};

export const maybeStartMiner = async () => {
  console.log(">>> maybeEmitBacklog");

  // this should be instant
  await getEpochRules()
    .catch(e => { console.log("error getting epoch rules", e); });

  // also should be instant
  await getLocalHeight()
    .catch(e => { console.log("error getting local height", e); });
    
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
    return towerOnce();
  }
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
  return current_window.emit("kill-backlog-listener")
  .then(_ => backlogListenerReady.set(false))
  .catch(e => raise_error(e, true, "kill-backlog-listener"));
}

export const emitBacklog = async () => {
  console.log("emit backlog");
  // NOTE: backlog is only in progress is rust emits ack-backlog-request
  clearDisplayErrors();
  current_window.emit('send-backlog', 'please...');
}

export const hasProofsPending = ():boolean => {
  let t = get(tower);
  // is the user a newbie?
  // if so, any local height needs to be submitted.
  if (t.local_height && get(isTowerNewbie)) {
    return true
  }

  // if the user has local height and has tower state
  if (t.local_height && t.on_chain && t.on_chain.verified_tower_height) {
    // only do this if there is a delta
    if ((t.local_height - t.on_chain.verified_tower_height ) > 0) {
      return true
    }
  } 
  return false
}
export const maybeEmitBacklog = async () => {
  console.log(">>> maybeEmitBacklog");
  // only emit a backlog event, if there are any proofs pending 
  // and there is no backlog already in progress
  // and finally check that the listener has started.
  if (
    hasProofsPending() &&
    !get(backlogInProgress) &&
    get(backlogListenerReady)
  ) {
    maybeEmitBacklog();
  }
}


export const getTowerChainView = async () => {
  console.log(">>> getTowerChainView");
  isRefreshingAccounts.set(true); 
  return invoke("get_onchain_tower_state", {
    account: get(signingAccount).account
  })
  .then((res: TowerStateView) => {
    let t = get(tower);
    t.on_chain = res;
    tower.set(t);
    responses.set(JSON.stringify(res));

    if (t.on_chain && t.on_chain.verified_tower_height) {
      isTowerNewbie.set(false);
    }

    isRefreshingAccounts.set(false);
  })
  .catch((e) => {
    //need to reset, otherwise may be looking at wrong account
    // let t = get(tower);
    // if t {
    //   tower.update(t => { t.on_chain = null; return t });
    //   if (t.on_chain && !t.on_chain.verified_tower_height) {
    //     isTowerNewbie.set(true);
    //   }
    // }


    raise_error(e, true, "getTowerChainView");
    isRefreshingAccounts.set(false);
  })
};

// update the `tower.local_proof`
export const getLocalHeight = async () => {
  console.log("getLocalHeight");
  return invoke("get_last_local_proof", {})
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
      raise_error(e, true, "getLocalHeight")
    })
};

export const getEpochRules = async () => {
  console.log("getEpochRules");
  invoke("get_epoch_rules", {})
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
    })
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

