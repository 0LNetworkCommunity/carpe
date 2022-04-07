import { get } from 'svelte/store';
import { locale } from 'svelte-i18n';

const scaleFactor = 1000000;

const fixedLocales = {
  "zh_cn": "zh"
}

function getLocale() {
  let res = get(locale);
  return fixLocale(res);
}

export function printCoins(amount) {
  const scaled = unscaledCoins(amount);
  const selectedLocale = getLocale();

  return scaled.toLocaleString(selectedLocale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function printUnscaledCoins(amount, min = 2, max = 6) {
  const selectedLocale = getLocale();

  return amount.toLocaleString(selectedLocale, {
    minimumFractionDigits: min,
    maximumFractionDigits: max,
  });
}

export function unscaledCoins(amount) {
  return amount / scaleFactor;
}



function fixLocale(locale) {
  return fixedLocales[locale] || locale
}