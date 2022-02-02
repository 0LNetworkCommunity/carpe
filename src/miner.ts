import { get, writable } from 'svelte/store';
import type { CarpeError } from './carpeError';
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
  pct_complete: number, // TODO: this is duplicated with minerProofComplete in miner.ts
}
export interface EpochRules {
  lower: number,
  upper: number,
  difficulty: number,
  security: number,
}
export const tower = writable<ClientTowerStatus>({});

// is set to true if when the app starts and Rust emits the backlog-listener-ready event.
export const backlogListenerReady = writable(false);

// is set to true when the user toggles the miner-toggle
// is set to false when the user manually sets to off, or the mineOnce async invocation returns error.
export const minerLoopEnabled = writable(false);

// is set to true when the window.emit event is received
// is set to false when a new proof starts
export const minerEventReceived = writable(false);

// is set to true when the asyc MineOnce returns a proof
// is set to false when a new proof starts 
export const minerProofComplete = writable(false);

// is set to true when a backlog event is emmitted, or invoking the async backlog command
// is set to false when a backlog-success or -fail event is received 
export const backlogInProgress = writable(false);

// is set to true when a backlog-success event is emmitted from rust, or when the async invoked command returns
// is set to false when a backlog-fail event is received 
export const backlogSubmitted = writable(false);



// one of the Errors mapped in carpeError.ts
// display these errors
// the state get switeched to false whenever a new backlog submission happens.
// todo: each error needs have its own rules for clearing
export const displayWrongDifficulty = writable <CarpeError>({});
export const displayTooManyProofs = writable<CarpeError>({});
export const displayDiscontinuity = writable<CarpeError>({});
export const displayInvalidProof = writable<CarpeError>({});

export const clearDisplayErrors = () => {
  displayWrongDifficulty.set({});
  displayTooManyProofs.set({});
  displayDiscontinuity.set({});
  displayInvalidProof.set({});
}


export function getProgess(): ProofProgress {
  return get(tower).progress
}
