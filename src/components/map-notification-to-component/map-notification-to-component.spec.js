import React from 'react';
import { shallow } from 'enzyme';
import { NotificationProviderForCustomComponent } from './map-notification-to-component';

const customMap = () => null;

describe('rendering', () => {
  let wrapper;
  describe('Provider', () => {
    beforeEach(() => {
      wrapper = shallow(
        <NotificationProviderForCustomComponent
          mapNotificationToComponent={customMap}
        >
          <div />
        </NotificationProviderForCustomComponent>
      );
    });
    it('should pass "mapNotificationToComponent" to Provider', () => {
      expect(wrapper).toRender({ value: customMap });
    });
  });
  // TODO: we can write some functional tests using mount
  // as soon as the new changes of the enzyme adapter are released.
  // https://github.com/airbnb/enzyme/pull/1513
});
