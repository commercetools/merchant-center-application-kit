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
  allAppliedPermissions = [{ name: 'canManageProjectSettings', value: true }],
  allAppliedActionRights = [],
  allAppliedMenuVisibilities = [],
  allAppliedDataFences = [],
}: {
  demandedPermissions: TPermissionName[];
  demandedActionRights?: TDemandedActionRight[];
  shouldMatchSomePermissions: boolean;
  allAppliedPermissions?: TAllAppliedPermission[];
  allAppliedActionRights?: TAllAppliedActionRight[];
  allAppliedMenuVisibilities?: TAllAppliedMenuVisibility[];
  allAppliedDataFences?: TAllAppliedDataFence[];
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
  describe('when it should not match some permission', () => {
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
  describe('when it should not match an action right', () => {
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
        demandedActionRights: [{ group: 'products', name: 'PublishProducts' }],
        shouldMatchSomePermissions: false,
      });

      expect(queryByText('Is authorized: No')).toBeInTheDocument();
    });
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
