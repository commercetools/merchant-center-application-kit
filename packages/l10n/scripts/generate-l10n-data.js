/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const shell = require('shelljs');
const cldr = require('cldr');
const chalk = require('chalk');
const fetch = require('node-fetch');
const moment = require('moment-timezone');
const deepDiff = require('deep-diff');

const L10N_KEYS = {
  COUNTRY: 'country',
  CURRENCY: 'currency',
  TIMEZONE: 'timezone',
  LANGUAGE: 'language',
};

const supportedLocales = ['en', 'de', 'es', 'fr-FR', 'zh-CN', 'ja'];

// This are excluded countries since cldr returns them in its list
// but our API does not allow them. After some investigation with the
// data files of the cldr library there is nothing for identifying them
// since they are valid codes in the ISO 3166 and its following updates
// https://www.drupal.org/project/drupal/issues/2036219
const excludedCountries = ['QO', 'UN', 'ZZ'];

// getNorthernIrelandCountryCode returns the Northern Ireland country code (key: name) depending on the passed locale
// "XI" is the countryCode used to identify the Northern Ireland
const getNorthernIrelandCountryCode = (locale) => {
  switch (locale) {
    case 'en':
      return { XI: 'Northern Ireland' };
    case 'de':
      return { XI: 'Nordirland' };
    case 'es':
      return { XI: 'Irlanda del Norte' };
    case 'fr-FR':
      return { XI: 'Irlande du Nord' };
    case 'zh_hans_cn':
      return { XI: '北爱尔兰' };
    case 'ja':
      return { XI: '北アイルランド' };
    default:
      return { XI: 'Northern Ireland' };
  }
};

const mapLocaleToCldrLocale = (locale) => {
  switch (locale) {
    case 'zh-CN':
      return 'zh_hans_cn';
    default:
      return locale;
  }
};

const extractCountryDataForLocale = (locale) => {
  // The Northern Ireland country code (or territory) is not part of the latest CLDR data.
  // However, it is needed since the Brexit (Jan 1st 2021) and also supported by the platform API.
  // Therefore, inorder to avoid editing the generated data files each time we run the script,
  // we append the Northern Ireland to the available countries list.
  // Check the discussions on https://github.com/commercetools/merchant-center-application-kit/pull/2054
  const countryNames = {
    ...cldr.extractTerritoryDisplayNames(locale),
    ...getNorthernIrelandCountryCode(locale),
  };
  // We only support ISO 3166-1 country code (https://en.wikipedia.org/wiki/ISO_3166-1)
  // there is alpha-2 (two-letter) , alpha-3 (three-letter) , and numeric (three-digit) representation
  // that's why we escape the non-supported representations
  // That's the lib used by the backend https://github.com/TakahikoKawasaki/nv-i18n/blob/master/src/main/java/com/neovisionaries/i18n/CountryCode.java#L2507-L2536
  const numberRegex = /^\d+$/;

  // filter out continents and invalid countries
  Object.keys(countryNames).forEach((key) => {
    if (
      numberRegex.test(key) ||
      key.length > 3 ||
      excludedCountries.includes(key)
    )
      delete countryNames[key];
  });

  // lowercase locales
  return Promise.resolve(
    Object.keys(countryNames)
      // we sort the keys so that the appended data does not appear at the bottom of file
      // but rather in a sorted fashion and also ease future code reviews
      .sort()
      .reduce(
        (acc, key) =>
          Object.assign({}, acc, { [key.toLowerCase()]: countryNames[key] }),
        {}
      )
  );
};

const extractCurrencyDataForLocale = async (locale) => {
  // Get the list of all currencies.
  // NOTE: this list contains "old" currencies that are not in used anymore.
  const currencyInfo = cldr.extractCurrencyInfoById(locale);
  // Fetch list of currencies that are still in use, then use this list
  // to "remove" the outdated currencies from the previous list.
  const activeCurrencies = await fetch(
    'http://www.localeplanet.com/api/auto/currencymap.json'
  ).then((response) => response.json());

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
      .map((name) => ({
        name,
        abbr: moment().tz(name).zoneAbbr(),
        offset: moment().tz(name).format('Z'),
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

const extractLanguageDataForLocale = (locale) => {
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
  return extractCountryDataForLocale(locale).then((countries) =>
    // We work with a set of data with a mix of the current languages and the
    // old ones
    [...Object.keys(languages), ...Object.keys(filteredOldLanguages)]
      // We only map the countries with 2 digits (ISO 3166-1 alpha-2) to be
      // inline with the AC
      .filter((language) => language.length === 2)
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
    path: './data/countries',
    transform: extractCountryDataForLocale,
  },
  [L10N_KEYS.CURRENCY]: {
    path: './data/currencies',
    transform: extractCurrencyDataForLocale,
  },
  [L10N_KEYS.TIMEZONE]: {
    path: './data/time-zones',
    transform: extractTimeZoneDataForLocale,
  },
  [L10N_KEYS.LANGUAGE]: {
    path: './data/languages',
    transform: extractLanguageDataForLocale,
  },
};

const mapDiffToWarnings = (oldData, newData) => {
  const diff = deepDiff(oldData, newData);
  if (!diff) return [];
  return diff
    .map((diffEdit) => {
      switch (diffEdit.kind) {
        case 'E':
          return `The field "${chalk.cyan(
            diffEdit.path.join('.')
          )}" ${chalk.underline('has changed')} from "${chalk.red(
            diffEdit.lhs
          )}" to "${chalk.green(diffEdit.rhs)}".`;
        case 'D':
          return `The field "${chalk.cyan(
            diffEdit.path.join('.')
          )}" ${chalk.underline('has been removed')} ('${chalk.red(
            JSON.stringify(diffEdit.lhs)
          )}').`;
        case 'N':
          return `The field "${chalk.cyan(
            diffEdit.path.join('.')
          )}" ${chalk.underline('has been added')} ('${chalk.green(
            JSON.stringify(diffEdit.rhs)
          )}').`;
        default:
          return null;
      }
    })
    .filter(Boolean);
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const updateTimeZoneTranslations = async (key) => {
  const targetTranslationsFolder = path.join(
    __dirname,
    '..',
    DATA_DIR[key].path
  );
  const targetTranslationsFile = path.join(
    targetTranslationsFolder,
    'core.json'
  );
  /**
   * This is a list of all timezones in the output of `moment.tz.names()`
   * that we want to exclude from the final compiled time zone data.
   *
   * The `extractTimeZoneDataForLocale` function in `scripts/generate-l10n-data`
   * consumes this list of excluded timezones, and an object of locale-specific
   * long-form translations.  If a timezone is present in the output of
   * `moment.tz.names()`, but either is not in the excluded list or does not
   * have a translation, that timezone is considered a new timezone.
   *
   * If a new timezone is encountered, the user running the CLI command
   * will be prompted via the shell whether they would like to accept
   * the new timezone, or add that timezone to this excluded list.
   */
  const targetExcludedTimeZonesFile = path.join(
    targetTranslationsFolder,
    'excluded_time_zones.json'
  );

  moment.tz.setDefault('Etc/GMT');

  // const allTimeZoneIds = moment.tz.names();
  const fakeTimeZones = ['space/moon', 'space/mars', 'space/jupiter'];
  const allTimeZoneIds = moment.tz.names().concat(fakeTimeZones);

  console.log(
    `[${key}]: Checking moment-timezone for new IANA timezone identifiers`
  );
  try {
    fs.accessSync(targetTranslationsFile, fs.F_OK);
    fs.accessSync(targetExcludedTimeZonesFile, fs.F_OK);
    const currentTranslationsFile = JSON.parse(
      fs.readFileSync(targetTranslationsFile, { encoding: 'utf8' })
    );
    const currentExcludedTimeZonesFile = JSON.parse(
      fs.readFileSync(targetExcludedTimeZonesFile, {
        encoding: 'utf8',
      })
    );
    const currentTranslatedTimeZoneIds = Object.keys(currentTranslationsFile);
    const currentExcludedTimeZoneIds =
      currentExcludedTimeZonesFile.EXCLUDED_TIME_ZONES;

    const newTimeZones = allTimeZoneIds.filter(
      (id) =>
        !(
          currentTranslatedTimeZoneIds.includes(id) ||
          currentExcludedTimeZoneIds.includes(id)
        )
    );

    console.log(JSON.stringify(newTimeZones));
  } catch (error) {
    throw new Error(error);
  }
  return Promise.resolve();
};

const updateLocaleData = async (key, locales) => {
  const results = await Promise.all(
    locales.map(async (locale) => {
      const cldrLocale = mapLocaleToCldrLocale(locale);
      const newLocaleData = await DATA_DIR[key].transform(cldrLocale);
      const targetFolder = path.join(__dirname, '..', DATA_DIR[key].path);
      const targetFile = path.join(targetFolder, `${locale}.json`);

      console.log(`[${key}] Writing ${locale} data to ${targetFile}`);

      let warnings = [];
      try {
        fs.accessSync(targetFile, fs.F_OK);
        const oldLocaleData = JSON.parse(
          fs.readFileSync(targetFile, { encoding: 'utf8' })
        );
        warnings = mapDiffToWarnings(oldLocaleData, newLocaleData);
      } catch (error) {
        // skip
      }

      shell.mkdir('-p', targetFolder);
      fs.writeFileSync(targetFile, JSON.stringify(newLocaleData, null, 2));
      return Promise.resolve({ warnings, locale });
    })
  );

  console.log(`[${key}] Updated ${locales.length} locales`);
  results.forEach((r) => {
    if (r.warnings.length > 0) {
      console.log(
        chalk.yellow(
          `\n\n[${key}] Data generated with warnings for locale "${r.locale}".\n`
        )
      );
      console.log(r.warnings.join('\n'));
    }
  });
  return Promise.resolve();
};

const run = async (key) => {
  if (key === L10N_KEYS.TIMEZONE) {
    await updateTimeZoneTranslations(key);
  } else {
    await updateLocaleData(key, supportedLocales);
  }
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
  .catch((error) => {
    console.error('Error generating data', error);
    process.exit(1);
  });
