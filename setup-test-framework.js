import 'jest-enzyme';
import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ShallowWrapper from 'enzyme/ShallowWrapper';
import configureEnzymeExtensions from '@commercetools/enzyme-extensions';
import * as commerceToolsEnzymeMatchers from '@commercetools/jest-enzyme-matchers';

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
