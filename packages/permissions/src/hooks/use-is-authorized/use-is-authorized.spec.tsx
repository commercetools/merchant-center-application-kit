import React from 'react';
import { ApplicationContextProvider } from '@commercetools-frontend/application-shell-connectors';
import { render } from '@testing-library/react';
import useIsAuthorized from './use-is-authorized';

type TPermissionName = string;
declare type TApplicationContextPermissions = {
  [key: string]: boolean;
};
declare type TActionRight = {
  [key: string]: boolean;
};
declare type TApplicationContextActionRights = {
  [key: string]: TActionRight;
};
declare type TApplicationContextGroupedByPermission = {
  [key: string]: {
    values: string[];
  } | null;
};
declare type TApplicationContextGroupedByResourceType = {
  [key: string]: TApplicationContextGroupedByPermission | null;
};
declare type TApplicationContextDataFenceType = 'store';
declare type TApplicationContextDataFences = {
  [key in TApplicationContextDataFenceType]: TApplicationContextGroupedByResourceType;
};

type TAllAppliedMenuVisibility = {
  name: string;
  value: boolean;
};
type TDemandedActionRight = {
  group: string;
  name: string;
};
type TestProps = {
  demandedPermissions: TPermissionName[];
  demandedActionRights?: TDemandedActionRight[];
  shouldMatchSomePermissions: boolean;
};

const TestComponent = (props: TestProps) => {
  const isAuthorized = useIsAuthorized({
    demandedPermissions: props.demandedPermissions,
    demandedActionRights: props.demandedActionRights,
    shouldMatchSomePermissions: props.shouldMatchSomePermissions,
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
  shouldMatchSomePermissions,
  permissions = { canManageProjectSettings: true },
  actionRights = null,
  dataFences = null,
  allAppliedMenuVisibilities = [],
}: {
  demandedPermissions: TPermissionName[];
  demandedActionRights?: TDemandedActionRight[];
  shouldMatchSomePermissions: boolean;
  permissions: TApplicationContextPermissions;
  actionRights?: TApplicationContextActionRights | null;
  dataFences?: TApplicationContextDataFences | null;
  allAppliedMenuVisibilities?: TAllAppliedMenuVisibility[];
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
        permissions,
        actionRights,
        dataFences,
        allAppliedMenuVisibilities,
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
        shouldMatchSomePermissions={shouldMatchSomePermissions}
      />
    </ApplicationContextProvider>
  );

describe('when only one permission matches', () => {
  describe('when it should match some permission', () => {
    it('should indicate being authorized', () => {
      const { queryByText } = testRender({
        demandedPermissions: ['ManageCustomers', 'ManageOrders'],
        permissions: {
          canManageCustomers: true,
        },
        shouldMatchSomePermissions: true,
      });

      expect(queryByText('Is authorized: Yes')).toBeInTheDocument();
    });
  });
  describe('when it should not match some permission', () => {
    it('should indicate being not authorized', () => {
      const { queryByText } = testRender({
        permissions: {
          canManageCustomers: true,
        },
        demandedPermissions: ['ManageCustomers', 'ManageOrders'],
        shouldMatchSomePermissions: false,
      });

      expect(queryByText('Is authorized: No')).toBeInTheDocument();
    });
  });
  describe('when it should not match an action right', () => {
    it('should indicate being not authorized', () => {
      const { queryByText } = testRender({
        permissions: {
          canManageCustomers: true,
        },
        actionRights: {
          products: {
            canEditPrices: true,
          },
        },
        demandedPermissions: ['ManageCustomers'],
        demandedActionRights: [{ group: 'products', name: 'PublishProducts' }],
        shouldMatchSomePermissions: false,
      });

      expect(queryByText('Is authorized: No')).toBeInTheDocument();
    });
    it('should indicate being authorized', () => {
      const { queryByText } = testRender({
        permissions: {
          canManageCustomers: true,
        },
        actionRights: {
          products: {
            canEditPrices: true,
          },
        },
        demandedPermissions: ['ManageCustomers'],
        demandedActionRights: [{ group: 'products', name: 'EditPrices' }],
        shouldMatchSomePermissions: false,
      });

      expect(queryByText('Is authorized: Yes')).toBeInTheDocument();
    });
  });
});
