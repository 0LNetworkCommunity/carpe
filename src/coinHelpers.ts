import { get } from 'svelte/store';
import { locale } from 'svelte-i18n';

const scaleFactor = 1000000;
export function printCoins(amount) {
  const scaled = scaledCoins(amount);
  const selectedLocale = get(locale);

  return scaled.toLocaleString(selectedLocale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function printScaledCoins(scaledAmount) {
  const selectedLocale = get(locale);

  return scaledAmount.toLocaleString(selectedLocale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
}

export  function scaledCoins(amount) {
  return amount / scaleFactor;
}
