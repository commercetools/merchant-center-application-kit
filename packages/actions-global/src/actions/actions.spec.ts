import { HIDE_ALL_PAGE_NOTIFICATIONS } from '@commercetools-frontend/constants';
import { ADD_NOTIFICATION } from '@commercetools-frontend/notifications';
import hideAllPageNotifications from './hide-all-page-notifications';
import showApiErrorNotification from './show-api-error-notification';
import showUnexpectedErrorNotification from './show-unexpected-error-notification';

const error = { code: 'SomeError', message: 'Oops' };

describe('dispatching notifications', () => {
  describe('api errors', () => {
    describe('given `errors` is not an `Array`', () => {
      it('dispatches the ADD_NOTIFICATION action when passing the errors (as Array)', () => {
        expect(
          showApiErrorNotification({
            errors: error,
          })
        ).toEqual(
          expect.objectContaining({
            type: ADD_NOTIFICATION,
            payload: expect.objectContaining({
              kind: 'api-error',
              domain: 'page',
              values: {
                errors: [error],
              },
            }),
            meta: expect.objectContaining({
              dismissAfter: 0,
            }),
          })
        );
      });
    });

    describe('given the `errors` is an `Array`', () => {
      it('dispatches the ADD_NOTIFICATION action when passing the errors', () => {
        expect(
          showApiErrorNotification({
            errors: [error],
          })
        ).toEqual(
          expect.objectContaining({
            type: ADD_NOTIFICATION,
            payload: expect.objectContaining({
              kind: 'api-error',
              domain: 'page',
              values: {
                errors: [error],
              },
            }),
            meta: expect.objectContaining({
              dismissAfter: 0,
            }),
          })
        );
      });
    });
  });

  describe('unexpected errors', () => {
    it('dispatches ADD_NOTIFICATION when unexpected error occurs', () => {
      expect(
        showUnexpectedErrorNotification({
          errorId: 'myId',
        })
      ).toEqual(
        expect.objectContaining({
          type: ADD_NOTIFICATION,
          payload: expect.objectContaining({
            kind: 'unexpected-error',
            domain: 'page',
            values: {
              errorId: 'myId',
            },
          }),
          meta: expect.objectContaining({
            dismissAfter: 0,
          }),
        })
      );
    });
  });
});

it('dispatches the HIDE_ALL_PAGE_NOTIFICATIONS action', () => {
  expect(hideAllPageNotifications()).toEqual({
    type: HIDE_ALL_PAGE_NOTIFICATIONS,
  });
});
