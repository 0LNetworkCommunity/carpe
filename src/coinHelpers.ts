import { get } from 'svelte/store';
import { locale } from 'svelte-i18n';

export function printCoins(amount) {
  const scaled = scaledCoins(amount);
  const selectedLocale = get(locale);

  return scaled.toLocaleString(selectedLocale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export  function scaledCoins(amount) {
  return amount / 1000000;
}
