import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { ApolloProvider } from 'react-apollo';
import apolloClient from '../../configure-apollo';
import Authenticated from '../authenticated';
import AppBar from '../app-bar';
import ProjectContainer from '../project-container';

const ProtectedRoutes = () => (
  <Authenticated>
    <AppBar />

    <Switch>
      {/* Non-project routes */}
      <Route path="/profile" render={() => <div>{'PROFILE VIEW'}</div>} />
      <Route path="/organizations" render={() => <div>{'ORGS VIEW'}</div>} />

      {/* Project routes */}
      <Route path="/:projectKey" component={ProjectContainer} />
      <Route render={() => <div>{'Another route'}</div>} />
    </Switch>
  </Authenticated>
);
ProtectedRoutes.displayName = 'ProtectedRoutes';

export default class ApplicationShell extends React.PureComponent {
  static displayName = 'ApplicationShell';
  static propTypes = {
    i18n: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
  };
  render() {
    /**
     * TODO: fix locale value for <IntlProvider>.
     *
     * The `locale` comes from the `user`. However the user is only
     * fetched if the route is protected.
     * I guess we have two options:
     *
     * 1. render <IntlProvider> in the public routes with a "hardcoded" locale
     * (maybe even guess it from the user's browser). Then render a separate
     * <IntlProvider> in protected routes, wrapped to a <WithUser>.
     *
     * 2. have a <WithIntlProvider> component that keeps a state of a locale,
     * which might be the default, and updates it with a setter function which
     * is called by a child component after the user has been loaded.
     *
     * @emmenko: I prefer more the first one, it's a bit verbose but simpler
     */

    return (
      <IntlProvider locale={'en'} messages={this.props.i18n.en}>
        <ApolloProvider client={apolloClient}>
          <Router>
            <Switch>
              {/* Public routes */}
              <Route path="/login" render={() => <div>{'LOGIN PAGE'}</div>} />

              {/* Protected routes */}
              <Route component={ProtectedRoutes} />
            </Switch>
          </Router>
        </ApolloProvider>
      </IntlProvider>
    );
  }
}
