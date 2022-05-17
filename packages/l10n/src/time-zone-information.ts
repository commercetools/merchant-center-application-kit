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
 * - testing
 */
/**
 * Build offset and abbreviation data for each timezone at runtime from moment-timezone
 * in order to return accurate offset values for timezones that have daylight time.
 */
const getTimeZoneData = (module: TranslationData): ImportData => ({
  default: Object.entries(module.default)
    .map(([id, label]) => ({
      id,
      label,
      abbr: moment().tz(id).zoneAbbr(),
      offset: moment().tz(id).format('Z'),
    }))
    .sort(
      (a, b) =>
        parseFloat(a.offset.replace(':', '.')) -
        parseFloat(b.offset.replace(':', '.'))
    )
    .reduce(
      (acc, zone) => ({
        ...acc,
        [zone.id]: {
          label: zone.label,
          abbr: zone.abbr,
          offset: zone.offset,
        },
      }),
      {}
    ),
});

const getImportChunk = (locale: string): Promise<TranslationData> => {
  const intlLocale = mapLocaleToIntlLocale(locale);
  switch (intlLocale) {
    case 'de':
      return import(
        /* webpackChunkName: "timezone-data-de" */ '../data/time-zones/de.json'
      );
    case 'es':
      return import(
        /* webpackChunkName: "timezone-data-es" */ '../data/time-zones/es.json'
      );
    case 'fr-FR':
      return import(
        /* webpackChunkName: "timezone-data-fr-FR" */ '../data/time-zones/fr-FR.json'
      );
    case 'zh-CN':
      return import(
        /* webpackChunkName: "timezone-data-zh-CN" */ '../data/time-zones/zh-CN.json'
      );
    case 'ja':
      return import(
        /* webpackChunkName: "timezone-data-ja" */ '../data/time-zones/ja.json'
      );
    default:
      return import(
        /* webpackChunkName: "timezone-data-en" */ '../data/time-zones/en.json'
      );
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
const getTimeZonesForLocale = async (locale: string): Promise<TimeZones> => {
  const supportedLocale = getSupportedLocale(locale);
  // Use default webpackMode (lazy) so that we generate one file per locale.
  // The files are named like "time-zone-data-en-json.chunk.js" after compilation
  // https://webpack.js.org/api/module-methods/#import-
  let localeTranslations = await getImportChunk(supportedLocale);
  // if there are no translations for the desired locale, fall back to en/default
  if (
    !localeTranslations.default ||
    Object.keys(localeTranslations.default).length === 0
  ) {
    localeTranslations = await getImportChunk('en');
  }
  // create time zone object with abbreviations and offsets
  const timeZones = getTimeZoneData(localeTranslations);
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
