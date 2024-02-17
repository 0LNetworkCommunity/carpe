import { locale, init, _, getLocaleFromNavigator, register } from 'svelte-i18n'

import en from './locales/en.json'
import zh_cn from './locales/zh_cn.json'
import de from './locales/de.json'
import fr from './locales/fr.json'
import es from './locales/es.json'
import it from './locales/it.json'
import pt from './locales/pt.json'
import ar from './locales/ar.json'

register('en', async () => en)
register('zh_cn', async () => zh_cn)
register('de', async () => de)
register('fr', async () => fr)
register('es', async () => es)
register('it', async () => it)
register('pt', async () => pt)
register('ar', async () => ar)

function setupI18n(options) {
  const { withLocale: locale_ } = options

  // Initialize svelte-i18n
  init({
    initialLocale: locale_,
    fallbackLocale: 'en',
  })
}
const fixedLocales = {
  zh: 'zh_cn',
}
function getLocale() {
  // The value of locale is taken from the browser navigator.language, and the first part is taken here to adapt it to the language key defined by carpe.
  // where zh-CN requires special handling
  // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language
  let locale = getLocaleFromNavigator()
  if (locale) {
    locale = locale.toLocaleLowerCase().split('-')[0]
  }
  return fixedLocales[locale] || locale
}
// We expose the svelte-i18n _ store so that our app has
// a single API for i18n
export { _, setupI18n, getLocale, locale }
