import { DOMAINS } from '@commercetools-frontend/constants';
import showNotification from './show-notification';

export default function showUnexpectedErrorNotification({
  error,
  source,
  errorId,
}) {
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
