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
  // Use lazy once so that subsequent calls to import() will use the same
  // network response. https://webpack.js.org/api/module-methods/#import-
  import(/* webpackChunkName: "currency-data", webpackMode: "lazy-once" */
  `./data/currencies/${supportedLocale}.json`)
    .then(currencies => cb(null, currencies.default))
    .catch(error => cb(error));
};

export const withCurrencies = createL10NInjector({
  displayName: 'withCurrencies',
  propKey: 'currencies',
  propLoadingKey: 'isLoadingCurrencies',
  loadLocale: getCurrenciesForLocale,
});
