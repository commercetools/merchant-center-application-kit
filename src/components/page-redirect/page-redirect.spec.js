import React from 'react';
import { shallow } from 'enzyme';
import PageRedirect, { LocationRedirect } from './page-redirect';

describe('rendering', () => {
  let wrapper;
  describe('<LocationRedirect>', () => {
    beforeEach(() => {
      wrapper = shallow(<LocationRedirect to="/foo/bar" />);
      wrapper.instance().redirectTo = jest.fn();
      wrapper.instance().componentDidMount();
    });
    it('should call redirectTo when component mounts', () => {
      expect(wrapper.instance().redirectTo).toHaveBeenCalledWith('/foo/bar');
    });
    it('should render null', () => {
      expect(wrapper.type()).toBe(null);
    });
  });
  describe('<PageRedirect>', () => {
    describe('when "forceReload" is true', () => {
      let routeWrapper;
      beforeEach(() => {
        wrapper = shallow(<PageRedirect forceReload={true} to="/foo/bar" />);
        routeWrapper = shallow(
          <div>{wrapper.find('Route').prop('render')()}</div>
        );
      });
      it('should render Route', () => {
        expect(wrapper).toRender('Route');
      });
      it('should render LocationRedirect', () => {
        expect(routeWrapper).toRender('LocationRedirect');
      });
      it('should pass "to" to render LocationRedirect', () => {
        expect(routeWrapper.find('LocationRedirect')).toHaveProp(
          'to',
          '/foo/bar'
        );
      });
    });
    describe('when "forceReload" is false', () => {
      beforeEach(() => {
        wrapper = shallow(<PageRedirect forceReload={false} to="/foo/bar" />);
      });
      it('should render Redirect', () => {
        expect(wrapper).toRender('Redirect');
      });
    });
  });
});
