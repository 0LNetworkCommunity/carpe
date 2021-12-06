import { invoke } from "@tauri-apps/api/tauri";
import { writable } from "svelte/store";
import { raise_error } from "./carpeError";

export interface AppVersion {
  version: string,
  hash: string,
  head: string
}

export const app_version = writable<AppVersion>({
  version: null,
  hash: null,
  head: null
});

export function getVersion() {
  invoke("get_version")
    .then((res: AppVersion) => {
      app_version.set(res);
    })
    .catch((error) => raise_error(error, true));
}