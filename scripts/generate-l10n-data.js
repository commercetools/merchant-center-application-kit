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

const DATA_DIR = {
  [L10N_KEYS.COUNTRY]: {
    path: './modules/l10n/data/countries',
    transform: extractCountryDataForLocale,
  },
  [L10N_KEYS.CURRENCY]: {
    path: './modules/l10n/data/currencies',
    transform: extractCurrencyDataForLocale,
  },
  [L10N_KEYS.TIMEZONE]: {
    path: './modules/l10n/data/time-zones',
    transform: extractTimeZoneDataForLocale,
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
  [L10N_KEYS.COUNTRY, L10N_KEYS.CURRENCY, L10N_KEYS.TIMEZONE].map(run)
)
  .then(() => {
    console.log('Data generated!');
    process.exit(0);
  })
  .catch(error => {
    console.error('Error generating data', error);
    process.exit(1);
  });
