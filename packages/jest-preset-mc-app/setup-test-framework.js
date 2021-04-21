require('unfetch/polyfill');
require('jest-enzyme');
require('@testing-library/jest-dom/extend-expect');
require('./polyfills/intl');

const Enzyme = require('enzyme');
const DefaultEnzymeAdapter = require('enzyme-adapter-react-16');
const ShallowWrapper = require('enzyme/ShallowWrapper');
const { configure: configureRtl } = require('@testing-library/react');
const configureEnzymeExtensions = require('@commercetools/enzyme-extensions');
const commerceToolsEnzymeMatchers = require('@commercetools/jest-enzyme-matchers');
const loadConfig = require('./load-config');

const jestConfig = loadConfig();

Enzyme.configure({
  adapter: jestConfig.EnzymeAdapter
    ? jestConfig.EnzymeAdapter
    : new DefaultEnzymeAdapter(),
  disableLifecycleMethods: true,
});

configureRtl(jestConfig.rtlConfig);

expect.extend({
  toBeComponentWithName(received, actual) {
    const pass = received && received.displayName === actual;
    const message = () =>
      `expected ${received} ${pass ? 'not ' : ''} to be ${actual}`;
    return { message, pass };
  },
});

expect.extend(commerceToolsEnzymeMatchers);
configureEnzymeExtensions(ShallowWrapper);
