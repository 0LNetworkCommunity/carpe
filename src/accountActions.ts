import { invoke } from '@tauri-apps/api/tauri';
import { get } from 'svelte/store';
import { raise_error } from './carpeError';
import { responses } from './debug';
import { minerLoopEnabled, tower} from "./miner";
import { notify_success, notify_error } from './carpeNotify';
import { AccountEntry, all_accounts, isInit, isRefreshingAccounts, mnem, signingAccount, accountEvents } from './accounts';

export const loadAccounts = async () => {
  console.log("loadAccounts");
  
  return invoke('get_all_accounts')
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
      return refreshAccounts();
    })
    .catch((error) => raise_error(error, false, "loadAccounts"))
}

export const refreshAccounts = async () => {
  console.log("refreshAccounts");

  isRefreshingAccounts.set(true);
  return invoke('refresh_accounts')
    .then((result: object) => { // TODO make this the correct return type

      all_accounts.set(result.accounts);

      result.accounts.forEach(el => {
        tryRefreshSignerAccount(el);
      });
      isRefreshingAccounts.set(false);
    })
    .catch(_ => {
      isRefreshingAccounts.set(false);
    })
}

export function tryRefreshSignerAccount(newData: AccountEntry) {
  let a = get(signingAccount).account;
  if (newData.account == a) {
    signingAccount.set(newData);
  }
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

export const setAccount = async (an_address: string) =>{
  if (get(signingAccount).account == an_address) {
    return
  }
 
  // cannot switch profile with miner running
  if (get(minerLoopEnabled)) {
    notify_error("To switch accounts you need to turn miner off first.");
    return
  }

  let a = findOneAccount(an_address);
  

  invoke("switch_profile", {
    account: a.account,
  })
  .then((res) => {
    responses.set(res);
    notify_success("Account switched to " + a.nickname);
    // reset user data
    signingAccount.set(a);
    tower.set({});
    mnem.set("");
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

export function getAccountEvents(account: AccountEntry) {
  const address = account.account;
  
  invoke('get_account_events', {account: address.toUpperCase()})
    .then((events: Array<T>) => {
      let all = get(accountEvents);
      all[address] = events.reverse();
      accountEvents.set(all);
    })
    .catch((e) => raise_error(e, false, "getAccountEvents"));
}

export function get_locale(): string {
  let lang = 'en-US';
  if (window.navigator.language) {
    lang = window.navigator.language;
  };
  return lang 
}