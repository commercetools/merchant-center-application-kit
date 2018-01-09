import React from 'react';
import { shallow } from 'enzyme';
import SentryUserLogoutTracker from './sentry-user-logout-tracker';

let mockRemoveUser;
jest.mock('../../utils/sentry', () => ({
  removeUser: (...args) => mockRemoveUser(...args),
}));

let wrapper;

describe('lifecycle', () => {
  beforeEach(() => {
    wrapper = shallow(<SentryUserLogoutTracker />);
  });

  describe('componentDidMount', () => {
    beforeEach(() => {
      mockRemoveUser = jest.fn();
      wrapper.instance().componentDidMount();
    });
    it('should call removeUser', () => {
      expect(mockRemoveUser).toHaveBeenCalledTimes(1);
    });
  });
});
