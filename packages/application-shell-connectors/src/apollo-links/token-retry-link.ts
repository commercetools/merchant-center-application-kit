import { RetryLink } from '@apollo/client/link/retry';
import { STATUS_CODES } from '@commercetools-frontend/constants';
import type { TApolloContext } from '../utils/apollo-context';
import {
  getSkipTokenRetry,
  forwardTokenRetryHeader,
  getDoesGraphQLTargetSupportTokenRetry,
} from './utils';

const tokenRetryLink = new RetryLink({
  attempts: (count, operation, error) => {
    const context = operation.getContext() as TApolloContext;

    if (
      error?.statusCode === STATUS_CODES.UNAUTHORIZED &&
      count === 1 &&
      getDoesGraphQLTargetSupportTokenRetry(context) &&
      !getSkipTokenRetry(context)
    ) {
      operation.setContext(({ headers }: TApolloContext) => ({
        headers: forwardTokenRetryHeader(headers),
      }));

      return true;
    }

    return false;
  },
});

export default tokenRetryLink;
