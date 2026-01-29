const fs = require('fs');
const path = require('path');
const supportedLocales = require('./supported-locales');

function getListOfAvailableLocalesWithMatchingMomentLocale() {
  // Use the languages data from the `l10n` package to determine which locales
  // to load from moment.
  const languagesData = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/languages/en.json'))
  );
  // List of locales that are available in the Merchant Center.
  const allAvailableLocales = Object.keys(languagesData)
    .filter((locale) =>
      supportedLocales.some((supportedLocale) => {
        const [language, countryCode] = supportedLocale.split('-');
        if (countryCode) {
          // Use an exact match.
          return supportedLocale === locale;
        }
        // Fall back to the language tag.
        return locale.startsWith(language);
      })
    )
    // Keep it lowercase, as moment locale files are lowercase.
    .map((locale) => locale.toLowerCase());

  // Resolve the path to the moment locales folder.
  const originalMomentLocalesPath = path.join(
    path.dirname(require.resolve('moment')),
    'locale'
  );
  // List all file names in the moment locales folder.
  const momentLocaleDataFiles = fs
    .readdirSync(originalMomentLocalesPath)
    // Strip the extension part.
    .map((fileName) => {
      const [baseFileName] = fileName.split(path.extname(fileName));
      return baseFileName;
    });
  // US and US territories use MM/DD/YYYY format (American convention).
  // These locales should fall back to moment's default 'en' locale.
  // All other English locales use DD/MM/YYYY (British/International convention)
  // and should fall back to 'en-gb'.
  const usEnglishLocales = [
    'en-us', // United States
    'en-um', // U.S. Outlying Islands
    'en-pr', // Puerto Rico
    'en-vi', // U.S. Virgin Islands
    'en-as', // American Samoa
    'en-gu', // Guam
    'en-mp', // Northern Mariana Islands
    'en-fm', // Federated States of Micronesia
    'en-mh', // Marshall Islands
    'en-pw', // Palau
  ];

  // Assign to the available locales in the Merchant Center the corresponding
  // matching moment locale, to make it easier to generate the code.
  const allAvailableLocalesWithMatchingMomentLocale = allAvailableLocales
    .map((availableLocale) => {
      // Attempt to match a moment locale as-is.
      const matchingLocale = momentLocaleDataFiles.find(
        (momentLocale) => momentLocale === availableLocale
      );

      // If there's an exact match, use it.
      if (matchingLocale) {
        return {
          locale: availableLocale,
          momentLocale: matchingLocale,
        };
      }

      const [language] = availableLocale.split('-');

      // Special handling for English locales:
      // - Plain 'en' (without region) should not load any moment locale to
      //   preserve existing behavior (moment's built-in default is US format)
      // - US and US territories should not load any moment locale (moment's
      //   default 'en' uses MM/DD/YYYY which is correct for these regions)
      // - All other English regional locales should fall back to 'en-gb' which
      //   uses DD/MM/YYYY (the international standard outside US)
      if (language === 'en') {
        // Plain 'en' without region code: don't load any locale
        if (availableLocale === 'en') {
          return {
            locale: availableLocale,
            momentLocale: null,
          };
        }
        if (usEnglishLocales.includes(availableLocale)) {
          // US locales: don't load any moment locale, use moment's default
          return {
            locale: availableLocale,
            momentLocale: null,
          };
        }
        // Non-US English regional locales: use British date format (DD/MM/YYYY)
        return {
          locale: availableLocale,
          momentLocale: 'en-gb',
        };
      }

      // For other languages, attempt to match using only the language tag.
      // This is used as a fallback in case the exact match didn't work.
      const fallbackLocale = momentLocaleDataFiles.find(
        (momentLocale) => momentLocale === language
      );
      return {
        locale: availableLocale,
        momentLocale: fallbackLocale,
      };
    })
    // Keep only locales that have a moment locale.
    .filter(({ momentLocale }) => Boolean(momentLocale));

  return allAvailableLocalesWithMatchingMomentLocale;
}

function getListOfSupportedMomentLocales() {
  const allAvailableLocalesWithMatchingMomentLocale =
    getListOfAvailableLocalesWithMatchingMomentLocale();

  const supportedMomentLocales = allAvailableLocalesWithMatchingMomentLocale
    .map(({ momentLocale }) => momentLocale)
    // Filter out duplicates.
    .filter(
      (momentLocale, index, list) => list.indexOf(momentLocale) === index
    );

  return supportedMomentLocales;
}

function generateMomentLocaleImports() {
  const allAvailableLocalesWithMatchingMomentLocale =
    getListOfAvailableLocalesWithMatchingMomentLocale();

  const code = `
// @ts-nocheck
/* THIS IS A GENERATED FILE */

async function loadMomentLocales(locale: string): Promise<void> {
  const lowercaseLocale = locale.toLowerCase();

  switch (lowercaseLocale) {
  ${allAvailableLocalesWithMatchingMomentLocale
    .map(
      ({ locale, momentLocale }) => `
    case '${locale}':
      await import('moment/dist/locale/${momentLocale}');
      break;`
    )
    .join('\n')}

    default:
      break;
  };
};

export default loadMomentLocales;`;

  return code;
}

module.exports = {
  getListOfSupportedMomentLocales,
  generateMomentLocaleImports,
};
