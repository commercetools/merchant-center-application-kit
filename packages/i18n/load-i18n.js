import { addLocaleData } from 'react-intl';
import { getMatchingMomentCode } from './utils';

const getReactIntlChunkImport = lang => {
  let chunkImport;
  switch (lang) {
    case 'en':
      chunkImport = import(/* webpackChunkName: "react-intl-data-en" */ 'react-intl/locale-data/en');
      break;
    case 'de':
      chunkImport = import(/* webpackChunkName: "react-intl-data-de" */ 'react-intl/locale-data/de');
      break;
    case 'es':
      chunkImport = import(/* webpackChunkName: "react-intl-data-es" */ 'react-intl/locale-data/es');
      break;
    default:
      chunkImport = import(/* webpackChunkName: "react-intl-data-en" */ 'react-intl/locale-data/en');
  }
  return chunkImport;
};

const getMomentChunkImport = momentLocaleCode => {
  let chunkImport;
  switch (momentLocaleCode) {
    case 'en':
      chunkImport = import(/* webpackChunkName: "i18n-moment-locale-en-gb" */ 'moment/locale/en-gb');
      break;
    case 'de':
      chunkImport = import(/* webpackChunkName: "i18n-moment-locale-de" */ 'moment/locale/de');
      break;
    case 'es':
      chunkImport = import(/* webpackChunkName: "i18n-moment-locale-es" */ 'moment/locale/es');
      break;
    default:
      chunkImport = import(/* webpackChunkName: "i18n-moment-locale-en-gb" */ 'moment/locale/en-gb');
  }
  return chunkImport;
};

const getLocalizedStringsChunkImport = lang => {
  let chunkImport;
  switch (lang) {
    case 'en':
      chunkImport = import(/* webpackChunkName: "react-intl-localized-strings-en" */ './data/en.json');
      break;
    case 'de':
      chunkImport = import(/* webpackChunkName: "react-intl-localized-strings-de" */ './data/de.json');
      break;
    case 'es':
      chunkImport = import(/* webpackChunkName: "react-intl-localized-strings-es" */ './data/es.json');
      break;
    default:
      chunkImport = import(/* webpackChunkName: "react-intl-localized-strings-en" */ './data/en.json');
  }
  return chunkImport;
};

export default function loadI18n(lang) {
  // Use default (lazy) so that we will receive one chunk per
  // locale. https://webpack.js.org/api/module-methods/#import-

  const reactIntlChunkImport = getReactIntlChunkImport(lang);

  const momentLocaleCode = getMatchingMomentCode(lang);
  const momentChunkImport = getMomentChunkImport(momentLocaleCode);

  const localeDataPromises = [reactIntlChunkImport, momentChunkImport];

  return Promise.all(localeDataPromises).then(response => {
    addLocaleData([...response[0].default]);
    return getLocalizedStringsChunkImport(lang);
  });
}
