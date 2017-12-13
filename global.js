import isNumber from 'lodash.isnumber';
import { addNotification } from '@commercetools-local/notifications';
import {
  HIDE_ALL_PAGE_NOTIFICATIONS,
  SWITCH_LOCALE,
  SWITCH_PROJECT_LANGUAGE,
  DOMAINS,
} from '@commercetools-local/constants';
import toGlobal from '@commercetools-local/utils/to-global';

export function showApiErrorNotification({ error, source }) {
  return showNotification(
    {
      kind: 'api-error',
      values: {
        source,
        statusCode: error.statusCode || error.code,
        body:
          error.body ||
          (error instanceof Error
            ? `${error.toString()}\n${error.stack}`
            : error),
      },
      domain: DOMAINS.PAGE,
    },
    {
      dismissAfter: 0,
      error,
    }
  );
}

export function showUnexpectedErrorNotification({ error, source, errorId }) {
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

export function showNotification(notification, options = {}) {
  if (process.env.NODE_ENV !== 'production')
    if (notification.domain) {
      if (!Object.values(DOMAINS).includes(notification.domain))
        // eslint-disable-next-line no-console
        console.warn(
          `Unknown notification domain "${notification.domain}"`,
          notification
        );
    } else
      // eslint-disable-next-line no-console
      console.warn('Notification is missing domain', notification);

  let dismissAfter = options.dismissAfter;
  if (!isNumber(dismissAfter))
    dismissAfter = notification.kind === 'success' ? 5000 : 0;

  return toGlobal(addNotification(notification, { ...options, dismissAfter }));
}

export function switchLocale(locale) {
  return toGlobal({ type: SWITCH_LOCALE, payload: locale });
}

export function switchProjectLanguage(lang) {
  return toGlobal({ type: SWITCH_PROJECT_LANGUAGE, payload: lang });
}

export function hideAllPageNotifications() {
  return toGlobal({ type: HIDE_ALL_PAGE_NOTIFICATIONS });
}
