import type { TApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import type { TAsyncLocaleDataProps } from '@commercetools-frontend/i18n';
import type { TrackingList } from '../../utils/gtm';

import './global-style-imports';
import '../../track-performance';
import React from 'react';
import { Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client/react';
import { Provider as ReduxProvider } from 'react-redux';
import history from '@commercetools-frontend/browser-history';
import { ApplicationContextProvider } from '@commercetools-frontend/application-shell-connectors';
import { AsyncLocaleData } from '@commercetools-frontend/i18n';
import internalReduxStore from '../../configure-store';
import apolloClient from '../../configure-apollo';
import ConfigureIntlProvider from '../configure-intl-provider';
import Authenticated from '../authenticated';
import GtmBooter from '../gtm-booter';
import ApplicationLoader from '../application-loader';
import ErrorBoundary from '../error-boundary';
import { getBrowserLocale } from './utils';
import useCoercedEnvironmentValues from './use-coerced-environment-values';

type Props<AdditionalEnvironmentProperties extends {}> = {
  environment: TApplicationContext<
    AdditionalEnvironmentProperties
  >['environment'];
  trackingEventList?: TrackingList;
  applicationMessages: TAsyncLocaleDataProps['applicationMessages'];
  children: (args: { isAuthenticated: boolean }) => JSX.Element;
};

const ApplicationShellProvider = <AdditionalEnvironmentProperties extends {}>(
  props: Props<AdditionalEnvironmentProperties>
) => {
  const coercedEnvironmentValues = useCoercedEnvironmentValues<
    AdditionalEnvironmentProperties
  >(props.environment);
  return (
    <ErrorBoundary>
      <ApplicationContextProvider<AdditionalEnvironmentProperties>
        environment={coercedEnvironmentValues}
      >
        <ReduxProvider store={internalReduxStore}>
          <ApolloProvider client={ApplicationShellProvider.apolloClient}>
            <React.Suspense fallback={<ApplicationLoader />}>
              <Router history={ApplicationShellProvider.history}>
                <GtmBooter trackingEventList={props.trackingEventList || {}}>
                  <Authenticated
                    render={({ isAuthenticated }) => {
                      if (isAuthenticated)
                        return props.children({ isAuthenticated });

                      const browserLocale = getBrowserLocale(window);
                      return (
                        <AsyncLocaleData
                          locale={browserLocale}
                          applicationMessages={props.applicationMessages}
                        >
                          {({ locale, messages }) => (
                            <ConfigureIntlProvider
                              locale={locale}
                              messages={messages}
                            >
                              {props.children({ isAuthenticated })}
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
    </ErrorBoundary>
  );
};

ApplicationShellProvider.displayName = 'ApplicationShellProvider';
// This is useful to inject a custom history object during tests
ApplicationShellProvider.history = history;
ApplicationShellProvider.apolloClient = apolloClient;

export default ApplicationShellProvider;
