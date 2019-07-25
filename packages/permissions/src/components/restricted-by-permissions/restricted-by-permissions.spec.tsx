import React from 'react';
import { ApplicationContextProvider } from '@commercetools-frontend/application-shell-connectors';
import { render } from '@testing-library/react';
import RestrictedByPermissions from './restricted-by-permissions';

type TPermissions = {
  [key: string]: boolean;
};
type TActionRight = {
  [key: string]: boolean;
};
type TActionRights = {
  [key: string]: TActionRight;
};
type TActionRightName = string;
type TActionRightGroup = string;
type TDemandedActionRight = {
  group: TActionRightGroup;
  name: TActionRightName;
};

const testRender = ({
  actualPermissions = { canManageProjectSettings: true },
  actualActionRights = {},
  component,
}: {
  actualPermissions?: TPermissions;
  actualActionRights?: TActionRights;
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
        permissions: actualPermissions,
        actionRights: actualActionRights,
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
      it('should indicatged being authorzied', () => {
        const rendered = testRender({
          actualPermissions: {
            canManageCustomers: true,
          },
          component: <FaaCTestComponent />,
        });

        expect(rendered.queryByText('Is authorized: Yes')).toBeInTheDocument();
      });
    });

    describe('with `render`-prop', () => {
      it('should indicatged being authorzied', () => {
        const rendered = testRender({
          actualPermissions: {
            canManageCustomers: true,
          },
          component: <RenderPropTestComponent />,
        });

        expect(rendered.queryByText('Is authorized: Yes')).toBeInTheDocument();
      });
    });

    describe('with `children` being a `ReactNode`', () => {
      it('should indicatged being authorzied', () => {
        const rendered = testRender({
          actualPermissions: {
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
      it('should indicatged not being authorzied', () => {
        const rendered = testRender({
          actualPermissions: {
            canManageCustomers: false,
            canManageOrders: true,
          },
          component: <FaaCTestComponent />,
        });

        expect(rendered.queryByText('Is authorized: No')).toBeInTheDocument();
      });
    });
    describe('with `render`-prop', () => {
      it('should indicatged not being authorzied', () => {
        const rendered = testRender({
          actualPermissions: {
            canManageCustomers: false,
            canManageOrders: true,
          },
          component: <RenderPropTestComponent />,
        });

        expect(rendered.queryByText('Is authorized: No')).toBeInTheDocument();
      });
    });
    describe('with `children` being a `ReactNode`', () => {
      it('should indicatged not being authorzied', () => {
        const rendered = testRender({
          actualPermissions: {
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
      it('should indicatged not being authorzied', () => {
        const UnauthorizedComponent = () => <p>Is authorized: No</p>;
        const rendered = testRender({
          actualPermissions: {
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
      it('should indicatged being authorzied', () => {
        const rendered = testRender({
          actualPermissions: {
            canManageCustomers: true,
          },
          actualActionRights: {
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
      it('should indicatged being not authorzied', () => {
        const rendered = testRender({
          actualPermissions: {
            canManageCustomers: true,
          },
          actualActionRights: {
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
