import { notify_success } from './carpeNotify'
import { invoke } from '@tauri-apps/api/tauri'
import { raise_error, type CarpeError } from './carpeError'
import { responses } from './debug'
import { signingAccount } from './accounts'
import { get } from 'svelte/store'
export enum WalletType {
  Slow = 0,
  Community = 1,
}

export const setWalletType = async (wtype: WalletType) => {
  // TODO: implement community if necessary
  if (wtype != WalletType.Slow) return
  const account = get(signingAccount)
  invoke('set_slow_wallet', {
    legacy: account.account.startsWith('0'.repeat(32)),
  })
    .then((res: string) => {
      notify_success(`The account is set to: SlowWallet`)
      responses.set(res)
    })
    .catch((e: CarpeError) => {
      raise_error(e, false, 'setWallet')
    })
}
