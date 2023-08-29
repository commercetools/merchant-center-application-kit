// NOTE: we need to define the list of supported locales in a CJS file
// as it's used both from Nodejs and ESM.
// If you update the list of locales here, make sure to also update the
// type declaration file `supported-locales.d.ts`.
const supportedLocales = ['en', 'de', 'es', 'fr-FR', 'pt-BR', 'zh-CN'];

module.exports = supportedLocales;
