import type { ApplicationWindow } from '@commercetools-frontend/constants';
import type {
  TFetchLoggedInUserQuery,
  TFetchProjectQuery,
  TIdTokenUserInfo,
} from '../../types/generated/mc';

import { ComponentType, createContext, ReactNode, useContext } from 'react';
import moment from 'moment-timezone';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import getDisplayName from '../../utils/get-display-name';
import {
  normalizeAllAppliedActionRights,
  normalizeAllAppliedPermissions,
  normalizeAllAppliedDataFences,
} from './normalizers';
import getMcApiUrl from '../../utils/get-mc-api-url';

type TFetchedUser = TFetchLoggedInUserQuery['user'] & { isVerified: boolean };
type TFetchedProject = TFetchProjectQuery['project'];

type TApplicationContextPermissions = { [key: string]: boolean };
type TActionRight = {
  [key: string]: boolean;
};
type TApplicationContextActionRights = {
  [key: string]: TActionRight;
};

type TApplicationContextGroupedByPermission = {
  // E.g. { canManageOrders: { values: [] } }
  [key: string]: { values: string[] } | null;
};
type TApplicationContextGroupedByResourceType = {
  // E.g. { orders: {...} }
  [key: string]: TApplicationContextGroupedByPermission | null;
};
/**
 * dataFence: {
 *   store: {
 *     orders: {
 *       canManageOrders: { values: ['usa', 'germany'] },
 *       canViewOrders: { values: ['canada'] },
 *     }
 *   }
 * }
 */
type TApplicationContextDataFenceType = 'store';
type TApplicationContextDataFences = Partial<
  Record<
    TApplicationContextDataFenceType,
    TApplicationContextGroupedByResourceType
  >
>;
type TApplicationContextEnvironment = ApplicationWindow['app'];
type TApplicationContextUser = Pick<
  NonNullable<TFetchedUser>,
  'id' | 'email' | 'firstName' | 'lastName' | 'businessRole' | 'projects'
> & {
  locale: string;
  timeZone: string;
  idTokenUserInfo?: Omit<TIdTokenUserInfo, 'additionalClaims'> & {
    additionalClaims: Record<string, unknown>;
  };
  isVerified: boolean;
};

const Context = createContext({});

const defaultTimeZone = moment.tz.guess() || 'Etc/UTC';

// Expose only certain fields as some of them are only meant to
// be used internally in the AppShell
export const mapUserToApplicationContextUser = (user?: TFetchedUser) => {
  if (!user) return null;
  let applicationContextUser: TApplicationContextUser = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    businessRole: user.businessRole,
    // NOTE: this is an alias for the original field `user.language` but it's actually
    // a locale (language + country).
    locale: user.language,
    timeZone: user.timeZone || defaultTimeZone,
    projects: user.projects,
    isVerified: user.isVerified,
  };

  // This property will only be populated when user has logged in using SSO
  if (user.idTokenUserInfo) {
    let additionalClaims: Record<string, unknown> = {};
    try {
      additionalClaims = JSON.parse(
        user.idTokenUserInfo.additionalClaims || '{}'
      );
    } catch (error) {
      reportErrorToSentry(
        new Error(
          '@commercetools-frontend/application-shell-connectors: Could not parse received user sso token additional claims from server.'
        ),
        {
          extra: {
            receivedAdditionalClaims: user.idTokenUserInfo.additionalClaims,
          },
        }
      );
    }
    applicationContextUser.idTokenUserInfo = {
      ...user.idTokenUserInfo,
      additionalClaims,
    };
  }

  return applicationContextUser;
};

// Adjust certain fields which depend e.g. on the origin
export const mapEnvironmentToApplicationContextEnvironment = <
  AdditionalEnvironmentProperties extends {}
>(
  environment: AdditionalEnvironmentProperties & TApplicationContextEnvironment,
  origin?: string
) => ({
  ...environment,
  // NOTE: The `mcApiUrl` depends on `servedByProxy`
  mcApiUrl: getMcApiUrl(environment, origin),
});

// Expose only certain fields as some of them are only meant to
// be used internally in the AppShell
export const mapProjectToApplicationContextProject = (
  project?: TFetchedProject
) => {
  if (!project) return null;
  return {
    key: project.key,
    version: project.version,
    name: project.name,
    countries: project.countries,
    currencies: project.currencies,
    languages: project.languages,
    ownerId: project.owner.id,
    ownerName: project.owner.name,
  };
};

export type TApplicationContext<AdditionalEnvironmentProperties extends {}> = {
  environment: AdditionalEnvironmentProperties & TApplicationContextEnvironment;
  user: ReturnType<typeof mapUserToApplicationContextUser>;
  project: ReturnType<typeof mapProjectToApplicationContextProject>;
  permissions: TApplicationContextPermissions | null;
  actionRights: TApplicationContextActionRights | null;
  dataFences: TApplicationContextDataFences | null;
  dataLocale: string | null;
};
export type ProviderProps<AdditionalEnvironmentProperties extends {}> = {
  environment: AdditionalEnvironmentProperties & TApplicationContextEnvironment;
  user?: TFetchedUser;
  project?: TFetchedProject;
  projectDataLocale?: string;
  children: ReactNode;
};
type ConsumerProps<AdditionalEnvironmentProperties extends {}> = {
  render: (
    context: TApplicationContext<AdditionalEnvironmentProperties>
  ) => ReactNode;
  children?: never;
};

const createApplicationContext: <AdditionalEnvironmentProperties extends {}>(
  environment: AdditionalEnvironmentProperties & TApplicationContextEnvironment,
  user?: TFetchedUser,
  project?: TFetchedProject,
  projectDataLocale?: string
) => TApplicationContext<AdditionalEnvironmentProperties> = (
  environment,
  user,
  project,
  projectDataLocale
) => ({
  environment: mapEnvironmentToApplicationContextEnvironment(environment),
  user: mapUserToApplicationContextUser(user),
  project: mapProjectToApplicationContextProject(project),
  permissions: normalizeAllAppliedPermissions(project?.allAppliedPermissions),
  actionRights: normalizeAllAppliedActionRights(
    project?.allAppliedActionRights
  ),
  dataFences: normalizeAllAppliedDataFences(project?.allAppliedDataFences),
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
    {(context) => {
      // Because of the way the ApplicationShell configures the Context.Provider,
      // we ensure that, when we read from the context, we always get actual
      // context object and not the initial value.
      // Therefore, we can safely cast the value to be out `TApplicationContext` type.
      const applicationContext =
        context as TApplicationContext<AdditionalEnvironmentProperties>;
      return props.render(applicationContext);
    }}
  </Context.Consumer>
);
ApplicationContext.displayName = 'ApplicationContext';

function withApplicationContext<
  OwnProps extends {},
  AdditionalEnvironmentProperties extends {},
  MappedProps extends {} = {
    applicationContext?: TApplicationContext<AdditionalEnvironmentProperties>;
  }
>(
  mapApplicationContextToProps?: (
    context: TApplicationContext<AdditionalEnvironmentProperties>
  ) => MappedProps
) {
  return (
    Component: ComponentType<OwnProps>
  ): ComponentType<OwnProps & MappedProps> => {
    const WrappedComponent = (props: OwnProps) => (
      <ApplicationContext<AdditionalEnvironmentProperties>
        render={(applicationContext) => {
          const mappedProps = mapApplicationContextToProps
            ? mapApplicationContextToProps(applicationContext)
            : { applicationContext };
          return <Component {...props} {...mappedProps} />;
        }}
      />
    );
    WrappedComponent.displayName = `withApplicationContext(${getDisplayName<OwnProps>(
      Component
    )})`;
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
  const context = useContext(Context);
  // Because of the way the ApplicationShell configures the Context.Provider,
  // we ensure that, when we read from the context, we always get actual
  // context object and not the initial value.
  // Therefore, we can safely cast the value to be out `TApplicationContext` type.
  const applicationContext =
    context as TApplicationContext<AdditionalEnvironmentProperties>;
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
