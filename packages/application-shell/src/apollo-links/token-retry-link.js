import { RetryLink } from 'apollo-link-retry';
import { STATUS_CODES } from '@commercetools-frontend/constants';

// This link retries requests to the CTP API that have been rejected
// because of an invalid/expired oauth token.
// To do so, we resend the request with the header "X-Force-Token: true"
// so that the MC BE can issue a new token.
// NOTE: the retry is not meant to work for the MC access token.
const tokenRetryLink = new RetryLink({
  attempts: (count, operation, error) => {
    const { headers: requestHeaders } = operation.getContext();
    if (
      error &&
      error.statusCode &&
      error.statusCode === STATUS_CODES.UNAUTHORIZED &&
      requestHeaders['X-Graphql-Target'] === 'ctp' &&
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

export default tokenRetryLink;
