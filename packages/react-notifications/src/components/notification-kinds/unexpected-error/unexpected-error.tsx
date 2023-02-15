import type {
  TAppNotification,
  TAppNotificationValuesUnexpectedError,
} from '@commercetools-frontend/constants';

import { SyntheticEvent } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  NOTIFICATION_DOMAINS,
  NOTIFICATION_KINDS_PAGE,
} from '@commercetools-frontend/constants';
import Spacings from '@commercetools-uikit/spacings';
import Notification from '../../notification';
import apiErrorMessages from '../api-error-message/messages';

type Props = {
  notification: TAppNotification<{
    domain: typeof NOTIFICATION_DOMAINS.PAGE;
    kind: (typeof NOTIFICATION_KINDS_PAGE)['unexpected-error'];
    values: TAppNotificationValuesUnexpectedError;
  }>;
  dismiss: (event: SyntheticEvent) => void;
};

const UnexpectedErrorNotification = (props: Props) => (
  <Notification
    type="error"
    domain={props.notification.domain}
    onCloseClick={props.dismiss}
  >
    <Spacings.Stack>
      <div>
        <FormattedMessage {...apiErrorMessages.General} />
      </div>
      {props.notification.values && props.notification.values.errorId && (
        <div>{`ID (${props.notification.values.errorId})`}</div>
      )}
    </Spacings.Stack>
  </Notification>
);
UnexpectedErrorNotification.displayName = 'UnexpectedErrorNotification';

export default UnexpectedErrorNotification;
