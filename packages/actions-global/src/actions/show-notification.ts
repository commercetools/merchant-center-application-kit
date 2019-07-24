import isNumber from 'lodash/isNumber';
import {
  addNotification,
  TNotificationMetaOptions,
} from '@commercetools-frontend/notifications';
import { DOMAINS } from '@commercetools-frontend/constants';
import { TShowNotification } from '../types';

export default function showNotification<
  Notification extends TShowNotification
>(notification: Notification, meta: TNotificationMetaOptions = {}) {
  if (process.env.NODE_ENV !== 'production')
    if (notification.domain) {
      if (!Object.values(DOMAINS).includes(notification.domain))
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
    dismissAfter = notification.kind === 'success' ? 5000 : 0;

  return addNotification<Pick<Notification, 'id'>>(notification, {
    ...meta,
    dismissAfter,
  });
}
