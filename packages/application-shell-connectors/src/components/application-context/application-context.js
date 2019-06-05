import React from 'react';
import PropTypes from 'prop-types';
import { defaultMemoize } from 'reselect';
import moment from 'moment-timezone';
import getDisplayName from '../../utils/get-display-name';

const Context = React.createContext({});

const defaultTimeZone = moment.tz.guess() || 'Etc/UTC';

// Expose only certain fields as some of them are only meant to
// be used internally in the AppShell
const mapUserToApplicationContextUser = user => {
  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    // NOTE: this is an alias for the original field `user.language` but it's actually
    // a locale (language + country).
    locale: user.language,
    timeZone: user.timeZone || defaultTimeZone,
  };
};

// Expose only certain fields as some of them are only meant to
// be used internally in the AppShell
const mapProjectToApplicationContextProject = project => {
  if (!project) return null;

  return {
    key: project.key,
    version: project.version,
    name: project.name,
    countries: project.countries,
    currencies: project.currencies,
    languages: project.languages,
    ownerId: project.owner.id,
  };
};

const createApplicationContext = defaultMemoize(
  (environment, user, project, projectDataLocale) => ({
    environment,
    user: mapUserToApplicationContextUser(user),
    project: mapProjectToApplicationContextProject(project),
    permissions: project && project.permissions ? project.permissions : null,
    dataLocale: projectDataLocale,
  })
);

const ApplicationContextProvider = props => (
  <Context.Provider
    value={createApplicationContext(
      props.environment,
      props.user,
      props.project,
      props.projectDataLocale
    )}
  >
    {props.children}
  </Context.Provider>
);
ApplicationContextProvider.displayName = 'ApplicationContextProvider';
// NOTE: some fields (user, project and projectDataLocale) are optional
// depending on the render phase of the ApplicationContextProvider.
// Furthermore, some fields (project, projectDataLocale) might be eventually
// undefined because in some views (e.g. accounts) we are not in a project context anymore.
ApplicationContextProvider.propTypes = {
  // This is the environment configuration coming from `windows.app`
  environment: PropTypes.shape({
    applicationName: PropTypes.string,
    frontendHost: PropTypes.string.isRequired,
    mcApiUrl: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    env: PropTypes.string.isRequired,
    cdnUrl: PropTypes.string.isRequired,
    servedByProxy: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    // ...plus other fields that are specific to each application
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    timeZone: PropTypes.string,
    // ...plus other fields that we don't want to expose
  }),
  project: PropTypes.shape({
    key: PropTypes.string.isRequired,
    version: PropTypes.number,
    name: PropTypes.string.isRequired,
    countries: PropTypes.arrayOf(PropTypes.string).isRequired,
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    languages: PropTypes.arrayOf(PropTypes.string).isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    permissions: PropTypes.object.isRequired,
    // ...plus other fields that we don't want to expose
  }),
  projectDataLocale: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const ApplicationContext = props => (
  <Context.Consumer>
    {applicationContext => props.render(applicationContext)}
  </Context.Consumer>
);
ApplicationContext.displayName = 'ApplicationContext';
ApplicationContext.propTypes = {
  render: PropTypes.func.isRequired,
};

const withApplicationContext = mapApplicationContextToProps => Component => {
  const WrappedComponent = props => (
    <ApplicationContext
      render={applicationContext => {
        const mappedProps = mapApplicationContextToProps
          ? mapApplicationContextToProps(applicationContext)
          : { applicationContext };
        return <Component {...props} {...mappedProps} />;
      }}
    />
  );
  WrappedComponent.displayName = `withApplicationContext(${getDisplayName(
    Component
  )})`;
  return WrappedComponent;
};

// Forward-compatibility with React Hooks 🎉
const useApplicationContext = React.useContext
  ? mapApplicationContextToProps => {
      const applicationContext = React.useContext(Context);
      return mapApplicationContextToProps
        ? mapApplicationContextToProps(applicationContext)
        : applicationContext;
    }
  : () => {
      throw new Error(
        `React hooks do not seem to be available yet in the installed React version "${
          React.version
        }". Please check the React Hooks documentation for more info: https://reactjs.org/hooks.`
      );
    };

// Exports
export {
  Context,
  ApplicationContext,
  ApplicationContextProvider,
  withApplicationContext,
  useApplicationContext,
};
