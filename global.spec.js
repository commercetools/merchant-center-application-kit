import { ADD_NOTIFICATION } from '@commercetools-local/notifications';
import {
  SWITCH_LOCALE,
  SWITCH_PROJECT_LANGUAGE,
  HIDE_ALL_PAGE_NOTIFICATIONS,
} from '@commercetools-local/constants';
import toGlobal from '@commercetools-local/utils/to-global';
import {
  showApiErrorNotification,
  showUnexpectedErrorNotification,
  switchLocale,
  switchProjectLanguage,
  hideAllPageNotifications,
} from './global';

describe('dispatching notifications', () => {
  it('dispatches the ADD_NOTIFICATION action when passing an error', () => {
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

it('dispatches the SWITCH_LOCALE action', () => {
  const newLocale = 'en';
  expect(switchLocale(newLocale)).toEqual(
    toGlobal({
      type: SWITCH_LOCALE,
      payload: newLocale,
    })
  );
});

it('dispatches the SWITCH_PROJECT_LANGUAGE action', () => {
  const newLocale = 'en';
  expect(switchProjectLanguage(newLocale)).toEqual(
    toGlobal({
      type: SWITCH_PROJECT_LANGUAGE,
      payload: newLocale,
    })
  );
});

it('dispatches the HIDE_ALL_PAGE_NOTIFICATIONS action', () => {
  expect(hideAllPageNotifications()).toEqual(
    toGlobal({
      type: HIDE_ALL_PAGE_NOTIFICATIONS,
    })
  );
});
