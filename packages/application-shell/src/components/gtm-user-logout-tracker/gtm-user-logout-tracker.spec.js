import React from 'react';
import { shallow } from 'enzyme';
import { stopTrackingUser } from '../../utils/gtm';
import GtmUserLogoutTracker from './gtm-user-logout-tracker';

jest.mock('../../utils/gtm', () => ({
  stopTrackingUser: jest.fn(),
}));

let wrapper;

describe('lifecycle', () => {
  beforeEach(() => {
    wrapper = shallow(<GtmUserLogoutTracker />);
  });

  describe('componentDidMount', () => {
    beforeEach(() => {
      stopTrackingUser.mockReset();
      wrapper.instance().componentDidMount();
    });
    it('should call stopTrackingUser', () => {
      expect(stopTrackingUser).toHaveBeenCalledTimes(1);
    });
  });
});
