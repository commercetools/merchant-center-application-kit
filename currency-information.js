import PropTypes from 'prop-types';
import createL10NInjector from './create-l10n-injector';
import parseLocale from './parse-locale';

export const currenciesShape = PropTypes.objectOf(
  PropTypes.shape({ label: PropTypes.string, symbol: PropTypes.string })
);

/**
 * If running through webpack, code splitting makes `getCurrenciesForLocale`
 * a function that asynchronously loads the country data.
 */
const getCurrenciesForLocale = (locale, cb) => {
  const parsedLocale = parseLocale(locale);

  return import(`./data/currencies/${parsedLocale}.json` /* webpackChunkName: "currency-data" */)
    .then(currencies => cb(null, currencies.default))
    .catch(() => cb(new Error(`Unknown locale ${locale}`)));
};
export const withCurrencies = createL10NInjector({
  displayName: 'withCurrencies',
  propKey: 'currencies',
  propLoadingKey: 'isLoadingCurrencies',
  loadLocale: getCurrenciesForLocale,
});
