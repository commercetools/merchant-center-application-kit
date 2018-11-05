import React from 'react';
import PropTypes from 'prop-types';
import { wrapDisplayName } from 'recompose';
import { defaultMemoize } from 'reselect';
import moment from 'moment-timezone';
import omit from 'lodash.omit';

const { Provider, Consumer } = React.createContext({});

const defaultTimeZone = moment.tz.guess() || 'Etc/UTC';

// Expose only certain fields as some of them are only meant to
// be used internally in the AppShell
const mapUserToApplicationStateUser = user => {
  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    // NOTE: this is an alias for the original field `user.language` but it's actually
    // a locale (language + country).
    locale: user.language,
    numberFormat: user.numberFormat,
    timeZone: user.timeZone || defaultTimeZone,
  };
};

// Expose only certain fields as some of them are only meant to
// be used internally in the AppShell
const mapProjectToApplicationStateProject = (project, projectDataLocale) => {
  if (!project) return null;

  return {
    key: project.key,
    version: project.version,
    name: project.name,
    countries: project.countries,
    currencies: project.currencies,
    languages: project.languages,
    permissions: omit(project.permissions, ['__typename']),
    // Additional fields that do not belong directly to a project
    dataLocale: projectDataLocale || null,
  };
};

const createApplicationState = defaultMemoize(
  (environment, user, project, projectDataLocale) => ({
    environment,
    user: mapUserToApplicationStateUser(user),
    project: mapProjectToApplicationStateProject(project, projectDataLocale),
  })
);

const ApplicationStateProvider = props => (
  <Provider
    value={createApplicationState(
      props.environment,
      props.user,
      props.project,
      props.projectDataLocale
    )}
  >
    {props.children}
  </Provider>
);
ApplicationStateProvider.displayName = 'ApplicationStateProvider';
ApplicationStateProvider.propTypes = {
  // This is the environment configuration coming from `windows.app`
  environment: PropTypes.object.isRequired,
  user: PropTypes.object,
  // NOTE: project (and dataLocale) might be eventually undefined because
  // in some views (e.g. accounts) we are not in a project context anymore.
  project: PropTypes.object,
  projectDataLocale: PropTypes.string,
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
