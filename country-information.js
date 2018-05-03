import PropTypes from 'prop-types';
import createL10NInjector from './create-l10n-injector';

export const countriesShape = PropTypes.objectOf(PropTypes.string);

/**
 * If running through webpack, code splitting makes `getCountriesForLocale`
 * a function that asynchronously loads the country data.
 */
const getCountriesForLocale = (locale, cb) =>
  import(`./data/countries/${locale}.json` /* webpackChunkName: "country-data" */)
    .then(countries => cb(null, countries.default))
    .catch(() =>
      // In case the locale is not supported we will return the EN L10N data as fallback
      import(`./data/countries/en.json`).then(countries =>
        cb(new Error(`Unknown locale ${locale}`), countries.default)
      )
    );

export const withCountries = createL10NInjector({
  displayName: 'withCountries',
  propKey: 'countries',
  propLoadingKey: 'isLoadingCountries',
  loadLocale: getCountriesForLocale,
});
