import { writable } from 'svelte/store';
import { raise_error } from './carpeError';
const invoke = window.__TAURI__.invoke;

interface AccountEntry {
  address: string,
  authkey: string,
  nickname: string,
  balance: number,
}

export const account = writable("");
export const authkey = writable("");
export const all_accounts = writable<AccountEntry[]>([]);

export function get_all_accounts() {
  invoke('get_all_accounts')
    .then((result) => all_accounts.set(result.accounts))
    .catch((error) => raise_error(error));
}
