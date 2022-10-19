import {
  JSXElementConstructor,
  createElement,
  Suspense,
  type ReactElement,
  type ReactNode,
} from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';
import invariant from 'tiny-invariant';
import { ApolloClient, type NormalizedCacheObject } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import {
  MockedProvider as ApolloMockProvider,
  type MockedResponse,
} from '@apollo/client/testing';
import * as rtl from '@testing-library/react';
import * as rtlHooks from '@testing-library/react-hooks';
import { createMemoryHistory } from 'history';
import { IntlProvider } from 'react-intl';
import { TestProviderFlopFlip } from '@flopflip/react-broadcast';
import type { TFlags } from '@flopflip/types';
import { Provider as StoreProvider } from 'react-redux';
import { createEnhancedHistory } from '@commercetools-frontend/browser-history';
import {
  ApplicationContextProvider,
  type TProviderProps,
} from '@commercetools-frontend/application-shell-connectors';
import {
  NotificationsList,
  NotificationProviderForCustomComponent,
  type TMapNotificationToComponentProps,
} from '@commercetools-frontend/react-notifications';
import { DOMAINS } from '@commercetools-frontend/constants';
import {
  createTestMiddleware as createSdkTestMiddleware,
  type TSdkMock,
} from '@commercetools-frontend/sdk/test-utils';
import { entryPointUriPathToPermissionKeys } from '@commercetools-frontend/application-config/ssr';
import ApplicationEntryPoint from '../components/application-entry-point';
import { createReduxStore } from '../configure-store';
import createApolloClient from '../configure-apollo';

// These default values get merged with the values provided by the test from
// the call to "render"

const defaultProject = {
  key: 'test-with-big-data',
  version: 43,
  name: 'Test with big data',
  countries: ['de', 'en'],
  currencies: ['EUR', 'GBP'],
  languages: ['de', 'en-GB', 'en'],
  owner: {
    id: 'organization-id-1',
    name: 'Organization Name',
  },
  initialized: true,
  expiry: {
    isActive: false,
    daysLeft: undefined,
  },
  suspension: {
    isActive: false,
    reason: undefined,
  },
  allAppliedPermissions: [],
  allAppliedActionRights: [],
  allAppliedDataFences: [],
  allPermissionsForAllApplications: {
    allAppliedPermissions: [],
    allAppliedActionRights: [],
    allAppliedDataFences: [],
    allAppliedMenuVisibilities: [],
  },
};

const defaultUser = {
  id: 'user-id-1',
  email: 'sheldon.cooper@caltech.edu',
  firstName: 'Sheldon',
  lastName: 'Cooper',
  language: 'en',
  timeZone: 'Etc/UTC',
  numberFormat: 'en',
  defaultProjectKey: defaultProject.key,
  businessRole: 'Other',
  projects: {
    total: 1,
    results: [defaultProject],
  },
  gravatarHash: 'aaa',
  launchdarklyTrackingGroup: 'commercetools',
  launchdarklyTrackingSubgroup: 'dev',
  launchdarklyTrackingId: '111',
  launchdarklyTrackingTeam: undefined,
  launchdarklyTrackingTenant: 'gcp-eu',
  verificationStatus: 'Verified',
};

const defaultEnvironment: Partial<TProviderProps<{}>['environment']> = {
  applicationId: '__local',
  applicationName: 'my-app',
  entryPointUriPath: 'random-entry-point',
  frontendHost: 'localhost:3001',
  mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
  location: 'eu',
  env: 'production',
  cdnUrl: 'http://localhost:3001',
  servedByProxy: false,
};

const LoadingFallback = () => <>{'Loading...'}</>;
LoadingFallback.displayName = 'LoadingFallback';

// For backwards compatibility we need to denormalize the given `permissions` option
// (which is now deprecated) to `allAppliedPermissions`, in order to pass the value
// to the `project` prop in the application context provider.
type TPermissions = { [key: string]: boolean };
type TAllAppliedPermission = {
  name: string;
  value: boolean;
};
const denormalizePermissions = (permissions?: TPermissions) => {
  if (!permissions) return [];
  return Object.keys(permissions).reduce<TAllAppliedPermission[]>(
    (allAppliedPermissions, permissionKey) => [
      ...allAppliedPermissions,
      { name: permissionKey, value: permissions[permissionKey] },
    ],
    []
  );
};
// For backwards compatibility we need to denormalize the given `actionRights` option
// (which is now deprecated) to `allAppliedActionRights`, in order to pass the value
// to the `project` prop in the application context provider.
type TNormalizedActionRights = { [key: string]: TPermissions };
type TAllAppliedActionRight = TAllAppliedPermission & {
  group: string;
};
const denormalizeActionRights = (actionRights?: TNormalizedActionRights) => {
  if (!actionRights) return [];
  return Object.keys(actionRights).reduce<TAllAppliedActionRight[]>(
    (allAppliedActionRights, actionRightGroup) => [
      ...allAppliedActionRights,
      ...Object.keys(actionRights[actionRightGroup]).reduce<
        TAllAppliedActionRight[]
      >(
        (allActionRightsByGroup, actionRightKey) => [
          ...allActionRightsByGroup,
          {
            group: actionRightGroup,
            name: actionRightKey,
            value: actionRights[actionRightGroup][actionRightKey],
          },
        ],
        []
      ),
    ],
    []
  );
};
// For backwards compatibility we need to denormalize the given `dataFences` option
// (which is now deprecated) to `allAppliedDataFences`, in order to pass the value
// to the `project` prop in the application context provider.
type TNormalizedDataFenceStorePermissions = {
  [key: string]: { values: string[] };
};
type TNormalizedDataFenceStores = {
  [key: string]: TNormalizedDataFenceStorePermissions;
};
type TNormalizedDataFences = { store: TNormalizedDataFenceStores };
type TAllAppliedDataFence = {
  __typename: 'StoreDataFence';
  type: string;
  name: string;
  value: string;
  group: string;
};
const denormalizeDataFences = (dataFences?: TNormalizedDataFences) => {
  if (!dataFences) return [];
  return Object.keys(dataFences).reduce<TAllAppliedDataFence[]>(
    (allAppliedDataFences, dataFenceGroupKey) => {
      switch (dataFenceGroupKey) {
        case 'store':
          return [
            ...allAppliedDataFences,
            ...Object.keys(dataFences.store).reduce<TAllAppliedDataFence[]>(
              (allResources, resourceType) => [
                ...allResources,
                ...Object.keys(dataFences.store[resourceType]).reduce<
                  TAllAppliedDataFence[]
                >(
                  (allPermissions, permissionKey) => [
                    ...allPermissions,
                    ...dataFences.store[resourceType][
                      permissionKey
                    ].values.map<TAllAppliedDataFence>((value) => ({
                      __typename: 'StoreDataFence',
                      type: 'store',
                      value,
                      group: resourceType,
                      name: permissionKey,
                    })),
                  ],
                  []
                ),
              ],
              []
            ),
          ];
        default:
          return allAppliedDataFences;
      }
    },
    []
  );
};

const mapResourceAccessToAppliedPermissions = (resourceAccesses: string[]) =>
  resourceAccesses.map<TAllAppliedPermission>((resourceAccess) => ({
    name: `can${resourceAccess}`,
    value: true,
  }));

const wrapIfNeeded = (
  children: ReactNode,
  wrapper?: JSXElementConstructor<{ children: ReactElement }>
) => (wrapper ? createElement(wrapper, null, children) : children);

type TApolloProviderWrapperProps = {
  apolloClient?: ApolloClient<NormalizedCacheObject>;
  mocks?: ReadonlyArray<MockedResponse>;
  children: ReactElement;
};
const ApolloProviderWrapper = (props: TApolloProviderWrapperProps) => {
  const apolloClient = props.apolloClient ?? createApolloClient();

  const enableApolloMocks = Boolean(props.mocks && props.mocks.length > 0);

  if (!enableApolloMocks) {
    return (
      // eslint-disable-next-line testing-library/no-node-access
      <ApolloProvider client={apolloClient}>{props.children}</ApolloProvider>
    );
  }
  return (
    <ApolloMockProvider
      mocks={props.mocks}
      // The `addTypename` field is a private field of the cache in TS
      // but we should be able to still access it.
      // This is to ensure the `addTypename` behavior is the same between the
      // Apollo cache and the mocked provider.
      // @ts-expect-error
      addTypename={apolloClient.cache.addTypename ?? true}
      cache={apolloClient.cache}
    >
      {/* eslint-disable-next-line testing-library/no-node-access */}
      {props.children}
    </ApolloMockProvider>
  );
};

// This function renders any component within the application context, as if it
// was rendered inside <ApplicationShell />.
// The context is not completely set up yet, some things are missing:
//   - Tracking on context
//   - react-intl's information from addLocaleData
//   - possibly more that I'm not aware of right now
//
//  We can add these things as we go and when we need them.

export type TRenderAppOptions<AdditionalEnvironmentProperties extends {} = {}> =
  {
    locale: string;
    mocks?: ReadonlyArray<MockedResponse>;
    apolloClient?: ApolloClient<NormalizedCacheObject>;
    route: string;
    disableRoutePermissionCheck: boolean;
    disableAutomaticEntryPointRoutes: boolean;
    history: ReturnType<typeof createEnhancedHistory>;
    flags: TFlags;
    environment: Partial<
      TProviderProps<AdditionalEnvironmentProperties>['environment']
    >;
    user: Partial<TProviderProps<AdditionalEnvironmentProperties>['user']>;
    project: Partial<
      TProviderProps<AdditionalEnvironmentProperties>['project']
    >;
    dataLocale: TProviderProps<AdditionalEnvironmentProperties>['projectDataLocale'];
  } & rtl.RenderOptions;
type TRenderAppResult<AdditionalEnvironmentProperties extends {} = {}> =
  rtl.RenderResult &
    Pick<
      TRenderAppOptions<AdditionalEnvironmentProperties>,
      'history' | 'user' | 'project' | 'environment'
    >;
type TApplicationProvidersProps = {
  children: ReactNode;
};

function createApplicationProviders<
  AdditionalEnvironmentProperties extends {} = {}
>({
  // application
  disableAutomaticEntryPointRoutes = false,
  disableRoutePermissionCheck = false,
  // react-intl
  locale = 'en',
  // Apollo
  mocks,
  apolloClient,
  // react-router
  route,
  history,
  // flopflip
  flags = {},
  // application-context
  environment,
  user,
  project,
  dataLocale = 'en',
}: Partial<TRenderAppOptions<AdditionalEnvironmentProperties>> = {}) {
  const mergedUser = user === null ? undefined : { ...defaultUser, ...user };
  const mergedProject =
    project === null ? undefined : { ...defaultProject, ...project };
  const mergedEnvironment = {
    ...defaultEnvironment,
    ...environment,
  } as TProviderProps<AdditionalEnvironmentProperties>['environment'];

  // Provide default permissions to render the application route.
  if (mergedProject) {
    if (mergedProject.allAppliedPermissions.length === 0) {
      const defaultPermissionKeys = entryPointUriPathToPermissionKeys(
        mergedEnvironment.entryPointUriPath
      );
      mergedProject.allAppliedPermissions =
        mapResourceAccessToAppliedPermissions([defaultPermissionKeys.View]);
    }
  }

  let initialRoute = route;
  if (!route && mergedProject) {
    initialRoute = `/${mergedProject.key}/${mergedEnvironment.entryPointUriPath}`;
  }
  const memoryHistory =
    history ??
    createEnhancedHistory(
      createMemoryHistory({ initialEntries: [initialRoute || '/'] })
    );

  const ApplicationProviders = (props: TApplicationProvidersProps) => (
    <IntlProvider locale={locale}>
      <ApolloProviderWrapper apolloClient={apolloClient} mocks={mocks}>
        <TestProviderFlopFlip flags={flags}>
          <ApplicationContextProvider
            user={mergedUser}
            project={mergedProject}
            environment={mergedEnvironment}
            projectDataLocale={dataLocale}
          >
            <Router history={memoryHistory}>
              <Suspense fallback={<LoadingFallback />}>
                <ApplicationEntryPoint
                  environment={mergedEnvironment}
                  disableRoutePermissionCheck={disableRoutePermissionCheck}
                  render={
                    disableAutomaticEntryPointRoutes
                      ? // eslint-disable-next-line testing-library/no-node-access
                        () => <>{props.children}</>
                      : undefined
                  }
                >
                  {disableAutomaticEntryPointRoutes
                    ? undefined
                    : // eslint-disable-next-line testing-library/no-node-access
                      props.children}
                </ApplicationEntryPoint>
              </Suspense>
            </Router>
          </ApplicationContextProvider>
        </TestProviderFlopFlip>
      </ApolloProviderWrapper>
    </IntlProvider>
  );
  ApplicationProviders.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return {
    ApplicationProviders,
    mergedUser,
    mergedProject,
    mergedEnvironment,
    history: memoryHistory,
  };
}

// Inspired by
// https://github.com/kentcdodds/react-testing-library-course/blob/2a5b1560656790bb1d9c055fba3845780b2c2c97/src/__tests__/react-router-03.js
function renderApp<AdditionalEnvironmentProperties extends {} = {}>(
  ui: ReactElement,
  options: Partial<TRenderAppOptions<AdditionalEnvironmentProperties>> = {}
): TRenderAppResult<AdditionalEnvironmentProperties> {
  const {
    ApplicationProviders,
    mergedUser,
    mergedProject,
    mergedEnvironment,
    history,
  } = createApplicationProviders(options);

  // eslint-disable-next-line testing-library/render-result-naming-convention
  const rendered = rtl.render(ui, {
    ...options,
    // eslint-disable-next-line react/display-name
    wrapper: ({ children, ...props }) => (
      <ApplicationProviders {...props}>
        {wrapIfNeeded(children, options.wrapper)}
      </ApplicationProviders>
    ),
  });

  return {
    ...rendered,

    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
    // Adding user, project & environment so tests know about the merge results
    // Note that these objects do not resemble the application context, they are
    // only intended to communicate the test setup back to the tests.
    user: mergedUser,
    project: mergedProject,
    environment: mergedEnvironment,
  };
}

export type TRenderAppWithReduxOptions<
  AdditionalEnvironmentProperties extends {} = {},
  StoreState extends {} = {}
> = {
  store: ReturnType<typeof createReduxStore>;
  storeState: StoreState;
  sdkMocks: TSdkMock[];
  mapNotificationToComponent: TMapNotificationToComponentProps['mapNotificationToComponent'];
} & TRenderAppOptions<AdditionalEnvironmentProperties>;
type TRenderAppWithReduxResult<
  AdditionalEnvironmentProperties extends {} = {},
  StoreState extends {} = {}
> = TRenderAppResult<AdditionalEnvironmentProperties> &
  Pick<
    TRenderAppWithReduxOptions<AdditionalEnvironmentProperties, StoreState>,
    'store'
  >;

function createReduxProviders<
  AdditionalEnvironmentProperties extends {} = {},
  StoreState extends {} = {}
>({
  // The store option is kept around to keep the API open as not all use-cases
  // are known yet. Meanwhile storeState and sdkMocks provide convenient ways
  // to work with the redux store.
  store = undefined,
  // Pass an initial state to Redux store.
  storeState = undefined,
  // renderAppWithRedux supports mocking requests made through the sdk
  // middleware. The approach is inspired by ApolloMockProvider.
  // You can pass responses for specific actions like
  //   renderAppWithRedux(ui, {
  //     sdkMocks: [
  //       {
  //         action: { type: 'SDK', payload: {}},
  //         response: { foo: true },
  //       }
  //     ]
  //   })
  // You can also fake a failing request using
  //   renderAppWithRedux(ui, {
  //     sdkMocks: [
  //       {
  //         action: { type: 'SDK', payload: {}},
  //         error: new Error('foo'),
  //       }
  //     ]
  //   })
  // Note that each response will only be used once. When multiple responses
  // are provided for identical actions, then they are used in the order
  // they are provided in.
  sdkMocks = [],
  // Pass a function to map custom notification components
  mapNotificationToComponent = () => null,
}: Partial<
  TRenderAppWithReduxOptions<AdditionalEnvironmentProperties, StoreState>
> = {}) {
  invariant(
    !(store && storeState),
    '@commercetools-frontend/application-shell/test-utils: You provided both `store` and `storeState`. Please provide only one of them.'
  );
  invariant(
    !(store && sdkMocks.length > 0),
    '@commercetools-frontend/application-shell/test-utils: You provided both `store` and `sdkMocks`. Please provide only one of them.'
  );

  // Determine the redux store to use in tests.
  // - When the user passed in a "store", we use that store and ignore
  //   sdkMocks and storeState.
  // - When the user passed in no sdkMocks, we create a store using the
  //   provided storeState. If storeState is undefined, then the defaults kick
  //   in anyways.
  // - Lastly, when sdkMocks were provided (and no store was provided), we
  //   create a store which applies a special middleware to allow mocking sdk
  //   responses. We further initialize the store with the provided storeState.
  //   If storeState is undefined, then the defaults kick in anyways.
  const reduxStore = (() => {
    if (store) return store;

    if (sdkMocks.length === 0) return createReduxStore(storeState);

    const testingMiddleware = createSdkTestMiddleware(sdkMocks);
    return createReduxStore(storeState, [testingMiddleware]);
  })();

  const ReduxProviders = (props: { children: ReactNode }) => (
    <NotificationProviderForCustomComponent
      mapNotificationToComponent={mapNotificationToComponent}
    >
      <StoreProvider store={reduxStore}>
        <div>
          <NotificationsList domain={DOMAINS.GLOBAL} />
          <NotificationsList domain={DOMAINS.PAGE} />
          <NotificationsList domain={DOMAINS.SIDE} />
          {/* eslint-disable-next-line testing-library/no-node-access */}
          {props.children}
        </div>
      </StoreProvider>
    </NotificationProviderForCustomComponent>
  );
  ReduxProviders.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return {
    ReduxProviders,
    reduxStore,
  };
}

// Test setup for rendering with Redux
// We expose a sophisticated function because we plan to get rid of Redux
// Use this function only when your test actually needs Redux
function renderAppWithRedux<
  AdditionalEnvironmentProperties extends {} = {},
  StoreState extends {} = {}
>(
  ui: ReactElement,
  options: Partial<
    TRenderAppWithReduxOptions<AdditionalEnvironmentProperties, StoreState>
  > = {}
): TRenderAppWithReduxResult<AdditionalEnvironmentProperties, StoreState> {
  const { ReduxProviders, reduxStore } = createReduxProviders(options);
  // eslint-disable-next-line testing-library/render-result-naming-convention
  const rendered = renderApp(ui, {
    ...options,
    // eslint-disable-next-line react/display-name
    wrapper: ({ children, ...props }) => (
      <ReduxProviders {...props}>
        {wrapIfNeeded(children, options.wrapper)}
      </ReduxProviders>
    ),
  });

  return {
    ...rendered,
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store: reduxStore,
  };
}

export type TRenderHookOptions<
  RenderedHookProps,
  AdditionalEnvironmentProperties extends {} = {},
  StoreState extends {} = {}
> = TRenderAppWithReduxOptions<AdditionalEnvironmentProperties, StoreState> &
  rtlHooks.RenderHookOptions<RenderedHookProps>;

export type TRenderHookResult<
  RenderHookCallbackProps,
  RenderHookCallbackValue,
  AdditionalEnvironmentProperties extends {} = {},
  StoreState extends {} = {}
> = rtlHooks.RenderHookResult<
  RenderHookCallbackProps,
  RenderHookCallbackValue
> &
  Pick<
    TRenderAppWithReduxResult<AdditionalEnvironmentProperties, StoreState>,
    'store' | 'history' | 'user' | 'project' | 'environment'
  >;

function renderHook<
  RenderedHookProps,
  RenderedHookResult,
  AdditionalEnvironmentProperties extends {} = {},
  StoreState extends {} = {}
>(
  callback: (props: RenderedHookProps) => RenderedHookResult,
  options: Partial<
    TRenderHookOptions<
      RenderedHookProps,
      AdditionalEnvironmentProperties,
      StoreState
    >
  > = {}
): TRenderHookResult<
  RenderedHookProps,
  RenderedHookResult,
  AdditionalEnvironmentProperties,
  StoreState
> {
  const { ReduxProviders, reduxStore } = createReduxProviders(options);
  const {
    ApplicationProviders,
    mergedUser,
    mergedProject,
    mergedEnvironment,
    history,
  } = createApplicationProviders(options);

  // eslint-disable-next-line testing-library/render-result-naming-convention
  const rendered = rtlHooks.renderHook(callback, {
    ...options,
    // eslint-disable-next-line react/display-name
    wrapper: ({ children }) => (
      <ApplicationProviders>
        <ReduxProviders>
          {wrapIfNeeded(children, options.wrapper)}
        </ReduxProviders>
      </ApplicationProviders>
    ),
  });

  return {
    ...rendered,
    store: reduxStore,
    history,
    user: mergedUser,
    project: mergedProject,
    environment: mergedEnvironment,
  };
}

// re-export everything
export * from '@testing-library/react';

// namespace for hooks related helpers
const hooks = {
  ...rtlHooks,
  renderHook,
};

export {
  renderApp,
  renderAppWithRedux,
  hooks,
  mapResourceAccessToAppliedPermissions,
  denormalizePermissions,
  denormalizeActionRights,
  denormalizeDataFences,
};
