import React from 'react';
import { shallow } from 'enzyme';
import { boot } from '../../utils/gtm';
import defaultTrackingEventWhitelist from '../../tracking-whitelist';
import GtmBooter from './gtm-booter';

jest.mock('../../utils/gtm', () => ({
  boot: jest.fn(),
}));

const createTestProps = custom => ({
  trackingEventWhitelist: {
    EventName: 'MappedEventName',
  },
  ...custom,
});

let props;
let wrapper;

describe('lifecycle', () => {
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<GtmBooter {...props}>{'foo'}</GtmBooter>);
  });

  describe('componentDidMount', () => {
    beforeEach(() => {
      boot.mockReset();
      wrapper.instance().componentDidMount();
    });
    it('should call boot', () => {
      expect(boot).toHaveBeenCalledTimes(1);
      expect(boot).toHaveBeenCalledWith({
        ...defaultTrackingEventWhitelist,
        ...props.trackingEventWhitelist,
      });
    });
  });
});
