import React from 'react';
import { shallow } from 'enzyme';
import { stopTrackingUser } from '../sentry';
import SentryUserLogoutTracker from './sentry-user-logout-tracker';

jest.mock('../sentry');

let wrapper;

describe('lifecycle', () => {
  beforeEach(() => {
    wrapper = shallow(<SentryUserLogoutTracker />);
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
