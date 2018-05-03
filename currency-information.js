import PropTypes from 'prop-types';
import createL10NInjector from './create-l10n-injector';

export const currenciesShape = PropTypes.objectOf(
  PropTypes.shape({ label: PropTypes.string, symbol: PropTypes.string })
);

/**
 * If running through webpack, code splitting makes `getCurrenciesForLocale`
 * a function that asynchronously loads the country data.
 */
const getCurrenciesForLocale = (locale, cb) =>
  import(`./data/currencies/${locale}.json` /* webpackChunkName: "currency-data" */)
    .then(currencies => cb(null, currencies.default))
    .catch(() =>
      // In case the locale is not supported we will return the EN L10N data as fallback
      import(`./data/currencies/en.json`).then(currencies =>
        cb(new Error(`Unknown locale ${locale}`), currencies.default)
      )
    );

export const withCurrencies = createL10NInjector({
  displayName: 'withCurrencies',
  propKey: 'currencies',
  propLoadingKey: 'isLoadingCurrencies',
  loadLocale: getCurrenciesForLocale,
});
