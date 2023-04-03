import { writable } from "svelte/store";
import type { CarpeError } from "./carpeError";


// one of the Errors mapped in carpeError.ts
// display these errors
// the state get switched to false whenever a new backlog submission happens.
// todo: each error needs have its own rules for clearing

export const EmptyError = {} as CarpeError;

export const displayInsufficientBalance = writable<CarpeError>(EmptyError);
export const displayWrongDifficulty = writable<CarpeError>(EmptyError);
export const displayTooManyProofs = writable<CarpeError>(EmptyError);
export const displayDiscontinuity = writable<CarpeError>(EmptyError);
export const displayInvalidProof = writable<CarpeError>(EmptyError);

export const clearDisplayErrors = () => {
  displayWrongDifficulty.set(EmptyError);
  displayTooManyProofs.set(EmptyError);
  displayDiscontinuity.set(EmptyError);
  displayInvalidProof.set(EmptyError);
  displayInsufficientBalance.set(EmptyError);
}

