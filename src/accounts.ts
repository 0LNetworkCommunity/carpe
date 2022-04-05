import { writable } from 'svelte/store';

export interface AccountEntry {
  account: string,
  authkey: string,
  nickname: string,
  on_chain: boolean,
  balance: number,
}

export const new_account = function (account: string, authkey: string, nickname: string): AccountEntry {

  return {
    account: account,
    authkey: authkey,
    nickname: nickname,
    on_chain: false,
    balance: 0,
  }
};

export const signingAccount = writable<AccountEntry>(new_account("", "", ""));
export const mnem = writable("");
export const isInit = writable(false);
export const isRefreshingAccounts = writable(false);
export const all_accounts = writable<AccountEntry[]>([]);
export const isAccountsLoaded = writable(false);
export const accountEvents = writable({}); // TODO define interface AccountEvent