const supportedLanguages = ['en', 'de', 'es'];
const defaultLanguage = 'en';

// Given a language tag, return the language only if it's whitelisted.
// If not, return a default language.
export default function getSupportedLanguage(language) {
  return supportedLanguages.includes(language) ? language : defaultLanguage;
}
