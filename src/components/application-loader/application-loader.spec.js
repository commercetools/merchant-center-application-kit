import React from 'react';
import { shallow } from 'enzyme';
import LoadingSpinner from '@commercetools-frontend/ui-kit/loading-spinner';
import ApplicationLoader from './application-loader';

describe('rendering', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ApplicationLoader />);
  });
  it('should render LoadingSpinner', () => {
    expect(wrapper).toRender(LoadingSpinner);
  });
  it('should render the commercetools logo', () => {
    expect(wrapper).not.toRender('img');
  });
  describe('when "showLogo" is "true"', () => {
    beforeEach(() => {
      wrapper = shallow(<ApplicationLoader showLogo={true} />);
    });
    it('should render the commercetools logo', () => {
      expect(wrapper).toRender('img');
    });
  });
});
