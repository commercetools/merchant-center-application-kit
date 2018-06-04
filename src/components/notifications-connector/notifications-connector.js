import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as globalActions from '@commercetools-local/actions-global';
import { selectNotificationsByDomain } from './reducer';

export const NotificationsFaC = props =>
  props.children({
    notifications: props.notifications,
    showNotification: props.showNotification,
    showApiErrorNotification: props.showApiErrorNotification,
    showUnexpectedErrorNotification: props.showUnexpectedErrorNotification,
  });

NotificationsFaC.propTypes = {
  notifications: PropTypes.array.isRequired,
  showNotification: PropTypes.func.isRequired,
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
    showNotification: globalActions.showNotification,
    showApiErrorNotification: globalActions.showApiErrorNotification,
    showUnexpectedErrorNotification:
      globalActions.showUnexpectedErrorNotification,
  }
)(NotificationsFaC);

export default NotificationsConnector;
