import type {
  TAppNotificationKind,
  TAppNotificationDomain,
} from '@commercetools-frontend/constants';

import { ReactNode, SyntheticEvent } from 'react';
import { useIntl } from 'react-intl';
import {
  CloseBoldIcon,
  ErrorIcon,
  WarningIcon,
  InfoIcon,
  CheckBoldIcon,
} from '@commercetools-uikit/icons';
import IconButton from '@commercetools-uikit/icon-button';
import {
  NOTIFICATION_DOMAINS,
  NOTIFICATION_KINDS_SIDE,
} from '@commercetools-frontend/constants';
import { createSequentialId } from '@commercetools-uikit/utils';
import { useFieldId } from '@commercetools-uikit/hooks';
import filterDataAttributes from '../../utils/filter-data-attributes';
import messages from './messages';
import {
  getStylesForIcon,
  getStylesForContent,
  getStylesForNotification,
} from './notification.styles';

const sequentialId = createSequentialId('notification-');

type PropsIcon = {
  type: TAppNotificationKind;
  // TODO: get list of supported colors from uikit
  color:
    | 'error'
    | 'warning'
    | 'info'
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'primary'
    | 'primary40';
};

const NotificationIcon = (props: PropsIcon) => {
  if (props.type === NOTIFICATION_KINDS_SIDE.error)
    return <ErrorIcon color={props.color} />;
  if (props.type === NOTIFICATION_KINDS_SIDE.info)
    return <InfoIcon color={props.color} />;
  if (props.type === NOTIFICATION_KINDS_SIDE.warning)
    return <WarningIcon color={props.color} />;

  return <CheckBoldIcon color={props.color} />;
};
NotificationIcon.displayName = 'NotificationIcon';

export type Props = {
  domain: TAppNotificationDomain;
  type: TAppNotificationKind;
  fixed: boolean;
  onCloseClick?: (event: SyntheticEvent) => void;
  children: ReactNode;
};
const defaultProps: Pick<Props, 'fixed'> = {
  fixed: false,
};

const Notification = (props: Props) => {
  const intl = useIntl();
  const id = useFieldId(undefined, sequentialId);
  return (
    <div
      role="alertdialog"
      aria-describedby={id}
      css={getStylesForNotification(props)}
      {...filterDataAttributes(props)}
    >
      <div id={id} css={getStylesForContent(props)}>
        {props.children}
      </div>
      {props.onCloseClick ? (
        <div>
          <IconButton
            label={intl.formatMessage(messages.hideNotification)}
            onClick={props.onCloseClick}
            icon={<CloseBoldIcon />}
            size="medium"
          />
        </div>
      ) : null}
      {props.domain === NOTIFICATION_DOMAINS.SIDE ? (
        <div css={getStylesForIcon(props)}>
          <NotificationIcon type={props.type} color="surface" />
        </div>
      ) : null}
    </div>
  );
};
Notification.displayName = 'Notification';
Notification.defaultProps = defaultProps;

export default Notification;
