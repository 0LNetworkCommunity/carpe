import { writable } from "svelte/store";
import type { CarpeError } from "./carpeError";


// one of the Errors mapped in carpeError.ts
// display these errors
// the state get switeched to false whenever a new backlog submission happens.
// todo: each error needs have its own rules for clearing

export const displayInsufficientBalance = writable<CarpeError>(null);
export const displayWrongDifficulty = writable<CarpeError>(null);
export const displayTooManyProofs = writable<CarpeError>(null);
export const displayDiscontinuity = writable<CarpeError>(null);
export const displayInvalidProof = writable<CarpeError>(null);

export const clearDisplayErrors = () => {
  displayWrongDifficulty.set(null);
  displayTooManyProofs.set(null);
  displayDiscontinuity.set(null);
  displayInvalidProof.set(null);
  displayInsufficientBalance.set(null);
}

