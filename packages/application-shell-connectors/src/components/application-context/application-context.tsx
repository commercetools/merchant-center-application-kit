import React from 'react';
import moment from 'moment-timezone';
import getDisplayName from '../../utils/get-display-name';

type AdditionalProperties = { [key: string]: unknown };
type TRawUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  language: string;
  timeZone?: string;
} & AdditionalProperties;
type TApplicationContextUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  locale: string;
  timeZone?: string;
};
type TApplicationContextPermissions = { [key: string]: boolean };
type TRawProject = {
  key: string;
  version: number;
  name: string;
  countries: string[];
  currencies: string[];
  languages: string[];
  owner: {
    id: string;
  };
  permissions: TApplicationContextPermissions;
} & AdditionalProperties;
type TApplicationContextProject = {
  key: string;
  version: number;
  name: string;
  countries: string[];
  currencies: string[];
  languages: string[];
  ownerId: string;
};
type TApplicationContextEnvironment = {
  applicationName?: string;
  frontendHost: string;
  mcApiUrl: string;
  location: string;
  env: string;
  cdnUrl: string;
  servedByProxy: string | boolean;
};
type TApplicationContext<AdditionalEnvironmentProperties extends {}> = {
  environment: AdditionalEnvironmentProperties & TApplicationContextEnvironment;
  user: TApplicationContextUser | null;
  project: TApplicationContextProject | null;
  permissions: TApplicationContextPermissions | null;
  dataLocale: string | null;
};
type ProviderProps<AdditionalEnvironmentProperties extends {}> = {
  environment: AdditionalEnvironmentProperties & TApplicationContextEnvironment;
  user?: TRawUser;
  project?: TRawProject;
  projectDataLocale?: string;
  children: React.ReactNode;
};
type ConsumerProps<AdditionalEnvironmentProperties extends {}> = {
  render: (
    context: TApplicationContext<AdditionalEnvironmentProperties> | {}
  ) => React.ReactNode;
  children?: never;
};
type DefaultMappedProps<AdditionalEnvironmentProperties extends {}> = {
  applicationContext: TApplicationContext<AdditionalEnvironmentProperties> | {};
};

const Context = React.createContext<TApplicationContext<{}> | {}>({});

const defaultTimeZone = moment.tz.guess() || 'Etc/UTC';

// Expose only certain fields as some of them are only meant to
// be used internally in the AppShell
const mapUserToApplicationContextUser = (
  user?: TRawUser
): TApplicationContextUser | null => {
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
const mapProjectToApplicationContextProject = (
  project?: TRawProject
): TApplicationContextProject | null => {
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

const createApplicationContext: <AdditionalEnvironmentProperties extends {}>(
  environment: AdditionalEnvironmentProperties & TApplicationContextEnvironment,
  user?: TRawUser,
  project?: TRawProject,
  projectDataLocale?: string
) => TApplicationContext<AdditionalEnvironmentProperties> = (
  environment,
  user,
  project,
  projectDataLocale
) => ({
  environment,
  user: mapUserToApplicationContextUser(user),
  project: mapProjectToApplicationContextProject(project),
  permissions: project && project.permissions ? project.permissions : null,
  dataLocale: projectDataLocale || null,
});

const ApplicationContextProvider = <AdditionalEnvironmentProperties extends {}>(
  props: ProviderProps<AdditionalEnvironmentProperties>
) => (
  <Context.Provider
    value={createApplicationContext<AdditionalEnvironmentProperties>(
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

const ApplicationContext = <AdditionalEnvironmentProperties extends {}>(
  props: ConsumerProps<AdditionalEnvironmentProperties>
) => (
  <Context.Consumer>
    {applicationContext => props.render(applicationContext)}
  </Context.Consumer>
);
ApplicationContext.displayName = 'ApplicationContext';

function withApplicationContext<
  Props extends {},
  MappedProps extends {} = {},
  AdditionalEnvironmentProperties extends {} = {}
>(
  mapApplicationContextToProps?: (
    context: TApplicationContext<AdditionalEnvironmentProperties> | {}
  ) => MappedProps
) {
  return (
    Component: React.ComponentType<
      | Props
      | Props & DefaultMappedProps<AdditionalEnvironmentProperties>
      | Props & MappedProps
    >
  ) => {
    const WrappedComponent = (props: Props) => (
      <ApplicationContext
        render={applicationContext => {
          const mappedProps = mapApplicationContextToProps
            ? mapApplicationContextToProps(applicationContext)
            : { applicationContext };
          return <Component {...props} {...mappedProps} />;
        }}
      />
    );
    WrappedComponent.displayName = `withApplicationContext(${getDisplayName<
      Props
    >(Component)})`;
    return WrappedComponent;
  };
}

// Forward-compatibility with React Hooks 🎉
const useApplicationContext = React.useContext
  ? <
      SelectedContext extends {} = {},
      AdditionalEnvironmentProperties extends {} = {}
    >(
      selector?: (
        context: TApplicationContext<AdditionalEnvironmentProperties> | {}
      ) => SelectedContext
    ):
      | SelectedContext
      | TApplicationContext<AdditionalEnvironmentProperties>
      | {} => {
      const applicationContext = React.useContext(Context);
      return selector ? selector(applicationContext) : applicationContext;
    }
  : () => {
      throw new Error(
        `React hooks do not seem to be available yet in the installed React version "${React.version}". Please check the React Hooks documentation for more info: https://reactjs.org/hooks.`
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
