import React from 'react';
import { shallow } from 'enzyme';
import ProjectWithoutSettings from './project-without-settings';

describe('rendering', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <ProjectWithoutSettings params={{ currentProject: 'foo' }} />
    );
  });
  it('outputs correct tree', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
