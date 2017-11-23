import React from 'react';
import { shallow } from 'enzyme';
import { LOGOUT_REASONS } from '@commercetools-local/constants';
import { WithAuth } from './with-auth';

const createTestProps = custom => ({
  isLoggedIn: true,
  location: {
    pathname: '/',
  },
  children: <div>{'choo choo'}</div>,
  ...custom,
});
describe('rendering', () => {
  let props;
  let wrapper;
  const createWrapper = p => shallow(<WithAuth {...p} />);
  describe('when the user is logged in', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = createWrapper(props);
    });
    it('should render the children', () => {
      expect(wrapper).toContainReact(<div>{'choo choo'}</div>);
    });
  });
  describe('when the user is not logged in', () => {
    describe('when being on the / route', () => {
      beforeEach(() => {
        props = createTestProps({ isLoggedIn: false });
        wrapper = createWrapper(props);
      });
      it('should render a Redirect component', () => {
        expect(wrapper).toRender('Redirect');
      });
      it('should redirect to /login', () => {
        expect(wrapper.find('Redirect').prop('to').pathname).toBe('/login');
      });
      it('should set the reason param to `UNAUTHORIZED`', () => {
        expect(wrapper.find('Redirect').prop('to').search).toContain(
          `reason=${LOGOUT_REASONS.UNAUTHORIZED}`
        );
      });
      it('should not set a `redirectTo` param', () => {
        expect(wrapper.find('Redirect').prop('to').search).not.toContain(
          'redirectTo'
        );
      });
    });
    describe('when being on the /foo-bar route', () => {
      beforeEach(() => {
        props = createTestProps({
          isLoggedIn: false,
          location: { pathname: '/foo-bar' },
        });
        wrapper = createWrapper(props);
      });
      it('should render a Redirect component', () => {
        expect(wrapper).toRender('Redirect');
      });
      it('should redirect to /login', () => {
        expect(wrapper.find('Redirect').prop('to').pathname).toBe('/login');
      });
      it('should set the reason param to `UNAUTHORIZED`', () => {
        expect(wrapper.find('Redirect').prop('to').search).toContain(
          `reason=${LOGOUT_REASONS.UNAUTHORIZED}`
        );
      });
      it('should set a redirectTo param to `foo-bar`', () => {
        expect(wrapper.find('Redirect').prop('to').search).toContain(
          `redirectTo=${encodeURIComponent('/foo-bar')}`
        );
      });
    });
  });
});
