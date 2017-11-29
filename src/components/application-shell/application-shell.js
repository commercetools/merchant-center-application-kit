import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
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

export default class ApplicationShell extends React.PureComponent {
  static displayName = 'ApplicationShell';
  static propTypes = {
    i18n: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
  };
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <ConfigureIntlProvider i18n={this.props.i18n}>
          <Router>
            <Switch>
              {/* Public routes */}
              <Route path="/login/sso/callback" component={LoginSSOCallback} />
              <Route path="/login/sso" component={LoginSSO} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />

              {/* Protected routes */}
              <Route
                render={() => (
                  <Authenticated>
                    <AppBar />

                    <Switch>
                      {/* Non-project routes */}
                      <Route
                        path="/profile"
                        render={() => <div>{'PROFILE VIEW'}</div>}
                      />
                      <Route
                        path="/organizations"
                        render={() => <div>{'ORGS VIEW'}</div>}
                      />

                      {/* Project routes */}
                      <Route
                        path="/:projectKey"
                        render={routerProps => (
                          <ProjectContainer {...routerProps}>
                            {this.props.children}
                          </ProjectContainer>
                        )}
                      />
                      <Route path="/" component={RedirectToProject} />
                    </Switch>
                  </Authenticated>
                )}
              />
            </Switch>
          </Router>
        </ConfigureIntlProvider>
      </ApolloProvider>
    );
  }
}
