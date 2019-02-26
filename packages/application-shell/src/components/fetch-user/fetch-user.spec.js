import React from 'react';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { render, waitForElement } from '../../test-utils';
import LoggedInUserQuery from './fetch-user.graphql';
import FetchUser from './fetch-user';

const renderUser = options =>
  render(
    <FetchUser>
      {({ isLoading, error, user }) => {
        if (isLoading) return <div>{'loading...'}</div>;
        if (error) return <div>{`Error: ${error.message}`}</div>;
        if (user) return <div>{`User: ${user.firstName}`}</div>;
        return null;
      }}
    </FetchUser>,
    options
  );

const createGraphqlResponseForUserQuery = custom => ({
  loading: false,
  user: {
    id: 'user-id',
    email: 'john.snow@got.com',
    gravatarHash: '111',
    firstName: 'John',
    lastName: 'Snow',
    language: 'en',
    numberFormat: 'en',
    timeZone: null,
    launchdarklyTrackingId: '111',
    launchdarklyTrackingGroup: 'nightswatch',
    launchdarklyTrackingTeam: ['wolf'],
    launchdarklyTrackingTenant: 'ctp-eu',
    defaultProjectKey: 'test-1',
    projects: {
      total: 1,
      results: [
        {
          name: 'Test 1',
          key: 'test-1',
          suspension: { isActive: false, __typename: 'ProjectSuspension' },
          expiry: { isActive: false, __typename: 'ProjectExpiry' },
          __typename: 'Project',
        },
      ],
      __typename: 'ProjectQueryResult',
    },
    __typename: 'User',
  },
  ...custom,
});

describe('rendering', () => {
  it('should fetch user and pass data to children function', async () => {
    const { getByText } = renderUser({
      addTypename: true,
      mocks: [
        {
          request: {
            query: LoggedInUserQuery,
            variables: {
              target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
            },
          },
          result: {
            data: createGraphqlResponseForUserQuery(),
          },
        },
      ],
    });
    await waitForElement(() => getByText(/John/i));
  });
  it('should render loading state', async () => {
    const { getByText } = renderUser({
      addTypename: true,
      mocks: [
        {
          request: {
            query: LoggedInUserQuery,
            variables: {
              target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
            },
          },
          result: {
            data: createGraphqlResponseForUserQuery({
              loading: true,
              user: null,
            }),
          },
        },
      ],
    });
    await waitForElement(() => getByText(/Loading/i));
  });
  it('should render error state', async () => {
    const { getByText } = renderUser({
      addTypename: true,
      mocks: [
        {
          request: {
            query: LoggedInUserQuery,
            variables: {
              target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
            },
          },
          error: new Error('Oops'),
        },
      ],
    });
    await waitForElement(() => getByText(/Error: Oops/i));
  });
});
