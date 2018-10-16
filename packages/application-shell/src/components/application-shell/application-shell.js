import React from 'react';
import PropTypes from 'prop-types';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import omit from 'lodash.omit';
import { ReconfigureFlopFlip, ToggleFeature } from '@flopflip/react-broadcast';
import { joinPaths } from '@commercetools-frontend/url-utils';
import * as storage from '@commercetools-frontend/storage';
import { DOMAINS, LOGOUT_REASONS } from '@commercetools-frontend/constants';
import history from '@commercetools-frontend/browser-history';
import {
  reportErrorToSentry,
  SentryUserTracker,
} from '@commercetools-frontend/sentry';
import { ConfigurationProvider } from '@commercetools-frontend/application-shell-connectors';
import { NotificationsList } from '@commercetools-frontend/react-notifications';
import AsyncLocaleData from '@commercetools-frontend/i18n/async-locale-data';
import getSupportedLanguage from '@commercetools-frontend/l10n/utils/get-supported-language';
import { i18n } from '@commercetools-frontend/ui-kit';
import ProjectDataLocale from '../project-data-locale';
import PortalsContainer from '../portals-container';
import apolloClient from '../../configure-apollo';
import FetchUser from '../fetch-user';
import FetchProject from '../fetch-project';
import ConfigureIntlProvider from '../configure-intl-provider';
import Authenticated from '../authenticated';
import AppBar from '../app-bar';
import ProjectContainer from '../project-container';
import AsyncLogin from '../login/async';
import AsyncLoginSSO from '../login-sso/async';
import AsyncLoginSSOCallback from '../login-sso-callback/async';
import AsyncLoginLocked from '../login-locked/async';
import Logout from '../logout';
import SetupFlopFlipProvider, {
  getFlopflipReconfiguration,
} from '../setup-flop-flip-provider';
// import VersionCheckSubscriber from '../version-check-subscriber';
import RequestsInFlightLoader from '../requests-in-flight-loader';
import GtmUserTracker from '../gtm-user-tracker';
import GtmBooter from '../gtm-booter';
import NavBar, { LoadingNavBar } from '../navbar';
import ApplicationLoader from '../application-loader';
import ErrorApologizer from '../error-apologizer';
import {
  selectProjectKeyFromLocalStorage,
  selectProjectKeyFromUrl,
} from '../../utils';
import styles from './application-shell.mod.css';
import './global-style-imports';
import QuickAccess from '../quick-access';
import { QUICK_ACCESS } from '../../feature-toggles';

export const getBrowserLanguage = window => {
  const language = window && window.navigator && window.navigator.language;
  return getSupportedLanguage(language);
};

export const extractLanguageFromLocale = locale =>
  locale.includes('-') ? locale.split('-')[0] : locale;

export const mergeMessages = (...messages) => Object.assign({}, ...messages);

/**
 * This component is rendered whenever the user is considered "authenticated"
 * and contains the "restricted" application part.
 */

export const RestrictedApplication = props => (
  <FetchUser>
    {({ isLoading: isLoadingUser, user, error }) => {
      // TODO: inspect the error in case we want to be more specific
      // about the error message and give detailed instructions.

      if (error) {
        // Since we do not know the locale of the user, we pick it from the
        // user's browser to attempt to match the language for the correct translations.
        const userLocale = getBrowserLanguage(window);
        return (
          <AsyncLocaleData locale={userLocale}>
            {({ language, messages }) => {
              reportErrorToSentry(error, {});
              return (
                <ConfigureIntlProvider
                  language={language}
                  messages={mergeMessages(
                    messages,
                    i18n[language],
                    props.applicationMessages[language]
                  )}
                >
                  <ErrorApologizer />
                </ConfigureIntlProvider>
              );
            }}
          </AsyncLocaleData>
        );
      }

      return (
        // NOTE: we do not want to load the locale data as long as we do not
        // know the user setting. This is important in order to avoid flashing
        // of translated content on subsequent re-renders.
        // Therefore, as long as there is no locale, the children should consider
        // using the `isLoading` prop to decide what to render.
        <AsyncLocaleData locale={user && user.language}>
          {({ isLoading: isLoadingLocaleData, language, messages }) => (
            <ConfigureIntlProvider
              // We do not want to pass the language as long as the locale data
              // is not loaded.
              {...(isLoadingLocaleData
                ? {}
                : {
                    // We need to pass the value as `undefined` in case the user
                    // has no `timeZone` defined so the `defaultProps` in the
                    // `<Context.Provider>` kick in.
                    timeZone: user && user.timeZone ? user.timeZone : undefined,
                    language,
                    messages: mergeMessages(
                      messages,
                      i18n[language],
                      props.applicationMessages[language]
                    ),
                  })}
            >
              <SetupFlopFlipProvider
                user={user}
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

                    <ToggleFeature flag={QUICK_ACCESS}>
                      <Route
                        render={routeProps => {
                          const projectKey = selectProjectKeyFromUrl();
                          if (!projectKey)
                            return (
                              <QuickAccess
                                history={routeProps.history}
                                user={user}
                              />
                            );
                          return (
                            <FetchProject projectKey={projectKey}>
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
                                    />
                                  );
                                return (
                                  <ProjectDataLocale
                                    locales={project.languages}
                                  >
                                    {({ locale, setProjectDataLocale }) => (
                                      <QuickAccess
                                        project={project}
                                        projectDataLocale={locale}
                                        onChangeProjectDataLocale={
                                          setProjectDataLocale
                                        }
                                        history={routeProps.history}
                                        user={user}
                                      />
                                    )}
                                  </ProjectDataLocale>
                                );
                              }}
                            </FetchProject>
                          );
                        }}
                      />
                    </ToggleFeature>

                    <header>
                      <AppBar user={user} />
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
                        const projectKeyFromUrl = selectProjectKeyFromUrl();
                        if (!projectKeyFromUrl) return null;
                        return (
                          <FetchProject projectKey={projectKeyFromUrl}>
                            {({ isLoading: isLoadingProject, project }) => {
                              // Render the loading navbar as long as all the data
                              // hasn't been loaded.
                              if (
                                isLoadingUser ||
                                isLoadingLocaleData ||
                                isLoadingProject
                              )
                                return <LoadingNavBar />;

                              const projectPermissions = project
                                ? omit(project.permissions, ['__typename'])
                                : {};
                              return (
                                <NavBar
                                  applicationLanguage={language}
                                  projectKey={projectKeyFromUrl}
                                  projectPermissions={projectPermissions}
                                  useFullRedirectsForLinks={
                                    props.INTERNAL__isApplicationFallback
                                  }
                                />
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
                            {/* Redirect from base project route to dashboard */}
                            <Route
                              exact={true}
                              path="/:projectKey"
                              render={({ match }) => (
                                <Redirect
                                  to={joinPaths(match.url, 'dashboard')}
                                />
                              )}
                            />
                            <Route
                              exact={true}
                              path="/"
                              render={() =>
                                user ? (
                                  // This is the only case where we need to look into localStorage
                                  // to attempt to get the previously known `projectKey`.
                                  // If none is found, we use the `defaultProjectKey` set by the API.
                                  <Redirect
                                    to={`/${selectProjectKeyFromLocalStorage() ||
                                      user.defaultProjectKey}`}
                                  />
                                ) : (
                                  <ApplicationLoader />
                                )
                              }
                            />
                            <Route
                              exact={false}
                              path="/:projectKey"
                              render={routerProps => (
                                <React.Fragment>
                                  <ReconfigureFlopFlip
                                    user={getFlopflipReconfiguration(
                                      routerProps.match.params.projectKey
                                    )}
                                  />
                                  <ProjectContainer
                                    user={user}
                                    match={routerProps.match}
                                    location={routerProps.location}
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
      );
    }}
  </FetchUser>
);

RestrictedApplication.displayName = 'RestrictedApplication';
RestrictedApplication.propTypes = {
  defaultFeatureFlags: PropTypes.object,
  render: PropTypes.func.isRequired,
  applicationMessages: PropTypes.object.isRequired,
  INTERNAL__isApplicationFallback: PropTypes.bool.isRequired,
};

/**
 * This component is rendered whenever the user is not considered "authenticated"
 * and contains application parts that can be accessed publicly.
 */
export const UnrestrictedApplication = () => (
  <Switch>
    {/* Public routes */}
    <Route path="/login/sso/callback" component={AsyncLoginSSOCallback} />
    <Route path="/login/sso" component={AsyncLoginSSO} />
    <Route path="/login/locked" component={AsyncLoginLocked} />
    <Route path="/login" component={AsyncLogin} />
    <Route
      render={({ location }) => {
        // If the user tries to access a route (e.g. `/my-project/orders`)
        // and he's not logged in, we will be redirected to the login page
        // as usual but as soon as he logs in, he'll be redirected to the
        // location that he tried to access before. This is handled by the
        // query parameter `redirectTo`.
        const searchQuery = {
          reason: LOGOUT_REASONS.UNAUTHORIZED,
          // This will be used after being logged in,
          // to redirect to this location.
          ...(location.pathname === '/'
            ? {}
            : { redirectTo: location.pathname }),
        };
        return (
          <Redirect
            to={{
              pathname: '/login',
              query: searchQuery,
            }}
          />
        );
      }}
    />
  </Switch>
);

UnrestrictedApplication.displayName = 'UnrestrictedApplication';

export default class ApplicationShell extends React.Component {
  static displayName = 'ApplicationShell';
  static propTypes = {
    configuration: PropTypes.object.isRequired,
    defaultFeatureFlags: PropTypes.object,
    trackingEventWhitelist: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.objectOf(PropTypes.string),
      ]).isRequired
    ),
    render: PropTypes.func.isRequired,
    onRegisterErrorListeners: PropTypes.func.isRequired,
    applicationMessages: PropTypes.object.isRequired,
    // Internal usage only, does not need to be documented
    INTERNAL__isApplicationFallback: PropTypes.bool,
  };
  static defaultProps = {
    trackingEventWhitelist: {},
    INTERNAL__isApplicationFallback: false,
  };
  componentDidMount() {
    this.props.onRegisterErrorListeners();
    // NOTE: this is a temporary thingy, to ensure we clear the `token`
    // from localStorage.
    storage.remove('token');
  }
  render() {
    return (
      <ConfigurationProvider configuration={this.props.configuration}>
        <ApolloProvider client={apolloClient}>
          <React.Fragment>
            {/* <VersionCheckSubscriber /> */}
            <Router history={history}>
              <GtmBooter
                trackingEventWhitelist={this.props.trackingEventWhitelist}
              >
                <Switch>
                  {/**
                   * No matter if the user is authenticated or not, when we go
                   * to this route we should always log the user out.
                   */}
                  <Route path="/logout" component={Logout} />
                  <Route
                    render={() => (
                      <Authenticated>
                        {({ isAuthenticated }) => {
                          if (isAuthenticated)
                            return (
                              <RestrictedApplication
                                defaultFeatureFlags={
                                  this.props.defaultFeatureFlags
                                }
                                render={this.props.render}
                                applicationMessages={
                                  this.props.applicationMessages
                                }
                                INTERNAL__isApplicationFallback={
                                  this.props.INTERNAL__isApplicationFallback
                                }
                              />
                            );
                          const browserLanguage = getBrowserLanguage(window);

                          return (
                            <AsyncLocaleData locale={browserLanguage}>
                              {({ language, messages }) => (
                                <ConfigureIntlProvider
                                  language={language}
                                  messages={mergeMessages(
                                    messages,
                                    i18n[language],
                                    this.props.applicationMessages[language]
                                  )}
                                >
                                  <UnrestrictedApplication />
                                </ConfigureIntlProvider>
                              )}
                            </AsyncLocaleData>
                          );
                        }}
                      </Authenticated>
                    )}
                  />
                </Switch>
              </GtmBooter>
            </Router>
          </React.Fragment>
        </ApolloProvider>
      </ConfigurationProvider>
    );
  }
}
