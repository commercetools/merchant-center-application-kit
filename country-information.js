import PropTypes from 'prop-types';
import createL10NInjector from './create-l10n-injector';
import getSupportedLocale from './get-supported-locale';

export const countriesShape = PropTypes.objectOf(PropTypes.string);

/**
 * If running through webpack, code splitting makes `getCountriesForLocale`
 * a function that asynchronously loads the country data.
 */
const getCountriesForLocale = (locale, cb) => {
  const supportedLocale = getSupportedLocale(locale);
  import(`./data/countries/${supportedLocale}.json` /* webpackChunkName: "country-data" */)
    .then(countries => cb(null, countries.default))
    .catch(error => cb(error));
};

export const withCountries = createL10NInjector({
  displayName: 'withCountries',
  propKey: 'countries',
  propLoadingKey: 'isLoadingCountries',
  loadLocale: getCountriesForLocale,
});
