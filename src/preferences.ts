import { invoke } from '@tauri-apps/api/tauri';
import { writable, get } from 'svelte/store';
import { getLocaleFromNavigator, setupI18n } from "./lang/i18n";

const empty_preferences = function(): Preferences {
  return {
    locale: null
  }
}

export const preferences = writable<Preferences>(empty_preferences());

export interface Preferences {
  locale: string,
}

export function init_preferences() {
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
}

export function setLocale(locale: string) {
  invoke('set_preferences_locale', { locale: locale })
    .then(() => {
      setupI18n({ 
        withLocale: locale,
        fallbackLocale: 'en',
      });
    })
}

