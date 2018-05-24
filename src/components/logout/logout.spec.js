import React from 'react';
import { shallow } from 'enzyme';
import * as storage from '@commercetools-local/utils/storage';
import {
  LOGIN_STRATEGY_SSO,
  LOGIN_STRATEGY_DEFAULT,
  STORAGE_KEYS,
} from '../../constants';
import { Logout, getLoginStrategy } from './logout';

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
    storage.get.mockReturnValue('foo-1');

    const wrapper = shallow(<Logout {...props} />);
    wrapper.instance().componentDidMount();
  });
  it('should remove isAuthenticated from storage', () => {
    expect(storage.remove).toHaveBeenCalledWith(STORAGE_KEYS.IS_AUTHENTICATED);
  });
  it('should remove identityProviderUrl from storage', () => {
    expect(storage.remove).toHaveBeenCalledWith(
      STORAGE_KEYS.IDENTITY_PROVIDER_URL
    );
  });
  it('should remove projectKey from storage', () => {
    expect(storage.remove).toHaveBeenCalledWith(
      STORAGE_KEYS.ACTIVE_PROJECT_KEY
    );
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
  describe('when IdP URL is defined', () => {
    beforeEach(() => {
      storage.get.mockReturnValue('xxx');
    });
    it('should return SSO as the login strategy', () => {
      expect(getLoginStrategy()).toBe(LOGIN_STRATEGY_SSO);
    });
  });
  describe('when IdP URL is not defined', () => {
    beforeEach(() => {
      storage.get.mockReturnValue(null);
    });
    it('should return default as the login strategy', () => {
      expect(getLoginStrategy()).toBe(LOGIN_STRATEGY_DEFAULT);
    });
  });
});
