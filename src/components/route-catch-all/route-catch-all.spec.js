import React from 'react';
import { shallow } from 'enzyme';
import PageNotFound from '@commercetools-local/core/components/page-not-found';
import { ForcePageReload, RouteCatchAll } from './route-catch-all';

describe('rendering', () => {
  let wrapper;
  describe('<ForcePageReload>', () => {
    beforeEach(() => {
      wrapper = shallow(<ForcePageReload />);
      wrapper.instance().reloadPage = jest.fn();
      wrapper.instance().componentDidMount();
    });
    it('should call reloadPage when component mounts', () => {
      expect(wrapper.instance().reloadPage).toHaveBeenCalled();
    });
    it('should render null', () => {
      expect(wrapper.type()).toBe(null);
    });
  });
  describe('<RouteCatchAll>', () => {
    describe('when MC environment is development', () => {
      beforeEach(() => {
        wrapper = shallow(<RouteCatchAll environmentName="development" />);
      });
      it('should render Route with <PageNotFound>', () => {
        expect(wrapper.find('Route')).toHaveProp('component', PageNotFound);
      });
    });
    describe('when MC environment is not development', () => {
      beforeEach(() => {
        wrapper = shallow(<RouteCatchAll environmentName="production" />);
      });
      it('should render Route with <ForcePageReload>', () => {
        expect(wrapper.find('Route')).toHaveProp('component', ForcePageReload);
      });
    });
  });
});
