import { invoke } from '@tauri-apps/api/tauri';
import { get, writable } from 'svelte/store';
import { raise_error } from './carpeError';
import { responses } from './debug';

export interface VDFProof {
  height: number,
  elapsed_secs: number,
  preimage: string,
  proof: string,
  difficulty: number,
  security: number
}

export interface TowerStateView {
  previous_proof_hash: string,
  verified_tower_height: number, // user's latest verified_tower_height
  latest_epoch_mining: number,
  count_proofs_in_epoch: number,
  epochs_validating_and_mining: number,
  contiguous_epochs_validating_and_mining: number,
  epochs_since_last_account_creation: number
}

export interface ClientTowerStatus {
  latest_proof: VDFProof,
  on_chain: TowerStateView,
  count_proofs_this_session: number,
}

export const tower = writable<ClientTowerStatus>({});


export const mockTowerOnce = async () => {
  console.log("mine tower once")

  let previous_duration = 5 * 1000;
  let t = get(tower);
  if (t.latest_proof && t.latest_proof.elapsed_secs) {
    previous_duration = t.latest_proof.elapsed_secs * 1000
  }
  
  let progress: ProofProgress =  {
    time_start: Date.now(),
    previous_duration,
  }
  proofState.set(progress);

  invoke("mock_build_tower", { success: true })
    .then((res) => {
      console.log("tower response");
      console.log(res);
      responses.set(res);
    })
    .catch((e) => raise_error(e));
};


function incrementMinerStatus(new_proof: VDFProof): ClientTowerStatus {
  let m = get(tower);
  m.latest_proof = new_proof;
  m.count_proofs_this_session = m.count_proofs_this_session + 1;
  tower.set(m);
  return m;
}

function refreshOnChainData(on_chain: TowerStateView): ClientTowerStatus {
  let m = get(tower);
  m.on_chain = on_chain;
  tower.set(m);
  return m;
}


export const getTowerChainView = async () => {
  invoke("get_onchain_tower_state", {})
    .then((res: TowerStateView) => {
      console.log(res);
      refreshOnChainData(res);
      responses.set(res);
      
    })
    .catch((e) => raise_error(e));
};


export const miner_loop_enabled = writable(false);

export function toggleMining() {
  let enabled = get(miner_loop_enabled)
  if (enabled) {
    miner_loop_enabled.set(false);
  } else if (!enabled) {
    miner_loop_enabled.set(true);
  };
  console.log(get(miner_loop_enabled));
}

export interface ProofProgress {
  time_start: number,
  previous_duration: number,
}

export const proofState = writable<ProofProgress>({})
