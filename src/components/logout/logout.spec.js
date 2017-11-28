import React from 'react';
import { shallow } from 'enzyme';
import { Logout } from './logout';

jest.mock('@commercetools-local/utils/storage');

const createTestProps = props => ({
  location: {
    search: '',
  },
  redirectTo: jest.fn(),
  loginStrategy: 'default',
  ...props,
});

describe('componentDidMount', () => {
  let props;
  describe('when login strategy is default', () => {
    beforeEach(() => {
      props = createTestProps({ loginStrategy: 'default' });
      shallow(<Logout {...props} />);
    });
    it('should redirect to the default login page', () => {
      expect(props.redirectTo).toHaveBeenCalledTimes(1);
      expect(props.redirectTo).toHaveBeenLastCalledWith('/login');
    });
  });
  describe('when login strategy is sso', () => {
    beforeEach(() => {
      props = createTestProps({ loginStrategy: 'sso' });
      shallow(<Logout {...props} />);
    });
    it('should redirect to the sso login page', () => {
      expect(props.redirectTo).toHaveBeenCalledTimes(1);
      expect(props.redirectTo).toHaveBeenLastCalledWith('/login/sso');
    });
  });
  describe('when location query contains a reason', () => {
    beforeEach(() => {
      props = createTestProps({
        location: { search: '?reason=unauthorized' },
      });
      shallow(<Logout {...props} />);
    });
    it('should redirect to login page with query parameter', () => {
      expect(props.redirectTo).toHaveBeenLastCalledWith(
        '/login?reason=unauthorized'
      );
    });
  });
});
