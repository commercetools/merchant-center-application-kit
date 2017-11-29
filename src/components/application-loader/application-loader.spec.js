import React from 'react';
import { shallow } from 'enzyme';
import ApplicationLoader from './application-loader';

describe('rendering', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ApplicationLoader />);
  });
  it('should render LoadingSpinner', () => {
    expect(wrapper).toRender('LoadingSpinner');
  });
  it('should render the commercetools logo', () => {
    expect(wrapper).toRender('img');
  });
});
