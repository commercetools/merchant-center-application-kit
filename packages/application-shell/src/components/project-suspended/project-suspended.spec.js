import React from 'react';
import { shallow } from 'enzyme';
import ServicePageResponseLayout from '../../from-core/service-page-response-layout';
import ProjectSuspended from './project-suspended';

describe('rendering', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ProjectSuspended />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render layout component', () => {
    expect(wrapper).toRender(ServicePageResponseLayout);
  });

  describe('when suspension is temporary', () => {
    beforeEach(() => {
      wrapper = shallow(<ProjectSuspended isTemporary={true} />);
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
