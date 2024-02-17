import { invoke } from '@tauri-apps/api/tauri'
import { get, writable } from 'svelte/store'
import { getLocale, setupI18n } from '../lang/i18n'
import { Level, logger, raise_error } from './carpeError'
import { signingAccount } from './accounts'

const empty_preferences = function (): Preferences {
  return {
    locale: null,
  }
}

export const preferences = writable<Preferences>(empty_preferences())

export interface Preferences {
  locale: string
}

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
