import { invoke } from '@tauri-apps/api/tauri'
import { get, writable } from 'svelte/store'
import { getLocale, setupI18n } from '../lang/i18n'
import { Level, logger, raise_error } from './carpeError'
import { signingAccount } from './accounts'
import { notify_success } from './carpeNotify'

const empty_preferences = function (): Preferences {
  return {
    locale: null,
  }
}
export interface MinerTxConfig {
  max_gas_unit_for_tx: number
  coin_price_per_unit: number
  user_tx_timeout: number
}
export const preferences = writable<Preferences>(empty_preferences())
export const minerMaxGasUnitForTx = writable<number>(10000)
export interface Preferences {
  locale: string
}
const MinMaxGasUnitForTx = 3000
export const init_locale_preferences = () => {
  logger(Level.Info, ' call init_preferences')

  // avoid using lib without init finished
  setupI18n({
    withLocale: 'en',
    fallbackLocale: 'en',
  })

  const acct = get(signingAccount)

  const locale = acct && acct.locale ? acct.locale : getLocale()
  setupI18n({
    withLocale: locale,
    fallbackLocale: 'en',
  })
}

export function setLocale(locale: string) {
  invoke('set_preferences_locale', { locale: locale })
    .then(() => {
      setupI18n({
        withLocale: locale,
        fallbackLocale: 'en',
      })
    })
    .catch((e) => raise_error(e, true, 'set_preferences_locale'))
}

export function setMinerMaxGas(maxGasUnitForTx: number) {
  // min MinMaxGasUnitForTx
  if (typeof maxGasUnitForTx !== 'number') {
    maxGasUnitForTx = MinMaxGasUnitForTx
  }
  maxGasUnitForTx = Math.max(MinMaxGasUnitForTx, maxGasUnitForTx)
  invoke('set_miner_txs_cost', { maxGasUnitForTx: maxGasUnitForTx })
    .then(() => {
      minerMaxGasUnitForTx.set(maxGasUnitForTx)
      notify_success('Gas Settings Updated')
    })
    .catch((e) => raise_error(e, true, 'set_miner_txs_cost'))
}

export function getMinerMaxGas() {
  invoke('get_miner_txs_cost')
    .then((res: MinerTxConfig) => {
      minerMaxGasUnitForTx.set(res.max_gas_unit_for_tx)
    })
    .catch((e) => raise_error(e, true, 'get_miner_txs_cost'))
}
