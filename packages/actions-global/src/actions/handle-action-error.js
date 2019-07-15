import {
  STATUS_CODES,
  LOGOUT_REASONS,
} from '@commercetools-frontend/constants';
import browserHistory from '@commercetools-frontend/browser-history';
import showApiErrorNotification from './show-api-error-notification';
import showUnexpectedErrorNotification from './show-unexpected-error-notification';

export default function handleActionError(error, source) {
  return dispatch => {
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

    const hasListOfErrors =
      error.body.errors && Array.isArray(error.body.errors);
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
}
