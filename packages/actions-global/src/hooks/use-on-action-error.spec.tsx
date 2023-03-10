import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import type { Action } from 'redux';

import useOnActionError from './use-on-action-error';

jest.mock('../actions/handle-action-error', () => (payload: Error) => ({
  type: 'fake-handle-action-error',
  payload,
}));

const renderUseOnActionError = () => {
  const dispatchedActions: Array<Action> = [];
  const fakeStore = {
    dispatch: (action: Action) => dispatchedActions.push(action),
    getState: () => null,
    subscribe: () => null,
  };
  const { result } = renderHook(() => useOnActionError(), {
    // eslint-disable-next-line react/display-name
    wrapper: ({ children }) => (
      // @ts-ignore: partially implemented Redux Store is OK as a mock
      <Provider store={fakeStore}>{children}</Provider>
    ),
  });
  return { onActionError: result.current, dispatchedActions };
};

describe('useOnActionError', () => {
  it('dispatches `handleActionError` with a given error as an payload', () => {
    const { onActionError, dispatchedActions } = renderUseOnActionError();

    const error = new Error('oupsy!');
    onActionError(error);

    expect(dispatchedActions).toMatchObject([
      { type: 'fake-handle-action-error', payload: error },
    ]);
  });
});
