import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { DOMAINS } from '@commercetools-frontend/constants';
import { removeNotification } from '@commercetools-frontend/notifications';
import GenericNotification from '../notification-kinds/generic';
import ApiErrorNotification from '../notification-kinds/api-error';
import UnexpectedErrorNotification from '../notification-kinds/unexpected-error';
import { useCustomNotificationComponent } from '../map-notification-to-component';
import { selectNotificationsByDomain } from './selectors';
import styles from './notifications-list.mod.css';

function mapNotificationToComponent(notification) {
  switch (notification.domain) {
    case DOMAINS.PAGE:
      switch (notification.kind) {
        case 'error':
        case 'warning':
        case 'info':
        case 'success':
          return GenericNotification;
        case 'api-error':
          return ApiErrorNotification;
        case 'unexpected-error':
          return UnexpectedErrorNotification;
        default:
          return null;
      }
    case DOMAINS.GLOBAL:
      switch (notification.kind) {
        case 'error':
        case 'warning':
        case 'info':
        case 'success':
          return GenericNotification;
        case 'unexpected-error':
          return UnexpectedErrorNotification;
        default:
          return null;
      }
    case DOMAINS.SIDE:
      switch (notification.kind) {
        case 'info':
        case 'success':
        case 'warning':
        case 'error':
          return GenericNotification;
        default:
          return null;
      }
    default:
      return null;
  }
}

const NotificationsList = props => {
  const dispatch = useDispatch();
  const notificationsByDomain = useSelector(selectNotificationsByDomain);
  const notifications = notificationsByDomain[props.domain];
  const mapCustomNotificationToComponent = useCustomNotificationComponent();

  return (
    <div className={styles[`container-${props.domain}`]}>
      {notifications.map(notification => {
        // 1. Check if there is a custom notification component first
        const CustomNotificationComponent = mapCustomNotificationToComponent(
          notification
        );

        // 2. Fall back to the default notification components
        const NotificationComponent =
          CustomNotificationComponent ||
          mapNotificationToComponent(notification);
        if (!NotificationComponent) {
          if (process.env.NODE_ENV !== 'production')
            // eslint-disable-next-line no-console
            console.error(
              `Saw unexpected notification kind "${notification.kind}".`,
              notification
            );
          return null;
        }
        return (
          <NotificationComponent
            key={notification.id}
            notification={notification}
            dismiss={() => {
              dispatch(removeNotification(notification.id));
            }}
          />
        );
      })}
    </div>
  );
};
NotificationsList.displayName = 'NotificationsList';
NotificationsList.propTypes = {
  domain: PropTypes.string.isRequired,
};

export default NotificationsList;
