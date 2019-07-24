import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  NOTIFICATION_DOMAINS,
  NOTIFICATION_KINDS_GLOBAL,
  NOTIFICATION_KINDS_PAGE,
  NOTIFICATION_KINDS_SIDE,
  TAppNotificationDomain,
  TAppNotificationGlobal,
  TAppNotificationPage,
  TAppNotificationSide,
  TAppNotificationValuesUnexpectedError,
} from '@commercetools-frontend/constants';
import { removeNotification } from '@commercetools-frontend/notifications';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import Notification from '../notification';
import GenericNotification from '../notification-kinds/generic';
import ApiErrorNotification from '../notification-kinds/api-error';
import UnexpectedErrorNotification from '../notification-kinds/unexpected-error';
import { useCustomNotificationComponent } from '../map-notification-to-component';
import {
  selectGlobalNotifications,
  selectPageNotifications,
  selectSideNotifications,
} from './selectors';
import { TAppState } from './types';
import { getStyles } from './notifications-list.styles';

type Props = {
  domain: TAppNotificationDomain;
};

const NotificationsList = (props: Props) => {
  const dispatch = useDispatch();
  const mapCustomNotificationToComponent = useCustomNotificationComponent();

  switch (props.domain) {
    case NOTIFICATION_DOMAINS.GLOBAL: {
      const notifications = useSelector<TAppState, TAppNotificationGlobal[]>(
        selectGlobalNotifications
      );
      return (
        <div css={getStyles(props)}>
          {notifications.map(notification => {
            // 1. Check if there is a custom notification component first
            const CustomNotificationComponent = mapCustomNotificationToComponent(
              notification
            ) as Notification;
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
    }
    case NOTIFICATION_DOMAINS.PAGE: {
      const notifications = useSelector<TAppState, TAppNotificationPage[]>(
        selectPageNotifications
      );
      return (
        <div css={getStyles(props)}>
          {notifications.map(notification => {
            // 1. Check if there is a custom notification component first
            const CustomNotificationComponent = mapCustomNotificationToComponent(
              notification
            ) as Notification;
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
                      values: notification.values as TAppNotificationValuesUnexpectedError,
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
    }
    case NOTIFICATION_DOMAINS.SIDE: {
      const notifications = useSelector<TAppState, TAppNotificationSide[]>(
        selectSideNotifications
      );
      return (
        <div css={getStyles(props)}>
          {notifications.map(notification => {
            // 1. Check if there is a custom notification component first
            const CustomNotificationComponent = mapCustomNotificationToComponent(
              notification
            ) as Notification;
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
    }
    default:
      return null;
  }
};
NotificationsList.displayName = 'NotificationsList';

export default NotificationsList;
