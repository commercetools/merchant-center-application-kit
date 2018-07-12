import { addLocaleData } from 'react-intl';

export default function loadI18n(locale) {
  // Use default (lazy) so that we will receive one chunk per
  // locale. https://webpack.js.org/api/module-methods/#import-
  return import(/* webpackChunkName: "i18n-react-intl-data" */
  `./locale-data/${locale}`).then(data => {
    addLocaleData(data.default);
    return import(/* webpackChunkName: "i18n-locale-data" */
    `./data/${locale}.json`);
  });
}
