import isNumber from 'lodash.isnumber';
import { addNotification } from '@commercetools-local/notifications';
import {
  LOGGED_IN,
  HIDE_ALL_PAGE_NOTIFICATIONS,
  SWITCH_LOCALE,
  SWITCH_PROJECT_LANGUAGE,
  DOMAINS,
  STATUS_CODES,
  LOGOUT_REASONS,
} from '@commercetools-local/constants';
import toGlobal from '@commercetools-local/utils/to-global';
import logger from '@commercetools-local/utils/logger';
import browserHistory from '@commercetools-local/browser-history';

// This is similar to `handleActionError`
export function handleApiError(error, source) {
  return dispatch => handleActionError(dispatch, error, source);
}

export default function handleActionError(dispatch, error, source) {
  // On production we send the errors to Sentry.
  if (window.app.env !== 'production') logger.error(error, error.stack);

  // logout when unauthorized
  if (error.statusCode === STATUS_CODES.UNAUTHORIZED && source !== LOGGED_IN) {
    browserHistory.push(`/logout?reason=${LOGOUT_REASONS.UNAUTHORIZED}`);
  }

  // We need to do the return, because if not we see an error notification
  // The error is handled with the handleUnavailableResource HoC to show the PageNotFound component
  // when the api returns 404
  if (error.statusCode === STATUS_CODES.NOT_FOUND) return null;

  // All native errors that might occur within a Promise handler,
  // are caught here as well. In this case we dispatch an unexpected
  // error notification.
  if (!error.statusCode)
    return dispatch(showUnexpectedErrorNotification({ source, error }));

  return dispatch(showApiErrorNotification({ source, error }));
}

export function showApiErrorNotification({ error, source }) {
  return showNotification(
    {
      kind: 'api-error',
      values: {
        source,
        statusCode: error.statusCode || error.code,
        body:
          error.body ||
          (error instanceof Error
            ? `${error.toString()}\n${error.stack}`
            : error),
      },
      domain: DOMAINS.PAGE,
    },
    {
      dismissAfter: 0,
      error,
    }
  );
}

export function showUnexpectedErrorNotification({ error, source, errorId }) {
  return showNotification(
    {
      kind: 'unexpected-error',
      values: {
        source,
        errorId,
        message: error.message,
        body:
          error instanceof Error
            ? `${error.toString()}\n${error.stack}`
            : error,
      },
      domain: DOMAINS.PAGE,
    },
    {
      dismissAfter: 0,
      error,
    }
  );
}

export function showNotification(notification, options = {}) {
  if (process.env.NODE_ENV !== 'production')
    if (notification.domain) {
      if (!Object.values(DOMAINS).includes(notification.domain))
        // eslint-disable-next-line no-console
        console.warn(
          `Unknown notification domain "${notification.domain}"`,
          notification
        );
    } else
      // eslint-disable-next-line no-console
      console.warn('Notification is missing domain', notification);

  let dismissAfter = options.dismissAfter;
  if (!isNumber(dismissAfter))
    dismissAfter = notification.kind === 'success' ? 5000 : 0;

  return toGlobal(addNotification(notification, { ...options, dismissAfter }));
}

export function switchLocale(locale) {
  return toGlobal({ type: SWITCH_LOCALE, payload: locale });
}

export function switchProjectLanguage(lang) {
  return toGlobal({ type: SWITCH_PROJECT_LANGUAGE, payload: lang });
}

export function hideAllPageNotifications() {
  return toGlobal({ type: HIDE_ALL_PAGE_NOTIFICATIONS });
}
