import React from 'react';
import PropTypes from 'prop-types';
import { wrapDisplayName } from 'recompose';

const { Provider, Consumer } = React.createContext({});

const AppShellProviderForUserPermissions = props => (
  <Provider value={props.permissions}>{props.children}</Provider>
);
AppShellProviderForUserPermissions.displayName =
  'AppShellProviderForUserPermissions';
AppShellProviderForUserPermissions.propTypes = {
  permissions: PropTypes.objectOf(PropTypes.bool).isRequired,
  children: PropTypes.node.isRequired,
};

const GetUserPermissions = props => (
  <Consumer>{permission => props.render(permission)}</Consumer>
);
GetUserPermissions.displayName = 'GetUserPermissions';
GetUserPermissions.propTypes = {
  render: PropTypes.func.isRequired,
};

const withUserPermissions = (propKey = 'userPermissions') => Component => {
  const WrappedComponent = props => (
    <GetUserPermissions
      render={permissions => (
        <Component {...props} {...{ [propKey]: permissions }} />
      )}
    />
  );
  WrappedComponent.displayName = wrapDisplayName(
    Component,
    'withUserPermissions'
  );
  return WrappedComponent;
};

// Exports
export default GetUserPermissions;
export { AppShellProviderForUserPermissions, withUserPermissions };
