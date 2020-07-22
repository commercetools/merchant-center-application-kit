import type { SyntheticEvent } from 'react';
import type { Dispatch } from 'redux';
import type { TFlags } from '@flopflip/types';
import type { ApolloError } from 'apollo-client';
import type { TApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import type { TAsyncLocaleDataProps } from '@commercetools-frontend/i18n';
import type { TApplicationsMenu } from '../../types/generated/proxy';
import type { TrackingList } from '../../utils/gtm';

import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  joinPaths,
  trimLeadingAndTrailingSlashes,
} from '@commercetools-frontend/url-utils';
import { DOMAINS, LOGOUT_REASONS } from '@commercetools-frontend/constants';
import {
  reportErrorToSentry,
  SentryUserTracker,
} from '@commercetools-frontend/sentry';
import { ApplicationContextProvider } from '@commercetools-frontend/application-shell-connectors';
import { NotificationsList } from '@commercetools-frontend/react-notifications';
import { AsyncLocaleData } from '@commercetools-frontend/i18n';
import internalReduxStore from '../../configure-store';
import ProjectDataLocale from '../project-data-locale';
import PortalsContainer from '../portals-container';
import ApplicationShellProvider from '../application-shell-provider';
import { getBrowserLocale } from '../application-shell-provider/utils';
import FetchUser from '../fetch-user';
import VersionTracker from '../version-tracker';
import FetchProject from '../fetch-project';
import ConfigureIntlProvider from '../configure-intl-provider';
import AppBar from '../app-bar';
import ProjectContainer from '../project-container';
import SetupFlopFlipProvider from '../setup-flop-flip-provider';
import RequestsInFlightLoader from '../requests-in-flight-loader';
import GtmUserTracker from '../gtm-user-tracker';
import GtmApplicationTracker from '../gtm-application-tracker';
import NavBar, { LoadingNavBar } from '../navbar';
import ApplicationLoader from '../application-loader';
import ErrorApologizer from '../error-apologizer';
import Redirector from '../redirector';
import version from '../../version';
import RedirectToProjectCreate from '../redirect-to-project-create';
import { selectProjectKeyFromUrl, getPreviousProjectKey } from '../../utils';
import QuickAccess from '../quick-access';
import useCoercedEnvironmentValues from './use-coerced-environment-values';

type Props<AdditionalEnvironmentProperties extends {}> = {
  /**
   * NOTE: the environment value passed here is usually `window.app`.
   * This object usually contains values as string and will be "transformed"
   * to a real object with proper scalar values in the ApplicationShell.
   * To keep the types simple, we assign here the already coerced type object.
   * This should be fine, as consumers of the application can use the
   * `ApplicationWindow` type from the `@commercetools-frontend/constants` package
   * to type cast it:
   *
   * ```tsx
   * import { ApplicationWindow } from '@commercetools-frontend/constants';
   *
   * declare let window: ApplicationWindow;
   *
   * <ApplicationShell environment={window.app} />
   * ```
   */
  environment: TApplicationContext<
    AdditionalEnvironmentProperties
  >['environment'];
  featureFlags?: TFlags;
  defaultFeatureFlags?: TFlags;
  // This is deprecated, to avoid usage of oppressive language!
  // Use `trackingEventList` instead.
  trackingEventWhitelist?: TrackingList;
  trackingEventList?: TrackingList;
  applicationMessages: TAsyncLocaleDataProps['applicationMessages'];
  onRegisterErrorListeners: (args: { dispatch: Dispatch }) => void;
  onMenuItemClick?: <TrackFn>(
    event: SyntheticEvent<HTMLAnchorElement>,
    track: TrackFn
  ) => void;
  render: () => JSX.Element;
  // Only available in development mode
  DEV_ONLY__loadAppbarMenuConfig?: () => Promise<TApplicationsMenu['appBar']>;
  DEV_ONLY__loadNavbarMenuConfig?: () => Promise<TApplicationsMenu['navBar']>;
};

/**
 * This component is rendered whenever the user is considered "authenticated"
 * and contains the "restricted" application part.
 */

const getHasUnauthorizedError = (graphQLErrors: ApolloError['graphQLErrors']) =>
  graphQLErrors.find(
    (gqlError) =>
      gqlError.extensions &&
      gqlError.extensions.code &&
      gqlError.extensions.code === 'UNAUTHENTICATED'
  );
const getHasUserBeenDeletedError = (
  graphQLErrors: ApolloError['graphQLErrors']
) =>
  graphQLErrors.find(
    (gqlError) =>
      gqlError.message &&
      // NOTE: The CTP API does not provide an error code in this case.
      gqlError.message.includes('was not found.')
  );

export const MainContainer = styled.main`
  grid-column: 2;
  grid-row: 3;

  /*
    Allow the this flex child to grow smaller than its smallest content.
    This is needed when there is a really wide text inside that would stretch
    this node to be wider than the parent.
  */
  min-width: 0;
  overflow-x: hidden;
  overflow-y: scroll;

  /*
    layout the children. There will always be the page and side notification
    about the actual content. The content should stretch to fill the rest of
    the page.
  */
  display: flex;
  flex-direction: column;

  /*
    set position to relative to layout notifications and modals
  */
  position: relative;
`;

export const RestrictedApplication = <
  AdditionalEnvironmentProperties extends {}
>(
  props: Omit<
    Props<AdditionalEnvironmentProperties>,
    'onRegisterErrorListeners'
  >
) => {
  // TODO: using this hook will subscribe the component to route updates.
  // This is currently useful for detecting a change in the project key
  // from URL ("/" --> "/:projectKey").
  // However, every route change will trigger a re-render. This is probably
  // ok-ish but we might want to look into a more performant solution.
  const location = useLocation();
  return (
    <FetchUser>
      {({ isLoading: isLoadingUser, user, error }) => {
        if (error) {
          // In case there is an unauthorized error, we redirect to the login page
          if (error.graphQLErrors && Array.isArray(error.graphQLErrors)) {
            const hasUnauthorizedError = getHasUnauthorizedError(
              error.graphQLErrors
            );
            const hasUserBeenDeletedError = getHasUserBeenDeletedError(
              error.graphQLErrors
            );

            if (hasUnauthorizedError || hasUserBeenDeletedError) {
              let logoutReason:
                | typeof LOGOUT_REASONS[keyof typeof LOGOUT_REASONS]
                | undefined;
              if (hasUnauthorizedError)
                logoutReason = LOGOUT_REASONS.UNAUTHORIZED;
              else if (hasUserBeenDeletedError)
                logoutReason = LOGOUT_REASONS.DELETED;
              return (
                <Redirector
                  to="logout"
                  queryParams={{ reason: logoutReason }}
                />
              );
            }
          }
          // Since we do not know the locale of the user, we pick it from the
          // user's browser to attempt to match the language for the correct translations.
          const userLocale = getBrowserLocale(window);
          return (
            <AsyncLocaleData
              locale={userLocale}
              applicationMessages={props.applicationMessages}
            >
              {({ locale, messages }) => {
                reportErrorToSentry(error, {});
                return (
                  <ConfigureIntlProvider locale={locale} messages={messages}>
                    <ErrorApologizer />
                  </ConfigureIntlProvider>
                );
              }}
            </AsyncLocaleData>
          );
        }

        const projectKeyFromUrl = selectProjectKeyFromUrl(location.pathname);
        return (
          <ApplicationContextProvider<AdditionalEnvironmentProperties>
            user={user}
            environment={props.environment}
          >
            {/*
            NOTE: we do not want to load the locale data as long as we do not
            know the user setting. This is important in order to avoid flashing
            of translated content on subsequent re-renders.
            Therefore, as long as there is no locale, the children should consider using the
            `isLoading` prop to decide what to render.
          */}
            <AsyncLocaleData
              locale={user && user.language}
              applicationMessages={props.applicationMessages}
            >
              {({ isLoading: isLoadingLocaleData, locale, messages }) => (
                <ConfigureIntlProvider
                  // We do not want to pass the language as long as the locale data
                  // is not loaded.
                  {...(isLoadingLocaleData ? {} : { locale, messages })}
                >
                  <SetupFlopFlipProvider
                    user={user}
                    projectKey={projectKeyFromUrl}
                    appEnv={props.environment.env}
                    flags={props.featureFlags}
                    defaultFlags={props.defaultFeatureFlags}
                  >
                    <React.Fragment>
                      <VersionTracker />
                      {/* NOTE: the requests in flight loader will render a loading
                      spinner into the AppBar. */}
                      <RequestsInFlightLoader />
                      <SentryUserTracker user={user} />
                      <GtmUserTracker user={user} />
                      <GtmApplicationTracker
                        applicationName={props.environment.applicationName}
                        projectKey={projectKeyFromUrl}
                      />
                      <div
                        role="application-layout"
                        css={css`
                          height: 100vh;
                          display: grid;
                          grid-template-rows: auto 43px 1fr;
                          grid-template-columns: auto 1fr;
                        `}
                      >
                        <div
                          role="global-notifications"
                          css={css`
                            grid-row: 1;
                            grid-column: 1/3;
                          `}
                        >
                          <NotificationsList domain={DOMAINS.GLOBAL} />
                        </div>

                        <Route>
                          {() => {
                            if (!projectKeyFromUrl) return <QuickAccess />;
                            return (
                              <FetchProject projectKey={projectKeyFromUrl}>
                                {({ isLoading: isProjectLoading, project }) => {
                                  if (isProjectLoading || !project) return null;

                                  // when used outside of a project context,
                                  // or when the project is expired or supsended
                                  const shouldUseProjectContext = !(
                                    (project.suspension &&
                                      project.suspension.isActive) ||
                                    (project.expiry && project.expiry.isActive)
                                  );

                                  if (!shouldUseProjectContext)
                                    return <QuickAccess />;

                                  return (
                                    <ProjectDataLocale
                                      locales={project.languages}
                                    >
                                      {({
                                        locale: dataLocale,
                                        setProjectDataLocale,
                                      }) => (
                                        <ApplicationContextProvider<
                                          AdditionalEnvironmentProperties
                                        >
                                          user={user}
                                          project={project}
                                          projectDataLocale={dataLocale}
                                          environment={props.environment}
                                        >
                                          <QuickAccess
                                            onChangeProjectDataLocale={
                                              setProjectDataLocale
                                            }
                                          />
                                        </ApplicationContextProvider>
                                      )}
                                    </ProjectDataLocale>
                                  );
                                }}
                              </FetchProject>
                            );
                          }}
                        </Route>

                        <header
                          role="header"
                          css={css`
                            grid-row: 2;
                            grid-column: 1/3;
                          `}
                        >
                          <AppBar
                            user={user}
                            projectKeyFromUrl={projectKeyFromUrl}
                            DEV_ONLY__loadAppbarMenuConfig={
                              props.DEV_ONLY__loadAppbarMenuConfig
                            }
                          />
                        </header>

                        <aside
                          role="aside"
                          css={css`
                            position: relative;
                            grid-row: 3;
                            display: flex;
                            flex-direction: column;
                          `}
                        >
                          {(() => {
                            // The <NavBar> should only be rendered within a project
                            // context, therefore when there is a `projectKey`.
                            // If there is no `projectKey` in the URL (e.g. `/account`
                            // routes), we don't render it.
                            // NOTE: we also "cache" the `projectKey` in localStorage
                            // but this should only be used to "re-hydrate" the URL
                            // location (e.g when you go to `/`, there should be a
                            // redirect to `/:projectKey`). Therefore, we should not
                            // rely on the value in localStorage to determine which
                            // `projectKey` is currently used.
                            if (!projectKeyFromUrl) return null;
                            return (
                              <FetchProject projectKey={projectKeyFromUrl}>
                                {({ isLoading: isLoadingProject, project }) => {
                                  // Render the loading navbar as long as all the data
                                  // hasn't been loaded, or if the project does not exist.
                                  if (
                                    isLoadingUser ||
                                    isLoadingLocaleData ||
                                    isLoadingProject ||
                                    !locale ||
                                    !project
                                  )
                                    return <LoadingNavBar />;

                                  return (
                                    <ApplicationContextProvider<
                                      AdditionalEnvironmentProperties
                                    >
                                      user={user}
                                      project={project}
                                      environment={props.environment}
                                    >
                                      <NavBar<AdditionalEnvironmentProperties>
                                        applicationLocale={locale}
                                        projectKey={projectKeyFromUrl}
                                        environment={props.environment}
                                        DEV_ONLY__loadNavbarMenuConfig={
                                          props.DEV_ONLY__loadNavbarMenuConfig
                                        }
                                        onMenuItemClick={props.onMenuItemClick}
                                      />
                                    </ApplicationContextProvider>
                                  );
                                }}
                              </FetchProject>
                            );
                          })()}
                        </aside>

                        {isLoadingUser || isLoadingLocaleData ? (
                          <MainContainer role="main">
                            <ApplicationLoader />
                          </MainContainer>
                        ) : (
                          <MainContainer role="main">
                            <PortalsContainer />
                            <NotificationsList domain={DOMAINS.PAGE} />
                            <NotificationsList domain={DOMAINS.SIDE} />
                            <div
                              css={css`
                                flex-grow: 1;
                                display: flex;
                                flex-direction: column;

                                /*
                                This is only necessary because we have an intermediary <div> wrapping the
                                <View> component that is used to wrap every content-view. This intermediary
                                <div> is solely used for adding the tracking context to the content-view.
                                However, this could be done by passing the tracking context to the <View>
                                and let it do the layout, so we can avoid laying our from the outside as we
                                do here.
                              */
                                > * {
                                  flex-grow: 1;
                                  display: flex;
                                  flex-direction: column;
                                }
                              `}
                            >
                              <Switch>
                                <Redirect
                                  from="/profile"
                                  to="/account/profile"
                                />
                                <Route
                                  path="/account"
                                  // Render the children and pass the control to the
                                  // specific application part
                                  render={props.render}
                                />
                                {/* Project routes */}
                                <Route
                                  exact={true}
                                  path="/"
                                  render={() => {
                                    const previousProjectKey = getPreviousProjectKey(
                                      user && user.defaultProjectKey
                                    );

                                    /**
                                     * NOTE:
                                     *   Given the user has not been loaded a loading spinner is shown.
                                     *   Given the user was not working on a project previously nor has a default
                                     *   project, the user will be prompted to create one.
                                     *   Given the user was working on a project previously or has a default
                                     *   project, the application will redirect to that project.
                                     */
                                    if (!user) return <ApplicationLoader />;
                                    if (!previousProjectKey)
                                      return <RedirectToProjectCreate />;
                                    return (
                                      <Redirect to={`/${previousProjectKey}`} />
                                    );
                                  }}
                                />
                                <Route
                                  exact={false}
                                  path="/:projectKey"
                                  render={(routerProps) => (
                                    <React.Fragment>
                                      <ProjectContainer<
                                        AdditionalEnvironmentProperties
                                      >
                                        user={user}
                                        match={routerProps.match}
                                        location={routerProps.location}
                                        environment={props.environment}
                                        // This effectively renders the
                                        // children, which is the application
                                        // specific part
                                        render={props.render}
                                      />
                                    </React.Fragment>
                                  )}
                                />
                              </Switch>
                            </div>
                          </MainContainer>
                        )}
                      </div>
                    </React.Fragment>
                  </SetupFlopFlipProvider>
                </ConfigureIntlProvider>
              )}
            </AsyncLocaleData>
          </ApplicationContextProvider>
        );
      }}
    </FetchUser>
  );
};
RestrictedApplication.displayName = 'RestrictedApplication';

const ApplicationShell = <AdditionalEnvironmentProperties extends {}>(
  props: Props<AdditionalEnvironmentProperties>
) => {
  React.useEffect(() => {
    props.onRegisterErrorListeners({
      dispatch: internalReduxStore.dispatch,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // <-- run only once, when component mounts

  const coercedEnvironmentValues = useCoercedEnvironmentValues<
    AdditionalEnvironmentProperties
  >(props.environment);

  return (
    <>
      <Global
        styles={css`
          #app {
            height: 100%;
          }
          .ReactModal__Body--open main {
            /* When a modal is open, we should prevent the content to be scrollable */
            overflow: hidden;
          }
        `}
      />
      <ApplicationShellProvider<AdditionalEnvironmentProperties>
        environment={coercedEnvironmentValues}
        trackingEventList={
          props.trackingEventList || props.trackingEventWhitelist
        }
        applicationMessages={props.applicationMessages}
      >
        {({ isAuthenticated }) => {
          if (isAuthenticated)
            return (
              <Switch>
                {/* When the application redirects to this route,
                we always force a hard redirect to the logout route of
                the authentication service. */}
                <Route
                  path="/logout"
                  render={({ location }) => (
                    <Redirector
                      to="logout"
                      location={location}
                      queryParams={{
                        reason: LOGOUT_REASONS.USER,
                        ...(coercedEnvironmentValues.servedByProxy
                          ? {}
                          : {
                              // This will be used after being logged in, to redirect to this location.
                              redirectTo: window.location.origin,
                            }),
                      }}
                    />
                  )}
                />
                <Route>
                  <RestrictedApplication<AdditionalEnvironmentProperties>
                    environment={coercedEnvironmentValues}
                    defaultFeatureFlags={props.defaultFeatureFlags}
                    featureFlags={props.featureFlags}
                    render={props.render}
                    applicationMessages={props.applicationMessages}
                    onMenuItemClick={props.onMenuItemClick}
                    DEV_ONLY__loadAppbarMenuConfig={
                      props.DEV_ONLY__loadAppbarMenuConfig
                    }
                    DEV_ONLY__loadNavbarMenuConfig={
                      props.DEV_ONLY__loadNavbarMenuConfig
                    }
                  />
                </Route>
              </Switch>
            );

          return (
            <Route
              render={({ location }) => (
                <Redirector
                  to="login"
                  location={location}
                  queryParams={{
                    reason: LOGOUT_REASONS.UNAUTHORIZED,
                    redirectTo: trimLeadingAndTrailingSlashes(
                      joinPaths(window.location.origin, location.pathname)
                    ),
                  }}
                />
              )}
            />
          );
        }}
      </ApplicationShellProvider>
    </>
  );
};
ApplicationShell.displayName = 'ApplicationShell';
ApplicationShell.version = version;

export default ApplicationShell;
