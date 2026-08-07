import { ApolloProvider } from '@apollo/client';
import { TestProviderFlopFlip } from '@flopflip/react-broadcast';
import type { Decorator } from '@storybook/react-vite';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import {
  PortalsContainer,
  themesOverrides,
} from '@commercetools-frontend/application-components';
import { featureFlags } from '@commercetools-frontend/constants';
import { ThemeProvider } from '@commercetools-uikit/design-system';
import apolloClient from '../apollo-client';

const appFlags = {
  [featureFlags.CUSTOM_VIEWS]: { value: true },
};

// The providers the app shell mounts around every Merchant Center view.
export const withProvidersDecorator: Decorator = (Story, { parameters }) => (
  <ApolloProvider client={apolloClient}>
    <TestProviderFlopFlip flags={appFlags}>
      <IntlProvider locale="en">
        {/* Stories whose content is route-driven pin their entry via `parameters.initialEntries`. */}
        <MemoryRouter initialEntries={parameters.initialEntries}>
          {/* Defines app-kit's own tokens, e.g. `--margin-for-page-content`, which have no inline fallback. */}
          <ThemeProvider
            theme="default"
            themeOverrides={themesOverrides.default}
          />
          {/* Portal host for overlays that don't pass `getParentSelector`; also assigns stacking levels. */}
          <PortalsContainer />
          <Story />
        </MemoryRouter>
      </IntlProvider>
    </TestProviderFlopFlip>
  </ApolloProvider>
);
