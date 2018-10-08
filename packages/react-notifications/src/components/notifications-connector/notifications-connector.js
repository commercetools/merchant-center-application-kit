import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeNotification } from '@commercetools-frontend/notifications';
import * as globalActions from '@commercetools-frontend/actions-global';
import { selectNotificationsByDomain } from './selectors';

export const NotificationsFaC = props =>
  props.children({
    notifications: props.notifications,
    showNotification: props.showNotification,
    removeNotification: props.removeNotification,
    showApiErrorNotification: props.showApiErrorNotification,
    showUnexpectedErrorNotification: props.showUnexpectedErrorNotification,
  });

NotificationsFaC.propTypes = {
  notifications: PropTypes.array.isRequired,
  showNotification: PropTypes.func.isRequired,
  removeNotification: PropTypes.func.isRequired,
  showApiErrorNotification: PropTypes.func.isRequired,
  showUnexpectedErrorNotification: PropTypes.func.isRequired,
};
NotificationsFaC.displayName = 'NotificationsFaC';

const NotificationsConnector = connect(
  (state, ownProps) => {
    const notificationsByDomain = selectNotificationsByDomain(state);
    return { notifications: notificationsByDomain[ownProps.domain] };
  },
  {
    removeNotification,
    showNotification: globalActions.showNotification,
    showApiErrorNotification: globalActions.showApiErrorNotification,
    showUnexpectedErrorNotification:
      globalActions.showUnexpectedErrorNotification,
  }
)(NotificationsFaC);

export default NotificationsConnector;
