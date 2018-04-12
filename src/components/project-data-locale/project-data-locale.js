import React from 'react';
import PropTypes from 'prop-types';
import createReactContext from 'create-react-context';
import { getDisplayName } from 'recompose';

const defaultLocale = 'en';

const { Provider, Consumer } = createReactContext(defaultLocale);

export const SetProjectDataLocale = props => (
  <Provider value={props.locale}>{props.children}</Provider>
);
SetProjectDataLocale.displayName = 'SetProjectDataLocale';
SetProjectDataLocale.propTypes = {
  locale: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export const GetProjectDataLocale = props => (
  <Consumer>{locale => props.render(locale)}</Consumer>
);
GetProjectDataLocale.displayName = 'GetProjectDataLocale';
GetProjectDataLocale.propTypes = {
  render: PropTypes.func.isRequired,
};

export const withProjectDataLocale = (
  propKey = 'projectDataLocale'
) => Component => {
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
