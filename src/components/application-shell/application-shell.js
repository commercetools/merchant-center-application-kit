import React from 'react';
import PropTypes from 'prop-types';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ReconfigureFlopFlip } from '@flopflip/react-broadcast';
import { ConfigurationProvider } from '@commercetools-local/core/components/configuration';
import { joinPaths } from '@commercetools-local/utils/url';
import * as storage from '@commercetools-local/utils/storage';
import { DOMAINS, LOGOUT_REASONS } from '@commercetools-local/constants';
import PortalsContainer from '@commercetools-local/core/components/portals-container';
import history from '@commercetools-local/browser-history';
import { reportErrorToSentry } from '@commercetools-local/sentry';
import NotificationsList from '../notifications-list';
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
import AsyncUserProfile from '../user-profile/async';
import IntercomUrlTracker from '../intercom-url-tracker';
import IntercomUserTracker from '../intercom-user-tracker';
import IntercomBooter from '../intercom-booter';
import SentryUserTracker from '../sentry-user-tracker';
// import VersionCheckSubscriber from '../version-check-subscriber';
import RequestsInFlightLoader from '../requests-in-flight-loader';
import GtmUserTracker from '../gtm-user-tracker';
import GtmBooter from '../gtm-booter';
import NavBar from '../navbar';
import ApplicationLoader from '../application-loader';
import ErrorApologizer from '../error-apologizer';
import styles from './application-shell.mod.css';
import './global-style-imports';

const getBrowserLocale = () =>
  (window && window.navigator && window.navigator.language) || 'en';

/**
 * This component is rendered whenever the user is considered "authenticated"
 * and contains the "restricted" application part.
 */
export const RestrictedApplication = props => (
  <FetchUser>
    {({ isLoading, user, error }) => {
      // TODO: inspect the error in case we want to be more specific
      // about the error message and give detailed instructions.
      if (error) {
        reportErrorToSentry(error, {});
        const browserLocale = getBrowserLocale();
        return (
          <ConfigureIntlProvider
            locale={browserLocale}
            messages={props.i18n[browserLocale]}
          >
            <ErrorApologizer />
          </ConfigureIntlProvider>
        );
      }
      return (
        <ConfigureIntlProvider
          timeZone={user && user.timeZone}
          locale={user && user.language}
          messages={user && props.i18n[user.language]}
        >
          <SetupFlopFlipProvider user={user}>
            <React.Fragment>
              {/* NOTE: the requests in flight loader will render a loading
            spinner into the AppBar. */}
              <RequestsInFlightLoader />
              <IntercomBooter
                intercomTrackingStatus={user && user.tracking_intercom}
                showNotification={props.showNotification}
              />
              <SentryUserTracker user={user} />
              <GtmUserTracker user={user} />
              <IntercomUserTracker user={user} />
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
                  <AppBar user={user} />
                </header>

                <aside>
                  <WithProjectKey
                    user={user}
                    render={({ projectKey }) => (
                      <NavBar
                        menuItems={props.menuItems}
                        projectKey={projectKey}
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
                  <div className={styles.content}>
                    <Switch>
                      <Redirect from="/profile" to="/account/profile" />
                      <Route
                        path="/account"
                        render={({ match }) => (
                          <Switch>
                            <Route
                              path={`${match.path}/profile`}
                              render={() => (
                                <AsyncUserProfile
                                  user={user}
                                  showNotification={props.showNotification}
                                  showApiErrorNotification={
                                    props.showApiErrorNotification
                                  }
                                />
                              )}
                            />
                            <Redirect to={joinPaths(match.url, 'profile')} />
                          </Switch>
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
                        exact={true}
                        path="/"
                        render={() =>
                          user ? (
                            <WithProjectKey
                              user={user}
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
                            <IntercomUserTracker
                              user={user}
                              projectKey={routerProps.match.params.projectKey}
                            />
                            <ReconfigureFlopFlip
                              user={getFlopflipReconfiguration(
                                routerProps.match.params.projectKey
                              )}
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
    }}
  </FetchUser>
);
RestrictedApplication.displayName = 'RestrictedApplication';
RestrictedApplication.propTypes = {
  i18n: PropTypes.object.isRequired,
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
    onRegisterErrorListeners: PropTypes.func.isRequired,
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
              <IntercomUrlTracker>
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
                                  i18n={this.props.i18n}
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
                              );
                            const browserLocale = getBrowserLocale();
                            return (
                              <ConfigureIntlProvider
                                locale={browserLocale}
                                messages={this.props.i18n[browserLocale]}
                              >
                                <UnrestrictedApplication />
                              </ConfigureIntlProvider>
                            );
                          }}
                        </Authenticated>
                      )}
                    />
                  </Switch>
                </GtmBooter>
              </IntercomUrlTracker>
            </Router>
          </React.Fragment>
        </ApolloProvider>
      </ConfigurationProvider>
    );
  }
}
