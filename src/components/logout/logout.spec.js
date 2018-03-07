import React from 'react';
import { shallow } from 'enzyme';
import {
  ACCESS_TOKEN_IDP_URL,
  STORAGE_KEYS as CORE_STORAGE_KEYS,
} from '@commercetools-local/constants';
import * as storage from '@commercetools-local/utils/storage';
import { Logout, getLoginStrategy } from './logout';

let mockJWTDecode = jest.fn();
jest.mock('jwt-decode', () => (...args) => mockJWTDecode(...args));
jest.mock('@commercetools-local/utils/storage');

const createTestProps = props => ({
  location: {
    search: '',
  },
  redirectTo: jest.fn(),
  loginStrategy: 'default',
  ...props,
});

describe('rendering', () => {
  let wrapper;
  beforeEach(() => {
    const props = createTestProps();
    wrapper = shallow(<Logout {...props} />);
  });
  it('should render <ShutdownIntercom>', () => {
    expect(wrapper).toRender('ShutdownIntercom');
  });
  it('should render <SentryUserLogoutTracker>', () => {
    expect(wrapper).toRender('SentryUserLogoutTracker');
  });
});

describe('componentDidMount', () => {
  let props;
  beforeEach(() => {
    props = createTestProps();
    storage.put(CORE_STORAGE_KEYS.TOKEN, '123');
    storage.put(CORE_STORAGE_KEYS.ACTIVE_PROJECT_KEY, 'foo-1');
    const wrapper = shallow(<Logout {...props} />);
    wrapper.instance().componentDidMount();
  });
  it('should remove token from storage', () => {
    expect(storage.get(CORE_STORAGE_KEYS.TOKEN)).toBe(null);
  });
  it('should remove isAuthenticated from storage', () => {
    expect(storage.get(CORE_STORAGE_KEYS.IS_AUTHENTICATED)).toBe(null);
  });
  it('should remove projectKey from storage', () => {
    expect(storage.get(CORE_STORAGE_KEYS.ACTIVE_PROJECT_KEY)).toBe(null);
  });
  describe('when login strategy is default', () => {
    beforeEach(() => {
      props = createTestProps({ loginStrategy: 'default' });
      const wrapper = shallow(<Logout {...props} />);
      wrapper.instance().componentDidMount();
    });
    it('should redirect to the default login page', () => {
      expect(props.redirectTo).toHaveBeenCalledTimes(1);
      expect(props.redirectTo).toHaveBeenLastCalledWith('/login');
    });
  });
  describe('when login strategy is sso', () => {
    beforeEach(() => {
      props = createTestProps({ loginStrategy: 'sso' });
      const wrapper = shallow(<Logout {...props} />);
      wrapper.instance().componentDidMount();
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
      const wrapper = shallow(<Logout {...props} />);
      wrapper.instance().componentDidMount();
    });
    it('should redirect to login page with query parameter', () => {
      expect(props.redirectTo).toHaveBeenLastCalledWith(
        '/login?reason=unauthorized'
      );
    });
  });
});

describe('getLoginStrategy', () => {
  describe('when token is defined', () => {
    describe('when IdP URL is defined', () => {
      beforeEach(() => {
        mockJWTDecode.mockClear();
        mockJWTDecode = jest.fn(() => ({
          [ACCESS_TOKEN_IDP_URL]: 'https://idp.com',
        }));
        storage.put(CORE_STORAGE_KEYS.TOKEN, 'xxx');
      });
      it('should decode the access token and return the loginStrategy', () => {
        expect(getLoginStrategy()).toBe('sso');
      });
    });
    describe('when IdP URL is not defined', () => {
      beforeEach(() => {
        mockJWTDecode.mockClear();
        mockJWTDecode = jest.fn(() => ({}));
        storage.put(CORE_STORAGE_KEYS.TOKEN, 'xxx');
      });
      it('should decode the access token and return the loginStrategy', () => {
        expect(getLoginStrategy()).toBe('default');
      });
    });
    describe('when decoding the token throws an error', () => {
      beforeEach(() => {
        mockJWTDecode.mockClear();
        mockJWTDecode = jest.fn(() => {
          throw new Error("I'm not a valid JWT!");
        });
        storage.put(CORE_STORAGE_KEYS.TOKEN, 'xxx');
      });
      it('should return the default login strategy', () => {
        expect(getLoginStrategy()).toBe('default');
      });
    });
  });
  describe('when token is not defined', () => {
    beforeEach(() => {
      storage.remove(CORE_STORAGE_KEYS.TOKEN);
    });
    it('should return null', () => {
      expect(getLoginStrategy()).toBe(null);
    });
  });
});
