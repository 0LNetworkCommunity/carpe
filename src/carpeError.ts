import { get, writable } from 'svelte/store';
import { notify_error } from './carpeNotify';
import { displayDiscontinuity, displayInvalidProof, displayTooManyProofs, displayWrongDifficulty } from './miner';

// // wrapper for the Tauri event.
// export interface CarpeErrorEvent {
//   msg: string,
//   payload: CarpeError
// }
export interface CarpeError {
  category: number;
  uid: number;
  msg: string;
};

export enum ErrMap {
  NoClientCx = 404,
  AccountDNE = 1004,
  WrongDifficulty = 130102,
  TooManyProofs = 130108,
  Discontinuity = 130109,
  InvalidProof = 130110,
}
// let list_errors: CarpeError;
export const carpeErrorLog = writable <[CarpeError]>([]);

export function raise_error(err: CarpeError, quiet: boolean = false, caller: string) {

  // maybe we need to take an action on this error type
  if (err.category) { // check this is the expected type
    // errAction(event.paylod);
    errAction(err);
    err.msg = `${caller}: ${err.msg}`;
    console.log(err);
  } else {
    console.log(`WARN: ${caller}: error type returned is not a CarpeError. Payload: ${err}`);
  }

  let list = get(carpeErrorLog);
  list.push(err);
  carpeErrorLog.set(list);
  console.log(list);
  let display = `Error (${err.uid}): ${err.msg}`

  if (!quiet) {
    notify_error(display);
  }
}


export function clearErrors() {
  carpeErrorLog.set([]);
}

export const errAction = (err: CarpeError) => {
  switch (err.uid) {
    case ErrMap.NoClientCx:
      // window.alert("no client connection");
      break;

    case ErrMap.AccountDNE:
      // window.alert("account does not exist");
      break;

    case ErrMap.WrongDifficulty:
      // window.alert("wrong difficulty");
      displayWrongDifficulty.set(err);
      break;
      
    case ErrMap.TooManyProofs:
      displayTooManyProofs.set(err);

      // window.alert("too many proofs submitted in epoch");
      break;

    case ErrMap.Discontinuity:
      displayDiscontinuity.set(err);
      // window.alert("your proofs are not chained. Perhaps some proofs have not been sent?");
      break;

    // TODO: this last one may never/rarely occur. 
    case ErrMap.InvalidProof:
      // window.alert("proof does not verify");
      displayInvalidProof.set(err);

      break;

    default:
      break;
  }
}