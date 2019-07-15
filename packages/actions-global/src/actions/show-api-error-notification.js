import { DOMAINS } from '@commercetools-frontend/constants';
import showNotification from './show-notification';

export default function showApiErrorNotification({ errors, source }) {
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
