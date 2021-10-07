import { writable } from 'svelte/store';

export const account = writable("");
export const authkey = writable("");

// always clear error when a response is updated
// responses.subscribe(_ => {
//   errors.set("")
// })

// // same for reponses
// errors.subscribe(_ => {
//   responses.set("")
// })