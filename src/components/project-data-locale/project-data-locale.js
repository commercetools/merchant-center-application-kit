import React from 'react';
import PropTypes from 'prop-types';
import createReactContext from 'create-react-context';
import { getDisplayName } from 'recompose';

const defaultLocale = 'en';

const { Provider, Consumer } = createReactContext(defaultLocale);

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
  WrappedComponent.displayName = `withProjectDataLocale(${getDisplayName(
    Component
  )})`;
  return WrappedComponent;
};

// Exports
export default GetProjectDataLocale;
export { AppShellProviderForProjectDataLocale, withProjectDataLocale };
