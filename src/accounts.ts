import { writable } from 'svelte/store';

export interface AccountEntry {
  account: string,
  authkey: string,
  nickname: string,
  on_chain: any, // null or bool
  balance: any, // null or number
  unlocked_balance: any, // null or number
}

export const new_account = function (account: string, authkey: string, nickname: string): AccountEntry {

  return {
    account: account,
    authkey: authkey,
    nickname: nickname,
    on_chain: null,
    balance: null,
    unlocked_balance: null,
  }
};

export const signingAccount = writable<AccountEntry>(new_account("", "", ""));
export const mnem = writable("");
export const isInit = writable(false);
export const isRefreshingAccounts = writable(false);
export const all_accounts = writable<AccountEntry[]>([]);
export const isAccountsLoaded = writable(false);
export const accountEvents = writable({}); // TODO define interface AccountEvent
export const showUnlockedBalance = writable(false);
export const makeWhole = writable({});