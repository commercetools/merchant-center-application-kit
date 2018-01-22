import querystring from 'querystring';
import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ConfigurationProvider } from '@commercetools-local/core/components/configuration';
import { joinPaths } from '@commercetools-local/utils/url';
import {
  DOMAINS,
  LOGOUT_REASONS,
  STORAGE_KEYS as CORE_STORAGE_KEYS,
} from '@commercetools-local/constants';
import * as storage from '@commercetools-local/utils/storage';
import NotificationsList from '../notifications-list';
import apolloClient from '../../configure-apollo';
import FetchUser from '../fetch-user';
import ConfigureIntlProvider from '../configure-intl-provider';
import Authenticated from '../authenticated';
import AppBar from '../app-bar';
import ProjectContainer from '../project-container';
import RedirectToProject from '../redirect-to-project';
import AsyncLogin from '../login/async';
import AsyncLoginSSO from '../login-sso/async';
import AsyncLoginSSOCallback from '../login-sso-callback/async';
import AsyncLoginLocked from '../login-locked/async';
import Logout from '../logout';
import SetupFlopFlipProvider from '../setup-flop-flip-provider';
import AsyncUserProfile from '../user-profile/async';
import IntercomUrlTracker from '../intercom-url-tracker';
import IntercomUserTracker from '../intercom-user-tracker';
import IntercomBooter from '../intercom-booter';
import SentryBooter from '../sentry-booter';
import SentryUserTracker from '../sentry-user-tracker';
import VersionCheckSubscriber from '../version-check-subscriber';
import RequestsInFlightLoader from '../requests-in-flight-loader';
import GtmUserTracker from '../gtm-user-tracker';
import GtmBooter from '../gtm-booter';
import NavBar from '../navbar';
import styles from './application-shell.mod.css';
import './global-style-imports';

/**
 * This component is rendered whenever the user is considered "authenticated"
 * and contains the "restricted" application part.
 */
export const RestrictedApplication = props => (
  <FetchUser>
    {({ isLoading, user }) => (
      <React.Fragment>
        <IntercomBooter
          intercomTrackingStatus={user && user.tracking_intercom}
          showNotification={props.showNotification}
        />
        <SentryUserTracker user={user} />
        <GtmUserTracker user={user} />
        <IntercomUserTracker user={user} />
        <SetupFlopFlipProvider isLoading={isLoading} user={user}>
          <div className={styles['app-layout']}>
            <div className={styles['global-notifications']}>
              <NotificationsList
                domain={DOMAINS.GLOBAL}
                notifications={props.notificationsByDomain.global}
                mapPluginNotificationToComponent={
                  props.mapPluginNotificationToComponent
                }
                showUnexpectedErrorNotification={
                  props.showUnexpectedErrorNotification
                }
              />
            </div>
            <header>
              <AppBar isLoading={isLoading} user={user} />
            </header>

            <aside>
              <Route
                path="/:projectKey"
                render={({ location, match }) => (
                  <NavBar
                    location={location}
                    menuItems={props.menuItems}
                    projectKey={match.params.projectKey}
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
              <NotificationsList
                domain={DOMAINS.PAGE}
                notifications={props.notificationsByDomain.page}
                mapPluginNotificationToComponent={
                  props.mapPluginNotificationToComponent
                }
              />
              <NotificationsList
                domain={DOMAINS.SIDE}
                notifications={props.notificationsByDomain.side}
                mapPluginNotificationToComponent={
                  props.mapPluginNotificationToComponent
                }
              />
              <Switch>
                {/* When the user is redirected to /logout he is still logged in
              and thus wer are still in the `authenticated` branch.
              The component won't render anything. It will unauthenticate
              the user and redirect him to /login. */}
                <Route path="/logout" component={Logout} />
                <Route
                  path="/profile"
                  render={() => (
                    <AsyncUserProfile
                      userData={{ isLoading, user }}
                      showNotification={props.showNotification}
                      showUnexpectedErrorNotification={
                        props.showUnexpectedErrorNotification
                      }
                    />
                  )}
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
                  exact={false}
                  path="/:projectKey"
                  render={routerProps => (
                    <SetupFlopFlipProvider
                      isLoading={isLoading}
                      user={user}
                      projectKey={routerProps.match.params.projectKey}
                    >
                      <IntercomUserTracker
                        user={user}
                        projectKey={routerProps.match.params.projectKey}
                      />
                      <ProjectContainer
                        isLoadingUser={isLoading}
                        user={user}
                        match={routerProps.match}
                        location={routerProps.location}
                        // This effectively renders the
                        // children, which is the application
                        // specific part
                        render={props.render}
                      />
                    </SetupFlopFlipProvider>
                  )}
                />
                <Route path="/" component={RedirectToProject} />
              </Switch>
            </div>
          </div>
        </SetupFlopFlipProvider>
      </React.Fragment>
    )}
  </FetchUser>
);
RestrictedApplication.displayName = 'RestrictedApplication';
RestrictedApplication.propTypes = {
  render: PropTypes.func.isRequired,
  menuItems: PropTypes.array.isRequired,
  notificationsByDomain: PropTypes.shape({
    global: PropTypes.array.isRequired,
    page: PropTypes.array.isRequired,
    side: PropTypes.array.isRequired,
  }).isRequired,
  showNotification: PropTypes.func.isRequired,
  mapPluginNotificationToComponent: PropTypes.func,
  showApiErrorNotification: PropTypes.func,
  showUnexpectedErrorNotification: PropTypes.func,
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
        const searchQuery = querystring.stringify({
          reason: LOGOUT_REASONS.UNAUTHORIZED,
          // This will be used after being logged in,
          // to redirect to this location.
          ...(location.pathname === '/'
            ? {}
            : { redirectTo: location.pathname }),
        });
        return (
          <Redirect
            to={{
              pathname: '/login',
              search: `?${searchQuery}`,
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
    i18n: PropTypes.object.isRequired,
    configuration: PropTypes.object.isRequired,
    menuItems: PropTypes.array.isRequired,
    trackingEventWhitelist: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.objectOf(PropTypes.string),
      ])
    ).isRequired,
    render: PropTypes.func.isRequired,
    notificationsByDomain: PropTypes.shape({
      global: PropTypes.array.isRequired,
      page: PropTypes.array.isRequired,
      side: PropTypes.array.isRequired,
    }).isRequired,
    showNotification: PropTypes.func.isRequired,
    mapPluginNotificationToComponent: PropTypes.func,
    showApiErrorNotification: PropTypes.func,
    showUnexpectedErrorNotification: PropTypes.func,
    onRegisterGlobalErrorListeners: PropTypes.func.isRequired,
  };
  isAuthenticated = Boolean(storage.get(CORE_STORAGE_KEYS.TOKEN));
  componentDidMount() {
    this.props.onRegisterGlobalErrorListeners();
  }
  componentWillReceiveProps() {
    this.isAuthenticated = Boolean(storage.get(CORE_STORAGE_KEYS.TOKEN));
  }
  render() {
    return (
      <ConfigurationProvider configuration={this.props.configuration}>
        <ApolloProvider client={apolloClient}>
          <ConfigureIntlProvider i18n={this.props.i18n}>
            <React.Fragment>
              <VersionCheckSubscriber />
              <SentryBooter />
              {/* NOTE: this can be removed when we get rid of showing a
              loading spinner in the app bar */}
              <RequestsInFlightLoader />
              <Router>
                <IntercomUrlTracker>
                  <GtmBooter
                    trackingEventWhitelist={this.props.trackingEventWhitelist}
                  >
                    <Authenticated>
                      {({ isAuthenticated }) =>
                        isAuthenticated ? (
                          <RestrictedApplication
                            render={this.props.render}
                            menuItems={this.props.menuItems}
                            notificationsByDomain={
                              this.props.notificationsByDomain
                            }
                            showNotification={this.props.showNotification}
                            mapPluginNotificationToComponent={
                              this.props.mapPluginNotificationToComponent
                            }
                            showApiErrorNotification={
                              this.props.showApiErrorNotification
                            }
                            showUnexpectedErrorNotification={
                              this.props.showUnexpectedErrorNotification
                            }
                          />
                        ) : (
                          <UnrestrictedApplication />
                        )
                      }
                    </Authenticated>
                  </GtmBooter>
                </IntercomUrlTracker>
              </Router>
            </React.Fragment>
          </ConfigureIntlProvider>
        </ApolloProvider>
      </ConfigurationProvider>
    );
  }
}
