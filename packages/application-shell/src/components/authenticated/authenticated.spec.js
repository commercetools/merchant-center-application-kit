import React from 'react';
import { shallow } from 'enzyme';
import { localStorage } from '@commercetools-frontend/storage';
import Authenticated from './authenticated';

jest.mock('@commercetools-frontend/storage');

const createTestProps = custom => ({
  children: jest.fn(),
  ...custom,
});
const createWrapper = props => shallow(<Authenticated {...props} />);

describe('rendering', () => {
  let props;
  describe('when user is authenticated', () => {
    beforeEach(() => {
      localStorage.get.mockReturnValue('true');
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
      localStorage.get.mockReturnValue('false');
      props = createTestProps();
      createWrapper(props);
    });
    it('should call children with `isAuthenticated` set to true', () => {
      expect(props.children).toHaveBeenCalledTimes(1);
      expect(props.children).toHaveBeenCalledWith({ isAuthenticated: false });
    });
  });
});
