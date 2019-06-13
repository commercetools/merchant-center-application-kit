require('unfetch/polyfill');
require('jest-enzyme');
require('jest-dom/extend-expect');
require('react-testing-library/cleanup-after-each');
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const ShallowWrapper = require('enzyme/ShallowWrapper');
const configureEnzymeExtensions = require('@commercetools/enzyme-extensions');
const commerceToolsEnzymeMatchers = require('@commercetools/jest-enzyme-matchers');

Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

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
