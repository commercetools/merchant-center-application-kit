import { onError, ErrorResponse } from 'apollo-link-error';
import { ServerError, ServerParseError } from 'apollo-link-http-common';
import {
  STATUS_CODES,
  LOGOUT_REASONS,
} from '@commercetools-frontend/constants';
import history from '@commercetools-frontend/browser-history';

const isHttpError = (
  error: ErrorResponse['networkError']
): error is ServerError | ServerParseError =>
  (error && (error as ServerError).statusCode !== undefined) ||
  (error as ServerParseError).statusCode !== undefined;

// Checks response from GraphQL in order to scan 401 errors and redirect the
// user to the login page resetting the store and showing the proper message
const errorLink = onError(({ networkError }) => {
  if (
    networkError &&
    isHttpError(networkError) &&
    networkError.statusCode === STATUS_CODES.UNAUTHORIZED
  ) {
    history.push(`/logout?reason=${LOGOUT_REASONS.UNAUTHORIZED}`);
  }
});

export default errorLink;
