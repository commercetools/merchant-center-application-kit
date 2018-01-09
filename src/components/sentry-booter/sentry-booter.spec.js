import React from 'react';
import { shallow } from 'enzyme';
import SentryBooter from './sentry-booter';

let mockBoot;
jest.mock('../../utils/sentry', () => ({
  boot: (...args) => mockBoot(...args),
}));

let wrapper;

describe('lifecycle', () => {
  beforeEach(() => {
    wrapper = shallow(<SentryBooter />);
  });

  describe('componentDidMount', () => {
    beforeEach(() => {
      mockBoot = jest.fn();
      wrapper.instance().componentDidMount();
    });
    it('should call boot', () => {
      expect(mockBoot).toHaveBeenCalledTimes(1);
    });
  });
});
