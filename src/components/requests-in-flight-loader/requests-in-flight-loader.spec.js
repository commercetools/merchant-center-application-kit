import React from 'react';
import { shallow } from 'enzyme';
import { RequestsInFlightLoader } from './requests-in-flight-loader';

jest.mock('react-dom', () => ({
  createPortal: () => <div id="create-portal-has-been-called" />,
}));

describe('rendering', () => {
  let wrapper;
  describe('when there are no requests in flight', () => {
    beforeEach(() => {
      wrapper = shallow(<RequestsInFlightLoader hasRequestsInFlight={false} />);
    });
    it('should render nothing', () => {
      expect(wrapper.type()).toBe(null);
    });
  });
  describe('when there are some requests in flight', () => {
    beforeEach(() => {
      wrapper = shallow(<RequestsInFlightLoader hasRequestsInFlight={true} />);
    });
    it('should render portal', () => {
      expect(wrapper).toRender('#create-portal-has-been-called');
    });
  });
  describe('loader', () => {
    let loaderWrapper;
    beforeEach(() => {
      wrapper = shallow(<RequestsInFlightLoader hasRequestsInFlight={true} />);
      loaderWrapper = shallow(<div>{wrapper.instance().renderLoader()}</div>);
    });
    it('should render <LoadingSpinner>', () => {
      expect(loaderWrapper).toRender('LoadingSpinner');
    });
  });
});
