import React from 'react';
import PropTypes from 'prop-types';
import { wrapDisplayName } from 'recompose';

const { Provider, Consumer } = React.createContext();

const AppShellProviderForUserTimeZone = props => (
  <Provider value={props.timeZone}>{props.children}</Provider>
);
AppShellProviderForUserTimeZone.displayName = 'AppShellProviderForUserTimeZone';
AppShellProviderForUserTimeZone.propTypes = {
  timeZone: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const GetUserTimeZone = props => (
  <Consumer>{timeZone => props.render(timeZone)}</Consumer>
);
GetUserTimeZone.displayName = 'GetUserTimeZone';
GetUserTimeZone.propTypes = {
  render: PropTypes.func.isRequired,
};

const withUserTimeZone = (propKey = 'timeZone') => Component => {
  const WrappedComponent = props => (
    <GetUserTimeZone
      render={timeZone => <Component {...props} {...{ [propKey]: timeZone }} />}
    />
  );
  WrappedComponent.displayName = wrapDisplayName(Component, 'withUserTimeZone');
  return WrappedComponent;
};

// Exports
export default GetUserTimeZone;
export { AppShellProviderForUserTimeZone, withUserTimeZone };
