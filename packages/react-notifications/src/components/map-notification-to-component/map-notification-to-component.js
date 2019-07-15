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

const GetCustomNotificationComponent = props => (
  <Context.Consumer>
    {mapCustomNotificationToComponent =>
      props.render(mapCustomNotificationToComponent)
    }
  </Context.Consumer>
);
GetCustomNotificationComponent.displayName = 'GetCustomNotificationComponent';
GetCustomNotificationComponent.propTypes = {
  render: PropTypes.func.isRequired,
};

const useCustomNotificationComponent = () => React.useContext(Context);

// Exports
export default GetCustomNotificationComponent;
export {
  NotificationProviderForCustomComponent,
  useCustomNotificationComponent,
};
