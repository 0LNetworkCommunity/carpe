import { invoke } from '@tauri-apps/api/tauri';
import { writable, get } from 'svelte/store';
import { raise_error } from './carpeError';
import { responses } from './debug';
import { minerLoopEnabled} from "./miner";
import { notify_success, notify_error } from './carpeNotify';
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

export function loadAccounts() {
  console.log("loadAccounts");
  
  invoke('get_all_accounts')
    .then((result: object) => {
      all_accounts.set(result.accounts);
      
      // set initial signingAccount
      if (get(signingAccount).account == "" && result.accounts.length > 0) {
        signingAccount.set(result.accounts[0]);
      } else {
        /* TODO no accounts in the current network
        signingAccount.set(new_account("", "", ""));
        */
      }
      // fetch data from the chain
      refreshAccounts();
    })
    .catch((error) => raise_error(error, false, "loadAccounts"));
}

export function refreshAccounts() {
  console.log("refreshAccounts");

  isRefreshingAccounts.set(true);
  invoke('refresh_accounts')
    .then((result: object) => {
      all_accounts.set(result.accounts);
      isRefreshingAccounts.set(false);
    })
    .catch(_ => {
      isRefreshingAccounts.set(false);
    })
}

export const isCarpeInit = async () => {
  console.log("isCarpeInit");

  invoke("is_init", {})
    .then((res: boolean) => {
      responses.set(res.toString());
      isInit.set(res);
      // for testnet
      res
    })
    .catch((e) => raise_error(e, false, "isCarpeInit"));
}

export function findOneAccount(account: string): AccountEntry {
  let list = get(all_accounts);
  let found = list.find((i) => i.account == account)
  return found
}

export async function setAccount(an_address: string) {
  if (get(signingAccount).account == an_address) {
    return
  }
 
  // cannot switch profile with miner running
  if (get(minerLoopEnabled)) {
    notify_error("To switch accounts you need to turn miner off first.");
    return
  }

  let a = findOneAccount(an_address);
  signingAccount.set(a);

  await invoke("switch_profile", {
    account: a.account,
  })
  .then((res) => {
    notify_success("Account switched to " + a.nickname);
    responses.set(res);
    // for testnet
  })
    .catch((e) => raise_error(e, false, "setAccount"));
}

export function addNewAccount(account: AccountEntry) {
  let list = get(all_accounts);
  account.on_chain = false;
  list.push(account);    
  all_accounts.set(list);
}

export function checkAccountBalance(account: AccountEntry) {
  invoke('query_balance', {account: account.account})
    .then((balance: number) => {
      let list = get(all_accounts);
      account.on_chain = true;
      account.balance = Number(balance);
      list.push(account);    
      all_accounts.set(list);
    })
    .catch((e) => raise_error(e, false, "checkAccountBalance"));
}

// export async function init_account_balance(authkey: string) {
//   let list = get(all_accounts);
//   let account = list.find((a) => a.authkey == authkey);
//   invoke('query_balance', {account: account.account})
//     .then((balance: number) => {
//       console.log('>>> init balance: ' + balance);      
//       account.on_chain = true;
//       account.balance = Number(balance);
//       all_accounts.set(list);
//     })
//     .catch((e) => raise_error(e));
// }


export function get_locale(): string {
  let lang = 'en-US';
  if (window.navigator.language) {
    lang = window.navigator.language;
  };
  return lang 
}