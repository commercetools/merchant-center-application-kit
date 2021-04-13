require('unfetch/polyfill');
require('@testing-library/jest-dom/extend-expect');
require('./polyfills/intl');

const { configure: configureRtl } = require('@testing-library/react');
const loadConfig = require('./load-config');

const jestConfig = loadConfig();

configureRtl(jestConfig.rtlConfig);
