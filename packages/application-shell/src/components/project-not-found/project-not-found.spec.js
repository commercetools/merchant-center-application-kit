import React from 'react';
import { shallow } from 'enzyme';
import ProjectNotFound from './project-not-found';

describe('rendering', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ProjectNotFound />);
  });
  it('outputs correct tree', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render layout component', () => {
    expect(wrapper).toRender('ServicePageResponseLayout');
  });
});
