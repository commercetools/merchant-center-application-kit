import React from 'react';
import { useIntl } from 'react-intl';
import {
  CloseBoldIcon,
  ErrorIcon,
  WarningIcon,
  InfoIcon,
  CheckBoldIcon,
  IconButton,
} from '@commercetools-frontend/ui-kit';
import {
  NOTIFICATION_DOMAINS,
  TAppNotificationKind,
  TAppNotificationDomain,
  NOTIFICATION_KINDS_SIDE,
} from '@commercetools-frontend/constants';
import filterDataAttributes from '../../utils/filter-data-attributes';
import messages from './messages';
import {
  getStylesForIcon,
  getStylesForContent,
  getStylesForNotification,
} from './notification.styles';

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
  onCloseClick: (event: React.SyntheticEvent) => void;
  children: React.ReactNode;
};
const defaultProps: Pick<Props, 'fixed'> = {
  fixed: false,
};

const Notification = (props: Props) => {
  const intl = useIntl();
  return (
    <div css={getStylesForNotification(props)} {...filterDataAttributes(props)}>
      <div css={getStylesForContent(props)}>{props.children}</div>
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
