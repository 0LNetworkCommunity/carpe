import { get, writable } from 'svelte/store'
export interface ClientTowerStatus {
  last_local_proof?: VDFProof
  on_chain?: TowerStateView
  local_height?: number
  progress?: ProofProgress
  rules?: EpochRules
}

export interface VDFProof {
  height: number
  elapsed_secs: number
  preimage: string
  proof: string
  difficulty: number
  security: number
}
export interface TowerStateView {
  previous_proof_hash: string
  verified_tower_height: number // user's latest verified_tower_height
  latest_epoch_mining: number
  count_proofs_in_epoch: number
  epochs_validating_and_mining: number
  contiguous_epochs_validating_and_mining: number
  epochs_since_last_account_creation: number
}

export interface ProofProgress {
  proof_in_progress: number
  time_start: number
  previous_duration: number
  complete: boolean // TODO: this is duplicated with minerProofComplete in miner.ts
  error: boolean
  time_elapsed: number
  pct_complete: number
}
export interface EpochRules {
  lower: number
  upper: number
  difficulty: number
  security: number
}
export const tower = writable<ClientTowerStatus>({})
export const resetTowerStatus = () => tower.set({})

export const canMine = (): boolean => {
  return (
    get(minerLoopEnabled) && // user wants to mine
    get(backlogListenerReady) && // the backlog listener started
    !get(minerEventReceived) && // there isn't a miner event in progress
    !get(backlogInProgress)
  ) // there is no backlog in progress
  // we don't care if the backlog was successful last time
}
// is set to true when the user toggles the miner-toggle
// is set to false when the user manually sets to off, or the mineOnce async invocation returns error.
export const minerLoopEnabled = writable(false)

// is set to true if when the app starts and Rust emits the backlog-listener-ready event.
export const backlogListenerReady = writable(false)

// is set to true when the window.emit event is received
// is set to false when a new proof starts
export const minerEventReceived = writable(false)

// is set to true when the async MineOnce returns a proof
// is set to false when a new proof starts
export const minerProofComplete = writable(false)

// is set to true when a backlog event is emmitted, or invoking the async backlog command
// is set to false when a backlog-success or -fail event is received
export const backlogInProgress = writable(false)

// is set to true when a backlog-success event is emmitted from rust, or when the async invoked command returns
// is set to false when a backlog-fail event is received
export const backlogSubmitted = writable(false)

export const isTowerNewbie = writable(true)

export function getProgress(): ProofProgress {
  return get(tower).progress
}
