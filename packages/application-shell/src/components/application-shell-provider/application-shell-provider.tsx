import type { NormalizedCacheObject } from '@apollo/client';
import type { TApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import type { TAsyncLocaleDataProps } from '@commercetools-frontend/i18n';
import type { TrackingList } from '../../utils/gtm';

import '../../track-performance';
import { Suspense, useEffect, useMemo } from 'react';
import { Router } from 'react-router-dom';
import { ApolloClient } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { Provider as ReduxProvider } from 'react-redux';
import history from '@commercetools-frontend/browser-history';
import { ApplicationContextProvider } from '@commercetools-frontend/application-shell-connectors';
import { AsyncLocaleData } from '@commercetools-frontend/i18n';
import { setCachedApolloClient } from '../../utils/apollo-client-runtime-cache';
import createApolloClient from '../../configure-apollo';
import internalReduxStore from '../../configure-store';
import ConfigureIntlProvider from '../configure-intl-provider';
import Authenticated from '../authenticated';
import GtmBooter from '../gtm-booter';
import ApplicationLoader from '../application-loader';
import ErrorBoundary from '../error-boundary';
import GlobalStyles from './global-styles';
import { getBrowserLocale } from './utils';
import useCoercedEnvironmentValues from './use-coerced-environment-values';
import ApplicationPageTitle from '../application-page-title';

type Props<AdditionalEnvironmentProperties extends {}> = {
  apolloClient?: ApolloClient<NormalizedCacheObject>;
  environment: TApplicationContext<AdditionalEnvironmentProperties>['environment'];
  trackingEventList?: TrackingList;
  applicationMessages: TAsyncLocaleDataProps['applicationMessages'];
  children: (args: { isAuthenticated: boolean }) => JSX.Element;
};

const ApplicationShellProvider = <AdditionalEnvironmentProperties extends {}>(
  props: Props<AdditionalEnvironmentProperties>
) => {
  const apolloClient = useMemo(
    () => props.apolloClient ?? createApolloClient(),
    [props.apolloClient]
  );
  useEffect(() => {
    setCachedApolloClient(apolloClient);
  }, [apolloClient]);
  const coercedEnvironmentValues =
    useCoercedEnvironmentValues<AdditionalEnvironmentProperties>(
      props.environment
    );
  const browserLocale = getBrowserLocale(window);
  return (
    <>
      <GlobalStyles />
      <ErrorBoundary>
        <ApplicationContextProvider<AdditionalEnvironmentProperties>
          environment={coercedEnvironmentValues}
        >
          <ReduxProvider store={internalReduxStore}>
            <ApolloProvider client={apolloClient}>
              <Suspense fallback={<ApplicationLoader />}>
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
              </Suspense>
            </ApolloProvider>
          </ReduxProvider>
        </ApplicationContextProvider>
      </ErrorBoundary>
    </>
  );
};

ApplicationShellProvider.displayName = 'ApplicationShellProvider';
// This is useful to inject a custom history object during tests
ApplicationShellProvider.history = history;

export default ApplicationShellProvider;
