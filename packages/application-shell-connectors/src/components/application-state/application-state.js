import React from 'react';
import PropTypes from 'prop-types';
import { wrapDisplayName } from 'recompose';
import moment from 'moment-timezone';
import omit from 'lodash.omit';

const { Provider, Consumer } = React.createContext({});

const defaultTimeZone = moment.tz.guess() || 'Etc/UTC';

// Expose only certain fields as some of them are only meant to
// be used internally in the AppShell
const mapUserPropsToApplicationState = user => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  // NOTE: this is an alias for the original field `user.language`.
  // This field is used for the application intl locale though, therefore
  // we might want to expose it with a more explicit name to avoid
  // confusion.
  applicationLocale: user.language,
  numberFormat: user.numberFormat,
  timeZone: user.timeZone || defaultTimeZone,
});

// Expose only certain fields as some of them are only meant to
// be used internally in the AppShell
const mapProjectPropsToApplicationState = (project, projectDataLocale) => ({
  key: project.key,
  version: project.version,
  name: project.name,
  countries: project.countries,
  currencies: project.currencies,
  languages: project.languages,
  permissions: omit(project.permissions, ['__typename']),
  // Additional fields that do not belong directly to a project
  ...(projectDataLocale ? { dataLocale: projectDataLocale } : {}),
});

const ApplicationStateProvider = props => (
  <Provider
    value={{
      environment: props.environment,
      ...(props.user
        ? { user: mapUserPropsToApplicationState(props.user) }
        : {}),
      ...(props.project
        ? {
            project: mapProjectPropsToApplicationState(
              props.project,
              props.projectDataLocale
            ),
          }
        : {}),
    }}
  >
    {props.children}
  </Provider>
);
ApplicationStateProvider.displayName = 'ApplicationStateProvider';
ApplicationStateProvider.propTypes = {
  user: PropTypes.object,
  // NOTE: project (and dataLocale) might be eventually undefined because
  // in some views (e.g. accounts) we are not in a project context anymore.
  project: PropTypes.object,
  projectDataLocale: PropTypes.string,
  // This is the environment configuration coming from `windows.app`
  environment: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

const GetApplicationState = props => (
  <Consumer>{applicationState => props.render(applicationState)}</Consumer>
);
GetApplicationState.displayName = 'GetApplicationState';
GetApplicationState.propTypes = {
  render: PropTypes.func.isRequired,
};

const withApplicationState = (propKey = 'applicationState') => Component => {
  const WrappedComponent = props => (
    <GetApplicationState
      render={applicationState => (
        <Component {...props} {...{ [propKey]: applicationState }} />
      )}
    />
  );
  WrappedComponent.displayName = wrapDisplayName(
    Component,
    'withApplicationState'
  );
  return WrappedComponent;
};

// Exports
export default GetApplicationState;
export { ApplicationStateProvider, withApplicationState };
