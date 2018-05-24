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
    describe('when "reload" is true', () => {
      beforeEach(() => {
        wrapper = shallow(<PageRedirect reload={true} to="/foo/bar" />);
      });
      it('should render LocationRedirect', () => {
        expect(wrapper).toRender('LocationRedirect');
      });
      it('should pass "to" to render LocationRedirect', () => {
        expect(wrapper.find('LocationRedirect')).toHaveProp('to', '/foo/bar');
      });
    });
    describe('when "reload" is false', () => {
      beforeEach(() => {
        wrapper = shallow(<PageRedirect reload={false} to="/foo/bar" />);
      });
      it('should render Redirect', () => {
        expect(wrapper).toRender('Redirect');
      });
    });
  });
});
