import React from 'react';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { renderApp, waitForElement } from '../../test-utils';
import ProjectQuery from './fetch-project.users.graphql';
import FetchProject, {
  mapAllAppliedToObjectShape,
  mapAllAppliedToGroupedObjectShape,
  mapAllDataFencesToGroupedObjectShape,
} from './fetch-project';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';

jest.mock('@commercetools-frontend/sentry');

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
        name: 'canManageProjectSettings',
        value: true,
      },
    ],
    allAppliedDataFences: [
      {
        __typename: 'StoreDataFence',
        value: 'usa',
        group: 'orders',
        name: 'canManageOrders',
        type: 'store',
      },
    ],
    allAppliedActionRights: [
      {
        __typename: 'AppliedActionRight',
        group: 'products',
        name: 'canEditPrices',
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
    expect(reportErrorToSentry).toHaveBeenCalled();
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
  describe('mapAllAppliedToGroupedObjectShape', () => {
    const allAppliedActionRights = [
      {
        group: 'products',
        name: 'canEditPrices',
        value: true,
      },
      {
        group: 'orders',
        name: 'canEditPrices',
        value: true,
      },
      {
        group: 'products',
        name: 'canPublishProducts',
        value: false,
      },
    ];

    it('should transform all action rights', () => {
      expect(mapAllAppliedToGroupedObjectShape(allAppliedActionRights)).toEqual(
        {
          products: {
            canEditPrices: true,
            canPublishProducts: false,
          },
          orders: {
            canEditPrices: true,
          },
        }
      );
    });
  });
  describe('mapAllDataFencesToGroupedObjectShape', () => {
    describe('with store types', () => {
      const allAppliedDataFences = [
        {
          value: 'usa',
          type: 'store',
          group: 'orders',
          name: 'canManageOrders',
        },
        {
          value: 'germany',
          type: 'store',
          group: 'orders',
          name: 'canManageOrders',
        },
        {
          value: 'canada',
          type: 'store',
          group: 'orders',
          name: 'canViewOrders',
        },
      ];
      it('should transform all applied dataFences', () => {
        expect(
          mapAllDataFencesToGroupedObjectShape(allAppliedDataFences)
        ).toEqual({
          store: {
            orders: {
              canManageOrders: {
                values: ['usa', 'germany'],
              },
              canViewOrders: {
                values: ['canada'],
              },
            },
          },
        });
      });
    });
    describe('with categories as datafence types', () => {
      const allAppliedDataFences = [
        {
          value: 'category-1',
          type: 'categories',
          group: 'products',
          name: 'canAddCategories',
        },
        {
          value: 'category-2',
          type: 'categories',
          group: 'products',
          name: 'canAddCategories',
        },
        {
          value: 'category-3',
          type: 'categories',
          group: 'products',
          name: 'canDeleteCategories',
        },
      ];

      it('should transform all applied dataFences', () => {
        expect(
          mapAllDataFencesToGroupedObjectShape(allAppliedDataFences)
        ).toEqual({
          categories: {
            products: {
              canAddCategories: {
                values: ['category-1', 'category-2'],
              },
              canDeleteCategories: {
                values: ['category-3'],
              },
            },
          },
        });
      });
    });
  });
});
