import React from 'react';
import PropTypes from 'prop-types';
import { removeNotification } from '@commercetools-local/notifications';
import { DOMAINS } from '@commercetools-local/constants';
import NotificationsConnector from '../notifications-connector';
import GenericNotification from '../notification-kinds/generic';
import ApiErrorNotification from '../notification-kinds/api-error';
import UnexpectedErrorNotification from '../notification-kinds/unexpected-error';
import GetCustomNotificationComponent from '../map-notification-to-component';
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

class NotificationsList extends React.PureComponent {
  static displayName = 'NotificationsList';

  static propTypes = {
    domain: PropTypes.string.isRequired,
  };

  static contextTypes = {
    store: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <NotificationsConnector domain={this.props.domain}>
        {({ notifications, showUnexpectedErrorNotification }) => (
          <GetCustomNotificationComponent
            render={mapCustomNotificationToComponent => (
              <div className={styles[`container-${this.props.domain}`]}>
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
                        `Saw unexpected notification kind "${
                          notification.kind
                        }".`,
                        notification
                      );
                    return null;
                  }
                  return (
                    <NotificationComponent
                      key={notification.id}
                      notification={notification}
                      dismiss={() => {
                        this.context.store.dispatch(
                          removeNotification(notification.id)
                        );
                      }}
                      // Needed for global notifications at the moment.
                      showUnexpectedErrorNotification={
                        showUnexpectedErrorNotification
                      }
                    />
                  );
                })}
              </div>
            )}
          />
        )}
      </NotificationsConnector>
    );
  }
}

export default NotificationsList;
