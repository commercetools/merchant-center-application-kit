import React from 'react';
import { shallow } from 'enzyme';
import { Table } from '@commercetools-frontend/ui-kit';
import StateMachinesListConnector from '../state-machines-list-connector';
import { StateMachinesList } from './state-machines-list';

const createTestProps = props => ({
  projectKey: 'test-1',
  applicationContext: {
    dataLocale: 'en',
  },
  ...props,
});

describe('rendering', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<StateMachinesList {...props} />);
  });
  it('should render title', () => {
    expect(wrapper).toRender({ id: 'StateMachines.ListView.title' });
  });
  describe('when data is being fetched', () => {
    beforeEach(() => {
      wrapper = wrapper
        .find(StateMachinesListConnector)
        .renderProp('children', {
          isLoading: true,
        });
    });
    it('should render <LoadingSpinner>', () => {
      expect(wrapper).toRender('LoadingSpinner');
    });
  });
  describe('when there is an error fetching the data', () => {
    beforeEach(() => {
      wrapper = wrapper
        .find(StateMachinesListConnector)
        .renderProp('children', {
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
      wrapper = wrapper
        .find(StateMachinesListConnector)
        .renderProp('children', {
          isLoading: false,
          hasNoResults: true,
        });
    });
    it('should render empty result', () => {
      expect(wrapper).toRender({ id: 'StateMachines.ListView.noResults' });
    });
  });
  describe('when there are some results', () => {
    beforeEach(() => {
      wrapper = wrapper
        .find(StateMachinesListConnector)
        .renderProp('children', {
          isLoading: false,
          hasNoResults: false,
          result: {
            total: 2,
            count: 2,
            results: [
              { key: 'sm1', name: { en: 'SM 1' } },
              { name: { de: 'SM 2' } },
            ],
          },
        });
    });
    it('should render <Table>', () => {
      expect(wrapper).toRender(Table);
    });
  });
});
