import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { defaultMemoize } from 'reselect';
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
import FetchProject from '../fetch-project';
import ConfigureIntlProvider from '../configure-intl-provider';
import AppBar from '../app-bar';
import ProjectContainer from '../project-container';
import SetupFlopFlipProvider from '../setup-flop-flip-provider';
import RequestsInFlightLoader from '../requests-in-flight-loader';
import GtmUserTracker from '../gtm-user-tracker';
import NavBar, { LoadingNavBar } from '../navbar';
import ApplicationLoader from '../application-loader';
import ErrorApologizer from '../error-apologizer';
import Redirector from '../redirector';
import { selectProjectKeyFromUrl, getPreviousProjectKey } from '../../utils';
import styles from './application-shell.mod.css';
import QuickAccess from '../quick-access';

/**
 * This component is rendered whenever the user is considered "authenticated"
 * and contains the "restricted" application part.
 */

export const RestrictedApplication = props => (
  <FetchUser>
    {({ isLoading: isLoadingUser, user, error }) => {
      if (error) {
        // In case there is an unauthorized error, we redirect to the login page
        if (error.graphQLErrors && Array.isArray(error.graphQLErrors)) {
          const hasUnauthorizedError = error.graphQLErrors.find(
            gqlError =>
              gqlError.extensions &&
              gqlError.extensions.code &&
              gqlError.extensions.code === 'UNAUTHENTICATED'
          );
          if (hasUnauthorizedError) {
            return (
              <Redirector
                to="logout"
                environment={props.environment}
                queryParams={{
                  reason: LOGOUT_REASONS.UNAUTHORIZED,
                }}
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

      const projectKeyFromUrl = selectProjectKeyFromUrl();

      return (
        <ApplicationContextProvider user={user} environment={props.environment}>
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
                  defaultFlags={props.defaultFeatureFlags}
                >
                  <React.Fragment>
                    {/* NOTE: the requests in flight loader will render a loading
                      spinner into the AppBar. */}
                    <RequestsInFlightLoader />
                    <SentryUserTracker user={user} />
                    <GtmUserTracker user={user} />
                    <div className={styles['app-layout']}>
                      <div className={styles['global-notifications']}>
                        <NotificationsList domain={DOMAINS.GLOBAL} />
                      </div>

                      <Route
                        render={routeProps => {
                          if (!projectKeyFromUrl)
                            return (
                              <QuickAccess
                                history={routeProps.history}
                                user={user}
                              />
                            );
                          return (
                            <FetchProject projectKey={projectKeyFromUrl}>
                              {({ isLoading: isProjectLoading, project }) => {
                                if (isProjectLoading) return null;

                                // when used outside of a project context,
                                // or when the project is expired or supsended
                                const useProjectContext =
                                  project &&
                                  !(
                                    project.suspension?.isActive ||
                                    project.expiry?.isActive
                                  );

                                if (!useProjectContext)
                                  return (
                                    <QuickAccess
                                      history={routeProps.history}
                                      user={user}
                                      environment={props.environment}
                                    />
                                  );
                                return (
                                  <ProjectDataLocale
                                    locales={project.languages}
                                  >
                                    {({
                                      locale: dataLocale,
                                      setProjectDataLocale,
                                    }) => (
                                      <ApplicationContextProvider
                                        user={user}
                                        project={project}
                                        projectDataLocale={dataLocale}
                                        environment={props.environment}
                                      >
                                        <QuickAccess
                                          project={project}
                                          projectDataLocale={dataLocale}
                                          onChangeProjectDataLocale={
                                            setProjectDataLocale
                                          }
                                          history={routeProps.history}
                                          user={user}
                                          environment={props.environment}
                                        />
                                      </ApplicationContextProvider>
                                    )}
                                  </ProjectDataLocale>
                                );
                              }}
                            </FetchProject>
                          );
                        }}
                      />

                      <header>
                        <AppBar
                          user={user}
                          projectKeyFromUrl={projectKeyFromUrl}
                          environment={props.environment}
                          DEV_ONLY__loadAppbarMenuConfig={
                            props.DEV_ONLY__loadAppbarMenuConfig
                          }
                        />
                      </header>

                      <aside>
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
                                  !project
                                )
                                  return <LoadingNavBar />;

                                return (
                                  <ApplicationContextProvider
                                    user={user}
                                    project={project}
                                    environment={props.environment}
                                  >
                                    <NavBar
                                      applicationLocale={locale}
                                      projectKey={projectKeyFromUrl}
                                      menuVisibilities={
                                        project.menuVisibilities
                                      }
                                      environment={props.environment}
                                      DEV_ONLY__loadNavbarMenuConfig={
                                        props.DEV_ONLY__loadNavbarMenuConfig
                                      }
                                    />
                                  </ApplicationContextProvider>
                                );
                              }}
                            </FetchProject>
                          );
                        })()}
                      </aside>

                      {/**
                       * NOTE: in IE11 main can't be a grid-child apparently.
                       * So we have to use a div and give it the role `main`
                       * to achieve the same semantic result
                       */}
                      {isLoadingUser || isLoadingLocaleData ? (
                        <div role="main" className={styles.main}>
                          <ApplicationLoader />
                        </div>
                      ) : (
                        <div role="main" className={styles.main}>
                          <PortalsContainer />
                          <NotificationsList domain={DOMAINS.PAGE} />
                          <NotificationsList domain={DOMAINS.SIDE} />
                          <div className={styles.content}>
                            <Switch>
                              <Redirect from="/profile" to="/account/profile" />
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

                                  if (!user) return <ApplicationLoader />;

                                  // NOTE: Given no previous `projectKey` is found,
                                  // we redirect to the base url.
                                  return (
                                    <Redirect
                                      to={`/${previousProjectKey || ''}`}
                                    />
                                  );
                                }}
                              />
                              <Route
                                exact={false}
                                path="/:projectKey"
                                render={routerProps => (
                                  <React.Fragment>
                                    <ProjectContainer
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
                        </div>
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

RestrictedApplication.displayName = 'RestrictedApplication';
RestrictedApplication.propTypes = {
  environment: PropTypes.object.isRequired,
  defaultFeatureFlags: PropTypes.object,
  render: PropTypes.func.isRequired,
  applicationMessages: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    .isRequired,
  DEV_ONLY__loadAppbarMenuConfig: PropTypes.func,
  DEV_ONLY__loadNavbarMenuConfig: PropTypes.func,
};

const isBooleanAsString = environmentValue =>
  environmentValue === 'true' || environmentValue === 'false';

const shallowlyCoerceBooleanValues = defaultMemoize(
  uncoercedEnvironmentValues =>
    Object.keys(uncoercedEnvironmentValues).reduce(
      (coercedEnvironmentValues, key) => {
        const uncoercedEnvironmentValue = uncoercedEnvironmentValues[key];
        return {
          ...coercedEnvironmentValues,
          [key]: isBooleanAsString(uncoercedEnvironmentValue)
            ? uncoercedEnvironmentValue === 'true'
            : uncoercedEnvironmentValue,
        };
      },
      {}
    )
);

export default class ApplicationShell extends React.Component {
  static displayName = 'ApplicationShell';
  static propTypes = {
    environment: PropTypes.object.isRequired,
    defaultFeatureFlags: PropTypes.object,
    trackingEventWhitelist: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.objectOf(PropTypes.string),
      ]).isRequired
    ),
    render: PropTypes.func.isRequired,
    onRegisterErrorListeners: PropTypes.func.isRequired,
    applicationMessages: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
      .isRequired,
    // Only available in development mode
    DEV_ONLY__loadAppbarMenuConfig: PropTypes.func,
    DEV_ONLY__loadNavbarMenuConfig: PropTypes.func,
  };
  static defaultProps = {
    trackingEventWhitelist: {},
  };
  redirectTo = targetUrl => window.location.replace(targetUrl);
  componentDidMount() {
    this.props.onRegisterErrorListeners({
      dispatch: internalReduxStore.dispatch,
    });
  }
  render() {
    const coercedEnvironmentValues = shallowlyCoerceBooleanValues(
      this.props.environment
    );
    return (
      <ApplicationShellProvider
        environment={coercedEnvironmentValues}
        trackingEventWhitelist={this.props.trackingEventWhitelist}
        applicationMessages={this.props.applicationMessages}
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
                      environment={coercedEnvironmentValues}
                      queryParams={{
                        reason: LOGOUT_REASONS.USER,
                        ...(coercedEnvironmentValues.servedByProxy
                          ? {}
                          : {
                              // This will be used after being logged in,
                              // to redirect to this location.
                              redirectTo: window.location.origin,
                            }),
                      }}
                    />
                  )}
                />
                <Route
                  render={() => (
                    <RestrictedApplication
                      environment={coercedEnvironmentValues}
                      defaultFeatureFlags={this.props.defaultFeatureFlags}
                      render={this.props.render}
                      applicationMessages={this.props.applicationMessages}
                      DEV_ONLY__loadAppbarMenuConfig={
                        this.props.DEV_ONLY__loadAppbarMenuConfig
                      }
                      DEV_ONLY__loadNavbarMenuConfig={
                        this.props.DEV_ONLY__loadNavbarMenuConfig
                      }
                    />
                  )}
                />
              </Switch>
            );

          return (
            <Route
              render={({ location }) => (
                <Redirector
                  to="login"
                  location={location}
                  environment={coercedEnvironmentValues}
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
    );
  }
}
