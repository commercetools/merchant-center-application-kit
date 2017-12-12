import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as globalActions from '@commercetools-local/actions-global';
import {
  selectLatestGlobalNotificationAsList,
  selectPageNotifications,
  selectSideNotifications,
} from './reducer';

const NotificationsFaC = props =>
  props.children({
    notifications: props.notifications,
    showNotification: props.showNotification,
  });

NotificationsFaC.propTypes = {
  notifications: PropTypes.shape({
    global: PropTypes.array.isRequired,
    page: PropTypes.array.isRequired,
    side: PropTypes.array.isRequired,
  }),
  showNotification: PropTypes.func.isRequired,
};

export const isNotificationVisible = (activePlugin, notificationPlugin) => {
  // When the notification is global we always show it
  if (!notificationPlugin) return true;

  // when no plugin is active we hide all plugin notifications
  if (!activePlugin) return false;

  // When a plugin is active we only show notifications of that plugin
  return activePlugin === notificationPlugin;
};

const NotificationsConnector = connect(
  state => ({
    notifications: {
      global: selectLatestGlobalNotificationAsList(state).filter(notification =>
        isNotificationVisible(state.activePlugin, notification.plugin)
      ),
      page: selectPageNotifications(state).filter(notification =>
        isNotificationVisible(state.activePlugin, notification.plugin)
      ),
      side: selectSideNotifications(state).filter(notification =>
        isNotificationVisible(state.activePlugin, notification.plugin)
      ),
    },
  }),
  {
    showNotification: globalActions.showNotification,
  }
)(NotificationsFaC);

export default NotificationsConnector;
