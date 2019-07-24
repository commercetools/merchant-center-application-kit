import { Dispatch } from 'redux';
import {
  STATUS_CODES,
  LOGOUT_REASONS,
  TStatusCode,
  TAppNotificationApiError,
} from '@commercetools-frontend/constants';
import browserHistory from '@commercetools-frontend/browser-history';
import showApiErrorNotification from './show-api-error-notification';
import showUnexpectedErrorNotification from './show-unexpected-error-notification';

type ActionError =
  | Error
  | {
      statusCode: TStatusCode;
      body: {
        message: string;
        errors?: TAppNotificationApiError | TAppNotificationApiError[];
      };
    };

export default function handleActionError(error: ActionError) {
  return (
    dispatch: Dispatch<
      | ReturnType<typeof showApiErrorNotification>
      | ReturnType<typeof showUnexpectedErrorNotification>
    >
  ) => {
    // On production we send the errors to Sentry.
    // eslint-disable-next-line no-console
    if (window.app.env !== 'production')
      console.error(error, error instanceof Error && error.stack);

    // All native errors that might occur within a Promise handler,
    // are caught here as well. In this case we dispatch an unexpected
    // error notification.
    if (error instanceof Error)
      return dispatch(showUnexpectedErrorNotification());

    // logout when unauthorized
    if (error.statusCode === STATUS_CODES.UNAUTHORIZED) {
      browserHistory.push(`/logout?reason=${LOGOUT_REASONS.UNAUTHORIZED}`);
    }

    // We need to do the return, because if not we see an error notification
    // The error is handled with the handleUnavailableResource HoC to show the PageNotFound component
    // when the api returns 404
    if (error.statusCode === STATUS_CODES.NOT_FOUND) return null;

    return dispatch(
      showApiErrorNotification({
        errors: error.body.errors || [
          // Pass a fallback error so that our error components can handle it
          { message: error.body.message, code: 'Unknown' },
        ],
      })
    );
  };
}
