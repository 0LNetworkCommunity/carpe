import { get, writable } from 'svelte/store';
import { notify_error } from './carpeNotify';

export interface CarpeError {
  category: number;
  uid: number;
  msg: string;
};

// let list_errors: CarpeError;
export const carpeErrorLog = writable <[CarpeError]>([]);

export function raise_error(err: CarpeError, quiet: boolean = false, caller: string) {
  err.msg = `${caller}: ${err.msg}`;
  console.log(err);

  let list = get(carpeErrorLog);
  list.push(err);
  carpeErrorLog.set(list);
  console.log(list);
  let msg = `Error (${err.uid}): ${err.msg}`

  if (!quiet) {
    notify_error(msg);
  }
}


export function clearErrors() {
  carpeErrorLog.set([]);
}