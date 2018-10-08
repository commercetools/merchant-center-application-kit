import React from 'react';
import { shallow } from 'enzyme';
import { AppShellProviderForUserPermissions } from './user-permissions';

describe('rendering', () => {
  let wrapper;

  describe('Provider', () => {
    beforeEach(() => {
      wrapper = shallow(
        <AppShellProviderForUserPermissions
          permissions={{ canViewProducts: true }}
        >
          <div />
        </AppShellProviderForUserPermissions>
      );
    });
    it('should pass permissions value to Provider', () => {
      expect(wrapper).toRender({ value: { canViewProducts: true } });
    });
  });
  // TODO: we can write some functional tests using mount
  // as soon as the new changes of the enzyme adapter are released.
  // https://github.com/airbnb/enzyme/pull/1513
});
