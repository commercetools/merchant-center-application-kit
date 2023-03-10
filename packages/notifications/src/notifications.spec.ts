import { createStore, applyMiddleware } from 'redux';
import { addNotification } from './action-creators';
import middleware from './middleware';
import reducer from './reducer';
import type { TNotificationAction, TNotificationState } from './types';

type FooNotification = {
  id: number;
  foo: string;
};

describe('dispatching add/remove notification actions', () => {
  it('should add a notification and wait for it to be removed after 100ms', () => {
    jest.useFakeTimers();
    const notification: FooNotification = { id: 0, foo: 'bar' };

    const store = createStore<
      TNotificationState<FooNotification>,
      TNotificationAction<FooNotification>,
      unknown,
      unknown
    >(reducer, undefined, applyMiddleware(middleware));
    expect(store.getState()).toEqual([]);
    const action = addNotification(notification, {
      dismissAfter: 100,
    });
    store.dispatch(action);
    expect(store.getState()).toEqual(
      expect.arrayContaining([expect.objectContaining({ foo: 'bar' })])
    );
    jest.advanceTimersByTime(101);
    expect(store.getState()).toEqual([]);
  });

  it('should add a notification and remove it after calling onDismiss', () => {
    const notification: FooNotification = { id: 0, foo: 'bar' };

    const store = createStore<
      TNotificationState<FooNotification>,
      TNotificationAction<FooNotification>,
      unknown,
      unknown
    >(reducer, undefined, applyMiddleware(middleware));
    expect(store.getState()).toEqual([]);
    const action = addNotification(notification, {
      onDismiss(notificationId) {
        expect(notificationId).toEqual(expect.any(Number));
      },
    });
    const dispatchedAction = store.dispatch(action);
    expect(store.getState()).toEqual(
      expect.arrayContaining([expect.objectContaining({ foo: 'bar' })])
    );
    dispatchedAction.dismiss && dispatchedAction.dismiss();
    expect(store.getState()).toEqual([]);
  });
});
