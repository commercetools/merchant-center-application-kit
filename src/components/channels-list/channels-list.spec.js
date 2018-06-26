import React from 'react';
import { shallow } from 'enzyme';
import Table from '@commercetools-frontend/ui-kit/table';
import ChannelsListConnector from '../channels-list-connector';
import { ChannelsList } from './channels-list';

const createTestProps = props => ({
  projectKey: 'test-1',
  language: 'en',
  ...props,
});

describe('rendering', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<ChannelsList {...props} />);
  });
  it('should render title', () => {
    expect(wrapper).toRender({ id: 'Channels.ListView.title' });
  });
  describe('when data is being fetched', () => {
    beforeEach(() => {
      wrapper = wrapper.find(ChannelsListConnector).renderProp('children', {
        isLoading: true,
      });
    });
    it('should render <LoadingSpinner>', () => {
      expect(wrapper).toRender('LoadingSpinner');
    });
  });
  describe('when there is an error fetching the data', () => {
    beforeEach(() => {
      wrapper = wrapper.find(ChannelsListConnector).renderProp('children', {
        isLoading: false,
        error: { message: 'Oops' },
      });
    });
    it('should render error message', () => {
      expect(wrapper).toHaveText('Oops');
    });
  });
  describe('when there are no results', () => {
    beforeEach(() => {
      wrapper = wrapper.find(ChannelsListConnector).renderProp('children', {
        isLoading: false,
        hasNoResults: true,
      });
    });
    it('should render empty result', () => {
      expect(wrapper).toRender({ id: 'Channels.ListView.noResults' });
    });
  });
  describe('when there are some results', () => {
    beforeEach(() => {
      wrapper = wrapper.find(ChannelsListConnector).renderProp('children', {
        isLoading: false,
        hasNoResults: false,
        result: {
          total: 2,
          count: 2,
          results: [
            { key: 'ch1', name: { en: 'Ch 1' } },
            { name: { de: 'Ch 2' } },
          ],
        },
      });
    });
    it('should render <Table>', () => {
      expect(wrapper).toRender(Table);
    });
  });
});
