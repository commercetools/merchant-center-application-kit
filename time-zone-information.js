import PropTypes from 'prop-types';
import createL10NInjector from './create-l10n-injector';
import getSupportedLocale from './get-supported-locale';

export const timeZonesShape = PropTypes.objectOf(
  PropTypes.shape({
    label: PropTypes.string,
    abbr: PropTypes.string,
    offset: PropTypes.string,
  })
);

/**
 * If running through webpack, code splitting makes `getTimeZonesForLocale`
 * a function that asynchronously loads the country data.
 */
const getTimeZonesForLocale = (locale, cb) => {
  const supportedLocale = getSupportedLocale(locale);
  import(/* webpackChunkName: "time-zone-data" */
  // Use lazy once so that subsequent calls to import() will use the same
  // network response. https://webpack.js.org/api/module-methods/#import-
  /* webpackMode: "lazy-once" */
  `./data/time-zones/${supportedLocale}.json`)
    .then(timeZones => cb(null, timeZones.default))
    .catch(error => cb(error));
};

export const withTimeZones = createL10NInjector({
  displayName: 'withTimeZones',
  propKey: 'timeZones',
  propLoadingKey: 'isLoadingTimeZones',
  loadLocale: getTimeZonesForLocale,
});
