import { writable } from 'svelte/store'

export interface CarpeProfile {
  account: string
  auth_key: string
  nickname: string
  on_chain?: boolean
  balance?: SlowWalletBalance
  locale?: string // TODO: refactor, tauri now offers locale of the OS
  watch_only?: boolean
}
export interface SlowWalletBalance {
  unlocked: number
  total: number
}

export const new_account = (account: string, authkey: string, nickname: string): CarpeProfile => {
  return {
    account: account,
    auth_key: authkey,
    nickname: nickname,
    on_chain: false,
    balance: { unlocked: 0, total: 0 },
    watch_only: false,
  }
}

export const signingAccount = writable<CarpeProfile>()
export const isInit = writable(false)
export const isRefreshingAccounts = writable(false)
export const allAccounts = writable<CarpeProfile[]>([])
export const pendingAccounts = writable<CarpeProfile[]>([])
export const isAccountRefreshed = writable(false)
export const accountEvents = writable<object>() // TODO define interface AccountEvent
export const isKeyError = writable<boolean>(false)
export const makeWhole = writable<object>()
export const tempCreateAccount = writable<CarpeProfile>()
export const canMigrate = writable<boolean>(false)
export const migrateSuccess = writable<boolean>()
export const migrateInProgress = writable<boolean>()
export const isCarpeTickRunning = writable<boolean>(false)
export const totalBalance = writable<SlowWalletBalance>({ total: 0, unlocked: 0 })
const localeWatchAccounts = JSON.parse(localStorage.getItem('watchAccounts') || '[]')
export const watchAccounts = writable<string[]>(localeWatchAccounts)

export const formatAccount = (acc: string): string => {
  return acc.replace('00000000000000000000000000000000', '')
}
