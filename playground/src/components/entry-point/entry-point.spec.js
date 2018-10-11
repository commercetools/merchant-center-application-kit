import React from 'react';
import { shallow } from 'enzyme';
import ApplicationShell from '@commercetools-frontend/application-shell';
import EntryPoint from './entry-point';

describe('rendering', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EntryPoint />);
  });
  describe('<ApplicationShell>', () => {
    beforeEach(() => {
      wrapper = wrapper.find(ApplicationShell).renderProp('render');
    });
    it('should render channels route', () => {
      expect(wrapper).toRender({ path: '/:projectKey/channels' });
    });
  });
});
