import {
  addMessages,
  locale,
  init,
  _,
  getLocaleFromNavigator,
  register,
} from "svelte-i18n";

import en from './locales/en.json'
import zh_cn from './locales/zh_cn.json'
import de from './locales/de.json'
import fr from './locales/fr.json'
import es from './locales/es.json'
import it from './locales/it.json'
import pt from './locales/pt.json'
import ar from './locales/ar.json'

register('en', async () => en);
register('zh_cn', async ()=> zh_cn);
register('de', async () => de);
register('fr', async () => fr);
register('es', async () => es);
register('it', async () => it);
register('pt', async () => pt);
register('ar', async () => ar);

function setupI18n(options) {
  const { withLocale: locale_ } = options;

  // Initialize svelte-i18n
  init({
    initialLocale: locale_,
    fallbackLocale: 'en',
  });
}


// We expose the svelte-i18n _ store so that our app has
// a single API for i18n
export { _, setupI18n, getLocaleFromNavigator, locale, };