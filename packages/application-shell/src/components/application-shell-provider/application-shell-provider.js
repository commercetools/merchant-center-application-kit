import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider as ReduxProvider } from 'react-redux';
import { encode } from 'qss';
import { LOGOUT_REASONS } from '@commercetools-frontend/constants';
import history from '@commercetools-frontend/browser-history';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { ApplicationContextProvider } from '@commercetools-frontend/application-shell-connectors';
import { AsyncLocaleData } from '@commercetools-frontend/i18n';
import { i18n as uikitMessages } from '@commercetools-frontend/ui-kit';
import internalReduxStore from '../../configure-store';
import apolloClient from '../../configure-apollo';
import ConfigureIntlProvider from '../configure-intl-provider';
import Authenticated from '../authenticated';
import GtmBooter from '../gtm-booter';
import ApplicationLoader from '../application-loader';
import ErrorApologizer from '../error-apologizer';
import './global-style-imports';
import { getBrowserLanguage, mergeMessages } from './utils';

class LogoutRedirector extends React.PureComponent {
  static displayName = 'LogoutRedirector';
  static propTypes = {
    environment: PropTypes.shape({
      servedByProxy: PropTypes.bool.isRequired,
      mcAuthUrl: PropTypes.string.isRequired,
    }).isRequired,
  };
  redirectTo = targetUrl => window.location.replace(targetUrl);
  componentDidMount() {
    const authUrl = this.props.environment.servedByProxy
      ? window.location.origin
      : this.props.environment.mcAuthUrl;
    const searchQuery = {
      reason: LOGOUT_REASONS.USER,
      ...(this.props.environment.servedByProxy
        ? {}
        : {
            // This will be used after being logged in,
            // to redirect to this location.
            redirectTo: window.location.origin,
          }),
    };
    this.redirectTo(`${authUrl}/logout?${encode(searchQuery)}`);
  }
  render() {
    return null;
  }
}

export default class ApplicationShellProvider extends React.Component {
  static displayName = 'ApplicationShellProvider';
  static propTypes = {
    environment: PropTypes.object.isRequired,
    trackingEventWhitelist: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.objectOf(PropTypes.string),
      ]).isRequired
    ),
    applicationMessages: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
      .isRequired,
    children: PropTypes.func.isRequired,
  };
  static defaultProps = {
    trackingEventWhitelist: {},
  };
  state = {
    hasError: false,
  };
  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    // Note: In development mode componentDidCatch is not based on try-catch
    // to catch exceptions. Thus exceptions caught here will also be caught in
    // the global `error` event listener (setup-global-error-listener.js).
    // see: https://github.com/facebook/react/issues/10474
    reportErrorToSentry(error, { extra: errorInfo });
  }
  render() {
    if (this.state.hasError) {
      return <ErrorApologizer />;
    }

    return (
      <ApplicationContextProvider environment={this.props.environment}>
        <ReduxProvider store={internalReduxStore}>
          <ApolloProvider client={apolloClient}>
            <React.Suspense fallback={<ApplicationLoader />}>
              <Router history={history}>
                <GtmBooter
                  trackingEventWhitelist={this.props.trackingEventWhitelist}
                >
                  <Switch>
                    {/**
                     * No matter if the user is authenticated or not, when we go
                     * to this route we should always log the user out.
                     */}
                    <Route
                      path="/logout"
                      render={() => (
                        <LogoutRedirector
                          environment={this.props.environment}
                        />
                      )}
                    />
                    <Route
                      render={() => (
                        <Authenticated
                          render={({ isAuthenticated }) => {
                            if (isAuthenticated)
                              return this.props.children({ isAuthenticated });

                            const browserLanguage = getBrowserLanguage(window);
                            return (
                              <AsyncLocaleData
                                locale={browserLanguage}
                                applicationMessages={
                                  this.props.applicationMessages
                                }
                              >
                                {({ language, messages }) => (
                                  <ConfigureIntlProvider
                                    language={language}
                                    messages={mergeMessages(
                                      messages,
                                      uikitMessages[language]
                                    )}
                                  >
                                    {this.props.children({ isAuthenticated })}
                                  </ConfigureIntlProvider>
                                )}
                              </AsyncLocaleData>
                            );
                          }}
                        />
                      )}
                    />
                  </Switch>
                </GtmBooter>
              </Router>
            </React.Suspense>
          </ApolloProvider>
        </ReduxProvider>
      </ApplicationContextProvider>
    );
  }
}
