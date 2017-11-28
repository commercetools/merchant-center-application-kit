import React from 'react';
import { shallow } from 'enzyme';
import ProjectSuspended from './project-suspended';

describe('rendering', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ProjectSuspended />);
  });
  it('outputs correct tree', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render layout component', () => {
    expect(wrapper).toRender('ServicePageResponseLayout');
  });
});
