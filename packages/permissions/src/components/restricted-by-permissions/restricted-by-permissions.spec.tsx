import { ComponentType, ReactElement } from 'react';
import { ApplicationContextProvider } from '@commercetools-frontend/application-shell-connectors';
import { screen, render } from '@testing-library/react';
import RestrictedByPermissions from './restricted-by-permissions';

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

const testRender = ({
  allAppliedPermissions = [{ name: 'canManageProjectSettings', value: true }],
  allAppliedActionRights = [],
  allAppliedMenuVisibilities = [],
  allAppliedDataFences = [],
  component,
}: {
  allAppliedPermissions?: TAllAppliedPermission[];
  allAppliedActionRights?: TAllAppliedActionRight[];
  allAppliedMenuVisibilities?: TAllAppliedMenuVisibility[];
  allAppliedDataFences?: TAllAppliedDataFence[];
  component: ReactElement;
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
          id: 'organization-id-1',
          name: 'Organization Name',
        },
        initialized: true,
        expiry: {
          isActive: false,
          daysLeft: undefined,
        },
        suspension: {
          isActive: false,
          reason: undefined,
        },
        allAppliedPermissions,
        allAppliedActionRights,
        allAppliedDataFences,
        allPermissionsForAllApplications: {
          allAppliedPermissions,
          allAppliedActionRights,
          allAppliedDataFences,
          allAppliedMenuVisibilities,
        },
      }}
      environment={{
        revision: '1',
        applicationId: '__local:avengers',
        applicationName: 'my-app',
        entryPointUriPath: 'avengers',
        frontendHost: 'localhost:3001',
        mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
        location: 'eu',
        env: 'production',
        cdnUrl: 'http://localhost:3001',
        servedByProxy: false,
      }}
      projectDataLocale="en"
    >
      {component}
    </ApplicationContextProvider>
  );

const FaaCTestComponent = (props: {
  actionRights?: TDemandedActionRight[];
}) => (
  <RestrictedByPermissions
    permissions={['ManageCustomers']}
    actionRights={props.actionRights}
  >
    {({ isAuthorized }) => <p>Is authorized: {isAuthorized ? 'Yes' : 'No'}</p>}
  </RestrictedByPermissions>
);
const RenderPropTestComponent = () => (
  <RestrictedByPermissions
    permissions={['ManageCustomers']}
    render={({ isAuthorized }) => (
      <p>Is authorized: {isAuthorized ? 'Yes' : 'No'}</p>
    )}
  />
);
const TestComponent = (props: { unauthorizedComponent?: ComponentType }) => (
  <RestrictedByPermissions
    permissions={['ManageCustomers']}
    unauthorizedComponent={props.unauthorizedComponent}
  >
    <p>Is authorized: Yes</p>
  </RestrictedByPermissions>
);

describe('with permissions', () => {
  describe('when demanded permissions are present', () => {
    describe('with `FaaC`', () => {
      it('should indicate being authorized', () => {
        testRender({
          allAppliedPermissions: [
            {
              name: 'canManageCustomers',
              value: true,
            },
          ],
          component: <FaaCTestComponent />,
        });

        expect(screen.getByText('Is authorized: Yes')).toBeInTheDocument();
      });
    });

    describe('with `render`-prop', () => {
      it('should indicate being authorized', () => {
        testRender({
          allAppliedPermissions: [
            {
              name: 'canManageCustomers',
              value: true,
            },
          ],
          component: <RenderPropTestComponent />,
        });

        expect(screen.getByText('Is authorized: Yes')).toBeInTheDocument();
      });
    });

    describe('with `children` being a `ReactNode`', () => {
      it('should indicate being authorized', () => {
        testRender({
          allAppliedPermissions: [
            {
              name: 'canManageCustomers',
              value: true,
            },
          ],
          component: <TestComponent />,
        });

        expect(screen.getByText('Is authorized: Yes')).toBeInTheDocument();
      });
    });
  });

  describe('when demanded permissions are not present', () => {
    describe('with `FaaC`', () => {
      it('should indicate not being authorized', () => {
        testRender({
          allAppliedPermissions: [
            {
              name: 'canManageCustomers',
              value: false,
            },
            {
              name: 'canManageOrders',
              value: true,
            },
          ],
          component: <FaaCTestComponent />,
        });

        expect(screen.getByText('Is authorized: No')).toBeInTheDocument();
      });
    });
    describe('with `render`-prop', () => {
      it('should indicate not being authorized', () => {
        testRender({
          allAppliedPermissions: [
            {
              name: 'canManageCustomers',
              value: false,
            },
            {
              name: 'canManageOrders',
              value: true,
            },
          ],
          component: <RenderPropTestComponent />,
        });

        expect(screen.getByText('Is authorized: No')).toBeInTheDocument();
      });
    });
    describe('with `children` being a `ReactNode`', () => {
      it('should indicate not being authorized', () => {
        testRender({
          allAppliedPermissions: [
            {
              name: 'canManageCustomers',
              value: false,
            },
            {
              name: 'canManageOrders',
              value: true,
            },
          ],
          component: <TestComponent />,
        });

        expect(
          screen.queryByText('Is authorized: Yes')
        ).not.toBeInTheDocument();
      });
    });
    describe('with `unauthorizedComponent` being a `ReactNode`', () => {
      it('should indicate not being authorized', () => {
        const UnauthorizedComponent = () => <p>Is authorized: No</p>;
        testRender({
          allAppliedPermissions: [
            {
              name: 'canManageCustomers',
              value: false,
            },
            {
              name: 'canManageOrders',
              value: true,
            },
          ],
          component: (
            <TestComponent unauthorizedComponent={UnauthorizedComponent} />
          ),
        });

        expect(screen.getByText('Is authorized: No')).toBeInTheDocument();
      });
    });
  });
});

describe('with action rights', () => {
  describe('when demanded action rights are present', () => {
    describe('with `FaaC`', () => {
      it('should indicate not being authorized', () => {
        testRender({
          allAppliedPermissions: [
            {
              name: 'canManageCustomers',
              value: true,
            },
          ],
          allAppliedActionRights: [
            {
              group: 'products',
              name: 'canPublishProducts',
              value: true,
            },
          ],
          component: (
            <FaaCTestComponent
              actionRights={[{ group: 'products', name: 'PublishProducts' }]}
            />
          ),
        });

        expect(screen.getByText('Is authorized: Yes')).toBeInTheDocument();
      });
    });
  });
  describe('when demanded action rights are not present', () => {
    describe('with `FaaC`', () => {
      it('should indicate not being authorized', () => {
        testRender({
          allAppliedPermissions: [
            {
              name: 'canManageCustomers',
              value: true,
            },
          ],
          allAppliedActionRights: [
            {
              group: 'products',
              name: 'canPublishProducts',
              value: false,
            },
          ],
          component: (
            <FaaCTestComponent
              actionRights={[{ group: 'products', name: 'PublishProducts' }]}
            />
          ),
        });

        expect(screen.getByText('Is authorized: No')).toBeInTheDocument();
      });
    });
  });
});
