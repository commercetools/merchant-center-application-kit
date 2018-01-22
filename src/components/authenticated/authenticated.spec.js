import React from 'react';
import { shallow } from 'enzyme';
import { Authenticated } from './authenticated';

const createTestProps = custom => ({
  isLoggedIn: true,
  children: jest.fn(),
  ...custom,
});
const createWrapper = props => shallow(<Authenticated {...props} />);

describe('rendering', () => {
  let props;
  describe('when the user is logged in', () => {
    beforeEach(() => {
      props = createTestProps();
      createWrapper(props);
    });
    it('should call children with `isAuthenticated` set to true', () => {
      expect(props.children).toHaveBeenCalledTimes(1);
      expect(props.children).toHaveBeenCalledWith({ isAuthenticated: true });
    });
  });
  describe('when the user is not logged in', () => {
    beforeEach(() => {
      props = createTestProps({ isLoggedIn: false });
      createWrapper(props);
    });
    it('should call children with `isAuthenticated` set to true', () => {
      expect(props.children).toHaveBeenCalledTimes(1);
      expect(props.children).toHaveBeenCalledWith({ isAuthenticated: false });
    });
  });
});
