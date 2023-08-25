import type { TSupportedLocale } from '../supported-locales';
// https://babeljs.io/blog/2017/09/11/zero-config-with-babel-macros
import supportedLocales from /* preval */ '../supported-locales';
import type { Currencies, LocalizedString } from './types';

export const mapLocaleToIntlLocale = (locale: string): TSupportedLocale => {
  if (locale.startsWith('de')) return 'de';
  if (locale.startsWith('es')) return 'es';
  if (locale.startsWith('fr')) return 'fr-FR';
  if (locale === 'pt-BR') return 'pt-BR';
  if (locale === 'zh-CN') return 'zh-CN';
  return 'en';
};

const defaultLocale = 'en';

// Given a locale, return the locale only if it's supported.
// If not, return a default locale.
export function getSupportedLocale(locale: string): TSupportedLocale {
  const isSupported = supportedLocales.find((supportedLocale) =>
    locale.startsWith(supportedLocale)
  );
  return isSupported ? (locale as TSupportedLocale) : defaultLocale;
}

// given a currenyCode and a list of currencies with the following shape
// [{ label, symbol }], we return the symbol.
export const getSymbolFromCurrency = (
  currencyCode: string,
  currencies: Currencies
) => {
  if (currencies[currencyCode] && currencies[currencyCode].symbol) {
    return currencies[currencyCode].symbol;
  }
  return '';
};

// From https://github.com/acdlite/recompose/blob/master/src/packages/recompose/getDisplayName.js
export const getDisplayName = <Props extends {}>(
  Component: React.ComponentType<Props>
) => {
  if (typeof Component === 'string') {
    return Component;
  }

  if (!Component) {
    return undefined;
  }

  return Component.displayName || Component.name || 'Component';
};

export const getPrimaryLocale = (locale: string): string =>
  locale.split('-')[0];

export const formatLocalizedFallbackHint = (
  value: string,
  locale: string
): string => `${value} (${locale.toUpperCase()})`;

export const findFallbackLocale = (
  localizedString: LocalizedString,
  fallbackOrder: string[]
) =>
  fallbackOrder
    .concat(Object.keys(localizedString))
    .find((lang) => Boolean(localizedString[lang]));
