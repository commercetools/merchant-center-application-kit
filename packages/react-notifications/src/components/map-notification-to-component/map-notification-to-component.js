import React from 'react';
import PropTypes from 'prop-types';

const defaultCustomMapNotificationToComponent = () => null;

const Context = React.createContext(defaultCustomMapNotificationToComponent);

const NotificationProviderForCustomComponent = props => (
  <Context.Provider value={props.mapNotificationToComponent}>
    {props.children}
  </Context.Provider>
);
NotificationProviderForCustomComponent.displayName =
  'NotificationProviderForCustomComponent';
NotificationProviderForCustomComponent.propTypes = {
  mapNotificationToComponent: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export const useCustomNotificationComponent = () => React.useContext(Context);

// Exports
export default NotificationProviderForCustomComponent;
