import { ADD_NOTIFICATION } from '@commercetools-frontend/notifications';
import { HIDE_ALL_PAGE_NOTIFICATIONS } from '@commercetools-frontend/constants';
import toGlobal from './to-global';
import {
  showApiErrorNotification,
  showUnexpectedErrorNotification,
  hideAllPageNotifications,
} from './global';

describe('dispatching notifications', () => {
  describe('api errors', () => {
    describe('given `errors` is not an `Array`', () => {
      it('dispatches the ADD_NOTIFICATION action when passing the errors (as Array)', () => {
        expect(
          showApiErrorNotification({
            errors: { code: 'oops' },
            source: 'FOO',
          })
        ).toEqual(
          toGlobal({
            type: ADD_NOTIFICATION,
            payload: {
              kind: 'api-error',
              domain: 'page',
              values: {
                errors: [{ code: 'oops' }],
                source: 'FOO',
                statusCode: undefined,
              },
            },
            meta: {
              dismissAfter: 0,
            },
          })
        );
      });
    });

    describe('given the `errors` is an `Array`', () => {
      it('dispatches the ADD_NOTIFICATION action when passing the errors', () => {
        expect(
          showApiErrorNotification({
            errors: [{ code: 'oops' }],
            source: 'FOO',
          })
        ).toEqual(
          toGlobal({
            type: ADD_NOTIFICATION,
            payload: {
              kind: 'api-error',
              domain: 'page',
              values: {
                errors: [{ code: 'oops' }],
                source: 'FOO',
                statusCode: undefined,
              },
            },
            meta: {
              dismissAfter: 0,
            },
          })
        );
      });
    });
  });

  describe('unexpected errors', () => {
    it('dispatches ADD_NOTIFICATION when unexpected error occurs', () => {
      expect(
        showUnexpectedErrorNotification({
          error: 'oops',
          source: 'FOO',
          errorId: 'myId',
        })
      ).toEqual(
        toGlobal({
          type: ADD_NOTIFICATION,
          payload: {
            kind: 'unexpected-error',
            values: {
              source: 'FOO',
              errorId: 'myId',
              body: 'oops',
            },
            domain: 'page',
          },
          meta: {
            dismissAfter: 0,
            error: 'oops',
          },
        })
      );
    });
  });
});

it('dispatches the HIDE_ALL_PAGE_NOTIFICATIONS action', () => {
  expect(hideAllPageNotifications()).toEqual(
    toGlobal({
      type: HIDE_ALL_PAGE_NOTIFICATIONS,
    })
  );
});
