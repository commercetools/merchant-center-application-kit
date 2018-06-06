import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import PageNotFound from './page-not-found';

describe('rendering', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PageNotFound />);
  });
  it('outputs correct tree', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render layout component', () => {
    expect(wrapper).toRender('ServicePageResponseLayout');
  });
});
