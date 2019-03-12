import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider as ReduxProvider } from 'react-redux';
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
  redirectTo = targetUrl => window.location.replace(targetUrl);
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
                     * TODO: do a hard page reload once we move the login routes
                     * to a different app.
                     */}
                    <Route
                      path="/logout"
                      render={() => {
                        const frontendHost = this.props.environment
                          .servedByProxy
                          ? window.location.origin
                          : this.props.environment.frontendHost;

                        this.redirectTo(`${frontendHost}/logout}`);
                      }}
                    />
                    <Route
                      render={() => (
                        <Authenticated>
                          {({ isAuthenticated }) => {
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
                        </Authenticated>
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
