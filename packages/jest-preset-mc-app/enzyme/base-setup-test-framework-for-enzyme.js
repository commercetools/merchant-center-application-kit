require('jest-enzyme');

const ShallowWrapper = require('enzyme/ShallowWrapper');
const configureEnzymeExtensions = require('@commercetools/enzyme-extensions');
const commerceToolsEnzymeMatchers = require('@commercetools/jest-enzyme-matchers');

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
