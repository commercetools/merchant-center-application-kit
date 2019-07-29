import React from 'react';
import { FormattedMessage } from 'react-intl';
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
  color: string;
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

const defaultProps = {
  fixed: false,
};
type DefaultProps = typeof defaultProps;
export type Props = {
  domain: TAppNotificationDomain;
  type: TAppNotificationKind;
  fixed: boolean;
  onCloseClick: (event: React.SyntheticEvent) => void;
  children: React.ReactNode;
} & DefaultProps;

const Notification = (props: Props) => (
  <div css={getStylesForNotification(props)} {...filterDataAttributes(props)}>
    <div css={getStylesForContent(props)}>{props.children}</div>
    {props.onCloseClick ? (
      <div>
        <FormattedMessage {...messages.hideNotification}>
          {label => (
            <IconButton
              label={label}
              onClick={props.onCloseClick}
              icon={<CloseBoldIcon />}
              size="medium"
            />
          )}
        </FormattedMessage>
      </div>
    ) : null}
    {props.domain === NOTIFICATION_DOMAINS.SIDE ? (
      <div css={getStylesForIcon(props)}>
        <NotificationIcon type={props.type} color="surface" />
      </div>
    ) : null}
  </div>
);
Notification.displayName = 'Notification';
Notification.defaultProps = defaultProps;

export default Notification;
