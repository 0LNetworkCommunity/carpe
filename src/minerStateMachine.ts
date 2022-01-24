import { Writable, writable } from "svelte/store";
import type Miner__SvelteComponent_ from "./components/miner/Miner.svelte";


export const enum MinerActivity {
  Off,
  On,
  OnDelay,
  OnProofDone,
  OnSubmitBacklog,
}


export const enum TxState {
  TxSent,
  TxCantSend,
  TxOk,
  TxRejected,
  ProofOk,
  ProofRejected,
}

export const enum ErrorState {
  ConfigFile,
  PrivateKey,
  GasAmount,
  NoAccount,
  InvalidProof,
  TooManyProofs,
}

export interface StateMachine {
  miner: MinerActivity,
  tx?: TxState,
  error?: ErrorState,
  advance(success: boolean):void,
  save():void,
}
export const machine = writable<StateMachine>({});


class M implements StateMachine {
  miner: MinerActivity;
  tx?: TxState;
  error?: ErrorState;

  advance(success: boolean): void  {
    switch(this.miner) {
      case MinerActivity.Off: {
        if (success) MinerActivity.On
        break;
      }

      case MinerActivity.On: {
        if (success) MinerActivity.OnDelay
        break;
      }

      case MinerActivity.OnDelay: {
        if (success) MinerActivity.OnProofDone
        break;
      }

      case MinerActivity.OnProofDone: {
        if (success) MinerActivity.OnSubmitBacklog
        break;
      }

      default: {
        break;
      }
    }

  };

  advance_one: () => {}

  save(): void {
    machine.set(this);
  };

}
