import React from 'react';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { renderApp, waitForElement } from '../../test-utils';
import ProjectQuery from './fetch-project.graphql';
import FetchProject, { mapAllAppliedToObjectShape } from './fetch-project';

const renderProject = options =>
  renderApp(
    <FetchProject projectKey="test-1">
      {({ isLoading, error, project }) => {
        if (isLoading) return <div>{'loading...'}</div>;
        if (error) return <div>{`Error: ${error.message}`}</div>;
        if (project) return <div>{`Project: ${project.name}`}</div>;
        return null;
      }}
    </FetchProject>,
    options
  );

const createGraphqlResponseForProjectQuery = custom => ({
  loading: false,
  project: {
    __typename: 'Project',
    key: 'test-1',
    version: 1,
    name: 'Test 1',
    countries: ['de'],
    currencies: ['EUR'],
    languages: ['de'],
    initialized: true,
    expiry: {
      __typename: 'ProjectExpiry',
      isActive: true,
      daysLeft: null,
    },
    suspension: {
      __typename: 'ProjectSuspension',
      isActive: false,
    },
    allAppliedPermissions: [
      {
        __typename: 'AppliedPermission',
        name: 'canManageProject',
        value: true,
      },
    ],
    allAppliedMenuVisibilities: [
      {
        __typename: 'AppliedMenuVisibilities',
        name: 'hideDashboard',
        value: false,
      },
    ],
    owner: {
      __typename: 'Organization',
      id: 'owner-id',
      name: 'commercetools',
      createdAt: '2019-01-01T00:00:00.000Z',
    },
    settings: {
      __typename: 'ProjectSetting',
      id: 'settings-id',
      productSettings: ['product-settings-id-1'],
      currentProductSettings: 'product-settings-id-1',
    },
  },
  ...custom,
});

describe('rendering', () => {
  it('should fetch project and pass data to children function', async () => {
    const { getByText } = renderProject({
      mocks: [
        {
          request: {
            query: ProjectQuery,
            variables: {
              target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
              projectKey: 'test-1',
            },
          },
          result: {
            data: createGraphqlResponseForProjectQuery(),
          },
        },
      ],
    });
    await waitForElement(() => getByText(/Test 1/i));
  });
  it('should render loading state', async () => {
    const { getByText } = renderProject({
      mocks: [
        {
          request: {
            query: ProjectQuery,
            variables: {
              target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
              projectKey: 'test-1',
            },
          },
          result: {
            data: createGraphqlResponseForProjectQuery({
              loading: true,
              project: null,
            }),
          },
        },
      ],
    });
    await waitForElement(() => getByText(/Loading/i));
  });
  it('should render error state', async () => {
    const { getByText } = renderProject({
      mocks: [
        {
          request: {
            query: ProjectQuery,
            variables: {
              target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
              projectKey: 'test-1',
            },
          },
          error: new Error('Oops'),
        },
      ],
    });
    await waitForElement(() => getByText(/Error: Oops/i));
  });
});

describe('helpers', () => {
  describe('mapAllAppliedToObjectShape', () => {
    const allAppliedPermissions = [
      {
        name: 'manageProject',
        value: true,
      },
    ];

    it('should transform all permissions', () => {
      const firstAppliedPermission = allAppliedPermissions[0];
      expect(mapAllAppliedToObjectShape(allAppliedPermissions)).toEqual(
        expect.objectContaining({
          [firstAppliedPermission.name]: firstAppliedPermission.value,
        })
      );
    });
  });
});
