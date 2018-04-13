import React from 'react';
import { shallow } from 'enzyme';
import { AppShellProviderForUserTimeZone } from './user-time-zone';

describe('rendering', () => {
  let wrapper;

  describe('Provider', () => {
    beforeEach(() => {
      wrapper = shallow(
        <AppShellProviderForUserTimeZone timeZone="Europe/Madrid">
          <div />
        </AppShellProviderForUserTimeZone>
      );
    });
    it('should pass value "Europe/Madrid" to Provider', () => {
      expect(wrapper).toRender({ value: 'Europe/Madrid' });
    });
  });
  // TODO: we can write some functional tests using mount
  // as soon as the new changes of the enzyme adapter are released.
  // https://github.com/airbnb/enzyme/pull/1513
});
