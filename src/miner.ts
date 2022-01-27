import { get, writable } from 'svelte/store';
export interface ClientTowerStatus {
  latest_proof: VDFProof,
  on_chain?: TowerStateView,
  count_proofs_this_session: number,
  local_height: number,
  cpu_usage: number,
  progress: ProofProgress,
  rules: EpochRules,
}

export interface VDFProof {
  height: number,
  elapsed_secs: number,
  preimage: string,
  proof: string,
  difficulty: number,
  security: number,
}
export interface TowerStateView {
  previous_proof_hash: string,
  verified_tower_height: number, // user's latest verified_tower_height
  latest_epoch_mining: number,
  count_proofs_in_epoch: number,
  epochs_validating_and_mining: number,
  contiguous_epochs_validating_and_mining: number,
  epochs_since_last_account_creation: number,
  actual_count_proofs_in_epoch: number,
}

export interface ProofProgress {
  time_start: number,
  previous_duration: number,
  complete: boolean,
  error: boolean,
  pct_complete: number,
}
export interface EpochRules {
  lower: number,
  upper: number,
  difficulty: number,
  security: number,
}
export const tower = writable<ClientTowerStatus>({});

export const backlog_in_progress = writable(false);

export const miner_loop_enabled = writable(false);

export function getProgess(): ProofProgress {
  return get(tower).progress
}
