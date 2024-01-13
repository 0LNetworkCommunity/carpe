import { notify_success } from './carpeNotify'
import { invoke } from '@tauri-apps/api/tauri'
import { raise_error, type CarpeError } from './carpeError'
import { responses } from './debug'

export enum WalletType {
  Slow = 0,
  Community = 1,
}

export const setWalletType = async (wtype: WalletType) => {
  invoke('wallet_type', { typeInt: wtype })
    .then((res: string) => {
      notify_success(`Account set to ${wtype}`)
      responses.set(res)
    })
    .catch((e: CarpeError) => {
      raise_error(e, false, 'setWallet')
    })
}
