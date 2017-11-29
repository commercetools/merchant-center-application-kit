import React from 'react';
import { shallow } from 'enzyme';
import * as storage from '@commercetools-local/utils/storage';
import { STORAGE_KEYS as CORE_STORAGE_KEYS } from '@commercetools-local/constants';
import { LoginSSOCallback } from './login-sso-callback';

jest.mock('jwt-decode', () => () => ({ nonce: 'EY' }));
jest.mock('@commercetools-local/utils/storage');

const createTestProps = props => ({
  location: {
    hash: '',
    search: '',
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
      expect(wrapper).toRender('FailedAuthentication');
    });
  });
});

describe('lifecylcle', () => {
  describe('componentDidMount', () => {
    let wrapper;
    let props;
    beforeEach(() => {
      props = createTestProps({
        location: { hash: '#id_token=111', search: '?organizationId=o1' },
        requestAccessToken: jest.fn(() =>
          Promise.resolve({ body: { token: 'xxx' } })
        ),
      });
      wrapper = shallow(<LoginSSOCallback {...props} />);
    });

    describe('when nonce is correct', () => {
      beforeEach(() => {
        storage.put(CORE_STORAGE_KEYS.NONCE, 'EY');
        wrapper.instance().componentDidMount();
      });
      it('should call requestAccessToken with idToken', () => {
        expect(props.requestAccessToken).toHaveBeenCalledWith(
          expect.objectContaining({ idToken: '111' })
        );
      });
      it('should call requestAccessToken with organization id', () => {
        expect(props.requestAccessToken).toHaveBeenCalledWith(
          expect.objectContaining({ organization: 'o1' })
        );
      });
      describe('when request is successful', () => {
        beforeEach(() => {
          props = createTestProps({
            requestAccessToken: jest.fn(() =>
              Promise.resolve({ body: { token: 'xxx' } })
            ),
          });
          wrapper = shallow(<LoginSSOCallback {...props} />);
          storage.put(CORE_STORAGE_KEYS.NONCE, 'EY');
          wrapper.instance().componentDidMount();
        });
        it('should save token in storage', () => {
          expect(storage.get(CORE_STORAGE_KEYS.TOKEN)).toBe('xxx');
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
          storage.put(CORE_STORAGE_KEYS.NONCE, 'EY');
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
        storage.put(CORE_STORAGE_KEYS.NONCE, 'BAD');
        wrapper.instance().componentDidMount();
      });
      it('should set hasAuthenticationFailed to true', () => {
        expect(wrapper).toHaveState('hasAuthenticationFailed', true);
      });
    });
  });
});
