import React from 'react';
import PropTypes from 'prop-types';

const defaultCustomMapNotificationToComponent = () => null;

const { Provider, Consumer } = React.createContext(
  defaultCustomMapNotificationToComponent
);

const NotificationProviderForCustomComponent = props => (
  <Provider value={props.mapNotificationToComponent}>{props.children}</Provider>
);
NotificationProviderForCustomComponent.displayName =
  'NotificationProviderForCustomComponent';
NotificationProviderForCustomComponent.propTypes = {
  mapNotificationToComponent: PropTypes.func,
  children: PropTypes.node.isRequired,
};

const GetCustomNotificationComponent = props => (
  <Consumer>
    {mapCustomNotificationToComponent =>
      props.render(mapCustomNotificationToComponent)
    }
  </Consumer>
);
GetCustomNotificationComponent.displayName = 'GetCustomNotificationComponent';
GetCustomNotificationComponent.propTypes = {
  render: PropTypes.func.isRequired,
};

// Exports
export default GetCustomNotificationComponent;
export { NotificationProviderForCustomComponent };
