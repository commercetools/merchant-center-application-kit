import PropTypes from 'prop-types';
import createL10NInjector from './create-l10n-injector';
import parseLocale from './parse-locale';

export const countriesShape = PropTypes.objectOf(PropTypes.string);

/**
 * If running through webpack, code splitting makes `getCountriesForLocale`
 * a function that asynchronously loads the country data.
 */
const getCountriesForLocale = (locale, cb) => {
  const parsedLocale = parseLocale(locale);

  return import(`./data/countries/${parsedLocale}.json` /* webpackChunkName: "country-data" */)
    .then(countries => cb(null, countries.default))
    .catch(() => cb(new Error(`Unknown locale ${locale}`)));
};

export const withCountries = createL10NInjector({
  displayName: 'withCountries',
  propKey: 'countries',
  propLoadingKey: 'isLoadingCountries',
  loadLocale: getCountriesForLocale,
});
