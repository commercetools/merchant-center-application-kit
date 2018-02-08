import { RetryLink } from 'apollo-link-retry';
import { STATUS_CODES } from '@commercetools-local/constants';

/* eslint-disable import/prefer-default-export */
export const tokenRetryLink = new RetryLink({
  attempts: (count, operation, error) => {
    // in case of 401 error, try again ONCE with a new token
    // https://github.com/commercetools/merchant-center-backend/blob/master/docs/AUTHENTICATION.md#problems-due-to-oauth-token-caching
    if (
      error &&
      error.statusCode &&
      error.statusCode === STATUS_CODES.UNAUTHORIZED &&
      count === 1
    ) {
      operation.setContext(({ headers }) => ({
        headers: {
          ...headers,
          'X-Force-Token': true,
        },
      }));

      return true;
    }

    return false;
  },
});
