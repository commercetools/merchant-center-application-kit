import type {
  TAppNotification,
  TAppNotificationDomain,
  TAppNotificationKindSide,
} from '@commercetools-frontend/constants';

import React from 'react';
import Notification from '../../notification';

type Props = {
  notification: TAppNotification<{
    domain: TAppNotificationDomain;
    kind: TAppNotificationKindSide;
    text: string;
  }>;
  dismiss: (event: React.SyntheticEvent) => void;
};

const GenericNotification = (props: Props) => (
  <Notification
    domain={props.notification.domain}
    type={props.notification.kind}
    onCloseClick={props.dismiss}
  >
    {props.notification.text}
  </Notification>
);
GenericNotification.displayName = 'GenericNotification';

export default GenericNotification;
