import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';
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
import { getBrowserLocale, mergeMessages } from './utils';

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
                  <Authenticated
                    render={({ isAuthenticated }) => {
                      if (isAuthenticated)
                        return this.props.children({ isAuthenticated });

                      const browserLocale = getBrowserLocale(window);
                      return (
                        <AsyncLocaleData
                          locale={browserLocale}
                          applicationMessages={this.props.applicationMessages}
                        >
                          {({ locale, messages }) => (
                            <ConfigureIntlProvider
                              locale={locale}
                              messages={mergeMessages(
                                messages,
                                AsyncLocaleData.getMessagesForLocale(
                                  uikitMessages
                                )
                              )}
                            >
                              {this.props.children({ isAuthenticated })}
                            </ConfigureIntlProvider>
                          )}
                        </AsyncLocaleData>
                      );
                    }}
                  />
                </GtmBooter>
              </Router>
            </React.Suspense>
          </ApolloProvider>
        </ReduxProvider>
      </ApplicationContextProvider>
    );
  }
}
