require('unfetch/polyfill');
require('jest-enzyme');
require('@testing-library/jest-dom/extend-expect');
require('./polyfills/intl');

const { configure: configureRtl } = require('@testing-library/react');
const loadConfig = require('./load-config');

const jestConfig = loadConfig();

if (jestConfig.rtlConfig) {
  configureRtl(jestConfig.rtlConfig);
}

if (jestConfig.enzymeConfig && jestConfig.Enzyme) {
  jestConfig.Enzyme.configure(jestConfig.enzymeConfig);
}

if (jestConfig.expectExtend) {
  expect.extend(jestConfig.expectExtend);
}
