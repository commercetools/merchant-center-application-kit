import isNumber from 'lodash/isNumber';
import { addNotification } from '@commercetools-frontend/notifications';
import { DOMAINS } from '@commercetools-frontend/constants';

export default function showNotification(notification, meta = {}) {
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

  return addNotification(notification, { ...meta, dismissAfter });
}
