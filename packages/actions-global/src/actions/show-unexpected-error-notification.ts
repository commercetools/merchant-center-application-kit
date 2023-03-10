import type { TAppNotificationValuesUnexpectedError } from '@commercetools-frontend/constants';
import { DOMAINS } from '@commercetools-frontend/constants';
import type { TUnexpectedErrorNotification } from '../types';

import showNotification from './show-notification';

export default function showUnexpectedErrorNotification({
  errorId,
}: TAppNotificationValuesUnexpectedError = {}) {
  return showNotification<TUnexpectedErrorNotification>(
    {
      id: 0,
      domain: DOMAINS.PAGE,
      kind: 'unexpected-error',
      values: {
        errorId,
      },
    },
    {
      dismissAfter: 0,
    }
  );
}
