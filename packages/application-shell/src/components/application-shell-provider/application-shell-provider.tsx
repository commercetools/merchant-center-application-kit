import '../../track-performance';
import { Suspense, useEffect, useMemo } from 'react';
import { ApolloClient, type NormalizedCacheObject } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { Provider as ReduxProvider } from 'react-redux';
import { Router } from 'react-router-dom';
import {
  ApplicationContextProvider,
  type TApplicationContext,
} from '@commercetools-frontend/application-shell-connectors';
import history from '@commercetools-frontend/browser-history';
import type { TAsyncLocaleDataProps } from '@commercetools-frontend/i18n';
import { AsyncLocaleData } from '@commercetools-frontend/i18n';
import createApolloClient from '../../configure-apollo';
import internalReduxStore from '../../configure-store';
import { setCachedApolloClient } from '../../utils/apollo-client-runtime-cache';
import type { TrackingList } from '../../utils/gtm';
import ApplicationLoader from '../application-loader';
import ApplicationPageTitle from '../application-page-title';
import Authenticated from '../authenticated';
import ConfigureIntlProvider from '../configure-intl-provider';
import ErrorBoundary from '../error-boundary';
import GtmBooter from '../gtm-booter';
import useCoercedEnvironmentValues from './use-coerced-environment-values';
import { getBrowserLocale } from './utils';

type TApplicationShellProviderProps = {
  apolloClient?: ApolloClient<NormalizedCacheObject>;
  environment: TApplicationContext<{}>['environment'];
  trackingEventList?: TrackingList;
  applicationMessages: TAsyncLocaleDataProps['applicationMessages'];
  children: (args: { isAuthenticated: boolean }) => JSX.Element;
};

const ApplicationShellProvider = (props: TApplicationShellProviderProps) => {
  const apolloClient = useMemo(
    () => props.apolloClient ?? createApolloClient(),
    [props.apolloClient]
  );
  useEffect(() => {
    setCachedApolloClient(apolloClient);
  }, [apolloClient]);
  const coercedEnvironmentValues = useCoercedEnvironmentValues(
    props.environment
  );
  const browserLocale = getBrowserLocale(window);
  return (
    <Suspense fallback={<ApplicationLoader />}>
      <ErrorBoundary>
        <ApplicationContextProvider environment={coercedEnvironmentValues}>
          <ReduxProvider store={internalReduxStore}>
            <ApolloProvider client={apolloClient}>
              <Router history={ApplicationShellProvider.history}>
                <GtmBooter trackingEventList={props.trackingEventList || {}}>
                  <ApplicationPageTitle />
                  <Authenticated
                    locale={browserLocale}
                    applicationMessages={props.applicationMessages}
                    render={({ isAuthenticated }) => {
                      if (isAuthenticated)
                        return props.children({ isAuthenticated });

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
            </ApolloProvider>
          </ReduxProvider>
        </ApplicationContextProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

ApplicationShellProvider.displayName = 'ApplicationShellProvider';
// This is useful to inject a custom history object during tests
ApplicationShellProvider.history = history;

export default ApplicationShellProvider;
