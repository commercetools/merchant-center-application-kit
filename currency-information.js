import PropTypes from 'prop-types';
import createL10NInjector from './create-l10n-injector';
import getSupportedLocale from './get-supported-locale';

export const currenciesShape = PropTypes.objectOf(
  PropTypes.shape({ label: PropTypes.string, symbol: PropTypes.string })
);

/**
 * If running through webpack, code splitting makes `getCurrenciesForLocale`
 * a function that asynchronously loads the country data.
 */
const getCurrenciesForLocale = (locale, cb) => {
  const supportedLocale = getSupportedLocale(locale);
  import(`./data/currencies/${supportedLocale}.json` /* webpackChunkName: "currency-data" */)
    .then(currencies => cb(null, currencies.default))
    .catch(error => cb(error));
};

export const withCurrencies = createL10NInjector({
  displayName: 'withCurrencies',
  propKey: 'currencies',
  propLoadingKey: 'isLoadingCurrencies',
  loadLocale: getCurrenciesForLocale,
});
