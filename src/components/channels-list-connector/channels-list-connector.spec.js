import React from 'react';
import { shallow } from 'enzyme';
import { Sdk } from '@commercetools-frontend/sdk';
import ChannelsListConnector from './channels-list-connector';

const createTestProps = props => ({
  children: jest.fn(),
  projectKey: 'test-1',
  language: 'en',
  ...props,
});
describe('rendering', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<ChannelsListConnector {...props} />);
  });
  it('should pass action creator args to <Sdk.Get>', () => {
    expect(wrapper.find(Sdk.Get)).toHaveProp('actionCreatorArgs', [
      { perPage: 25, page: 1 },
    ]);
  });
});
