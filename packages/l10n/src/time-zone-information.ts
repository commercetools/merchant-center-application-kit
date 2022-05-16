import type { TimeZones, TimeZoneTranslations } from './types';

import * as PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { createL10NInjector, createL10NHook } from './create-l10n-injector';
import { getSupportedLocale, mapLocaleToIntlLocale } from './utils';

type ImportData = {
  default: TimeZones;
};

type TranslationData = {
  default: TimeZoneTranslations;
};
/**
 * TODO:
 * - handle fallback to 'default'/core.json when there are no translations for a locale
 * - testing
 */
/**
 * Build offset and abbreviation data for each timezone at runtime from moment-timezone
 * in order to return accurate offset values for timezones that have daylight time.
 */
const getTimeZoneData = (module: TranslationData) => {
  const timeZoneData = Object.keys(module.default).reduce((acc, key) => {
    return {
      ...acc,
      [key]: {
        label: module.default[key],
        abbr: moment.tz(moment(), key).format('z'),
        offset: moment.tz(moment(), key).format('Z'),
      },
    };
  }, {});
  return { default: timeZoneData };
};

const getImportChunk = (locale: string): Promise<ImportData> => {
  const intlLocale = mapLocaleToIntlLocale(locale);
  switch (intlLocale) {
    case 'de':
      return import(
        /* webpackChunkName: "timezone-data-de" */ '../data/time-zones/de.json'
      ).then((module) => getTimeZoneData(module));
    case 'es':
      return import(
        /* webpackChunkName: "timezone-data-es" */ '../data/time-zones/es.json'
      ).then((module) => getTimeZoneData(module));
    case 'fr-FR':
      return import(
        /* webpackChunkName: "timezone-data-fr-FR" */ '../data/time-zones/fr-FR.json'
      ).then((module) => getTimeZoneData(module));
    case 'zh-CN':
      return import(
        /* webpackChunkName: "timezone-data-zh-CN" */ '../data/time-zones/zh-CN.json'
      ).then((module) => getTimeZoneData(module));
    case 'ja':
      return import(
        /* webpackChunkName: "timezone-data-ja" */ '../data/time-zones/ja.json'
      ).then((module) => getTimeZoneData(module));
    default:
      return import(
        /* webpackChunkName: "timezone-data-en" */ '../data/time-zones/en.json'
      ).then((module) => getTimeZoneData(module));
  }
};

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
const getTimeZonesForLocale = async (locale: string) => {
  const supportedLocale = getSupportedLocale(locale);
  // Use default webpackMode (lazy) so that we generate one file per locale.
  // The files are named like "time-zone-data-en-json.chunk.js" after compilation
  // https://webpack.js.org/api/module-methods/#import-
  const timeZones = await getImportChunk(supportedLocale);
  // Prefer loading `default` (for ESM bundles) and
  // fall back to normal import (for CJS bundles).
  return timeZones.default || timeZones;
};

export const withTimeZones = createL10NInjector<TimeZones>({
  displayName: 'withTimeZones',
  propKey: 'timeZones',
  propLoadingKey: 'isLoadingTimeZones',
  loadLocale: getTimeZonesForLocale,
});

export const useTimeZones = createL10NHook(getTimeZonesForLocale);
