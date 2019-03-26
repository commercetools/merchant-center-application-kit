import React from 'react';
import {
  renderAppWithRedux,
  waitForElement,
} from '@commercetools-frontend/application-shell/test-utils';
import { ApplicationStateMachines } from '../entry-point';

const createStateMachinesSdkMock = () => ({
  action: {
    type: 'SDK',
    payload: {
      method: 'GET',
      service: 'states',
      uri: '/my-project/states?limit=25&offset=0',
    },
  },
  response: {
    count: 25,
    offset: 0,
    total: 2,
    results: [
      { id: 'sm1', key: 'sm-1' },
      { id: 'sm2', key: 'sm-2', name: { en: 'SM 2' } },
    ],
  },
});

const render = (options = {}) => {
  const route = options.route || '/my-project/state-machines';
  return renderAppWithRedux(<ApplicationStateMachines />, {
    route,
    ...options,
  });
};

describe('list view', () => {
  // The `CellMeasurerCache` used in the `Table` component logs a warning
  // because we are using it to have dynamic width and height (causing CI to fail).
  // In the future, we will hopefully replace the `Table` with a much simpler
  // implementation. For now we can simply mock `console.warn`.
  console.warn = jest.fn();
  it('the user can see a list of state machines', async () => {
    const { getByText } = render({
      sdkMocks: [createStateMachinesSdkMock()],
    });
    await waitForElement(() => getByText(/State machines/i));
    await waitForElement(() => getByText(/There are 2 objects in the cache/i));
    // TODO: the <Table> does not seem to be correctly rendered in the DOM with RTL,
    // because the width=0 and the content of the <Table> won't get rendered.
    // await waitForElement(() => getByText('sm-1'));
    // await waitForElement(() => getByText('sm-2'));
  });
});
