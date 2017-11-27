import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import apolloClient from '../../configure-apollo';
import Authenticated from '../authenticated';
import LocaleProvider from '../locale-provider';
import AppBar from '../app-bar';
import ProjectContainer from '../project-container';

export default class ApplicationShell extends React.PureComponent {
  static displayName = 'ApplicationShell';
  static propTypes = {
    i18n: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
  };
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <Router>
          <Switch>
            {/* Public routes */}
            <Route
              path="/login"
              render={() => (
                <LocaleProvider i18n={this.props.i18n}>
                  <div>{'LOGIN PAGE'}</div>
                </LocaleProvider>
              )}
            />

            {/* Protected routes */}
            <Route
              render={() => (
                <Authenticated>
                  <LocaleProvider i18n={this.props.i18n}>
                    <div>
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
                          component={ProjectContainer}
                        />
                        <Route render={() => <div>{'Another route'}</div>} />
                      </Switch>
                    </div>
                  </LocaleProvider>
                </Authenticated>
              )}
            />
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }
}
