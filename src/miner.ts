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
  proofs_this_session: number,
}

export const tower = writable<ClientTowerStatus>({});

function incrementMinerStatus(new_proof: VDFProof): ClientTowerStatus {
  let m = get(tower);
  m.latest_proof = new_proof;
  m.proofs_this_session = m.proofs_this_session + 1;
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
