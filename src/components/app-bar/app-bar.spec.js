import React from 'react';
import { shallow } from 'enzyme';
import AppBar from './app-bar';

describe('rendering', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AppBar match={{ params: { projectKey: 'test-1' } }} />);
  });
  it('should match layout structure', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render element for locale switcher portal', () => {
    expect(wrapper).toRender('#locale-switcher');
  });
});
