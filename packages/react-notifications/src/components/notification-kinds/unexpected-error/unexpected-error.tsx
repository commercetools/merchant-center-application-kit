import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  NOTIFICATION_DOMAINS,
  NOTIFICATION_KINDS_PAGE,
  TAppNotification,
  TAppNotificationValuesUnexpectedError,
} from '@commercetools-frontend/constants';
import { Spacings } from '@commercetools-frontend/ui-kit';
import Notification from '../../notification';
import apiErrorMessages from '../api-error-message/messages';

type Props = {
  notification: TAppNotification<{
    domain: typeof NOTIFICATION_DOMAINS.PAGE;
    kind: typeof NOTIFICATION_KINDS_PAGE['unexpected-error'];
    values: TAppNotificationValuesUnexpectedError;
  }>;
  dismiss: (event: React.SyntheticEvent) => void;
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
