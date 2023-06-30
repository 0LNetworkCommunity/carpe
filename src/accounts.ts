import { writable } from 'svelte/store';
export interface Profile {
  account: string,
  auth_key: string,
  nickname: string,
  on_chain: boolean, // null or bool
  balance: number, // null or number
  locale?: string, // Todo: tauri now offers locale of the OS
}

export const new_account = (account: string, authkey: string, nickname: string): Profile => {

  return {
    account: account,
    auth_key: authkey,
    nickname: nickname,
    on_chain: false,
    balance: 0,
  }
};

export const signingAccount = writable<Profile>();
export const mnem = writable<string>();
export const isInit = writable(false);
export const isRefreshingAccounts = writable(false);
export const allAccounts = writable<Profile[]>([]);
export const isAccountRefreshed = writable(false);
export const accountEvents = writable<object>(); // TODO define interface AccountEvent
export const makeWhole = writable<object>();



