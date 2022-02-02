import { invoke } from '@tauri-apps/api/tauri';
import { writable, get } from 'svelte/store';
import { raise_error } from './carpeError';
import { notify_success } from './carpeNotify';

export const responses = writable("");
export const debugMode = writable(false);

// set the Environment to debug or test
export function setDebugProdTest(env: string) {
  invoke("set_env", { env: env })
    .then((res: string) => {
      notify_success(`switched to ${res} mode`);
      nodeEnv.set(res);
    })
    .catch((error) => raise_error(error, false, "setDebugProdTest"));
}

export const nodeEnv = writable<string>("");
export const nodeEnvIsTest = writable<boolean>(false);

// helper to figure out what environment we are in TEST/PROD
export function getEnv() {
  console.log("getEnv");

  invoke("get_env", {})
    .then((res: string) => {
      console.log("get env")
      console.log(res);
      nodeEnv.set(res);
      if (res == "test") { nodeEnvIsTest.set(true) }
    })
    .catch((error) => raise_error(error, false, "getEnv"));
}

export function debugModeToggle() {
  debugMode.set(!get(debugMode));
}