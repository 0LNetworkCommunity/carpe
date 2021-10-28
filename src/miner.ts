import { invoke } from '@tauri-apps/api/tauri';
import { get, writable } from 'svelte/store';
import { raise_error } from './carpeError';
import { responses } from './debug';


interface VDFProof {
  height: number,
  elapsed_secs: number,
  preimage: string,
  proof: string,
  difficulty: number,
  security: number
}

interface TowerStateView {
  previous_proof_hash: string,
  verified_tower_height: number, // user's latest verified_tower_height
  latest_epoch_mining: number,
  count_proofs_in_epoch: number,
  epochs_validating_and_mining: number,
  contiguous_epochs_validating_and_mining: number,
  epochs_since_last_account_creation: number
}

interface MinerStatus {
  latest_proof: VDFProof,
  on_chain: TowerStateView,
  proofs_this_session: number,
}

export const miner_status = writable<MinerStatus>({});

function incrementMinerStatus(new_proof: VDFProof): MinerStatus {
  let m = get(miner_status);
  m.latest_proof = new_proof;
  m.proofs_this_session = m.proofs_this_session + 1;

  return m;
}

function refreshOnChainData(on_chain: TowerStateView): MinerStatus {
  let m = get(miner_status);
  m.on_chain = m.on_chain;
  return m;
}


const getTowerChainView = async () => {
  invoke("get_onchain_tower_state", {})
    .then((res: TowerStateView) => {
      responses.set(JSON.stringify(res))
      refreshOnChainData(res)
    })
    .catch((e) => raise_error(e));
};
