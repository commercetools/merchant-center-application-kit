import {
  JSX,
  type ReactNode,
  type RefObject,
  type SyntheticEvent,
  useRef,
} from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ApolloError } from '@apollo/client/errors';
import type { TFlags } from '@flopflip/types';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { PortalsContainer } from '@commercetools-frontend/application-components';
import {
  ApplicationContextProvider,
  useApplicationContext,
  selectUserLanguageFromStorage,
  type TApplicationContext,
} from '@commercetools-frontend/application-shell-connectors';
import {
  DOMAINS,
  LOGOUT_REASONS,
  PROJECT_KEYLESS_APPLICATION_ENTRY_POINTS,
  PROJECT_KEYLESS_APPLICATION_ENTRY_POINTS_IN_PROJECT_CONTEXT,
  STATIC_URL_PATHS,
  isProjectKeylessApplicationEntryPoint,
  isProjectKeylessApplicationEntryPointInProjectContext,
} from '@commercetools-frontend/constants';
import type { TAsyncLocaleDataProps } from '@commercetools-frontend/i18n';
import {
  AsyncLocaleData,
  mapLocaleToIntlLocale,
} from '@commercetools-frontend/i18n';
import { NotificationsList } from '@commercetools-frontend/react-notifications';
import {
  reportErrorToSentry,
  SentryUserTracker,
} from '@commercetools-frontend/sentry';
import { DIMENSIONS, NAVBAR } from '../../constants';
import { TFetchLoggedInUserQuery } from '../../types/generated/mc';
import {
  getPreviousProjectKey,
  PERFORMANCE_MARKS,
  selectProjectKeyInContext,
} from '../../utils';
import AppBar from '../app-bar';
import ApplicationEntryPoint from '../application-entry-point';
import ApplicationLoader from '../application-loader';
import { getBrowserLocale } from '../application-shell-provider/utils';
import ApplicationShellSplitter from '../application-shell-splitter/application-shell-splitter.async';
import ConfigureIntlProvider from '../configure-intl-provider';
import ErrorApologizer from '../error-apologizer';
import FetchProject from '../fetch-project';
import FetchUser from '../fetch-user';
import NavBar from '../navbar';
import PerformanceMark from '../performance-mark';
import ProjectContainer from '../project-container';
import RedirectToLogout from '../redirect-to-logout';
import RedirectToProjectCreate from '../redirect-to-project-create';
import RequestsInFlightLoader from '../requests-in-flight-loader';
import RouteCatchAll from '../route-catch-all';
import SetupFlopFlipProvider from '../setup-flop-flip-provider';
import ThemeSwitcher from '../theme-switcher';

type TApplicationShellAuthenticationProps = {
  featureFlags?: TFlags;
  defaultFeatureFlags?: TFlags;
  applicationMessages: TAsyncLocaleDataProps['applicationMessages'];
  onMenuItemClick?: (event: SyntheticEvent<HTMLAnchorElement>) => void;
  disableRoutePermissionCheck?: boolean;
  render?: () => JSX.Element;
  children?: ReactNode;
};

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
  grid-column: 2/3;
  grid-row: 3/4;

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

/**
 * This component is rendered whenever the user is considered "authenticated"
 * and contains the "restricted" application part.
 */

export const ApplicationShellAuthenticated = (
  props: TApplicationShellAuthenticationProps
) => {
  const applicationEnvironment = useApplicationContext(
    (context) => context.environment
  ) as TApplicationContext<{}>['environment'];
  // TODO: using this hook will subscribe the component to route updates.
  // This is currently useful for detecting a change in the project key
  // from URL ("/" --> "/:projectKey").
  // However, every route change will trigger a re-render. This is probably
  // ok-ish but we might want to look into a more performant solution.
  const location = useLocation();

  const notificationsGlobalRef = useRef<HTMLDivElement>(null);
  const notificationsPageRef = useRef<HTMLDivElement>(null);
  const layoutRefs = useRef<{
    notificationsGlobalRef: RefObject<HTMLDivElement | null>;
    notificationsPageRef: RefObject<HTMLDivElement | null>;
  }>({
    notificationsGlobalRef,
    notificationsPageRef,
  });

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
                | (typeof LOGOUT_REASONS)[keyof typeof LOGOUT_REASONS]
                | undefined;
              if (hasUnauthorizedError)
                logoutReason = LOGOUT_REASONS.UNAUTHORIZED;
              else if (hasUserBeenDeletedError)
                logoutReason = LOGOUT_REASONS.DELETED;
              return <RedirectToLogout reason={logoutReason} />;
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

        // Check if user is ct staff, and if so get language selected via staff bar from local storage
        const staffBarLanguage =
          user?.launchdarklyTrackingGroup === 'commercetools' ||
          user?.launchdarklyTrackingGroup === 'mailosaur'
            ? selectUserLanguageFromStorage()
            : undefined;

        const normalizedUser: TFetchLoggedInUserQuery['user'] | undefined = user
          ? {
              ...user,
              // set the staff bar language if applicable
              language: staffBarLanguage ?? user.language,
            }
          : undefined;

        const projectKeyInContext = selectProjectKeyInContext({
          pathname: location.pathname,
          defaultProjectKeyOfUser:
            normalizedUser?.defaultProjectKey ?? undefined,
        });

        return (
          <ApplicationContextProvider
            user={normalizedUser}
            environment={applicationEnvironment}
          >
            {/*
            NOTE: we do not want to load the locale data as long as we do not
            know the user setting. This is important in order to avoid flashing
            of translated content on subsequent re-renders.
            Therefore, as long as there is no locale, the children should consider using the
            `isLoading` prop to decide what to render.
          */}
            <AsyncLocaleData
              // Parse-time hint so the catalogue load does not wait on
              // `FetchLoggedInUser`. `user.language` replaces it on arrival.
              locale={normalizedUser?.language ?? getBrowserLocale(window)}
              applicationMessages={props.applicationMessages}
            >
              {({ isLoading: isLoadingLocaleData, locale, messages }) => (
                <ConfigureIntlProvider
                  // Not before the locale data is loaded, and not before the
                  // user is known: an early locale fires `hideAppLoader` and
                  // swaps the skeleton for a spinner.
                  {...(isLoadingLocaleData || isLoadingUser
                    ? {}
                    : { locale, messages })}
                >
                  {/* Marked here rather than inside the `ConfigureIntlProvider`
                  implementation, because that component also renders on the
                  unauthenticated, Custom View and error surfaces. */}
                  <PerformanceMark mark={PERFORMANCE_MARKS.INTL_READY} />
                  {normalizedUser?.language ? (
                    <PerformanceMark
                      mark={
                        mapLocaleToIntlLocale(getBrowserLocale(window)) ===
                        mapLocaleToIntlLocale(normalizedUser.language)
                          ? PERFORMANCE_MARKS.LOCALE_HINT_HIT
                          : PERFORMANCE_MARKS.LOCALE_HINT_MISS
                      }
                    />
                  ) : null}
                  <SetupFlopFlipProvider
                    user={normalizedUser}
                    projectKey={projectKeyInContext}
                    ldClientSideId={applicationEnvironment.ldClientSideId}
                    flags={props.featureFlags}
                    defaultFlags={props.defaultFeatureFlags}
                  >
                    <ApplicationShellSplitter locale={locale ?? 'en'}>
                      {/* The splitter's Suspense fallback renders these same
                      children, so this mark is written on the fallback pass and
                      does not wait for the lazy chunk to download. */}
                      <PerformanceMark
                        mark={PERFORMANCE_MARKS.SHELL_CHROME_MOUNTED}
                      />
                      <ThemeSwitcher />
                      {/* NOTE: the requests in flight loader will render a loading
                      spinner into the AppBar. */}
                      <RequestsInFlightLoader />
                      <SentryUserTracker user={normalizedUser} />
                      <div
                        css={css`
                          height: 100vh;
                          display: grid;
                          grid-template-rows: auto ${DIMENSIONS.header} 1fr;
                          grid-template-columns: min-content 1fr;
                        `}
                      >
                        <div
                          ref={notificationsGlobalRef}
                          role="region"
                          aria-live="polite"
                          css={css`
                            grid-row: 1;
                            grid-column: 1/3;
                          `}
                        >
                          <div id="above-top-navigation" />
                          <NotificationsList domain={DOMAINS.GLOBAL} />
                        </div>

                        <header
                          css={css`
                            grid-row: '2/3';
                            grid-column: '2/3';
                          `}
                        >
                          <AppBar
                            user={normalizedUser}
                            projectKey={projectKeyInContext}
                          />
                        </header>

                        <aside
                          css={css`
                            grid-column: 1/2;
                            grid-row: 2/4;
                            overflow: hidden;
                          `}
                        >
                          {(() => {
                            // The <NavBar> should only be rendered within a project
                            // context, therefore when there is a `projectKey`.
                            // On `/account` routes there is none, so we don't render it.
                            // NOTE: for paths that run in a project context without
                            // carrying the `projectKey` in the URL (e.g. `/agent-sphere`),
                            // the key is resolved from the previously used project.
                            if (!projectKeyInContext) return null;
                            return (
                              <FetchProject projectKey={projectKeyInContext}>
                                {({ isLoading: isLoadingProject, project }) => {
                                  const isLoading =
                                    isLoadingUser ||
                                    isLoadingLocaleData ||
                                    isLoadingProject ||
                                    !locale ||
                                    !project;

                                  return (
                                    <ApplicationContextProvider
                                      user={normalizedUser}
                                      environment={applicationEnvironment}
                                      // NOTE: do not pass the `project` into the application context.
                                      // The permissions for the Navbar are resolved separately, within
                                      // a different React context.
                                    >
                                      <NavBar
                                        applicationLocale={locale}
                                        projectKey={projectKeyInContext}
                                        project={project}
                                        environment={applicationEnvironment}
                                        onMenuItemClick={props.onMenuItemClick}
                                        isLoading={isLoading}
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
                            <PerformanceMark
                              mark={PERFORMANCE_MARKS.CONTENT_RENDERED}
                            />
                            <div ref={notificationsPageRef}>
                              <NotificationsList domain={DOMAINS.PAGE} />
                            </div>
                            <NotificationsList domain={DOMAINS.SIDE} />
                            <div
                              css={css`
                                flex-grow: 1;
                                display: flex;
                                flex-direction: column;
                                position: relative;

                                /*
                                This is only necessary because we have an intermediary <div> wrapping the
                                <View> component that is used to wrap every content-view. This intermediary
                                <div> is solely used for adding the tracking context to the content-view.
                                However, this could be done by passing the tracking context to the <View>
                                and let it do the layout, so we can avoid laying our from the outside as we
                                do here.
                              */
                                > *:not(:first-of-type) {
                                  flex-grow: 1;
                                  display: flex;
                                  flex-direction: column;
                                }
                              `}
                            >
                              <PortalsContainer
                                // @ts-ignore
                                ref={layoutRefs}
                                offsetTop={DIMENSIONS.header}
                                offsetLeft={
                                  projectKeyInContext
                                    ? NAVBAR.widthLeftNavigation
                                    : '0px'
                                }
                                offsetLeftOnExpandedMenu={
                                  projectKeyInContext
                                    ? NAVBAR.widthLeftNavigationWhenExpanded
                                    : '0px'
                                }
                              />
                              <Switch>
                                <Route
                                  path="/profile"
                                  render={() => (
                                    <Redirect
                                      to={`/${STATIC_URL_PATHS.ACCOUNT}/profile`}
                                    />
                                  )}
                                />

                                <Route
                                  path={PROJECT_KEYLESS_APPLICATION_ENTRY_POINTS.filter(
                                    (entryPointUriPath) =>
                                      !isProjectKeylessApplicationEntryPointInProjectContext(
                                        entryPointUriPath
                                      )
                                  ).map(
                                    (entryPointUriPath) =>
                                      `/${entryPointUriPath}`
                                  )}
                                >
                                  {
                                    /**
                                     * In case the AppShell uses the `render` function, we assume it's one of two cases:
                                     * 1. The application does not use `children` and therefore implements the routes including
                                     * the <RouteCatchAll> (this is the "legacy" behavior).
                                     * 2. It's the account application, which always uses `render` and therefore should render as normal.
                                     *
                                     * In case the AppShell uses the `children` function, we can always assume that
                                     * it's a normal Custom Application and that it should trigger a force reload.
                                     */
                                    props.render ? (
                                      <>{props.render()}</>
                                    ) : (
                                      <RouteCatchAll />
                                    )
                                  }
                                </Route>
                                <Route
                                  path={PROJECT_KEYLESS_APPLICATION_ENTRY_POINTS_IN_PROJECT_CONTEXT.map(
                                    (entryPointUriPath) =>
                                      `/${entryPointUriPath}`
                                  )}
                                >
                                  {isProjectKeylessApplicationEntryPointInProjectContext(
                                    applicationEnvironment.entryPointUriPath
                                  ) ? (
                                    <ApplicationEntryPoint
                                      environment={applicationEnvironment}
                                      // There is no project in ApplicationContext on this
                                      // path, so the default View-permission check cannot
                                      // succeed. Access is gated in the app via a user flag.
                                      disableRoutePermissionCheck
                                      render={props.render}
                                    >
                                      {props.children}
                                    </ApplicationEntryPoint>
                                  ) : props.render ? (
                                    /**
                                     * Same as `/account`: a `render` app implements its own
                                     * catch-all. A `children` Custom Application must reload
                                     * so the proxy can hand the request to agent-sphere.
                                     */
                                    <>{props.render()}</>
                                  ) : (
                                    <RouteCatchAll />
                                  )}
                                </Route>
                                {/* Project routes */}
                                <Route exact={true} path="/">
                                  {(() => {
                                    const entryPointUriPath =
                                      applicationEnvironment.entryPointUriPath;
                                    const previousProjectKey =
                                      getPreviousProjectKey(
                                        normalizedUser?.defaultProjectKey ??
                                          undefined
                                      );

                                    /**
                                     * NOTE:
                                     *   Given the application does not run on a `/:projectKey` route
                                     *   (e.g. `agent-sphere`), the application redirects to its own
                                     *   entry point instead of to a project.
                                     *   Given the user has not been loaded a loading spinner is shown.
                                     *   Given the user was not working on a project previously nor has a default
                                     *   project, the user will be prompted to create one.
                                     *   Given the user was working on a project previously or has a default
                                     *   project, the application will redirect to that project.
                                     */
                                    if (
                                      isProjectKeylessApplicationEntryPoint(
                                        entryPointUriPath
                                      )
                                    ) {
                                      return (
                                        <Redirect
                                          to={`/${entryPointUriPath}`}
                                        />
                                      );
                                    }
                                    if (!normalizedUser)
                                      return <ApplicationLoader />;
                                    if (!previousProjectKey)
                                      return <RedirectToProjectCreate />;
                                    return (
                                      <Redirect to={`/${previousProjectKey}`} />
                                    );
                                  })()}
                                </Route>
                                <Route exact={false} path="/:projectKey">
                                  <ProjectContainer
                                    user={normalizedUser}
                                    environment={applicationEnvironment}
                                    disableRoutePermissionCheck={
                                      props.disableRoutePermissionCheck
                                    }
                                    // This effectively renders the
                                    // children, which is the application
                                    // specific part
                                    render={props.render}
                                  >
                                    {props.children}
                                  </ProjectContainer>
                                </Route>
                              </Switch>
                            </div>
                          </MainContainer>
                        )}
                      </div>
                    </ApplicationShellSplitter>
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
ApplicationShellAuthenticated.displayName = 'ApplicationShellAuthenticated';

export default ApplicationShellAuthenticated;
