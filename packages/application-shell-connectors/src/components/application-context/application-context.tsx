import React from 'react';
import moment from 'moment-timezone';
import getDisplayName from '../../utils/get-display-name';

type AdditionalProperties = { [key: string]: unknown };
type TRawUserProjectsResult = {
  name: string;
  key: string;
  suspension: { isActive: boolean };
  expiry: { isActive: boolean };
};
type TRawUserProjects = {
  total: number;
  results: TRawUserProjectsResult[];
};
type TRawUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  language: string;
  timeZone?: string;
  projects: TRawUserProjects;
} & AdditionalProperties;
type TApplicationContextUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  locale: string;
  timeZone?: string;
  projects: TRawUserProjects;
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
    context: TApplicationContext<AdditionalEnvironmentProperties>
  ) => React.ReactNode;
  children?: never;
};

const Context = React.createContext({});

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
    projects: user.projects,
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
    {context => {
      // Because of the way the ApplicationShell configures the Context.Provider,
      // we ensure that, when we read from the context, we always get actual
      // context object and not the initial value.
      // Therefore, we can safely cast the value to be out `TApplicationContext` type.
      const applicationContext = context as TApplicationContext<
        AdditionalEnvironmentProperties
      >;
      return props.render(applicationContext);
    }}
  </Context.Consumer>
);
ApplicationContext.displayName = 'ApplicationContext';

function withApplicationContext<
  OwnProps extends {},
  MappedProps extends {
    applicationContext?: TApplicationContext<AdditionalEnvironmentProperties>;
  },
  AdditionalEnvironmentProperties extends {}
>(
  mapApplicationContextToProps?: (
    context: TApplicationContext<AdditionalEnvironmentProperties>
  ) => MappedProps
) {
  return (
    Component: React.ComponentType<OwnProps>
  ): React.ComponentType<OwnProps & MappedProps> => {
    const WrappedComponent = (props: OwnProps) => (
      <ApplicationContext<AdditionalEnvironmentProperties>
        render={applicationContext => {
          const mappedProps = mapApplicationContextToProps
            ? mapApplicationContextToProps(applicationContext)
            : { applicationContext };
          return <Component {...props} {...mappedProps} />;
        }}
      />
    );
    WrappedComponent.displayName = `withApplicationContext(${getDisplayName<
      OwnProps
    >(Component)})`;
    return WrappedComponent;
  };
}

// Use function overloading to declare two possible signatures with two
// distict return types, based on the selector function argument.
function useApplicationContextHook<
  AdditionalEnvironmentProperties extends {} = {}
>(): TApplicationContext<AdditionalEnvironmentProperties>;
function useApplicationContextHook<
  SelectedContext,
  AdditionalEnvironmentProperties extends {} = {}
>(
  selector: (
    context: TApplicationContext<AdditionalEnvironmentProperties>
  ) => SelectedContext
): SelectedContext;

// Then implement the function. Typescript will pick the appropriate signature
// based on the function arguments.
function useApplicationContextHook<
  SelectedContext,
  AdditionalEnvironmentProperties extends {} = {}
>(
  selector?: (
    context: TApplicationContext<AdditionalEnvironmentProperties>
  ) => SelectedContext
) {
  const context = React.useContext(Context);
  // Because of the way the ApplicationShell configures the Context.Provider,
  // we ensure that, when we read from the context, we always get actual
  // context object and not the initial value.
  // Therefore, we can safely cast the value to be out `TApplicationContext` type.
  const applicationContext = context as TApplicationContext<
    AdditionalEnvironmentProperties
  >;
  return selector ? selector(applicationContext) : applicationContext;
}

// This is a workaround to trick babel/rollup to correctly export the function.
// Most likely the problem arises with the use of overloading.
// See related issue: https://github.com/babel/babel/issues/8361
const useApplicationContext = useApplicationContextHook;

// Exports
export {
  Context,
  ApplicationContext,
  ApplicationContextProvider,
  withApplicationContext,
  useApplicationContext,
};
