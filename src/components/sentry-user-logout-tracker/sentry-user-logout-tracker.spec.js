import React from 'react';
import { shallow } from 'enzyme';
import SentryUserLogoutTracker from './sentry-user-logout-tracker';

let mockStopTrackingUser;
jest.mock('../../utils/sentry', () => ({
  stopTrackingUser: (...args) => mockStopTrackingUser(...args),
}));

let wrapper;

describe('lifecycle', () => {
  beforeEach(() => {
    wrapper = shallow(<SentryUserLogoutTracker />);
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
