import deepFreeze from 'deep-freeze';
import oneLine from 'common-tags/lib/oneLine';
import middleware from '.';
import { addNotification, removeNotification } from '../action-creators';
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../action-types';

describe('dispatching add/remove notification actions', () => {
  it('should dispatch the add notification action with dismiss', () => {
    const NOTIFICATION_ID = 1;
    const dispatch = action => {
      expect(action).toEqual({
        type: REMOVE_NOTIFICATION,
        payload: NOTIFICATION_ID,
      });
    };
    const next = (/* action */) => {};
    const notification = deepFreeze({ foo: 'bar' });
    const action = addNotification(notification);
    const handle = middleware({ dispatch })(next)(action);
    expect(handle.id).toBe(NOTIFICATION_ID);
    handle.dismiss();
  });

  it('should dispatch the add notification action', () => {
    const NOTIFICATION_ID = 2;
    const notification = deepFreeze({ foo: 'bar' });
    const dispatch = (/* action */) => {};
    const next = action => {
      expect(action).toEqual({
        type: ADD_NOTIFICATION,
        payload: {
          id: NOTIFICATION_ID,
          foo: 'bar',
        },
      });
    };
    const action = addNotification(notification);
    const handle = middleware({ dispatch })(next)(action);
    expect(handle.id).toBe(NOTIFICATION_ID);
  });

  it('should dispatch the add notification action with onDismiss function', () => {
    const NOTIFICATION_ID = 3;
    const next = (/* action */) => {};
    const dispatch = removeAction => {
      expect(removeAction).toEqual({
        type: REMOVE_NOTIFICATION,
        payload: NOTIFICATION_ID,
      });
      middleware({ dispatch: noop })(next)(removeAction);
    };
    const notification = deepFreeze({ foo: 'bar' });
    const action = addNotification(notification, {
      onDismiss(notificationId) {
        expect(notificationId).toBe(NOTIFICATION_ID);
      },
    });
    const handle = middleware({ dispatch })(next)(action);
    expect(handle.id).toBe(NOTIFICATION_ID);
    handle.dismiss();
  });

  it(
    oneLine`
      should dispatch the add notification action with onDismiss function
      with timeout
    `,
    () => {
      const NOTIFICATION_ID = 4;
      const next = (/* action */) => {};
      const dispatch = removeAction => {
        expect(removeAction).toEqual({
          type: REMOVE_NOTIFICATION,
          payload: NOTIFICATION_ID,
        });
        middleware({ dispatch: noop })(next)(removeAction);
      };
      const notification = deepFreeze({ foo: 'bar' });
      const action = addNotification(notification, {
        dismissAfter: 300,
        onDismiss(notificationId) {
          expect(notificationId).toBe(NOTIFICATION_ID);
        },
      });
      const handle = middleware({ dispatch })(next)(action);
      expect(handle.id).toBe(NOTIFICATION_ID);
    }
  );

  it('should dispatch the remove notification action', () => {
    const NOTIFICATION_ID = 5;
    const next = (/* action */) => {};
    const dispatch = (/* action */) => {};
    const notification = deepFreeze({ foo: 'bar' });
    const action = addNotification(notification, {
      onDismiss(notificationId) {
        expect(notificationId).toBe(NOTIFICATION_ID);
      },
    });
    const handle = middleware({ dispatch })(next)(action);
    expect(handle.id).toBe(NOTIFICATION_ID);
    middleware({ dispatch })(next)(removeNotification(NOTIFICATION_ID));
  });

  describe('dispatching plain actions', () => {
    const next = action => action;
    const dispatch = jest.fn(() => {});
    const action = { foo: 'bar' };
    it('should dispatch a plain action returning the action itself', () => {
      expect(middleware({ dispatch })(next)(action)).toEqual(action);
    });

    it('should not call the dispatch method', () => {
      expect(dispatch).toHaveBeenCalledTimes(0);
    });
  });
});

function noop() {}
