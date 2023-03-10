import { SyntheticEvent } from 'react';
import type {
  TAppNotification,
  TAppNotificationValuesApiError,
} from '@commercetools-frontend/constants';

import {
  NOTIFICATION_DOMAINS,
  NOTIFICATION_KINDS_PAGE,
} from '@commercetools-frontend/constants';
import Notification from '../../notification';
import ApiErrorMessage from '../api-error-message';

type Props = {
  notification: TAppNotification<{
    domain: typeof NOTIFICATION_DOMAINS.PAGE;
    kind: (typeof NOTIFICATION_KINDS_PAGE)['api-error'];
    values: TAppNotificationValuesApiError;
  }>;
  dismiss: (event: SyntheticEvent) => void;
};

const ApiErrorNotification = (props: Props) => (
  <Notification
    type="error"
    domain={props.notification.domain}
    onCloseClick={props.dismiss}
  >
    <ul>
      {props.notification.values &&
        props.notification.values.errors.map((error, idx) => {
          const extensionErrorCode = error.extensions?.code ?? error.code;
          const shouldLogErrorToConsole =
            !extensionErrorCode && process.env.NODE_ENV === 'development';
          if (shouldLogErrorToConsole) {
            /**
             * NOTE: This is an API error which usually contains
             * a `code` property such as `DuplicateField` or `InvalidOperation`.
             * If this `code` does not exist the API is not conforming to its
             * own error specification.
             */
            // eslint-disable-next-line no-console
            console.error('Unknown API error', error);
          }
          return (
            <li key={idx}>
              <ApiErrorMessage error={error} />
            </li>
          );
        })}
    </ul>
  </Notification>
);
ApiErrorNotification.displayName = 'ApiErrorNotification';

export default ApiErrorNotification;
