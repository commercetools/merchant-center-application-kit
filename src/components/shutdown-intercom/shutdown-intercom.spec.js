import React from 'react';
import { shallow } from 'enzyme';
import ShutdownIntercom from './shutdown-intercom';

let mockShutdown;
jest.mock('../../utils/intercom', () => ({
  shutdown: (...args) => mockShutdown(...args),
}));

const createTestProps = custom => ({
  ...custom,
});

let props;
let wrapper;

describe('lifecycle', () => {
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<ShutdownIntercom {...props} />);
  });

  describe('componentDidMount', () => {
    beforeEach(() => {
      mockShutdown = jest.fn();
      wrapper.instance().componentDidMount();
    });
    it('should call shutdown', () => {
      expect(mockShutdown).toHaveBeenCalledTimes(1);
    });
  });
});
