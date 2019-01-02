import isNumber from 'lodash/isNumber';
import { addNotification } from '@commercetools-frontend/notifications';
import {
  HIDE_ALL_PAGE_NOTIFICATIONS,
  DOMAINS,
  STATUS_CODES,
  LOGOUT_REASONS,
} from '@commercetools-frontend/constants';
import browserHistory from '@commercetools-frontend/browser-history';

export function showApiErrorNotification({ errors, source }) {
  return showNotification(
    {
      kind: 'api-error',
      values: {
        source,
        // NOTE: Some sources or errors (e.g. GraphQL) return an array or object.
        // The cast into an array happens here so that consumers can pass both types.
        errors: Array.isArray(errors) ? errors : [errors],
      },
      domain: DOMAINS.PAGE,
    },
    {
      dismissAfter: 0,
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

export function showNotification(notification, meta = {}) {
  if (process.env.NODE_ENV !== 'production')
    if (notification.domain) {
      if (!Object.values(DOMAINS).includes(notification.domain))
        // eslint-disable-next-line no-console
        console.warn(
          `Unknown notification domain "${notification.domain}"`,
          notification
        );
    }
    // eslint-disable-next-line no-console
    else console.warn('Notification is missing domain', notification);

  let dismissAfter = meta.dismissAfter;
  if (!isNumber(dismissAfter))
    dismissAfter = notification.kind === 'success' ? 5000 : 0;

  return addNotification(notification, { ...meta, dismissAfter });
}

export function hideAllPageNotifications() {
  return { type: HIDE_ALL_PAGE_NOTIFICATIONS };
}

export const handleActionError = (error, source) => dispatch => {
  // On production we send the errors to Sentry.
  // eslint-disable-next-line no-console
  if (window.app.env !== 'production') console.error(error, error.stack);

  // logout when unauthorized
  if (error.statusCode === STATUS_CODES.UNAUTHORIZED) {
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

  const hasListOfErrors = error.body.errors && Array.isArray(error.body.errors);
  return dispatch(
    showApiErrorNotification({
      source,
      errors: hasListOfErrors
        ? error.body.errors
        : // Pass a fallback error so that our error components can handle it
          [{ message: error.body.message }],
    })
  );
};
