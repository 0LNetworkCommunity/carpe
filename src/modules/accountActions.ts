import { get } from 'svelte/store'
import { invoke } from '@tauri-apps/api/tauri'
import { raise_error, type CarpeError, logger, Level } from './carpeError'
import { responses } from './debug'
import { isTowerNewbie, minerLoopEnabled, resetTowerStatus } from './miner'

import { notify_success, notify_error } from './carpeNotify'
import {
  allAccounts,
  isInit,
  isRefreshingAccounts,
  signingAccount,
  isAccountRefreshed,
  makeWhole,
  migrateInProgress,
  migrateSuccess,
  canMigrate,
} from './accounts'
import type { CarpeProfile, SlowWalletBalance } from './accounts'
import { navigate } from 'svelte-navigator'
import { carpeTick } from './tick'

export const getDefaultProfile = async () => {
  invoke('get_default_profile', {})
    .then((res: CarpeProfile) => {
      signingAccount.set(res)
    })
    .catch((e) => {
      raise_error(e, true, 'get_default_profile')
    })
}

export const getAccounts = async () => {
  // first make sure we don't have empty accounts
  invoke('get_all_accounts')
    .then((result: CarpeProfile[]) => allAccounts.set(result))
    .catch((e) => raise_error(e, true, 'get_all_accounts'))
}

export const refreshAccounts = async () => {
  logger(Level.Info, 'refresh_accounts')

  isRefreshingAccounts.set(true)
  invoke('refresh_accounts')
    .then((result: [CarpeProfile]) => {
      // TODO make this the correct return type
      isRefreshingAccounts.set(false)
      allAccounts.set(result)

      if (!get(isAccountRefreshed)) {
        isAccountRefreshed.set(true)
      }
      result
    })
    .catch((e) => {
      raise_error(e, true, 'refresh_accounts')
      isRefreshingAccounts.set(false)
      if (!get(isAccountRefreshed)) {
        isAccountRefreshed.set(true)
      }
    })
}

export enum InitType {
  Mnem,
  PriKey,
}

export const addAccount = async (init_type: InitType, secret: string) => {
  let method_name = ''
  let arg_obj = {}
  if (init_type == InitType.Mnem) {
    method_name = 'init_from_mnem'
    arg_obj = { mnem: secret.trim() }
  } else if (init_type == InitType.PriKey) {
    method_name = 'init_from_private_key'
    arg_obj = { priKeyString: secret.trim() }
  }
  // submit
  return invoke(method_name, arg_obj)
    .then((res: CarpeProfile) => {
      // set as init so we don't get sent back to Newbie account creation.
      isInit.set(true)
      responses.set(JSON.stringify(res))
      signingAccount.set(res)

      // only navigate away once we have refreshed the accounts including balances
      notify_success(`Account Added: ${res.nickname}`)

      refreshAccounts()
      setTimeout(() => navigate('wallet'), 10)
      return res
    })
    .catch((error) => {
      raise_error(error, false, 'addAccount')
    })
    .finally(() => (secret = null))
}

export const isCarpeInit = async (): Promise<boolean> => {
  // on app load we want to avoid the Newbie view until we know it's not a new user
  logger(Level.Info, ' isCarpeInit')
  isRefreshingAccounts.set(true)

  return invoke('is_init', {})
    .then((res: boolean) => {
      responses.set(res.toString())
      isInit.set(res)
      // for testnet
      isRefreshingAccounts.set(false)
      return res
    })
    .catch((e) => {
      isRefreshingAccounts.set(false)
      raise_error(e, false, 'isCarpeInit')
      return false
    })
}

export function findOneAccount(account: string): CarpeProfile | undefined {
  const list = get(allAccounts)
  const found = list.find((i) => i.account == account)
  return found
}

export const setAccount = async (account: string, notifySucess = true) => {
  if (get(signingAccount).account == account) return

  // cannot switch profile with miner running
  if (get(minerLoopEnabled)) {
    notify_error('To switch accounts you need to turn miner off first.')
    return
  }

  invoke('switch_profile', { account })
    .then((res: CarpeProfile) => {
      signingAccount.set(res)
      isInit.set(true)
      if (notifySucess) {
        notify_success('Account switched to ' + res.nickname)
      }
    })
    .then(carpeTick)
    .catch((e) => {
      raise_error(e, false, 'setAccount')
    })
    .finally(() => {
      //need to reset, otherwise may be looking at wrong account
      resetTowerStatus()
      isTowerNewbie.set(true)
    })
}

// export function addNewAccount(account: Profile) {
//   let list = get(allAccounts);
//   // account.on_chain = false;
//   list.push(account);
//   allAccounts.set(list);
// }

export function checkSigningAccountBalance() {
  const selected = get(signingAccount)
  invoke('query_balance', { account: selected.account })
    .then((balance: SlowWalletBalance) => {
      // update signingAccount
      // selected.on_chain = true
      selected.balance = balance
      signingAccount.set(selected)

      const accounts = get(allAccounts)
      if (!accounts) return
      // update all accounts set
      const list = accounts.map((each) => {
        if (each.account == selected.account) {
          // each.on_chain = true
          each.balance = balance
        }
        return each
      })
      allAccounts.set(list)
    })
    .catch((e) => raise_error(e, false, 'checkSigningAccountBalance'))
}

export function getAccountEvents(account: CarpeProfile, errorCallback = null) {
  if (!account.on_chain) {
    return errorCallback && errorCallback('account_not_on_chain')
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

export const isLegacy = async (): Promise<boolean> => {
  return invoke('has_legacy_configs', {})
    .then((b: boolean) => {
      if (b) logger(Level.Warn, 'legacy configs found, should try to migrate')
      canMigrate.set(b)
      return b
    })
    .catch((e: CarpeError) => {
      raise_error(e, true, 'has_legacy_configs')
      return false
    })
}

export const tryMigrate = async () => {
  logger(Level.Warn, 'trying to migrate legacy user')
  migrateInProgress.set(true)
  invoke('maybe_migrate', {})
    .then((r: boolean) => {
      migrateSuccess.set(r)
      notify_success('Successfully migrated accounts')
    })
    .then(refreshAccounts)
    .then(getDefaultProfile)
    .then(carpeTick)
    .catch((e: CarpeError) => raise_error(e, true, 'maybe_migrate'))
    .finally(() => {
      migrateInProgress.set(false)
    })
}

export const ignoreMigrate = () => {
  logger(Level.Warn, 'ignoring migration')

  invoke('ignore_migrate', {})
    .then((r: boolean) => {
      migrateSuccess.set(r)
    })
    .then(isLegacy) // reset if we actually did migrate the files
    .catch((e: CarpeError) => raise_error(e, true, 'ignore_migrate'))
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
  const mk = get(makeWhole)
  const accounts = get(allAccounts)
  if (!accounts) return

  accounts.forEach((each) => {
    const account = each.account
    if (mk[account] == null) {
      logger(Level.Info, ' query_makewhole')
      invoke('query_makewhole', { account })
        .then((credits) => {
          mk[account] = credits
          makeWhole.set(mk)
        })
        .catch((e) => raise_error(e, true, 'updateMakeWhole'))
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
      return callback('To claim coins you need to turn miner off first.')
    } else {
      // set sigining account
      setAccount(account, false)
    }
  }

  const mk = get(makeWhole)
  invoke('claim_make_whole', { account })
    .then(() => {
      // update account make_whole status
      const accountCredits = mk[account]
      mk[account] = accountCredits.map((each) => {
        each.claimed = true
        return each
      })
      makeWhole.set(mk)
      // update account balance
      checkSigningAccountBalance()
      callback(null)
    })
    .catch((e) => {
      if (callback) {
        callback(e.msg)
      } else {
        raise_error(e, false, 'claim_make_whole')
      }
    })
}
