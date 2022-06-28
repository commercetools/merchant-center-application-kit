import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import type {
  TimeZone,
  TimeZones,
  TimeZoneTranslations,
  TimeZoneTranslationsMap,
} from './types';
import { createL10NInjector, createL10NHook } from './create-l10n-injector';
import { getSupportedLocale, mapLocaleToIntlLocale } from './utils';

type TranslationsData = {
  default: TimeZoneTranslations;
};

const getTranslationsMapChunk = async (): Promise<TimeZoneTranslationsMap> => {
  const translationsMapChunk = await import(
    /* webpackChunkName: "time-zone-translations-map" */ '../data/time-zones/translations-map.json'
  );
  // Prefer loading `default` (for ESM bundles) and
  // fall back to normal import (for CJS bundles).
  return translationsMapChunk.default || translationsMapChunk;
};

/**
 * Build offset and abbreviation data for each timezone at runtime from moment-timezone
 * in order to return accurate offset values for timezones that have daylight time.
 */
const augmentTimeZoneData = async (
  timeZones: TimeZoneTranslations
): Promise<TimeZones> => {
  const translationsMap = await getTranslationsMapChunk();

  return Object.entries(timeZones)
    .map<TimeZone>(([id, name]) => ({
      id,
      name,
      abbr: moment().tz(id).zoneAbbr(),
      offset: moment().tz(id).format('Z'),
      translationFor: translationsMap[id],
    }))
    .sort(
      (a, b) =>
        parseFloat(a.offset.replace(':', '.')) -
        parseFloat(b.offset.replace(':', '.'))
    )
    .reduce<TimeZones>(
      (previousTimeZones, timeZone) => ({
        ...previousTimeZones,
        [timeZone.id]: timeZone,
      }),
      {} as TimeZones
    );
};

const getImportChunk = (locale: string): Promise<TranslationsData> => {
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
    translationFor: PropTypes.array,
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
  const timeZonesChunk = await getImportChunk(supportedLocale);
  // Prefer loading `default` (for ESM bundles) and
  // fall back to normal import (for CJS bundles).
  const timeZones = timeZonesChunk.default || timeZonesChunk;

  // create time zone object with abbreviations and offsets
  const timeZoneData = await augmentTimeZoneData(timeZones);
  return timeZoneData;
};

export const withTimeZones = createL10NInjector<TimeZones>({
  displayName: 'withTimeZones',
  propKey: 'timeZones',
  propLoadingKey: 'isLoadingTimeZones',
  loadLocale: getTimeZonesForLocale,
});

export const useTimeZones = createL10NHook(getTimeZonesForLocale);
