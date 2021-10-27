import { writable, get } from 'svelte/store';
import { raise_error } from './carpeError';
import { responses } from './debug';
const invoke = window.__TAURI__.invoke;

export interface AccountEntry {
  account: string,
  authkey: string,
  nickname: string,
  balance: number,
}



export const new_account = function (account: string, authkey: string, nickname: string): AccountEntry {
  
  return  {
    account: account,
    authkey: authkey,
    nickname: nickname,
    balance: 0,
  }
};

export const account = writable <AccountEntry>(new_account("", "", ""));

export const mnem = writable("");

// export const account = writable("");
// export const authkey = writable("");
export const all_accounts = writable<AccountEntry[]>([]);

export function get_all_accounts() {
  invoke('get_all_accounts')
    .then((result) => all_accounts.set(result.accounts))
    .catch((error) => raise_error(error));
}


export function find_one_account(account: string): AccountEntry {
  let list = get(all_accounts);
  let found = list.find((i) => i.account == account)
  return found
  
}

export function setAccount(an_address: string) {
  let a = find_one_account(an_address);
  account.set(a);

  invoke("switch_profile", {
    account: a.account,
  })
    .then((res) => responses.set(res))
    .catch((e) => raise_error(e));
}