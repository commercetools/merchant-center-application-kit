export default function loadI18n(locale) {
  // Use lazy once so that subsequent calls to import() will use the same
  // network response. https://webpack.js.org/api/module-methods/#import-
  return import(/* webpackChunkName: "i18n-locale-data", webpackMode: "lazy-once" */
  `./data/${locale}.json`);
}
