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
  // TODO move test to the app shell
  // describe('when the user is not logged in', () => {
  //   describe('when being on the / route', () => {
  //     beforeEach(() => {
  //       props = createTestProps({ isLoggedIn: false });
  //       wrapper = createWrapper(props);
  //     });
  //     it('should render a Redirect component', () => {
  //       expect(wrapper).toRender('Redirect');
  //     });
  //     it('should redirect to /logout', () => {
  //       expect(wrapper.find('Redirect').prop('to').pathname).toBe('/logout');
  //     });
  //     it('should set the reason param to `UNAUTHORIZED`', () => {
  //       expect(wrapper.find('Redirect').prop('to').search).toContain(
  //         `reason=${LOGOUT_REASONS.UNAUTHORIZED}`
  //       );
  //     });
  //     it('should not set a `redirectTo` param', () => {
  //       expect(wrapper.find('Redirect').prop('to').search).not.toContain(
  //         'redirectTo'
  //       );
  //     });
  //   });
  //   describe('when being on the /foo-bar route', () => {
  //     beforeEach(() => {
  //       props = createTestProps({
  //         isLoggedIn: false,
  //         location: { pathname: '/foo-bar' },
  //       });
  //       wrapper = createWrapper(props);
  //     });
  //     it('should render a Redirect component', () => {
  //       expect(wrapper).toRender('Redirect');
  //     });
  //     it('should redirect to /logout', () => {
  //       expect(wrapper.find('Redirect').prop('to').pathname).toBe('/logout');
  //     });
  //     it('should set the reason param to `UNAUTHORIZED`', () => {
  //       expect(wrapper.find('Redirect').prop('to').search).toContain(
  //         `reason=${LOGOUT_REASONS.UNAUTHORIZED}`
  //       );
  //     });
  //     it('should set a redirectTo param to `foo-bar`', () => {
  //       expect(wrapper.find('Redirect').prop('to').search).toContain(
  //         `redirectTo=${encodeURIComponent('/foo-bar')}`
  //       );
  //     });
  //   });
  // });
});
