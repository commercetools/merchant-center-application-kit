import isNumber from 'lodash/isNumber';
import {
  NOTIFICATION_DOMAINS,
  NOTIFICATION_KINDS_SIDE,
} from '@commercetools-frontend/constants';
import type {
  TNotificationMetaOptions,
  TNotification,
} from '@commercetools-frontend/notifications';
import { addNotification } from '@commercetools-frontend/notifications';
import type { TShowNotification } from '../types';

export default function showNotification<
  Notification extends TShowNotification
>(notification: Notification, meta: TNotificationMetaOptions = {}) {
  if (process.env.NODE_ENV !== 'production')
    if (notification.domain) {
      if (!Object.values(NOTIFICATION_DOMAINS).includes(notification.domain))
        // eslint-disable-next-line no-console
        console.warn(
          `Unknown notification domain "${notification.domain}"`,
          notification
        );
    }
    // eslint-disable-next-line no-console
    else console.warn('Notification is missing domain', notification);

  let dismissAfter = meta.dismissAfter;
  if (!isNumber(dismissAfter))
    dismissAfter =
      notification.kind === NOTIFICATION_KINDS_SIDE.success ? 5000 : 0;

  return addNotification<Notification & TNotification>(notification, {
    ...meta,
    dismissAfter,
  });
}
