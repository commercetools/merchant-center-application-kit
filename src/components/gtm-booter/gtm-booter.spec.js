import React from 'react';
import { shallow } from 'enzyme';
import GtmBooter from './gtm-booter';

let mockBoot;
jest.mock('../../utils/gtm', () => ({
  boot: (...args) => mockBoot(...args),
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
      mockBoot = jest.fn();
      wrapper.instance().componentDidMount();
    });
    it('should call boot', () => {
      expect(mockBoot).toHaveBeenCalledTimes(1);
      expect(mockBoot).toHaveBeenCalledWith(props.trackingEventWhitelist);
    });
  });
});
