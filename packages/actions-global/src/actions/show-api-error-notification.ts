import { DOMAINS } from '@commercetools-frontend/constants';
import type {
  TApiErrorNotification,
  TApiErrorNotificationOptions,
} from '../types';

import showNotification from './show-notification';

export default function showApiErrorNotification({
  errors,
}: TApiErrorNotificationOptions) {
  return showNotification<TApiErrorNotification>(
    {
      id: 0,
      domain: DOMAINS.PAGE,
      kind: 'api-error',
      values: {
        // NOTE: Some sources or errors (e.g. GraphQL) return an array or object.
        // The cast into an array happens here so that consumers can pass both types.
        errors: Array.isArray(errors) ? errors : [errors],
      },
    },
    {
      dismissAfter: 0,
    }
  );
}
