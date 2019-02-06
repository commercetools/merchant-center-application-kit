import React from 'react';
import { shallow } from 'enzyme';
import { STORAGE_KEYS } from '../../constants';
import FailedAuthentication from '../failed-authentication';
import { LoginSSOCallback } from './login-sso-callback';

jest.mock('jwt-decode', () => () => ({ nonce: 'EY' }));
jest.mock('@commercetools-frontend/storage');

const createTestProps = props => ({
  location: {
    hash: '#id_token=abcTestIdToken',
  },
  redirectTo: jest.fn(),
  requestAccessToken: jest.fn(),
  ...props,
});

describe('rendering', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<LoginSSOCallback {...props} />);
  });
  it('should have hasAuthenticationFailed set to false initially', () => {
    expect(wrapper).toHaveState('hasAuthenticationFailed', false);
  });
  describe('when hasAuthenticationFailed is false', () => {
    beforeEach(() => {
      wrapper.setState({ hasAuthenticationFailed: false });
    });
    it('should render <ApplicationLoader>', () => {
      expect(wrapper).toRender('ApplicationLoader');
    });
  });
  describe('when hasAuthenticationFailed is true', () => {
    beforeEach(() => {
      wrapper.setState({ hasAuthenticationFailed: true });
    });
    it('should render <FailedAuthentication>', () => {
      expect(wrapper).toRender(FailedAuthentication);
    });
  });
});

describe('lifecylcle', () => {
  describe('componentDidMount', () => {
    let wrapper;
    let props;
    beforeEach(() => {
      props = createTestProps({
        requestAccessToken: jest.fn(() => Promise.resolve({ token: 'xxx' })),
      });
      wrapper = shallow(<LoginSSOCallback {...props} />);
    });

    describe('when nonce is correct', () => {
      beforeEach(() => {
        window.sessionStorage.getItem.mockReturnValue(
          JSON.stringify({ organizationId: 'o1' })
        );
        wrapper.instance().componentDidMount();
      });
      it('should call requestAccessToken with idToken', () => {
        expect(props.requestAccessToken).toHaveBeenCalledWith(
          expect.objectContaining({ idToken: 'abcTestIdToken' })
        );
      });
      it('should call requestAccessToken with organization id', () => {
        expect(props.requestAccessToken).toHaveBeenCalledWith(
          expect.objectContaining({ organizationId: 'o1' })
        );
      });
      describe('when request is successful', () => {
        beforeEach(() => {
          props = createTestProps({
            requestAccessToken: jest.fn(() =>
              Promise.resolve({ token: 'xxx' })
            ),
          });
          wrapper = shallow(<LoginSSOCallback {...props} />);
          window.sessionStorage.setItem(
            `${STORAGE_KEYS.NONCE}_EY`,
            JSON.stringify({
              organizationId: 'o1',
            })
          );
          wrapper.instance().componentDidMount();
        });
        it('should redirect to /', () => {
          expect(props.redirectTo).toHaveBeenCalledWith('/');
        });
      });
      describe('when request fails', () => {
        beforeEach(() => {
          props = createTestProps({
            requestAccessToken: jest.fn(() => Promise.reject(new Error())),
          });
          wrapper = shallow(<LoginSSOCallback {...props} />);
          window.sessionStorage.getItem.mockReturnValue(
            JSON.stringify({
              organizationId: 'o1',
            })
          );
          wrapper.instance().componentDidMount();
        });
        it('should set hasAuthenticationFailed to true', () => {
          expect(wrapper).toHaveState('hasAuthenticationFailed', true);
        });
        it('should not redirect', () => {
          expect(props.redirectTo).not.toHaveBeenCalled();
        });
      });
    });

    describe('when nonce is wrong', () => {
      beforeEach(() => {
        window.sessionStorage.getItem.mockReturnValue(null);
        wrapper.instance().componentDidMount();
      });
      it('should set hasAuthenticationFailed to true', () => {
        expect(wrapper).toHaveState('hasAuthenticationFailed', true);
      });
    });
  });
});
