import type { ReactNode } from 'react';
import { ApolloClient, type NormalizedCacheObject } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { TestProviderFlopFlip } from '@flopflip/react-broadcast';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import { createMemoryHistory, type MemoryHistory } from 'history';
import { IntlProvider } from 'react-intl';
import { Router } from 'react-router-dom';
import {
  createApolloClient,
  ApplicationContextProvider,
  type TApplicationContext,
} from '@commercetools-frontend/application-shell-connectors';
import type { TProjectGraphql } from '../../../../test-data/project';
import * as ProjectMock from '../../../../test-data/project';

type CustomRenderOptions = {
  locale: string;
  apolloClient?: ApolloClient<NormalizedCacheObject>;
  route: string;
  history: MemoryHistory;
  environment?: TApplicationContext<{}>['environment'];
  projectKey?: string;
  user?: TApplicationContext<{}>['user'];
} & Omit<RenderOptions, 'queries'>;

const defaultEnvironment = {
  applicationId: '',
  applicationIdentifier: '',
  applicationName: '',
  entryPointUriPath: '',
  revision: '',
  env: '',
  location: '',
  cdnUrl: '',
  mcApiUrl: '',
  frontendHost: '',
  servedByProxy: false,
};

const customRender = (
  node: ReactNode,
  {
    locale = 'en',
    apolloClient,
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    environment = defaultEnvironment,
    projectKey = 'default-project-key',
    ...rtlOptions
  }: Partial<CustomRenderOptions> = {}
) => {
  const client = apolloClient ?? createApolloClient();
  const flags = {};

  return {
    ...render(
      <TestProviderFlopFlip flags={flags}>
        <ApolloProvider client={client}>
          <ApplicationContextProvider
            environment={environment}
            project={ProjectMock.random()
              .key(projectKey)
              .buildGraphql<TProjectGraphql>()}
          >
            <IntlProvider locale={locale}>
              <Router history={history}>{node}</Router>
            </IntlProvider>
          </ApplicationContextProvider>
        </ApolloProvider>
      </TestProviderFlopFlip>,
      rtlOptions
    ),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as renderComponent };
