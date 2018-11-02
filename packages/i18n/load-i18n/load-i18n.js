import { addLocaleData } from 'react-intl';
import { getMatchingMomentCode } from '../utils';

const getReactIntlChunkImport = lang => {
  switch (lang) {
    case 'de':
      return import(/* webpackChunkName: "react-intl-data-de" */ 'react-intl/locale-data/de');
    case 'es':
      return import(/* webpackChunkName: "react-intl-data-es" */ 'react-intl/locale-data/es');
    default:
      return import(/* webpackChunkName: "react-intl-data-en" */ 'react-intl/locale-data/en');
  }
};

const getMomentChunkImport = momentLocaleCode => {
  switch (momentLocaleCode) {
    case 'de':
      return import(/* webpackChunkName: "i18n-moment-locale-de" */ 'moment/locale/de');
    case 'es':
      return import(/* webpackChunkName: "i18n-moment-locale-es" */ 'moment/locale/es');
    default:
      return import(/* webpackChunkName: "i18n-moment-locale-en-gb" */ 'moment/locale/en-gb');
  }
};

const getLocalizedStringsChunkImport = lang => {
  switch (lang) {
    case 'de':
      return import(/* webpackChunkName: "react-intl-localized-strings-de" */ './data/de.json');
    case 'es':
      return import(/* webpackChunkName: "react-intl-localized-strings-es" */ './data/es.json');
    default:
      return import(/* webpackChunkName: "react-intl-localized-strings-en" */ './data/en.json');
  }
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
