import React from 'react';
import { ApplicationContextProvider } from '@commercetools-frontend/application-shell-connectors';
import { render as rtlRender } from '@testing-library/react';
import useIsAuthorized from './use-is-authorized';

type TPermissionName = string;
type TAllAppliedPermission = {
  name: string;
  value: boolean;
};
type TAllAppliedActionRight = {
  name: string;
  value: boolean;
  group: string;
};
type TAllAppliedMenuVisibility = {
  name: string;
  value: boolean;
};
type TAllAppliedDataFence = {
  __typename: 'StoreDataFence';
  value: string;
  group: string;
  name: string;
  type: string;
};
type TDemandedActionRight = {
  group: string;
  name: string;
};
type TDataFenceType = 'store';
type TDemandedDataFence = {
  group: string;
  name: string;
  type: TDataFenceType;
};
type TSelectDataFenceData = (
  demandedDataFenceWithActualValues: TDemandedDataFence & {
    actualDataFenceValues: string[];
  }
) => string[] | null;
type TestProps = {
  demandedPermissions: TPermissionName[];
  demandedActionRights?: TDemandedActionRight[];
  demandedDataFences?: TDemandedDataFence[];
  shouldMatchSomePermissions: boolean;
  selectDataFenceData?: TSelectDataFenceData;
};

const TestComponent = (props: TestProps) => {
  const isAuthorized = useIsAuthorized({
    demandedPermissions: props.demandedPermissions,
    demandedActionRights: props.demandedActionRights,
    shouldMatchSomePermissions: props.shouldMatchSomePermissions,
    demandedDataFences: props.demandedDataFences,
    selectDataFenceData: props.selectDataFenceData,
  });
  return (
    <ul>
      <li>Is authorized: {isAuthorized ? 'Yes' : 'No'}</li>
    </ul>
  );
};

const render = ({
  demandedPermissions,
  demandedActionRights,
  demandedDataFences,
  selectDataFenceData,
  shouldMatchSomePermissions = false,
  allAppliedPermissions = [{ name: 'canManageProjectSettings', value: true }],
  allAppliedActionRights = [],
  allAppliedMenuVisibilities = [],
  allAppliedDataFences = [],
}: {
  demandedPermissions: TPermissionName[];
  demandedActionRights?: TDemandedActionRight[];
  demandedDataFences?: TDemandedDataFence[];
  selectDataFenceData?: TSelectDataFenceData;
  allAppliedPermissions?: TAllAppliedPermission[];
  allAppliedActionRights?: TAllAppliedActionRight[];
  allAppliedMenuVisibilities?: TAllAppliedMenuVisibility[];
  allAppliedDataFences?: TAllAppliedDataFence[];
  shouldMatchSomePermissions?: boolean;
}) =>
  rtlRender(
    <ApplicationContextProvider
      project={{
        key: 'test-with-big-data',
        version: 43,
        name: 'Test with big data',
        countries: ['de', 'en'],
        currencies: ['EUR', 'GBP'],
        languages: ['de', 'en-GB'],
        owner: {
          id: 'project-id-1',
        },
        initialized: true,
        expiry: {
          isActive: true,
          daysLeft: undefined,
        },
        suspension: {
          isActive: true,
          reason: undefined,
        },
        allAppliedPermissions,
        allAppliedActionRights,
        allAppliedMenuVisibilities,
        allAppliedDataFences,
      }}
      environment={{
        applicationName: 'my-app',
        frontendHost: 'localhost:3001',
        mcApiUrl: 'https://mc-api.commercetools.com',
        location: 'eu',
        env: 'production',
        cdnUrl: 'http://localhost:3001',
        servedByProxy: false,
      }}
      projectDataLocale="en"
    >
      <TestComponent
        demandedPermissions={demandedPermissions}
        demandedActionRights={demandedActionRights}
        demandedDataFences={demandedDataFences}
        selectDataFenceData={selectDataFenceData}
        shouldMatchSomePermissions={shouldMatchSomePermissions}
      />
    </ApplicationContextProvider>
  );

describe('general permissions', () => {
  describe('when only some permission should be matched', () => {
    describe('with one applied permission and one matching demanded permission', () => {
      it('should indicate being authorized', () => {
        const rendered = render({
          demandedPermissions: ['ManageCustomers', 'ManageOrders'],
          allAppliedPermissions: [
            {
              name: 'canManageCustomers',
              value: true,
            },
          ],
          shouldMatchSomePermissions: true,
        });

        expect(rendered.queryByText('Is authorized: Yes')).toBeInTheDocument();
      });
    });
    describe('with one applied permission and no matching demanded permission', () => {
      it('should indicate not being authorized', () => {
        const rendered = render({
          demandedPermissions: ['ManageCustomers', 'ManageOrders'],
          allAppliedPermissions: [
            {
              name: 'canManageCustomersGroups',
              value: true,
            },
          ],
          shouldMatchSomePermissions: true,
        });

        expect(rendered.queryByText('Is authorized: No')).toBeInTheDocument();
      });
    });
  });
  describe('when all permissions should be matched', () => {
    describe('with one applied permission and one not matching demanded permission', () => {
      it('should indicate being not authorized', () => {
        const rendered = render({
          allAppliedPermissions: [
            {
              name: 'canManageCustomers',
              value: true,
            },
          ],
          demandedPermissions: ['ManageCustomers', 'ManageOrders'],
          shouldMatchSomePermissions: false,
        });

        expect(rendered.queryByText('Is authorized: No')).toBeInTheDocument();
      });
    });
    describe('with mulltiple applied permission and all demanded permission matching', () => {
      it('should indicate being authorized', () => {
        const rendered = render({
          allAppliedPermissions: [
            {
              name: 'canManageCustomers',
              value: true,
            },
            {
              name: 'canManageOrders',
              value: true,
            },
          ],
          demandedPermissions: ['ManageCustomers', 'ManageOrders'],
          shouldMatchSomePermissions: false,
        });

        expect(rendered.queryByText('Is authorized: Yes')).toBeInTheDocument();
      });
    });
    describe('with applied manage permission', () => {
      describe('when demanding view permission', () => {
        it('should indicate being authorized', () => {
          const rendered = render({
            allAppliedPermissions: [
              {
                name: 'canManageCustomers',
                value: true,
              },
            ],
            demandedPermissions: ['ViewCustomers'],
          });

          expect(
            rendered.queryByText('Is authorized: Yes')
          ).toBeInTheDocument();
        });
      });
      describe('when demanding manage permission', () => {
        it('should indicate being authorized', () => {
          const rendered = render({
            allAppliedPermissions: [
              {
                name: 'canManageCustomers',
                value: true,
              },
            ],
            demandedPermissions: ['ManageCustomers'],
          });

          expect(
            rendered.queryByText('Is authorized: Yes')
          ).toBeInTheDocument();
        });
      });
    });
    describe('without applied manage permission', () => {
      it('should indicate not being authorized', () => {
        const rendered = render({
          allAppliedPermissions: [
            {
              name: 'canManageCustomers',
              value: true,
            },
          ],
          demandedPermissions: ['ViewCustomersGroups'],
        });

        expect(rendered.queryByText('Is authorized: No')).toBeInTheDocument();
      });
    });
  });
});

describe('action rights', () => {
  describe('with applied and matching demanded view permission', () => {
    describe('without applied action right matching demanded', () => {
      it('should indicate not being authorized', () => {
        const rendered = render({
          allAppliedPermissions: [
            { name: 'canManageProjectSettings', value: true },
            { name: 'canViewProducts', value: true },
          ],
          allAppliedActionRights: [
            {
              group: 'products',
              name: 'canEditPrices',
              value: false,
            },
          ],
          demandedPermissions: ['ViewProducts'],
          demandedActionRights: [
            { group: 'products', name: 'PublishProducts' },
          ],
          shouldMatchSomePermissions: true,
        });

        expect(rendered.queryByText('Is authorized: No')).toBeInTheDocument();
      });
    });
    describe('with applied action right not matching demanded', () => {
      it('should indicate being authorized', () => {
        const rendered = render({
          allAppliedPermissions: [
            { name: 'canManageProjectSettings', value: true },
            { name: 'canViewProducts', value: true },
          ],
          allAppliedActionRights: [
            {
              group: 'products',
              name: 'canEditPrices',
              value: true,
            },
          ],
          demandedPermissions: ['ViewProducts'],
          demandedActionRights: [{ group: 'products', name: 'EditPrices' }],
          shouldMatchSomePermissions: true,
        });

        expect(rendered.queryByText('Is authorized: Yes')).toBeInTheDocument();
      });
    });
    describe('with applied action right in another group of demanded', () => {
      it('should indicate not being authorized', () => {
        const rendered = render({
          allAppliedPermissions: [
            { name: 'canManageProjectSettings', value: true },
            { name: 'canViewProducts', value: true },
          ],
          allAppliedActionRights: [
            {
              group: 'orders',
              name: 'canEditPrices',
              value: true,
            },
          ],
          demandedPermissions: ['ViewProducts'],
          demandedActionRights: [{ group: 'products', name: 'EditPrices' }],
          shouldMatchSomePermissions: true,
        });

        expect(rendered.queryByText('Is authorized: No')).toBeInTheDocument();
      });
    });
  });
  describe('with applied and none matching demanded view permission', () => {
    describe('with applied action right matching demanded', () => {
      it('should indicate not being authorized', () => {
        const rendered = render({
          allAppliedPermissions: [{ name: 'canViewProducts', value: false }],
          allAppliedActionRights: [
            {
              group: 'products',
              name: 'canEditPrices',
              value: true,
            },
          ],
          demandedPermissions: ['ManageProducts'],
          demandedActionRights: [
            { group: 'products', name: 'PublishProducts' },
          ],
        });

        expect(rendered.queryByText('Is authorized: No')).toBeInTheDocument();
      });
    });
  });
  describe('without applied and matching demanded view permission', () => {
    it('should indicate not being authorized', () => {
      const rendered = render({
        allAppliedPermissions: [
          { name: 'canManageProjectSettings', value: true },
          // Misses `canViewProducts`
        ],
        allAppliedActionRights: [
          {
            group: 'products',
            name: 'canEditPrices',
            value: true,
          },
        ],
        demandedPermissions: ['ViewProducts'],
        demandedActionRights: [{ group: 'products', name: 'EditPrices' }],
      });

      expect(rendered.queryByText('Is authorized: No')).toBeInTheDocument();
    });
  });
});

describe('data fences', () => {
  describe('when general permission is matched', () => {
    describe('when data fence is matched', () => {
      it('should indicate as authorized', () => {
        const rendered = render({
          shouldMatchSomePermissions: true,
          allAppliedPermissions: [{ name: 'canManageOrders', value: true }],
          allAppliedDataFences: [
            {
              __typename: 'StoreDataFence',
              type: 'store',
              group: 'orders',
              name: 'canViewOrders',
              value: 'store-1',
            },
          ],
          demandedPermissions: ['ManageOrders'],
          demandedDataFences: [
            {
              type: 'store',
              group: 'orders',
              name: 'ViewOrders',
            },
          ],
          selectDataFenceData: ({ type }) => {
            switch (type) {
              case 'store':
                return ['store-1'];
              default:
                return null;
            }
          },
        });

        expect(rendered.queryByText('Is authorized: Yes')).toBeInTheDocument();
      });
    });
    describe('when data fence is not matched', () => {
      it('should indicate as authorized', () => {
        const rendered = render({
          allAppliedPermissions: [{ name: 'canManageOrders', value: true }],
          allAppliedDataFences: [
            {
              __typename: 'StoreDataFence',
              type: 'store',
              group: 'orders',
              name: 'canViewOrders',
              value: 'store-1',
            },
          ],
          demandedPermissions: ['ManageOrders'],
          demandedDataFences: [
            {
              type: 'store',
              group: 'orders',
              name: 'ManageOrders',
            },
          ],
          selectDataFenceData: ({ type }) => {
            switch (type) {
              case 'store':
                return ['store-1'];
              default:
                return null;
            }
          },
        });

        expect(rendered.queryByText('Is authorized: Yes')).toBeInTheDocument();
      });
    });
    describe('when actual data fence is from different group', () => {
      it('should indicate as authorized', () => {
        const rendered = render({
          shouldMatchSomePermissions: true,
          allAppliedPermissions: [{ name: 'canManageOrders', value: true }],
          allAppliedDataFences: [
            {
              __typename: 'StoreDataFence',
              type: 'store',
              group: 'customers',
              name: 'canViewCustomers',
              value: 'store-1',
            },
          ],
          demandedPermissions: ['ManageOrders'],
          demandedDataFences: [
            {
              type: 'store',
              group: 'orders',
              name: 'ManageOrders',
            },
          ],
          selectDataFenceData: ({ type }) => {
            switch (type) {
              case 'store':
                return ['store-1'];
              default:
                return null;
            }
          },
        });

        expect(rendered.queryByText('Is authorized: Yes')).toBeInTheDocument();
      });
    });
  });

  describe('when general permission is not matched', () => {
    describe('when at least one of the demanded data fence is matched', () => {
      it('should indicate as authorized', () => {
        const rendered = render({
          shouldMatchSomePermissions: false,
          allAppliedPermissions: [
            { name: 'canViewOrders', value: false },
            { name: 'canManageOrders', value: false },
          ],
          allAppliedDataFences: [
            {
              __typename: 'StoreDataFence',
              type: 'store',
              group: 'orders',
              name: 'canViewOrders',
              value: 'store-1',
            },
          ],
          demandedPermissions: ['ViewOrders'],
          demandedDataFences: [
            {
              type: 'store',
              group: 'orders',
              name: 'ViewOrders',
            },
            {
              type: 'store',
              group: 'orders',
              name: 'ManageOrders',
            },
          ],
          selectDataFenceData: () => ['store-1'],
        });

        expect(rendered.queryByText('Is authorized: Yes')).toBeInTheDocument();
      });
    });
    describe('when all data fences are matched', () => {
      it('should indicate as authorized', () => {
        const rendered = render({
          shouldMatchSomePermissions: false,
          allAppliedPermissions: [
            { name: 'canViewOrders', value: false },
            { name: 'canManageOrders', value: false },
          ],
          allAppliedDataFences: [
            {
              __typename: 'StoreDataFence',
              type: 'store',
              group: 'orders',
              name: 'canViewOrders',
              value: 'store-1',
            },
          ],
          demandedPermissions: ['ViewOrders'],
          demandedDataFences: [
            {
              type: 'store',
              group: 'orders',
              name: 'ViewOrders',
            },
          ],
          selectDataFenceData: ({ type }) => {
            switch (type) {
              case 'store':
                return ['store-1'];
              default:
                return null;
            }
          },
        });

        expect(rendered.queryByText('Is authorized: Yes')).toBeInTheDocument();
      });
    });
    describe('when data fence permission is not matched', () => {
      it('should indicate as not authorized', () => {
        const rendered = render({
          shouldMatchSomePermissions: true,
          allAppliedPermissions: [
            { name: 'canViewOrders', value: false },
            { name: 'canManageOrders', value: false },
          ],
          allAppliedDataFences: [
            {
              __typename: 'StoreDataFence',
              type: 'store',
              group: 'orders',
              name: 'canViewOrders',
              value: 'store-1',
            },
          ],
          demandedPermissions: ['ViewOrders'],
          demandedDataFences: [
            {
              type: 'store',
              group: 'orders',
              name: 'ManageOrders',
            },
          ],
          selectDataFenceData: ({ type }) => {
            switch (type) {
              case 'store':
                return ['store-1'];
              default:
                return null;
            }
          },
        });

        expect(rendered.queryByText('Is authorized: No')).toBeInTheDocument();
      });
    });
    describe('when actual data fence permission is from different group', () => {
      it('should indicate as not authorized', () => {
        const rendered = render({
          shouldMatchSomePermissions: true,
          allAppliedPermissions: [
            { name: 'canViewOrders', value: false },
            { name: 'canManageOrders', value: false },
          ],
          allAppliedDataFences: [
            {
              __typename: 'StoreDataFence',
              type: 'store',
              group: 'customers',
              name: 'canViewCustomers',
              value: 'store-1',
            },
          ],
          demandedPermissions: ['ViewOrders'],
          demandedDataFences: [
            {
              type: 'store',
              group: 'orders',
              name: 'ManageOrders',
            },
          ],
          selectDataFenceData: ({ type }) => {
            switch (type) {
              case 'store':
                return ['store-1'];
              default:
                return null;
            }
          },
        });

        expect(rendered.queryByText('Is authorized: No')).toBeInTheDocument();
      });
    });
  });
});
