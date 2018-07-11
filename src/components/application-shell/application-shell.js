import React from 'react';
import PropTypes from 'prop-types';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ReconfigureFlopFlip } from '@flopflip/react-broadcast';
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
import PortalsContainer from '../portals-container';
import apolloClient from '../../configure-apollo';
import FetchUser from '../fetch-user';
import WithProjectKey from '../with-project-key';
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
import NavBar from '../navbar';
import ApplicationLoader from '../application-loader';
import AsyncLocaleMessages from '../async-locale-messages';
import ErrorApologizer from '../error-apologizer';
import styles from './application-shell.mod.css';
import './global-style-imports';

const getBrowserLocale = () =>
  (window && window.navigator && window.navigator.language) || 'en';

export const extractLanguageFromLocale = locale =>
  locale.includes('-') ? locale.split('-')[0] : locale;

/**
 * This component is rendered whenever the user is considered "authenticated"
 * and contains the "restricted" application part.
 */

const RestrictedInnerApplication = props => {
  if (props.error) {
    reportErrorToSentry(props.error, {});
    return (
      <ConfigureIntlProvider locale={props.locale} messages={props.messages}>
        <ErrorApologizer />
      </ConfigureIntlProvider>
    );
  }
  return (
    <ConfigureIntlProvider
      /* We need to pass the value as `undefined` in case the user has no
           * timeZone defined so the defaultProps in the Context.Provider kick in
           */
      timeZone={
        props.user && props.user.timeZone ? props.user.timeZone : undefined
      }
      locale={props.locale && props.locale}
      messages={props.messages && props.messages}
    >
      <SetupFlopFlipProvider
        user={props.user}
        defaultFlags={props.defaultFeatureFlags}
      >
        <React.Fragment>
          {/* NOTE: the requests in flight loader will render a loading
            spinner into the AppBar. */}
          <RequestsInFlightLoader />
          <SentryUserTracker user={props.user} />
          <GtmUserTracker user={props.user} />
          <div className={styles['app-layout']}>
            <div className={styles['global-notifications']}>
              <NotificationsList domain={DOMAINS.GLOBAL} />
            </div>
            <header>
              <AppBar user={props.user} />
            </header>

            <aside>
              <WithProjectKey
                user={props.user}
                render={({ projectKey }) => (
                  <NavBar
                    projectKey={projectKey}
                    useFullRedirectsForLinks={
                      props.INTERNAL__isApplicationFallback
                    }
                  />
                )}
              />
            </aside>

            {/**
             * NOTE: in IE11 main can't be a grid-child apparently.
             * So we have to use a div and give it the role `main`
             * to achieve the same semantic result
             */}
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
                      <Redirect to={joinPaths(match.url, 'dashboard')} />
                    )}
                  />
                  <Route
                    exact={true}
                    path="/"
                    render={() =>
                      props.user ? (
                        <WithProjectKey
                          user={props.user}
                          render={({ projectKey }) => (
                            // Redirect to the given projectKey
                            <Redirect to={`/${projectKey}`} />
                          )}
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
                          isLoadingUser={props.isLoading}
                          user={props.user}
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
          </div>
        </React.Fragment>
      </SetupFlopFlipProvider>
    </ConfigureIntlProvider>
  );
};

RestrictedInnerApplication.displayName = 'RestrictedInnerApplication';
RestrictedInnerApplication.propTypes = {
  error: PropTypes.object,
  user: PropTypes.object,
  messages: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  defaultFeatureFlags: PropTypes.object,
  render: PropTypes.func.isRequired,
  INTERNAL__isApplicationFallback: PropTypes.bool.isRequired,
};

export const RestrictedApplication = props => (
  <FetchUser>
    {({ isLoading, user, error }) => {
      // TODO: inspect the error in case we want to be more specific
      // about the error message and give detailed instructions.

      if (isLoading) {
        return null;
      }

      const locale = error
        ? extractLanguageFromLocale(getBrowserLocale())
        : user.language;

      return (
        <AsyncLocaleMessages locale={locale} loadIntl={props.loadIntl}>
          {({ messages }) => (
            <RestrictedInnerApplication
              isLoading={isLoading}
              user={user}
              error={error}
              messages={messages}
              locale={locale}
              {...props}
            />
          )}
        </AsyncLocaleMessages>
      );
    }}
  </FetchUser>
);

RestrictedApplication.displayName = 'RestrictedOuterApplication';
RestrictedApplication.propTypes = {
  loadIntl: PropTypes.shape({
    de: PropTypes.func.isRequired,
    en: PropTypes.func.isRequired,
    es: PropTypes.func.isRequired,
  }).isRequired,
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
    loadIntl: PropTypes.shape({
      de: PropTypes.func.isRequired,
      en: PropTypes.func.isRequired,
      es: PropTypes.func.isRequired,
    }).isRequired,
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
                                loadIntl={this.props.loadIntl}
                                render={this.props.render}
                                INTERNAL__isApplicationFallback={
                                  this.props.INTERNAL__isApplicationFallback
                                }
                              />
                            );
                          const browserLocale = getBrowserLocale();
                          const language = extractLanguageFromLocale(
                            browserLocale
                          );

                          return (
                            <AsyncLocaleMessages
                              locale={browserLocale}
                              loadIntl={this.props.loadIntl}
                            >
                              {({ messages }) => (
                                <ConfigureIntlProvider
                                  locale={language}
                                  messages={messages}
                                >
                                  <UnrestrictedApplication />
                                </ConfigureIntlProvider>
                              )}
                            </AsyncLocaleMessages>
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
