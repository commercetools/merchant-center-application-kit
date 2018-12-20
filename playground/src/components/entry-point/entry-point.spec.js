import React from 'react';
import { shallow } from 'enzyme';
import { ApplicationStateMachines } from './entry-point';

describe('rendering', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ApplicationStateMachines />);
  });
  it('should render state-machines route', () => {
    expect(wrapper).toRender({ path: '/:projectKey/state-machines' });
  });
});
