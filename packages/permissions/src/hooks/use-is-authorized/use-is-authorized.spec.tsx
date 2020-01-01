import React from 'react';
import { ApplicationContextProvider } from '@commercetools-frontend/application-shell-connectors';
import { render } from '@testing-library/react';
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

const testRender = ({
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
  render(
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
        },
        allAppliedPermissions,
        allAppliedActionRights,
        allAppliedMenuVisibilities,
        allAppliedDataFences,
      }}
      environment={{
        revision: '1',
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

describe('when only one permission matches', () => {
  describe('General Permissions', () => {
    describe('when "shouldMatchSomePermissions=true"', () => {
      it('should indicate being authorized', () => {
        const { queryByText } = testRender({
          demandedPermissions: ['ManageCustomers', 'ManageOrders'],
          allAppliedPermissions: [
            {
              name: 'canManageCustomers',
              value: true,
            },
          ],
          shouldMatchSomePermissions: true,
        });

        expect(queryByText('Is authorized: Yes')).toBeInTheDocument();
      });
    });
    describe('when "shouldMatchSomePermissions=false"', () => {
      it('should indicate being not authorized', () => {
        const { queryByText } = testRender({
          allAppliedPermissions: [
            {
              name: 'canManageCustomers',
              value: true,
            },
          ],
          demandedPermissions: ['ManageCustomers', 'ManageOrders'],
          shouldMatchSomePermissions: false,
        });

        expect(queryByText('Is authorized: No')).toBeInTheDocument();
      });
    });
    describe('with actual actionRight different than demanded actionRight', () => {
      it('should indicate being not authorized', () => {
        const { queryByText } = testRender({
          allAppliedPermissions: [
            {
              name: 'canManageCustomers',
              value: true,
            },
          ],
          allAppliedActionRights: [
            {
              group: 'products',
              name: 'canEditPrices',
              value: true,
            },
          ],
          demandedPermissions: ['ManageCustomers'],
          demandedActionRights: [
            { group: 'products', name: 'PublishProducts' },
          ],
          shouldMatchSomePermissions: false,
        });

        expect(queryByText('Is authorized: No')).toBeInTheDocument();
      });
    });
    describe('with actual actionRight similar to demanded actionRight', () => {
      it('should indicate being authorized', () => {
        const { queryByText } = testRender({
          allAppliedPermissions: [
            {
              name: 'canManageCustomers',
              value: true,
            },
          ],
          allAppliedActionRights: [
            {
              group: 'products',
              name: 'canEditPrices',
              value: true,
            },
          ],
          demandedPermissions: ['ManageCustomers'],
          demandedActionRights: [{ group: 'products', name: 'EditPrices' }],
          shouldMatchSomePermissions: false,
        });

        expect(queryByText('Is authorized: Yes')).toBeInTheDocument();
      });
    });
  });

  describe('ActionRights', () => {
    describe('if can view products', () => {
      describe('if can not publish products on products group', () => {
        it('should pass isAuthorized as "false"', () => {
          const { queryByText } = testRender({
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

          expect(queryByText('Is authorized: No')).toBeInTheDocument();
        });
      });
      describe('if can edit prices on products group', () => {
        it('should pass isAuthorized as "false"', () => {
          const { queryByText } = testRender({
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

          expect(queryByText('Is authorized: Yes')).toBeInTheDocument();
        });
      });
      describe('if can edit prices on orders group', () => {
        it('should pass isAuthorized as "false"', () => {
          const { queryByText } = testRender({
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

          expect(queryByText('Is authorized: No')).toBeInTheDocument();
        });
      });
    });
  });

  describe('DataFences', () => {
    describe('when general permission is met', () => {
      describe('when dataFence permission is met', () => {
        it('should indicate as authorized', () => {
          const { queryByText } = testRender({
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

          expect(queryByText('Is authorized: Yes')).toBeInTheDocument();
        });
      });
      describe('when dataFence permission is not met', () => {
        it('should indicate as authorized', () => {
          const { queryByText } = testRender({
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

          expect(queryByText('Is authorized: Yes')).toBeInTheDocument();
        });
      });
      describe('when actual data fence permission is from different group', () => {
        it('should indicate as authorized', () => {
          const { queryByText } = testRender({
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

          expect(queryByText('Is authorized: Yes')).toBeInTheDocument();
        });
      });
    });

    describe('when general permission is not met', () => {
      describe('when at least one of the demanded DataFence permissions is met', () => {
        it('should indicate as authorized', () => {
          const { queryByText } = testRender({
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

          expect(queryByText('Is authorized: Yes')).toBeInTheDocument();
        });
      });
      describe('when all dataFence permission are met', () => {
        it('should indicate as authorized', () => {
          const { queryByText } = testRender({
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

          expect(queryByText('Is authorized: Yes')).toBeInTheDocument();
        });
      });
      describe('when dataFence permission is not met', () => {
        it('should indicate as not authorized', () => {
          const { queryByText } = testRender({
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

          expect(queryByText('Is authorized: No')).toBeInTheDocument();
        });
      });
      describe('when actual data fence permission is from different group', () => {
        it('should indicate as not authorized', () => {
          const { queryByText } = testRender({
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

          expect(queryByText('Is authorized: No')).toBeInTheDocument();
        });
      });
    });
  });
});
