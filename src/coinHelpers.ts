import { get } from 'svelte/store';
import { locale } from 'svelte-i18n';

const scaleFactor = 1000000;
export function printCoins(amount) {
  const scaled = unscaledCoins(amount);
  const selectedLocale = get(locale);

  return scaled.toLocaleString(selectedLocale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function printUnscaledCoins(amount, min = 2, max = 6) {
  const selectedLocale = get(locale);

  return amount.toLocaleString(selectedLocale, {
    minimumFractionDigits: min,
    maximumFractionDigits: max,
  });
}

export function unscaledCoins(amount) {
  return amount / scaleFactor;
}

