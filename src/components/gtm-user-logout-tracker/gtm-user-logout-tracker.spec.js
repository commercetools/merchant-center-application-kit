import React from 'react';
import { shallow } from 'enzyme';
import GtmUserLogoutTracker from './gtm-user-logout-tracker';

let mockStopTrackingUser;
jest.mock('../../utils/gtm', () => ({
  stopTrackingUser: (...args) => mockStopTrackingUser(...args),
}));

let wrapper;

describe('lifecycle', () => {
  beforeEach(() => {
    wrapper = shallow(<GtmUserLogoutTracker />);
  });

  describe('componentDidMount', () => {
    beforeEach(() => {
      mockStopTrackingUser = jest.fn();
      wrapper.instance().componentDidMount();
    });
    it('should call stopTrackingUser', () => {
      expect(mockStopTrackingUser).toHaveBeenCalledTimes(1);
    });
  });
});
