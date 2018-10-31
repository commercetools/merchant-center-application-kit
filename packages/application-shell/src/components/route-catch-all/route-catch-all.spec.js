import React from 'react';
import { shallow } from 'enzyme';
import PageNotFound from '../../from-core/page-not-found';
import { ForcePageReload, RouteCatchAll } from './route-catch-all';

const createTestProps = props => ({
  applicationState: {
    environment: {
      servedByProxy: false,
    },
  },
  ...props,
});

describe('rendering', () => {
  let wrapper;
  let props;
  describe('<ForcePageReload>', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<ForcePageReload {...props} />);
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
    describe('when "servedByProxy" is "true" (string)', () => {
      beforeEach(() => {
        props = createTestProps({
          applicationState: {
            environment: {
              servedByProxy: 'true',
            },
          },
        });
        wrapper = shallow(<RouteCatchAll {...props} />);
      });
      it('should render Route with <ForcePageReload>', () => {
        expect(wrapper.find('Route')).toHaveProp('component', ForcePageReload);
      });
    });
    describe('when "servedByProxy" is "true" (boolean)', () => {
      beforeEach(() => {
        props = createTestProps({
          applicationState: {
            environment: {
              servedByProxy: true,
            },
          },
        });
        wrapper = shallow(<RouteCatchAll {...props} />);
      });
      it('should render Route with <ForcePageReload>', () => {
        expect(wrapper.find('Route')).toHaveProp('component', ForcePageReload);
      });
    });
    describe('when "servedByProxy" is not defined', () => {
      beforeEach(() => {
        props = createTestProps({
          applicationState: {
            environment: {},
          },
        });
        wrapper = shallow(<RouteCatchAll {...props} />);
      });
      it('should render Route with <PageNotFound>', () => {
        expect(wrapper.find('Route')).toHaveProp('component', PageNotFound);
      });
    });
  });
});
