import { writable } from 'svelte/store';
const invoke = window.__TAURI__.invoke;

export const account = writable("");
export const authkey = writable("");
export const all_accounts = writable([]);

export function get_all_accounts() {
  invoke('get_all_accounts')
    .then((result) => all_accounts.set(result.accounts))
    .catch((error) => window.alert(error));
}
