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
  import(`./data/time-zones/${locale}.json`)
    .then(timeZones => cb(null, timeZones))
    .catch(() => cb(new Error(`Unknown locale ${locale}`)));

export const withTimeZones = createL10NInjector({
  displayName: 'withTimeZones',
  propKey: 'timeZones',
  propLoadingKey: 'isLoadingTimeZones',
  loadLocale: getTimeZonesForLocale,
});
