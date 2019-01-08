import React from 'react';
import { shallow } from 'enzyme';
import { ApplicationStarter } from './entry-point';

describe('rendering', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ApplicationStarter />);
  });
  it('should render examples-starter route', () => {
    expect(wrapper).toRender({ path: '/:projectKey/examples-starter' });
  });
});
