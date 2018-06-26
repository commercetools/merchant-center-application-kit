import React from 'react';
import { shallow } from 'enzyme';
import { ChannelsList } from './channels-list';

describe('rendering', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ChannelsList />);
  });
  it('should render title', () => {
    expect(wrapper).toRender({ id: 'Channels.ListView.title' });
  });
});
