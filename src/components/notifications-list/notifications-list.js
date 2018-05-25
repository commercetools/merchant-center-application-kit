import PropTypes from 'prop-types';
import React from 'react';
import { removeNotification } from '@commercetools-local/notifications';
import { DOMAINS } from '@commercetools-local/constants';
import GenericNotification from '../notification-kinds/generic';
import ApiErrorNotification from '../notification-kinds/api-error';
import UnexpectedErrorNotification from '../notification-kinds/unexpected-error';
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

export class NotificationsList extends React.PureComponent {
  static displayName = 'NotificationsList';

  static propTypes = {
    domain: PropTypes.string.isRequired,
    notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
    mapPluginNotificationToComponent: PropTypes.func,
    activePlugin: PropTypes.string,
    // Needed for global notifications at the moment.
    showUnexpectedErrorNotification: PropTypes.func,
  };

  static defaultProps = {
    mapPluginNotificationToComponent: null,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className={styles[`container-${this.props.domain}`]}>
        {this.props.notifications.map(notification => {
          // check whether the current plugin provides a custom
          // notification for this type
          const PluginNotification =
            this.props.mapPluginNotificationToComponent &&
            this.props.mapPluginNotificationToComponent(notification);
          // fall back to app-wide notifications
          const Component =
            PluginNotification || mapNotificationToComponent(notification);
          if (!Component) {
            if (process.env.NODE_ENV !== 'production')
              // eslint-disable-next-line no-console
              console.error(
                `Saw unexpected notification kind "${notification.kind}".`,
                notification
              );
            return null;
          }
          const dismiss = () => {
            this.context.store.dispatch(removeNotification(notification.id));
          };
          return (
            <Component
              key={notification.id}
              notification={notification}
              dismiss={dismiss}
              // Needed for global notifications at the moment.
              showUnexpectedErrorNotification={
                this.props.showUnexpectedErrorNotification
              }
            />
          );
        })}
      </div>
    );
  }
}

export default NotificationsList;
