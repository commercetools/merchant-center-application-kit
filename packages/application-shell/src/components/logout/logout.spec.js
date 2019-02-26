import React from 'react';
import { shallow } from 'enzyme';
import * as storage from '@commercetools-frontend/storage';
import {
  LOGIN_STRATEGY_SSO,
  LOGIN_STRATEGY_DEFAULT,
  STORAGE_KEYS,
} from '../../constants';
import { Logout, getLoginStrategy } from './logout';

jest.mock('@commercetools-frontend/storage');

const createTestProps = props => ({
  location: {
    search: '',
  },
  loginStrategy: 'default',
  ...props,
});

describe('rendering', () => {
  let wrapper;
  beforeEach(() => {
    const props = createTestProps();
    wrapper = shallow(<Logout {...props} />);
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
    delete window.location;
    window.location = { replace: () => {} };
    const wrapper = shallow(<Logout {...props} />);
    wrapper.instance().componentDidMount();
  });
  it('should remove isAuthenticated from storage', () => {
    expect(storage.remove).toHaveBeenCalledWith(STORAGE_KEYS.IS_AUTHENTICATED);
  });
  it('should remove loginStrategy from storage', () => {
    expect(storage.remove).toHaveBeenCalledWith(STORAGE_KEYS.LOGIN_STRATEGY);
  });
  it('should remove projectKey from storage', () => {
    expect(storage.remove).toHaveBeenCalledWith(
      STORAGE_KEYS.ACTIVE_PROJECT_KEY
    );
  });
  describe('when login strategy is default', () => {
    const replace = jest.fn();
    beforeEach(() => {
      props = createTestProps({ loginStrategy: 'default' });
      delete window.location;
      window.location = { replace };
      const wrapper = shallow(<Logout {...props} />);

      wrapper.instance().componentDidMount();
    });
    it('should redirect to the default login page', () => {
      expect(replace).toHaveBeenCalledTimes(1);
      expect(replace).toHaveBeenLastCalledWith('/login');
    });
  });
  describe('when login strategy is sso', () => {
    const replace = jest.fn();
    beforeEach(() => {
      delete window.location;
      window.location = { replace };
      storage.get.mockReturnValue('sso');
      props = createTestProps({ loginStrategy: 'sso' });
      const wrapper = shallow(<Logout {...props} />);
      wrapper.instance().componentDidMount();
    });
    it('should redirect to the sso login page', () => {
      expect(replace).toHaveBeenCalledTimes(1);
      expect(replace).toHaveBeenLastCalledWith('/login/sso');
    });
  });
  describe('when location query contains a reason', () => {
    const replace = jest.fn();
    beforeEach(() => {
      props = createTestProps({
        location: { search: '?reason=unauthorized' },
      });
      delete window.location;
      window.location = { replace };
      const wrapper = shallow(<Logout {...props} />);
      wrapper.instance().componentDidMount();
    });
    it('should redirect to login page with query parameter', () => {
      expect(replace).toHaveBeenLastCalledWith('/login?reason=unauthorized');
    });
  });
});

describe('getLoginStrategy', () => {
  describe('when IdP URL is defined', () => {
    beforeEach(() => {
      storage.get.mockReturnValue('sso');
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
