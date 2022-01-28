import { invoke } from '@tauri-apps/api/tauri';
import { writable, get } from 'svelte/store';
import { raise_error } from './carpeError';

export const responses = writable("");
export const debugMode = writable(false);

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
export const nodeEnvIsTest = writable<boolean>(false);

// helper to figure out what environment we are in TEST/PROD
export function getEnv() {
  invoke("get_env", {})
    .then((res: string) => {
      nodeEnv.set(res);
      if (res == "test") { nodeEnvIsTest.set(true) }
    })
    .catch((error) => raise_error(error, false));
}

export function debugModeToggle() {
  debugMode.set(!get(debugMode));
}