import React from 'react';
import { shallow } from 'enzyme';
import GtmBooter from './gtm-booter';

let mockBoot;
jest.mock('../../utils/gtm', () => ({
  boot: (...args) => mockBoot(...args),
}));

let wrapper;

describe('lifecycle', () => {
  beforeEach(() => {
    wrapper = shallow(<GtmBooter>{'foo'}</GtmBooter>);
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
