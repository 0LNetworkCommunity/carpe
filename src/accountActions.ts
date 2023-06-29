import { get } from 'svelte/store';
import { invoke } from '@tauri-apps/api/tauri';
import { raise_error } from './carpeError';
import { responses } from './debug';
import {ClientTowerStatus, minerLoopEnabled, tower} from "./miner";
import { notify_success, notify_error } from './carpeNotify';
import { Profile, allAccounts, isInit, isRefreshingAccounts, mnem, signingAccount, isAccountRefreshed, makeWhole } from './accounts';
import { navigate } from 'svelte-navigator';

// export const loadAccounts = async () => { 
//   console.log(">>> call loadAccounts");
//   // fetch data from local DB
//   return invoke('refresh_accounts')
//     .then((result: { accounts: [AccountEntry] }) => {
//       all_accounts.set(result.accounts);
//       // if we have never set the signing account
//       if (get(signingAccount).account == "" && result.accounts.length > 0) {
//         // set initial signingAccount
//         let first = result.accounts[0];
//         setAccount(first.account, false);
//       }

//       if (!get(isAccountRefreshed)) {
//         isAccountRefreshed.set(true);
//       }

//       updateMakeWhole(result.accounts);

//       // fetch data from the chain
//       // return refreshAccounts();
//     })
//     .catch((error) => raise_error(error, false, "loadAccounts"))
// }

export const refreshAccounts = async () => {
  isRefreshingAccounts.set(true);
  invoke('refresh_accounts')
    .then((result: [Profile]) => { // TODO make this the correct return type
      isRefreshingAccounts.set(false);
      allAccounts.set(result);

        // set initial signingAccount
      if (get(signingAccount).account = ""  && result.length > 0) {
        let first = result[0];
        setAccount(first.account, false);
      }

      if (!get(isAccountRefreshed)) {
        isAccountRefreshed.set(true);
      }

      // result.accounts.forEach(el => {
      //   tryRefreshSignerAccount(el);
      // });
      result
    })
    .catch( e => {
      raise_error(e, true, "refresh_accounts");
      isRefreshingAccounts.set(false);
      if (!get(isAccountRefreshed)) {
        isAccountRefreshed.set(true);
      }
    })
}

export enum InitType {
  Mnem,
  PriKey,
}

export const handleAdd = async (init_type: InitType, secret: string): Promise<Profile> => {
  // isSubmitting = true;

  let method_name = "";
  let arg_obj = {};
  if (init_type == InitType.Mnem) {
    method_name = "init_from_mnem"
    arg_obj = { mnem: secret.trim() };

  } else if (init_type == InitType.PriKey) {
    method_name = "init_from_private_key";
    arg_obj = { priKeyString: secret.trim() };
  };
  // submit
  return invoke(method_name, arg_obj)
    .then((res: Profile) => {
      // set as init so we don't get sent back to Newbie account creation.
      isInit.set(true);
      responses.set(JSON.stringify(res));
      signingAccount.set(res);

      // only navigate away once we have refreshed the accounts including balances
      refreshAccounts()
      .then(() => {
        notify_success(`Account Added: ${res.nickname}`);
        navigate("/");
      });
      return res
    })
    .catch((error) => {
      raise_error(error, false, "handleAdd");
    })
}

export function tryRefreshSignerAccount(newData: Profile) {
  let a = get(signingAccount).account;
  if (newData.account == a) {
    signingAccount.set(newData);
  }
}


export const isCarpeInit = async () => {
  // on app load we want to avoid the Newbie view until we know it's not a new user
  console.log(">>> isCarpeInit");
  isRefreshingAccounts.set(true); 

  invoke("is_init", {})
    .then((res: boolean) => {
      responses.set(res.toString());
      isInit.set(res);
      // for testnet
      isRefreshingAccounts.set(false);
    })
    .catch((e) => {
      isRefreshingAccounts.set(false);
      raise_error(e, false, "isCarpeInit")
    });
}

export function findOneAccount(account: string): Profile | undefined {
  let list = get(allAccounts);
  let found = list.find((i) => i.account == account)
  return found
}

export const setAccount = async (an_address: string, notifySucess = true) => { 
  if (get(signingAccount).account == an_address) {
    return
  }
 
  // cannot switch profile with miner running
  if (get(minerLoopEnabled)) {
    notify_error("To switch accounts you need to turn miner off first.");
    return
  }

  let a = findOneAccount(an_address);

  // optimistic switch
  let previous = get(signingAccount);
  signingAccount.set(a);
 
  // reset user data
  tower.set(<ClientTowerStatus>{});
  mnem.set("");
  
  // initi account events for better UX
  getAccountEvents(a, () => { /* ignore errors */ });
  
  invoke("switch_profile", {
    account: a.account,
  })
  .then((res) => {
      if (typeof res === "string") {
          responses.set(res);
      }
    if (notifySucess) {
      notify_success("Account switched to " + a.nickname);
    }
  })
  .catch((e) => {
    raise_error(e, false, "setAccount");
    
    // fallback optimistic change
    signingAccount.set(previous);
  });
}

export function addNewAccount(account: Profile) {
  let list = get(allAccounts);
  // account.on_chain = false;
  list.push(account);    
  allAccounts.set(list);
}

export function checkSigningAccountBalance() {
  let selected = get(signingAccount);
  invoke('query_balance', {account: selected.account})
    .then((balance: number) => {
      // update signingAccount
      selected.on_chain = true;
      selected.balance = Number(balance);
      signingAccount.set(selected);
      
      let accounts = get(allAccounts);
      if (!accounts) return;
      // update all accounts set
      let list = accounts.map(each => {
        if (each.account == selected.account) {
          each.on_chain = true;
          each.balance = Number(balance);
        }
        return each;
      });
      allAccounts.set(list);
    })
    .catch((e) => raise_error(e, false, "checkSigningAccountBalance"));
}

export function getAccountEvents(account: Profile, errorCallback = null) {
  const address = account.account;
  
  if (!account.on_chain) {
    return errorCallback && errorCallback("account_not_on_chain");
  }

  return
  /*
  invoke('get_account_events', {account: address.toUpperCase()})
    .then((events: Array<T>) => {
      let all = get(accountEvents);     
      all[address] = events
        .sort((a, b) => (a.transaction_version < b.transaction_version)
          ? 1
          : (b.transaction_version < a.transaction_version)
            ? -1
            : 0
        );
      accountEvents.set(all);
    })
    .catch(e => {
      if (errorCallback) {
        errorCallback(e.msg);
      } else {
        raise_error(e, false, "getAccountEvents");
      }      
    });
    */
}

/*
export let invoke_makewhole = async (account: String): Promise<number> => {
 // let demo_account = "613b6d9599f72134a4fa20bba4c75c36";
 // account = demo_account;
  
  console.log(">>> calling make whole");
  return await invoke("query_makewhole", { account })
    .then((a) => {
      if (a.length > 0) {
        console.log("MakeWhole " + account + ", coins: " + a[0].coins.value)
        console.log(a)
      }
      console.log(a);
      return a[0].coins.value
    })
}
*/

export const updateMakeWhole = () => {
  let mk = get(makeWhole);
  let accounts = get(allAccounts);
  if (!accounts) return;

  accounts.forEach(each => {
    let account = each.account;
    if (mk[account] == null) {
      console.log(">>> query_makewhole");
      invoke("query_makewhole", { account })
        .then((credits) => {
          mk[account] = credits;
          makeWhole.set(mk);
        })
        .catch(e => raise_error(e, true, "updateMakeWhole"));
    }
  })
}

/*
  Function to claim coins credit from makewhole
*/
export function claimMakeWhole(account: string, callback = null) {
  // account to claim must be the signingAccount
  if (get(signingAccount).account != account) {
    if (get(minerLoopEnabled)) {
      return callback("To claim coins you need to turn miner off first.");
    } else {
      // set sigining account
      setAccount(account, false);
    }    
  }
  
  let mk = get(makeWhole)
  invoke('claim_make_whole', { account })
    .then(() => {
      // update account make_whole status
      let accountCredits = mk[account];
      mk[account] = accountCredits.map(each => { each.claimed = true; return each });
      makeWhole.set(mk);
      // update account balance
      checkSigningAccountBalance();
      callback(null);
    })
    .catch(e => {
      if (callback) {
        callback(e.msg);
      } else {
        raise_error(e, false, "claim_make_whole");
      }      
    });
}