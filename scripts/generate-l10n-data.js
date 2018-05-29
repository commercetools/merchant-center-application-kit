/* eslint-disable no-console, prefer-object-spread/prefer-object-spread */
require('shelljs/global');
const fs = require('fs');
const cldr = require('cldr');
const rimraf = require('rimraf');
const fetch = require('node-fetch');
const moment = require('moment-timezone');

const L10N_KEYS = {
  COUNTRY: 'country',
  CURRENCY: 'currency',
  TIMEZONE: 'timezone',
  LANGUAGE: 'language',
};

// This are excluded countries since cldr returns them in its list
// but our API does not allow them. After some investigation with the
// data files of the cldr library there is nothing for identifying them
// since they are valid codes in the ISO 3166 and its following updates
// https://www.drupal.org/project/drupal/issues/2036219
const excludedCountries = ['QO', 'UN', 'ZZ'];

const extractCountryDataForLocale = locale => {
  const countryNames = cldr.extractTerritoryDisplayNames(locale);
  const numberRegex = /^\d+$/;

  // filter out continents
  Object.keys(countryNames).forEach(key => {
    if (numberRegex.test(key) || excludedCountries.includes(key))
      delete countryNames[key];
  });

  // lowercase locales
  return Promise.resolve(
    Object.keys(countryNames).reduce(
      (acc, key) =>
        Object.assign({}, acc, { [key.toLowerCase()]: countryNames[key] }),
      {}
    )
  );
};

const extractCurrencyDataForLocale = async locale => {
  // Get the list of all currencies.
  // NOTE: this list contains "old" currencies that are not in used anymore.
  const currencyInfo = cldr.extractCurrencyInfoById(locale);
  // Fetch list of currencies that are still in use, then use this list
  // to "remove" the outdated currencies from the previous list.
  const activeCurrencies = await fetch(
    'http://www.localeplanet.com/api/auto/currencymap.json'
  ).then(response => response.json());

  return Promise.resolve(
    Object.keys(activeCurrencies).reduce(
      (acc, key) =>
        // `currencyInfo` given by `cldr` may not contain any information based on the
        // currencyCode that we fetched from `currencymap.json`, so we have this definition
        // check in place.
        currencyInfo[key]
          ? Object.assign({}, acc, {
              [key]: {
                label: currencyInfo[key].displayName,
                symbol: activeCurrencies[key].symbol_native,
              },
            })
          : acc,
      {}
    )
  );
};

const extractTimeZoneDataForLocale = (/* locale */) => {
  moment.tz.setDefault('Etc/GMT');
  const timeZoneNames = moment.tz.names();
  return Promise.resolve(
    timeZoneNames
      .map(name => ({
        name,
        abbr: moment()
          .tz(name)
          .zoneAbbr(),
        offset: moment()
          .tz(name)
          .format('Z'),
      }))
      .sort(
        (a, b) =>
          parseFloat(a.offset.replace(':', '.')) -
          parseFloat(b.offset.replace(':', '.'))
      )
      .reduce(
        (acc, zone) =>
          Object.assign({}, acc, {
            [zone.name]: zone,
          }),
        {}
      )
  );
};

const extractLanguageDataForLocale = locale => {
  // Get the list of all languages.
  const languages = cldr.extractLanguageSupplementalData(locale);
  // Get the list of all remaining languages.
  const oldLanguages = cldr.extractLanguageSupplementalMetadata(locale);
  // Get the list of all language names
  const languageNames = cldr.extractLanguageDisplayNames(locale);

  /* Here we are filtering the oldLanguages for having only the ones that
  * are not deprecated and has a key or its replacement key with length of 2
  * as stipulated by the ISO 639 (1, 2)
  *
  * Let's say that we got this coming from cldr
  *  {
  *    bh: { replacement: 'bhr', reason: 'legacy'},
  *    tr: { replacement: 'thr', reason: 'deprecated'},
  *    mar: { replacement: 'ma', reason: 'legacy'},
  *    adr: { replacement: 'adr-a', reason: 'legacy'},
  *  }
  *
  * The output with the following function would be:
  *  {
  *    bh: { replacement: 'bhr', reason: 'legacy'}, --> key of length 2
  *    mar: { replacement: 'ma', reason: 'legacy'}, --> replacement of length 2
  *  }
  *
  *  We omit the second one (tr) because of the deprecated reason and the fourth
  *  one (adr) because nor the key or the replacement key has length 2.
  */
  const filteredOldLanguages = Object.entries(oldLanguages).reduce(
    (allLanguages, [key, value]) => {
      if (
        value.reason !== 'deprecated' &&
        (key.length === 2 ||
          (value.replacement && value.replacement.length === 2))
      ) {
        return key.length === 2
          ? Object.assign({}, allLanguages, { [key]: oldLanguages[key] })
          : Object.assign({}, allLanguages, {
              [value.replacement]: oldLanguages[key],
            });
      }
      return allLanguages;
    },
    {}
  );

  // We need to fetch the countries first in order to have them when we have
  // languages the type es_GT so we can get the country name for object info
  return extractCountryDataForLocale(locale).then(countries =>
    // We work with a set of data with a mix of the current languages and the
    // old ones
    [...Object.keys(languages), ...Object.keys(filteredOldLanguages)]
      // We only map the countries with 2 digits (ISO 3166-1 alpha-2) to be
      // inline with the AC
      .filter(language => language.length === 2)
      .reduce((totalLanguages, language) => {
        // If the key does not exist in the current languages is because is
        // and old one so now we need to discard the "deprecated" ones.
        if (!languages[language]) {
          return Object.assign({}, totalLanguages, {
            [language]: {
              language:
                // We check for the language name taking into account the
                // key or the replacement key for the language
                languageNames[language] ||
                languageNames[oldLanguages[language].replacement],
            },
          });
        }
        return Object.assign(
          {},
          totalLanguages,
          // In case the current language has territories we need to parse
          // each one of them into its own language (e.j. es_AR)
          languages[language].territories
            ? Object.assign(
                // We need to set the basic language (e.g. es)
                { [language]: { language: languageNames[language] } },
                languages[language].territories.reduce(
                  (territoryLanguages, territory) =>
                    Object.assign({}, territoryLanguages, {
                      [`${language}-${territory}`]: {
                        language: languageNames[language],
                        country: countries[territory.toLowerCase()],
                      },
                    }),
                  {}
                )
              )
            : { [language]: { language: languageNames[language] } }
        );
      }, {})
  );
};

const DATA_DIR = {
  [L10N_KEYS.COUNTRY]: {
    path: './packages-shared/l10n/data/countries',
    transform: extractCountryDataForLocale,
  },
  [L10N_KEYS.CURRENCY]: {
    path: './packages-shared/l10n/data/currencies',
    transform: extractCurrencyDataForLocale,
  },
  [L10N_KEYS.TIMEZONE]: {
    path: './packages-shared/l10n/data/time-zones',
    transform: extractTimeZoneDataForLocale,
  },
  [L10N_KEYS.LANGUAGE]: {
    path: './packages-shared/l10n/data/languages',
    transform: extractLanguageDataForLocale,
  },
};

/**
 * Delete + re-create data dir.
 * Ignores create err if dir already exists
 */
const setup = key => {
  rimraf.sync(DATA_DIR[key].path);
  // eslint-disable-next-line no-undef
  mkdir('-p', DATA_DIR[key].path);
};

const updateLocaleData = async (key, locales) => {
  await Promise.all(
    locales.map(async locale => {
      const localData = await DATA_DIR[key].transform(locale);

      console.log(`[${key}] Writing ${locale} data to ${locale}.json`);

      fs.writeFileSync(
        `${DATA_DIR[key].path}/${locale}.json`,
        JSON.stringify(localData)
      );
      return Promise.resolve();
    })
  );

  console.log(`[${key}] Updated ${locales.length} locales`);
  return Promise.resolve();
};

const run = async key => {
  setup(key);
  await updateLocaleData(key, ['en', 'de']);
};

Promise.all(
  [
    L10N_KEYS.COUNTRY,
    L10N_KEYS.CURRENCY,
    L10N_KEYS.TIMEZONE,
    L10N_KEYS.LANGUAGE,
  ].map(run)
)
  .then(() => {
    console.log('Data generated!');
    process.exit(0);
  })
  .catch(error => {
    console.error('Error generating data', error);
    process.exit(1);
  });
