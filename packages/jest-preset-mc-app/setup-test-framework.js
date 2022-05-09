require('setimmediate');
require('unfetch/polyfill');
require('@testing-library/jest-dom/extend-expect');
// Intl polyfills: https://formatjs.io/docs/polyfills
require('@formatjs/intl-getcanonicallocales');
require('@formatjs/intl-listformat');
require('@formatjs/intl-locale');
require('@formatjs/intl-numberformat');
require('@formatjs/intl-pluralrules');
// Intl polyfills locale data
require('@formatjs/intl-listformat/locale-data/en');
require('@formatjs/intl-listformat/locale-data/de');
require('@formatjs/intl-listformat/locale-data/es');
require('@formatjs/intl-listformat/locale-data/fr');
require('@formatjs/intl-numberformat/locale-data/en');
require('@formatjs/intl-numberformat/locale-data/de');
require('@formatjs/intl-numberformat/locale-data/es');
require('@formatjs/intl-numberformat/locale-data/fr');
require('@formatjs/intl-pluralrules/locale-data/en');
require('@formatjs/intl-pluralrules/locale-data/de');
require('@formatjs/intl-pluralrules/locale-data/es');
require('@formatjs/intl-pluralrules/locale-data/fr');

const { configure: configureRtl } = require('@testing-library/react');
const loadConfig = require('./load-config');

const jestConfig = loadConfig();

configureRtl(jestConfig.rtlConfig);
