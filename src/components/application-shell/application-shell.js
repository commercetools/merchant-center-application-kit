import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ConfigurationProvider } from '@commercetools-local/core/components/configuration';
import { DOMAIN_DOM_IDS, DOMAINS } from '@commercetools-local/constants';
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

export default class ApplicationShell extends React.Component {
  static displayName = 'ApplicationShell';
  static propTypes = {
    i18n: PropTypes.object.isRequired,
    configuration: PropTypes.object.isRequired,
    menuItems: PropTypes.array.isRequired,
    render: PropTypes.func.isRequired,
  };
  render() {
    return (
      <ConfigurationProvider configuration={this.props.configuration}>
        <ApolloProvider client={apolloClient}>
          <ConfigureIntlProvider i18n={this.props.i18n}>
            <Router>
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
                      <SetupFlopFlipProvider>
                        <div id={DOMAIN_DOM_IDS[DOMAINS.GLOBAL]} />
                        <AppBar />

                        <div>
                          <div id={DOMAIN_DOM_IDS[DOMAINS.SIDE]} />
                          <Switch>
                            {/* Non-project routes */}
                            <Route
                              path="/profile"
                              render={() => (
                                <div>
                                  <div id={DOMAIN_DOM_IDS[DOMAINS.PAGE]} />
                                  {'PROFILE VIEW'}
                                </div>
                              )}
                            />
                            <Route
                              path="/organizations"
                              render={() => (
                                <div>
                                  <div id={DOMAIN_DOM_IDS[DOMAINS.PAGE]} />
                                  {'ORGS VIEW'}
                                </div>
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
                                    render={(...args) => (
                                      <React.Fragment>
                                        <div
                                          id={DOMAIN_DOM_IDS[DOMAINS.PAGE]}
                                        />
                                        {this.props.render(...args)}
                                      </React.Fragment>
                                    )}
                                  />
                                </SetupFlopFlipProvider>
                              )}
                            />
                            <Route path="/" component={RedirectToProject} />
                          </Switch>
                        </div>
                      </SetupFlopFlipProvider>
                    </Authenticated>
                  )}
                />
              </Switch>
            </Router>
          </ConfigureIntlProvider>
        </ApolloProvider>
      </ConfigurationProvider>
    );
  }
}
