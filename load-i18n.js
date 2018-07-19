import { addLocaleData } from 'react-intl';
import { getMatchingMomentCode } from './utils';

export default function loadI18n(lang, country) {
  // Use default (lazy) so that we will receive one chunk per
  // locale. https://webpack.js.org/api/module-methods/#import-

  const momentLocaleCode = getMatchingMomentCode(lang, country);

  const reactIntlChunkImport = import(/* webpackChunkName: "react-intl-data-[request]" */
  /* webpackMode: "lazy" */
  `./locale-data/${lang}`);

  const momentChunkImport = import(/* webpackChunkName: "i18n-moment-locale-[request]" */
  `./moment-data/${momentLocaleCode}`);

  const localeDataPromises = [reactIntlChunkImport, momentChunkImport];

  return Promise.all(localeDataPromises).then(response => {
    addLocaleData([...response[0].default]);
    return import(/* webpackChunkName: "react-intl-localized-strings-[request]" */
    `./data/${lang}.json`);
  });
}
