import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DOMAINS } from '@commercetools-local/constants';
import NotificationPortal from '../notification-portal';
import NotificationsList from '../notifications-list';
import {
  selectLatestGlobalNotificationAsList,
  selectPageNotifications,
  selectSideNotifications,
} from './reducer';

export const SetupNotifications = props => (
  <div>
    <NotificationPortal
      domain={DOMAINS.GLOBAL}
      renderNotification={() => (
        <NotificationsList
          activePlugin={props.activePlugin}
          domain={DOMAINS.GLOBAL}
          notifications={props.globalNotifications}
          // mapPluginNotificationToComponent={
          //   state.mapPluginNotificationToComponent
          // }
        />
      )}
    />
    <NotificationPortal
      domain={DOMAINS.PAGE}
      renderNotification={() => (
        <NotificationsList
          activePlugin={props.activePlugin}
          domain={DOMAINS.PAGE}
          notifications={props.pageNotifications}
          // mapPluginNotificationToComponent={
          //   state.mapPluginNotificationToComponent
          // }
        />
      )}
    />
    <NotificationPortal
      domain={DOMAINS.SIDE}
      renderNotification={() => (
        <NotificationsList
          activePlugin={props.activePlugin}
          domain={DOMAINS.SIDE}
          notifications={props.sideNotifications}
          // mapPluginNotificationToComponent={
          //   state.mapPluginNotificationToComponent
          // }
        />
      )}
    />
  </div>
);

SetupNotifications.displayName = 'SetupNotifications';

SetupNotifications.propTypes = {
  activePlugin: PropTypes.string.isRequired,
  globalNotifications: PropTypes.array.isRequired,
  pageNotifications: PropTypes.array.isRequired,
  sideNotifications: PropTypes.array.isRequired,
};

export default connect(state => ({
  activePlugin: state.activePlugin,
  globalNotifications: selectLatestGlobalNotificationAsList(state),
  pageNotifications: selectPageNotifications(state),
  sideNotifications: selectSideNotifications(state),
}))(SetupNotifications);
