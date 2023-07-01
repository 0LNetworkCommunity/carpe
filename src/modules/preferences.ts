import { invoke } from '@tauri-apps/api/tauri';
import { writable } from 'svelte/store';
import { getLocaleFromNavigator, setupI18n } from "../lang/i18n";
import { raise_error } from './carpeError';

const empty_preferences = function(): Preferences {
  return {
    locale: null
  }
}

export const preferences = writable<Preferences>(empty_preferences());

export interface Preferences {
  locale: string,
}

export const init_preferences = () => {
  console.log(">>> call init_preferences");
  
  // avoid using lib without init finished
  setupI18n({ 
    withLocale: 'en',
    fallbackLocale: 'en',
  });

  invoke('get_preferences')
    .then((result: Preferences) => {
      // init locale preference
      const locale = result.locale 
        ? result.locale
        : getLocaleFromNavigator();     
      setupI18n({ 
        withLocale: locale,
        fallbackLocale: 'en',
      });
    })
    .catch(e => raise_error(e, true, "get_preferences"))
}

export function setLocale(locale: string) {
  invoke('set_preferences_locale', { locale: locale })
    .then(() => {
      setupI18n({ 
        withLocale: locale,
        fallbackLocale: 'en',
      });
    })
    .catch(e => raise_error(e, true, "set_preferences_locale"))
}

