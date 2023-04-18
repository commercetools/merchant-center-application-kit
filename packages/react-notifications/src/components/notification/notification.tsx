// TODO: @redesign cleanup
import { ReactNode, SyntheticEvent } from 'react';
import { useIntl } from 'react-intl';
import type {
  TAppNotificationKind,
  TAppNotificationDomain,
} from '@commercetools-frontend/constants';

import {
  NOTIFICATION_DOMAINS,
  NOTIFICATION_KINDS_SIDE,
} from '@commercetools-frontend/constants';
import { useTheme } from '@commercetools-uikit/design-system';
import { useFieldId } from '@commercetools-uikit/hooks';
import IconButton from '@commercetools-uikit/icon-button';
import {
  CloseBoldIcon,
  ErrorIcon,
  WarningIcon,
  InfoIcon,
  InformationIcon,
  CheckBoldIcon,
} from '@commercetools-uikit/icons';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import { createSequentialId } from '@commercetools-uikit/utils';
import filterDataAttributes from '../../utils/filter-data-attributes';
import messages from './messages';
import {
  getStylesForNotificationIcon,
  getStylesForCloseIcon,
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
  isNewTheme: boolean;
};

const NotificationIcon = (props: PropsIcon) => {
  if (props.type === NOTIFICATION_KINDS_SIDE.error) {
    return <ErrorIcon color={props.color} />;
  }
  if (props.type === NOTIFICATION_KINDS_SIDE.info) {
    return props.isNewTheme ? (
      <InformationIcon color={props.color} />
    ) : (
      <InfoIcon color={props.color} />
    );
  }
  if (props.type === NOTIFICATION_KINDS_SIDE.warning) {
    return <WarningIcon color={props.color} />;
  }

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
  const { isNewTheme, themedValue } = useTheme();
  const Button = themedValue(IconButton, SecondaryIconButton);

  return (
    <div
      role="alertdialog"
      aria-describedby={id}
      css={getStylesForNotification({ ...props, isNewTheme })}
      {...filterDataAttributes(props)}
    >
      <div id={id} css={getStylesForContent({ ...props, isNewTheme })}>
        {props.children}
      </div>
      {props.onCloseClick ? (
        <div css={getStylesForCloseIcon({ ...props, isNewTheme })}>
          <Button
            label={intl.formatMessage(messages.hideNotification)}
            onClick={props.onCloseClick}
            icon={<CloseBoldIcon />}
            size="medium"
          />
        </div>
      ) : null}
      {props.domain === NOTIFICATION_DOMAINS.SIDE ? (
        <div css={getStylesForNotificationIcon(props)}>
          <NotificationIcon
            type={props.type}
            color="surface"
            isNewTheme={isNewTheme}
          />
        </div>
      ) : null}
    </div>
  );
};
Notification.displayName = 'Notification';
Notification.defaultProps = defaultProps;

export default Notification;
