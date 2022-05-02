import type {
  TAppNotificationDomain,
  TAppNotificationGlobal,
  TAppNotificationPage,
  TAppNotificationSide,
  TAppNotificationValuesUnexpectedError,
} from '@commercetools-frontend/constants';
import type { TAppState } from './types';

import { useSelector, useDispatch } from 'react-redux';
import {
  NOTIFICATION_DOMAINS,
  NOTIFICATION_KINDS_GLOBAL,
  NOTIFICATION_KINDS_PAGE,
  NOTIFICATION_KINDS_SIDE,
} from '@commercetools-frontend/constants';
import { removeNotification } from '@commercetools-frontend/notifications';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import GenericNotification from '../notification-kinds/generic';
import ApiErrorNotification from '../notification-kinds/api-error';
import UnexpectedErrorNotification from '../notification-kinds/unexpected-error';
import { useCustomNotificationComponent } from '../map-notification-to-component';
import {
  selectGlobalNotifications,
  selectPageNotifications,
  selectSideNotifications,
} from './selectors';
import { getStyles } from './notifications-list.styles';

type Props = {
  domain: TAppNotificationDomain;
};

const NotificationsListGlobal = (props: Props) => {
  const dispatch = useDispatch();
  const mapCustomNotificationToComponent = useCustomNotificationComponent();
  const notifications = useSelector<TAppState, TAppNotificationGlobal[]>(
    selectGlobalNotifications
  );
  return (
    <div id={`notifications-${props.domain}`} css={getStyles(props)}>
      {notifications.map((notification) => {
        // 1. Check if there is a custom notification component first
        const CustomNotificationComponent =
          mapCustomNotificationToComponent(notification);
        if (CustomNotificationComponent) {
          return (
            <CustomNotificationComponent
              key={notification.id}
              notification={notification}
              dismiss={() => {
                dispatch(removeNotification(notification.id));
              }}
            />
          );
        }

        switch (notification.kind) {
          case NOTIFICATION_KINDS_GLOBAL.error:
          case NOTIFICATION_KINDS_GLOBAL.warning:
          case NOTIFICATION_KINDS_GLOBAL.info:
          case NOTIFICATION_KINDS_GLOBAL.success: {
            const { values, ...genericNotification } = notification;
            return (
              <GenericNotification
                key={notification.id}
                notification={genericNotification}
                dismiss={() => {
                  dispatch(removeNotification(notification.id));
                }}
              />
            );
          }
          case NOTIFICATION_KINDS_GLOBAL['unexpected-error']: {
            const { text, ...errorNotification } = notification;
            return (
              <UnexpectedErrorNotification
                key={notification.id}
                notification={errorNotification}
                dismiss={() => {
                  dispatch(removeNotification(notification.id));
                }}
              />
            );
          }
          default: {
            if (process.env.NODE_ENV !== 'production') {
              // eslint-disable-next-line no-console
              reportErrorToSentry(
                new Error(
                  `@commercetools-frontend/react-notifications. Invalid prop "kind" supplied: ${notification.kind}.`
                ),
                { extra: notification }
              );
            }
            return null;
          }
        }
      })}
    </div>
  );
};
const NotificationsListPage = (props: Props) => {
  const dispatch = useDispatch();
  const mapCustomNotificationToComponent = useCustomNotificationComponent();
  const notifications = useSelector<TAppState, TAppNotificationPage[]>(
    selectPageNotifications
  );
  return (
    <div id={`notifications-${props.domain}`} css={getStyles(props)}>
      {notifications.map((notification) => {
        // 1. Check if there is a custom notification component first
        const CustomNotificationComponent =
          mapCustomNotificationToComponent(notification);
        if (CustomNotificationComponent) {
          return (
            <CustomNotificationComponent
              key={notification.id}
              notification={notification}
              dismiss={() => {
                dispatch(removeNotification(notification.id));
              }}
            />
          );
        }

        switch (notification.kind) {
          case NOTIFICATION_KINDS_PAGE.error:
          case NOTIFICATION_KINDS_PAGE.warning:
          case NOTIFICATION_KINDS_PAGE.info:
          case NOTIFICATION_KINDS_PAGE.success: {
            const { values, ...genericNotification } = notification;
            return (
              <GenericNotification
                key={notification.id}
                notification={{
                  ...genericNotification,
                  kind: notification.kind,
                }}
                dismiss={() => {
                  dispatch(removeNotification(notification.id));
                }}
              />
            );
          }
          case NOTIFICATION_KINDS_PAGE['api-error']: {
            const { text, ...errorNotification } = notification;
            return (
              <ApiErrorNotification
                key={notification.id}
                notification={errorNotification}
                dismiss={() => {
                  dispatch(removeNotification(notification.id));
                }}
              />
            );
          }
          case NOTIFICATION_KINDS_PAGE['unexpected-error']: {
            const { text, ...errorNotification } = notification;
            return (
              <UnexpectedErrorNotification
                key={notification.id}
                notification={{
                  ...errorNotification,
                  values:
                    notification.values as TAppNotificationValuesUnexpectedError,
                }}
                dismiss={() => {
                  dispatch(removeNotification(notification.id));
                }}
              />
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
};
const NotificationsListSide = (props: Props) => {
  const dispatch = useDispatch();
  const mapCustomNotificationToComponent = useCustomNotificationComponent();
  const notifications = useSelector<TAppState, TAppNotificationSide[]>(
    selectSideNotifications
  );
  return (
    <div id={`notifications-${props.domain}`} css={getStyles(props)}>
      {notifications.map((notification) => {
        // 1. Check if there is a custom notification component first
        const CustomNotificationComponent =
          mapCustomNotificationToComponent(notification);
        if (CustomNotificationComponent) {
          return (
            <CustomNotificationComponent
              key={notification.id}
              notification={notification}
              dismiss={() => {
                dispatch(removeNotification(notification.id));
              }}
            />
          );
        }

        switch (notification.kind) {
          case NOTIFICATION_KINDS_SIDE.error:
          case NOTIFICATION_KINDS_SIDE.warning:
          case NOTIFICATION_KINDS_SIDE.info:
          case NOTIFICATION_KINDS_SIDE.success:
            return (
              <GenericNotification
                key={notification.id}
                notification={notification}
                dismiss={() => {
                  dispatch(removeNotification(notification.id));
                }}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

const NotificationsList = (props: Props) => {
  switch (props.domain) {
    case NOTIFICATION_DOMAINS.GLOBAL:
      return <NotificationsListGlobal {...props} />;
    case NOTIFICATION_DOMAINS.PAGE:
      return <NotificationsListPage {...props} />;
    case NOTIFICATION_DOMAINS.SIDE:
      return <NotificationsListSide {...props} />;
    default:
      return null;
  }
};
NotificationsList.displayName = 'NotificationsList';

export default NotificationsList;
