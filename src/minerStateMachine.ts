import { writable } from "svelte/store";

export const enum MinerActivity {
  Off,
  On,
  OnDelay,
  OnProofDone,
  OnSubmitBacklog,
}


export const enum TxState {
  MakeClient,
  TxSent,
  TxOk,
  ProofComitted,
}

export const enum MinerErrors {
  ConfigFile, // Carpe not initialized correctly
  CantMakeClient, // Could not create a client connection
  PrivateKey, // could not retrieve private key from OS keyring
  TxRejectGasAmount, // Tx failed on gas error
  TxRejectNoAccount, // Tx failed on no account found
  TxRejectInvalidProof, // The proof fails VDF verification e.g. difficulty
  TxRejectTooManyProofs, // User trying to send more proofs in epoch than threshold.
}

export interface StateMachine {
  miner: MinerActivity,
  tx?: TxState,
  error?: MinerErrors,
  advance_miner(success: boolean):void,
  save():void,
}
export const machine = writable<StateMachine>({});

class M implements StateMachine {
  miner: MinerActivity;
  tx?: TxState;
  error?: MinerErrors;

  advance_miner(success: boolean): void  {
    switch(this.miner) {
      case MinerActivity.Off: {
        if (success) this.miner = MinerActivity.On
        break;
      }

      case MinerActivity.On: {
        if (success) this.miner = MinerActivity.OnDelay
        else this.miner = MinerActivity.Off
        break;
      }

      case MinerActivity.OnDelay: {
        if (success) this.miner = MinerActivity.OnProofDone
        else this.miner = MinerActivity.Off
        break;
      }

      case MinerActivity.OnProofDone: {
        if (success) MinerActivity.OnSubmitBacklog
        else this.miner = MinerActivity.Off

        break;
      }

      case MinerActivity.OnSubmitBacklog: {
        if (success) MinerActivity.On
        else this.miner = MinerActivity.On // If submit backlog fails, go back to miner start position.
        break;
      }

      default: {
        break;
      }
    }

  };

  advance_tx(success: boolean, err?: MinerActivity): void{
    switch (this.tx) {
      case TxState.MakeClient: {
        if (success) this.tx = TxState.TxSent
        break;
      }

      case TxState.TxSent: {
        if (success) this.tx = TxState.TxOk
        break;
      }

      case TxState.TxOk: {
        if (success) this.tx = TxState.ProofComitted
        break;
      }

      default: {
        break;
      }
    }
  }

  save(): void {
    machine.set(this);
  };

}
