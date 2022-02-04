import { writable } from "svelte/store";
import type { CarpeError } from "./carpeError";


// one of the Errors mapped in carpeError.ts
// display these errors
// the state get switeched to false whenever a new backlog submission happens.
// todo: each error needs have its own rules for clearing

export const displayInsufficientBalance = writable<CarpeError>({});
export const displayWrongDifficulty = writable<CarpeError>({});
export const displayTooManyProofs = writable<CarpeError>({});
export const displayDiscontinuity = writable<CarpeError>({});
export const displayInvalidProof = writable<CarpeError>({});

export const clearDisplayErrors = () => {
  displayWrongDifficulty.set({});
  displayTooManyProofs.set({});
  displayDiscontinuity.set({});
  displayInvalidProof.set({});
  displayInsufficientBalance.set({});
}

