import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ConfigurationProvider } from '@commercetools-local/core/components/configuration';
import { DOMAINS } from '@commercetools-local/constants';
import NotificationsList from '../notifications-list';
import apolloClient from '../../configure-apollo';
import Authenticated from '../authenticated';
import ConfigureIntlProvider from '../configure-intl-provider';
import AppBar from '../app-bar';
import ProjectContainer from '../project-container';
import RedirectToProject from '../redirect-to-project';
import Login from '../login';
import LoginSSO from '../login-sso';
import LoginSSOCallback from '../login-sso-callback';
import Logout from '../logout';
import SetupFlopFlipProvider from '../setup-flop-flip-provider';
import UserProfile from '../user-profile';
import IntercomUrlTracker from '../intercom-url-tracker';
import IntercomUserTracker from '../intercom-user-tracker';
import IntercomBooter from '../intercom-booter';
import SentryBooter from '../sentry-booter';
import SentryUserTracker from '../sentry-user-tracker';
import VersionCheckSubscriber from '../version-check-subscriber';
import GtmUserTracker from '../gtm-user-tracker';
import GtmBooter from '../gtm-booter';

export default class ApplicationShell extends React.Component {
  static displayName = 'ApplicationShell';
  static propTypes = {
    i18n: PropTypes.object.isRequired,
    configuration: PropTypes.object.isRequired,
    menuItems: PropTypes.array.isRequired,
    trackingEventWhitelist: PropTypes.objectOf(PropTypes.string).isRequired,
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
  };
  render() {
    return (
      <ConfigurationProvider configuration={this.props.configuration}>
        <ApolloProvider client={apolloClient}>
          <ConfigureIntlProvider i18n={this.props.i18n}>
            <React.Fragment>
              <VersionCheckSubscriber />
              <SentryBooter />
              <Router>
                <IntercomUrlTracker>
                  <GtmBooter
                    trackingEventWhitelist={this.props.trackingEventWhitelist}
                  >
                    <Switch>
                      {/* Public routes */}
                      <Route
                        path="/login/sso/callback"
                        component={LoginSSOCallback}
                      />
                      <Route path="/login/sso" component={LoginSSO} />
                      <Route path="/login" component={Login} />
                      <Route path="/logout" component={Logout} />

                      {/* Protected routes */}
                      <Route
                        render={() => (
                          <Authenticated>
                            {/* TODO make logout redirect explicit */}
                            <IntercomBooter />
                            <SentryUserTracker />
                            <GtmUserTracker />
                            <SetupFlopFlipProvider>
                              <NotificationsList
                                domain={DOMAINS.GLOBAL}
                                notifications={
                                  this.props.notificationsByDomain.global
                                }
                                mapPluginNotificationToComponent={
                                  this.props.mapPluginNotificationToComponent
                                }
                              />
                              <AppBar />

                              <NotificationsList
                                domain={DOMAINS.SIDE}
                                notifications={
                                  this.props.notificationsByDomain.side
                                }
                                mapPluginNotificationToComponent={
                                  this.props.mapPluginNotificationToComponent
                                }
                              />
                              <Switch>
                                {/* Non-project routes */}
                                <Route
                                  path="/profile"
                                  render={() => (
                                    <React.Fragment>
                                      <IntercomUserTracker />
                                      <NotificationsList
                                        domain={DOMAINS.PAGE}
                                        notifications={
                                          this.props.notificationsByDomain
                                            .page
                                        }
                                        mapPluginNotificationToComponent={
                                          this.props
                                            .mapPluginNotificationToComponent
                                        }
                                      />
                                      <UserProfile
                                        showNotification={
                                          this.props.showNotification
                                        }
                                        showUnexpectedErrorNotification={
                                          this.props
                                            .showUnexpectedErrorNotification
                                        }
                                      />
                                    </React.Fragment>
                                  )}
                                />
                                <Route
                                  path="/organizations"
                                  render={() => (
                                    <React.Fragment>
                                      <IntercomUserTracker />
                                      <NotificationsList
                                        domain={DOMAINS.PAGE}
                                        notifications={
                                          this.props.notificationsByDomain
                                            .page
                                        }
                                        mapPluginNotificationToComponent={
                                          this.props
                                            .mapPluginNotificationToComponent
                                        }
                                      />
                                      {'ORGS VIEW'}
                                    </React.Fragment>
                                  )}
                                />

                                {/* Project routes */}
                                <Route
                                  path="/:projectKey"
                                  render={routerProps => (
                                    <SetupFlopFlipProvider
                                      projectKey={
                                        routerProps.match.params.projectKey
                                      }
                                    >
                                      <ProjectContainer
                                        {...routerProps}
                                        menuItems={this.props.menuItems}
                                        render={() => (
                                          <React.Fragment>
                                            <IntercomUserTracker
                                              projectKey={
                                                routerProps.match.params
                                                  .projectKey
                                              }
                                            />
                                            <NotificationsList
                                              domain={DOMAINS.PAGE}
                                              notifications={
                                                this.props
                                                  .notificationsByDomain.page
                                              }
                                              mapPluginNotificationToComponent={
                                                this.props
                                                  .mapPluginNotificationToComponent
                                              }
                                            />
                                            {this.props.render()}
                                          </React.Fragment>
                                        )}
                                      />
                                    </SetupFlopFlipProvider>
                                  )}
                                />
                                <Route
                                  path="/"
                                  component={RedirectToProject}
                                />
                              </Switch>
                            </SetupFlopFlipProvider>
                          </Authenticated>
                        )}
                      />
                    </Switch>
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
