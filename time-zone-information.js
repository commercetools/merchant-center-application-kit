import PropTypes from 'prop-types';
import createL10NInjector from './create-l10n-injector';

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
const getTimeZonesForLocale = (locale, cb) =>
  import(/* webpackChunkName: "time-zone-data" */
  // Use lazy once so that subsequent calls to import() will use the same
  // network response. https://webpack.js.org/api/module-methods/#import-
  /* webpackMode: "lazy-once" */
  `./data/time-zones/${locale}.json`)
    .then(timeZones => cb(null, timeZones.default))
    .catch(() =>
      // In case the locale is not supported we will return the EN L10N data as fallback
      import(`./data/time-zones/en.json`).then(timeZones =>
        cb(new Error(`Unknown locale ${locale}`), timeZones.default)
      )
    );

export const withTimeZones = createL10NInjector({
  displayName: 'withTimeZones',
  propKey: 'timeZones',
  propLoadingKey: 'isLoadingTimeZones',
  loadLocale: getTimeZonesForLocale,
});
