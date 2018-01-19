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
  LANGUAGE: 'languaje',
};

const extractCountryDataForLocale = locale => {
  const countryNames = cldr.extractTerritoryDisplayNames(locale);
  const numberRegex = /^\d+$/;

  // filter out continents
  Object.keys(countryNames).forEach(key => {
    if (numberRegex.test(key)) delete countryNames[key];
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
  const listOfActiveCurrencies = await fetch(
    'http://www.localeplanet.com/api/auto/currencymap.json'
  ).then(response => response.json());

  return Promise.resolve(
    Object.keys(listOfActiveCurrencies).reduce(
      (acc, key) =>
        Object.assign({}, acc, {
          [key]: {
            label: currencyInfo[key].displayName,
            symbol: listOfActiveCurrencies[key].symbol_native,
          },
        }),
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
  // Get the list of all language names
  const languageNames = cldr.extractLanguageDisplayNames(locale);

  // We need to fetch the countries first in order to have them when we have
  // languages the type es_GT so we can get the country name for object info
  return extractCountryDataForLocale(locale).then(countries =>
    Object.keys(languages).reduce(
      (acc, language) =>
        // We only map the countries with 2 digits (ISO 3166-1 alpha-2) to be
        // inline with the AC
        language.length === 2
          ? Object.assign(
              {},
              acc,
              // In case the current language has territories we need to parse
              // each one of them into its own language (e.j. es_AR)
              languages[language].territories
                ? Object.assign(
                    // We need to set the basic language (e.j. es)
                    { [language]: { language: languageNames[language] } },
                    acc,
                    languages[language].territories.reduce(
                      (acc2, territory) =>
                        Object.assign({}, acc2, {
                          [`${language}_${territory}`]: {
                            language: languageNames[language],
                            country: countries[territory.toLowerCase()],
                          },
                        }),
                      {}
                    )
                  )
                : { [language]: { language: languageNames[language] } }
            )
          : acc,
      {}
    )
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
