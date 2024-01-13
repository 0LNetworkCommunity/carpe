import { notify_success } from './carpeNotify'
import { invoke } from '@tauri-apps/api/tauri'
import { raise_error, type CarpeError } from './carpeError'
import { responses } from './debug'

export enum WalletType {
  Slow = 0,
  Community = 1,
}

export const setWalletType = async (wtype: WalletType) => {
  // TODO: implement community if necessary
  if (wtype != WalletType.Slow) return

  invoke('set_slow_wallet')
    .then((res: string) => {
      notify_success(`Account set to ${wtype}`)
      responses.set(res)
    })
    .catch((e: CarpeError) => {
      raise_error(e, false, 'setWallet')
    })
}
