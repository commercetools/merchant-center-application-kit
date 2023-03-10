import type { ThunkDispatch } from 'redux-thunk';
import history from '@commercetools-frontend/browser-history';
import type {
  TAppNotificationApiError,
  TStatusCode,
  ApplicationWindow,
} from '@commercetools-frontend/constants';
import {
  STATUS_CODES,
  LOGOUT_REASONS,
} from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import showApiErrorNotification from './show-api-error-notification';
import showUnexpectedErrorNotification from './show-unexpected-error-notification';

declare let window: ApplicationWindow;

type ApiError = {
  statusCode: TStatusCode;
  body: {
    message: string;
    errors?: TAppNotificationApiError | TAppNotificationApiError[];
  };
};

export type ActionError = Error | ApiError;
export type DispatchActionError = ThunkDispatch<
  null,
  null,
  | ReturnType<typeof showApiErrorNotification>
  | ReturnType<typeof showUnexpectedErrorNotification>
>;

function isApiError(error: ActionError): error is ApiError {
  return (error as ApiError).body !== undefined;
}

export default function handleActionError(error: ActionError) {
  return (dispatch: DispatchActionError) => {
    // On production we send the errors to Sentry.
    // eslint-disable-next-line no-console
    if (window.app.env !== 'production')
      console.error(error, error instanceof Error && error.stack);

    if (!isApiError(error)) {
      const errorId = reportErrorToSentry(error);
      return dispatch(showUnexpectedErrorNotification({ errorId }));
    }

    // When unauthorized, log the user out.
    if (error.statusCode === STATUS_CODES.UNAUTHORIZED) {
      history.push(`/logout?reason=${LOGOUT_REASONS.UNAUTHORIZED}`);
    }

    // We need to do the return, because if not we see an error notification
    // The error is handled with the handleUnavailableResource HoC to show the PageNotFound component
    // when the api returns 404
    if (error.statusCode === STATUS_CODES.NOT_FOUND) return null;

    return dispatch(
      showApiErrorNotification({
        errors: error.body.errors || [
          // Pass a fallback error so that our error components can handle it
          { message: error.body.message },
        ],
      })
    );
  };
}
