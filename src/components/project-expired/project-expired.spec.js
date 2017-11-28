import React from 'react';
import { shallow } from 'enzyme';
import ProjectExpired from './project-expired';

describe('rendering', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ProjectExpired />);
  });
  it('outputs correct tree', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render layout component', () => {
    expect(wrapper).toRender('ServicePageResponseLayout');
  });
});
