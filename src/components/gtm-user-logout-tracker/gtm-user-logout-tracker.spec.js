import React from 'react';
import { shallow } from 'enzyme';
import GtmUserLogoutTracker from './gtm-user-logout-tracker';

let mockRemoveUser;
jest.mock('../../utils/gtm', () => ({
  removeUser: (...args) => mockRemoveUser(...args),
}));

let wrapper;

describe('lifecycle', () => {
  beforeEach(() => {
    wrapper = shallow(<GtmUserLogoutTracker />);
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
