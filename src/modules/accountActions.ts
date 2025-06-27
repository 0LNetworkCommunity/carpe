import { get } from 'svelte/store'
import { invoke } from '@tauri-apps/api/tauri'
import { raise_error, type CarpeError, logger, Level } from './carpeError'
import { responses } from './debug'
import { isTowerNewbie, minerLoopEnabled, resetTowerStatus } from './miner'
import { _ } from '../lang/i18n'

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
  watchAccounts,
  pendingAccounts,
  isCarpeTickRunning,
  totalBalance,
} from './accounts'
import type { CarpeProfile, SlowWalletBalance } from './accounts'
import { navigate } from 'svelte-navigator'
import { carpeTick } from './tick'
import { initNetwork } from './networks'

allAccounts.subscribe((v) => {
  pendingAccounts.set(v.filter((x) => x && !x.on_chain && !x.watch_only))
  const allBalance: SlowWalletBalance = v.reduce(
    (p, c): SlowWalletBalance => {
      return {
        total: p.total + c.balance.total,
        unlocked: p.unlocked + c.balance.unlocked,
      }
    },
    {
      total: 0,
      unlocked: 0,
    },
  )
  totalBalance.set(allBalance)
})
export const getDefaultProfile = async () => {
  invoke('get_default_profile', {})
    .then((res: CarpeProfile) => {
      res.account = res.account.toLocaleUpperCase()
      signingAccount.set(res)
    })
    .catch((e) => {
      raise_error(e, true, 'get_default_profile')
    })
}

export const getAccounts = async () => {
  // first make sure we don't have empty accounts
  invoke('get_all_accounts_with_notes')
    .then((result: CarpeProfile[]) => {
      const watchList = get(watchAccounts)
      result.map((item) => {
        item.watch_only = watchList.includes(item.account)
        item.account = item.account.toLocaleUpperCase()
        item.auth_key = item.auth_key.toLocaleUpperCase()
      })
      allAccounts.set(result)
    })
    .catch((e) => raise_error(e, true, 'get_all_accounts_with_notes'))
}

export const refreshAccounts = async () => {
  logger(Level.Info, 'refresh_accounts')

  isRefreshingAccounts.set(true)
  invoke('refresh_accounts')
    .then((result: [CarpeProfile]) => {
      // TODO make this the correct return type
      isRefreshingAccounts.set(false)

      const watchList = get(watchAccounts)
      result.map((item) => {
        item.watch_only = watchList.includes(item.account)
        item.account = item.account.toLocaleUpperCase()
        item.auth_key = item.auth_key.toLocaleUpperCase()
      })

      allAccounts.set(result)
      const currentAccount = get(signingAccount)
      if (currentAccount) {
        const changedCurrentAccount = get(allAccounts).find((item) => {
          const {
            account,
            on_chain,
            watch_only,
            balance: { unlocked, total },
          } = item
          return (
            account === currentAccount.account &&
            (on_chain !== currentAccount.on_chain ||
              watch_only !== currentAccount.watch_only ||
              unlocked !== currentAccount.balance?.unlocked ||
              total !== currentAccount.balance?.total)
          )
        })
        if (changedCurrentAccount) {
          signingAccount.set(changedCurrentAccount)
        }
      }
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

const addAccountOptimistic = async (address: string, watch_only: boolean) => {
  const list = get(allAccounts)
  const found = list.find((i) => i.account == address)
  if (found) {
    return
  }

  const newAccount: CarpeProfile = {
    account: address,
    auth_key: '',
    nickname: 'New Account',
    on_chain: false,
    balance: { unlocked: 0, total: 0 },
    watch_only: watch_only,
    note: '',
  }
  list.push(newAccount)
  allAccounts.set(list)
}

export const addAccount = async (
  init_type: InitType,
  secret: string
) => {
  let method_name = ''
  let arg_obj = {}
  if (init_type == InitType.Mnem) {
    method_name = 'init_from_mnem'
    arg_obj = { mnem: secret.trim() }
  } else if (init_type == InitType.PriKey) {
    method_name = 'init_from_private_key'
    arg_obj = { priKeyString: secret.trim() }
  }

  addAccountOptimistic('loading...', false)

  // submit
  return invoke(method_name, arg_obj)
    .then(setWatchAccounts)
    .catch((error) => {
      raise_error(error, false, 'addAccount')
    })
    .finally(() => (secret = null))
}

const setWatchAccounts = async (res: CarpeProfile) => {
  // update watchAccounts
  let list = get(watchAccounts)
  list = list.filter((item) => item !== res.account)
  watchAccounts.set(list)
  localStorage.setItem('watchAccounts', JSON.stringify(list))
  res.watch_only = false

  await onAccountAdd(res)
  return res
}

export const removeAccount = async (account: string) => {
  removeAccountOptimistic(account)
  invoke('remove_account', { account })
    .then(() => {
      // update allAccounts set
      const list = get(allAccounts)
      const updatedList = list.filter((item) => item.account !== account)
      allAccounts.set(updatedList)
      // update pendingAccounts set
      const pendingList = get(pendingAccounts)
      const updatedPendingList = pendingList.filter((item) => item.account !== account)
      pendingAccounts.set(updatedPendingList)
      // update watchAccounts set
      let watchList = get(watchAccounts)
      watchList = watchList.filter((item) => item !== account.toLowerCase())
      watchAccounts.set(watchList)
      // update signingAccount
      signingAccount.set(updatedList.length > 0 ? updatedList[0] : null)
      notify_success('Account removed')
    })
    .catch((e) => {
      raise_error(e, true, 'remove_account')
      notify_error('Failed to remove account')
    })
}

const removeAccountOptimistic = (account) => {
  // update allAccounts set
  const list = get(allAccounts)
  const updatedList = list.filter((item) => item.account !== account)
  allAccounts.set(updatedList)
  // update pendingAccounts set
  const pendingList = get(pendingAccounts)
  const updatedPendingList = pendingList.filter((item) => item.account !== account)
  pendingAccounts.set(updatedPendingList)
}

// remove all accounts
export const removeAllAccounts = async () => {
  invoke('remove_accounts', {})
    .then(() => {
      resetSigningAccount()
      allAccounts.set([])
      pendingAccounts.set([])
      watchAccounts.set([])
      refreshAccounts()
      notify_success('All accounts removed')
    })
    .catch((e) => {
      raise_error(e, true, 'remove_all_accounts')
      notify_error('Failed to remove all accounts')
    })
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

export const resetSigningAccount = async () => {
  signingAccount.set(null)
}
export const setAccount = async (account: string, notifySucess = true) => {
  if (get(signingAccount).account == account) return

  const watchList = get(watchAccounts)
  invoke('switch_profile', { account })
    .then((res: CarpeProfile) => {
      res.account = res.account.toUpperCase()
      res.watch_only = watchList.includes(res.account.toLowerCase())
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

// check if a wallet is slow
export const is_slow_wallet = async (account: string): Promise<boolean> => {
  return invoke('is_slow', { account })
  // .then((b) => {
  //   return b
  // })
  // .catch((e) => {
  //   raise_error(e, false, 'setAccount')
  //   return false
  // })
}

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

export const tryMigrateConfigFilename = async () => {
  logger(Level.Warn, 'trying to migrate config filename from v7 to v8')
  return invoke('migrate_config_filename', {})
    .then((migrated: boolean) => {
      if (migrated) {
        logger(Level.Info, 'Successfully migrated config filename from v7 to v8')
        notify_success(get(_)('wallet.migration.config_success'))
      } else {
        logger(Level.Info, 'Config filename migration not needed or skipped')
      }
      return migrated
    })
    .catch((e: CarpeError) => {
      raise_error(e, false, 'migrate_config_filename')
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

export function getPrivateKey(address: string, callback = null) {
  invoke('get_private_key_from_os', { address })
    .then((res) => {
      callback && callback(res)
    })
    .catch((e) => {
      callback && callback('')
      raise_error(e, false, 'get_private_key')
    })
}

export function addWatchAccount(address: string, isLegacy: boolean = true) {
  const accountList: CarpeProfile[] = get(allAccounts)
  // v5 address padding 0
  if (address.length == 32) {
    address = address.padStart(64, '0')
  }
  const hasAdd = !!accountList.find(
    (item) => item.account.toLocaleLowerCase() === address.toLocaleLowerCase(),
  )
  if (hasAdd) {
    notify_error('address already exists')
    return
  }

  addAccountOptimistic('loading...', true)

  return invoke('add_watch_account', {
    address,
    isLegacy,
  })
    .then(async (res: CarpeProfile) => {
      let list = get(watchAccounts)
      list = Array.from(new Set([...list, res.account]))
      watchAccounts.set(list)
      localStorage.setItem('watchAccounts', JSON.stringify(list))
      res.watch_only = true

      await onAccountAdd(res)
    })
    .catch((e: CarpeError) => {
      notify_error('Unable to parse AccountAddress')
      raise_error(e, true, 'add_watch_account')
    })
    .finally(() => navigate('/wallet'))
}

async function onAccountAdd(res: CarpeProfile) {
  // set as init so we don't get sent back to Newbie account creation.
  isInit.set(true)
  responses.set(JSON.stringify(res))
  res.account = res.account.toLocaleUpperCase()
  signingAccount.set(res)

  await initNetwork()
  if (!get(isCarpeTickRunning)) {
    // start the carpe tick for every 30 secs, this is async
    setInterval(carpeTick, 30000)
    isCarpeTickRunning.set(true)
  }
  // only navigate away once we have refreshed the accounts including balances
  notify_success(`Account Added: ${res.nickname}`)

  await refreshAccounts()
}

export const associateNoteWithAccount = async (account, note) => {
  // update allAccounts set account with the new note
  const list = get(allAccounts)
  const updatedList = list.map((item) => {
    if (item.account === account) {
      item.note = note
    }
    return item
  })
  allAccounts.set(updatedList)

  // update the backend
  try {
    const result = await invoke('associate_note_with_account', { account, note })
    refreshAccounts()
    notify_success('Note successfully associated with account')
    return result
  } catch (e) {
    raise_error(e, true, 'associateNoteWithAccount')
    notify_error('Failed to associate note with account')
  }
}
