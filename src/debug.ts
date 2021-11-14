import { invoke } from '@tauri-apps/api/tauri';
import { writable } from 'svelte/store';
import { raise_error } from './carpeError';

export const responses = writable("");

export const debugMode = writable(false);


// export const errors = writable("");

// always clear error when a response is updated
// responses.subscribe(_ => {
//   errors.set("")
// })

// // same for reponses
// errors.subscribe(_ => {
//   responses.set("")
// })

// set the Environment to debug or test
export function setDebugProdTest(env: string) {
  invoke("set_env", { env: env })
    .then((res: string) => {
      window.alert(res);
      nodeEnv.set(res);
    })
    .catch((error) => raise_error(error, false));
}

export const nodeEnv = writable<string>("");

// helper to figure out what environment we are in TEST/PROD
export function getEnv() {
  invoke("get_env", {})
    .then((res: string) => {
      // window.alert(res);
      nodeEnv.set(res);
    })
    .catch((error) => raise_error(error, false));
}
