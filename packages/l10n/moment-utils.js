const fs = require('fs');
const path = require('path');

const supportedLocales = ['en', 'de', 'es', 'fr-FR', 'zh-CN', 'ja'];

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
  // Assign to the available locales in the Merchant Center the corresponding
  // matching moment locale, to make it easier to generate the code.
  const allAvailableLocalesWithMatchingMomentLocale = allAvailableLocales
    .map((availableLocale) => {
      // Attempt to match a moment locale as-is.
      const matchingLocale = momentLocaleDataFiles.find(
        (momentLocale) => momentLocale === availableLocale
      );
      // Attempt to match a moment locale using only the language tag.
      // This is used as a fallback in case the exact match didn't work.
      const [language] = availableLocale.split('-');
      const fallbackLocale = momentLocaleDataFiles.find(
        (momentLocale) => momentLocale === language
      );
      const momentLocale = matchingLocale || fallbackLocale;
      return {
        locale: availableLocale,
        momentLocale,
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

  const code = `/* THIS IS A GENERATED FILE */

async function loadMomentLocales(locale: string): Promise<void> {
  const lowercaseLocale = locale.toLowerCase();

  switch (lowercaseLocale) {
  ${allAvailableLocalesWithMatchingMomentLocale
    .map(
      ({ locale, momentLocale }) => `
    case '${locale}':
      import('moment/locale/${momentLocale}');
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
