import type { ReactNode } from 'react';
import { ApolloClient, type NormalizedCacheObject } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { TestProviderFlopFlip } from '@flopflip/react-broadcast';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import {
  createApolloClient,
  ApplicationContextProvider,
  type TApplicationContext,
} from '@commercetools-frontend/application-shell-connectors';
import { featureFlags } from '@commercetools-frontend/constants';
import type { TProjectGraphql } from '../../../../test-data/project';
import * as ProjectMock from '../../../../test-data/project';

type CustomRenderOptions = {
  locale: string;
  apolloClient?: ApolloClient<NormalizedCacheObject>;
  route: string;
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
    environment = defaultEnvironment,
    projectKey = 'default-project-key',
    ...rtlOptions
  }: Partial<CustomRenderOptions> = {}
) => {
  const client = apolloClient ?? createApolloClient();
  const flags = {
    [featureFlags.CUSTOM_VIEWS]: { value: true },
  };

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
              {/* TODO: get this to work well with history */}
              <MemoryRouter>{node}</MemoryRouter>
            </IntlProvider>
          </ApplicationContextProvider>
        </ApolloProvider>
      </TestProviderFlopFlip>,
      rtlOptions
    ),
  };
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as renderComponent };
