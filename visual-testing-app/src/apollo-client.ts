import { ApolloClient, InMemoryCache } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
// @ts-ignore
import FetchCustomViewsQuery from '../../packages/application-components/src/components/custom-views/custom-views-selector/fetch-custom-views-by-locator.settings.graphql';
import { CUSTOM_VIEW_LOCATORS } from './constants';

export const customView1 = {
  id: uuidv4(),
  defaultLabel: 'Avengers',
  labelAllLocales: [],
  url: 'https://avengers.app',
  type: 'CustomPanel',
  typeSettings: {
    size: 'LARGE',
  },
  locators: [CUSTOM_VIEW_LOCATORS.productDetails],
  permissions: [
    {
      name: 'view',
      oAuthScopes: ['view_products'],
    },
  ],
};

export const customView2 = {
  id: uuidv4(),
  defaultLabel: 'Justice League',
  labelAllLocales: [],
  url: 'https://justice-league.app',
  type: 'CustomPanel',
  typeSettings: {
    size: 'SMALL',
  },
  locators: [CUSTOM_VIEW_LOCATORS.productDetails],
  permissions: [
    {
      name: 'view',
      oAuthScopes: ['view_products'],
    },
  ],
};

const cache = new InMemoryCache();
cache.writeQuery({
  query: FetchCustomViewsQuery,
  variables: {
    customViewLocatorCode: CUSTOM_VIEW_LOCATORS.productDetails,
  },
  data: {
    allCustomViewsInstallationsByLocator: [
      {
        id: uuidv4(),
        customView: customView1,
      },
      {
        id: uuidv4(),
        customView: customView2,
      },
    ],
  },
});

const apolloClient = new ApolloClient({
  cache,
  defaultOptions: {
    query: {
      fetchPolicy: 'cache-only',
    },
  },
});

export default apolloClient;
