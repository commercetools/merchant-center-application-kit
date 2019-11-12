import React from 'react';
import { ApplicationContextProvider } from '@commercetools-frontend/application-shell-connectors';
import { render } from '@testing-library/react';
import RestrictedByPermissions from './restricted-by-permissions';

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

const testRender = ({
  permissions = { canManageProjectSettings: true },
  actionRights = null,
  dataFences = null,
  allAppliedMenuVisibilities = [],
  component,
}: {
  permissions: TApplicationContextPermissions;
  actionRights?: TApplicationContextActionRights | null;
  dataFences?: TApplicationContextDataFences | null;
  allAppliedMenuVisibilities?: TAllAppliedMenuVisibility[];
  component: React.ReactElement;
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
          isActive: false,
          daysLeft: undefined,
        },
        suspension: {
          isActive: false,
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
const TestComponent = (props: {
  unauthorizedComponent?: React.ComponentType;
}) => (
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
        const rendered = testRender({
          permissions: {
            canManageCustomers: true,
          },
          component: <FaaCTestComponent />,
        });

        expect(rendered.queryByText('Is authorized: Yes')).toBeInTheDocument();
      });
    });

    describe('with `render`-prop', () => {
      it('should indicate being authorized', () => {
        const rendered = testRender({
          permissions: {
            canManageCustomers: true,
          },
          component: <RenderPropTestComponent />,
        });

        expect(rendered.queryByText('Is authorized: Yes')).toBeInTheDocument();
      });
    });

    describe('with `children` being a `ReactNode`', () => {
      it('should indicate being authorized', () => {
        const rendered = testRender({
          permissions: {
            canManageCustomers: true,
          },
          component: <TestComponent />,
        });

        expect(rendered.queryByText('Is authorized: Yes')).toBeInTheDocument();
      });
    });
  });

  describe('when demanded permissions are not present', () => {
    describe('with `FaaC`', () => {
      it('should indicate not being authorized', () => {
        const rendered = testRender({
          permissions: {
            canManageCustomers: false,
            canManageOrders: true,
          },
          component: <FaaCTestComponent />,
        });

        expect(rendered.queryByText('Is authorized: No')).toBeInTheDocument();
      });
    });
    describe('with `render`-prop', () => {
      it('should indicate not being authorized', () => {
        const rendered = testRender({
          permissions: {
            canManageCustomers: false,
            canManageOrders: true,
          },
          component: <RenderPropTestComponent />,
        });

        expect(rendered.queryByText('Is authorized: No')).toBeInTheDocument();
      });
    });
    describe('with `children` being a `ReactNode`', () => {
      it('should indicate not being authorized', () => {
        const rendered = testRender({
          permissions: {
            canManageCustomers: false,
            canManageOrders: true,
          },
          component: <TestComponent />,
        });

        expect(
          rendered.queryByText('Is authorized: Yes')
        ).not.toBeInTheDocument();
      });
    });
    describe('with `unauthorizedComponent` being a `ReactNode`', () => {
      it('should indicate not being authorized', () => {
        const UnauthorizedComponent = () => <p>Is authorized: No</p>;
        const rendered = testRender({
          permissions: {
            canManageCustomers: false,
            canManageOrders: true,
          },

          component: (
            <TestComponent unauthorizedComponent={UnauthorizedComponent} />
          ),
        });

        expect(rendered.queryByText('Is authorized: No')).toBeInTheDocument();
      });
    });
  });
});

describe('with action rights', () => {
  describe('when demanded action rights are present', () => {
    describe('with `FaaC`', () => {
      it('should indicate not being authorized', () => {
        const rendered = testRender({
          permissions: {
            canManageCustomers: true,
          },
          actionRights: {
            products: {
              canPublishProducts: true,
            },
          },
          component: (
            <FaaCTestComponent
              actionRights={[{ group: 'products', name: 'PublishProducts' }]}
            />
          ),
        });

        expect(rendered.queryByText('Is authorized: Yes')).toBeInTheDocument();
      });
    });
  });
  describe('when demanded action rights are not present', () => {
    describe('with `FaaC`', () => {
      it('should indicate not being authorized', () => {
        const rendered = testRender({
          permissions: {
            canManageCustomers: true,
          },
          actionRights: {
            products: {
              canPublishProducts: false,
            },
          },
          component: (
            <FaaCTestComponent
              actionRights={[{ group: 'products', name: 'PublishProducts' }]}
            />
          ),
        });

        expect(rendered.queryByText('Is authorized: No')).toBeInTheDocument();
      });
    });
  });
});
