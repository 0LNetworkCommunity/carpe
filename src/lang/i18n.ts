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

register('en', async () => en);
register('zh_cn', async ()=> zh_cn);

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