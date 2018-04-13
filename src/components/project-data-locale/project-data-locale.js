import React from 'react';
import PropTypes from 'prop-types';
import { wrapDisplayName } from 'recompose';

const defaultLocale = 'en';

const { Provider, Consumer } = React.createContext(defaultLocale);

const AppShellProviderForProjectDataLocale = props => (
  <Provider value={props.locale}>{props.children}</Provider>
);
AppShellProviderForProjectDataLocale.displayName =
  'AppShellProviderForProjectDataLocale';
AppShellProviderForProjectDataLocale.propTypes = {
  locale: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const GetProjectDataLocale = props => (
  <Consumer>{locale => props.render(locale)}</Consumer>
);
GetProjectDataLocale.displayName = 'GetProjectDataLocale';
GetProjectDataLocale.propTypes = {
  render: PropTypes.func.isRequired,
};

const withProjectDataLocale = (propKey = 'projectDataLocale') => Component => {
  const WrappedComponent = props => (
    <GetProjectDataLocale
      render={locale => <Component {...props} {...{ [propKey]: locale }} />}
    />
  );
  WrappedComponent.displayName = wrapDisplayName(
    Component,
    'withProjectDataLocale'
  );
  return WrappedComponent;
};

// Exports
export default GetProjectDataLocale;
export { AppShellProviderForProjectDataLocale, withProjectDataLocale };
