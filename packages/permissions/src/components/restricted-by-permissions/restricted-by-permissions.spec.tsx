import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import Authorized from '../authorized';
import RestrictedByPermissions from './restricted-by-permissions';

type TPermissionName = string;
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
type TApplicationContext = {
  permissions: TPermissions | null;
  actionRights: TActionRights | null;
};
type TestProps = {
  shouldMatchSomePermissions: boolean;
  permissions: TPermissionName[];
  actionRights?: TDemandedActionRight[];
  applicationContext: TApplicationContext;
  unauthorizedComponent?: React.ComponentType;
  render?: jest.Mock;
  children?: jest.Mock;
};

const createTestProps = (custom: Partial<TestProps> = {}) => ({
  shouldMatchSomePermissions: false,
  permissions: ['ViewProducts', 'ViewOrders'],
  applicationContext: {
    permissions: {
      canViewProducts: true,
      canViewOrders: true,
    },
    actionRights: {
      products: {
        canEditPrices: true,
      },
    },
  },
  ...custom,
});
const createApplicationContext = (
  custom: Partial<TApplicationContext> = {}
) => ({
  environment: {
    applicationName: 'my-app',
    frontendHost: 'localhost:3001',
    mcApiUrl: 'https://mc-api.commercetools.com',
    location: 'eu',
    env: 'development',
    cdnUrl: 'http://localhost:3001',
    servedByProxy: false,
  },
  user: null,
  project: null,
  dataLocale: null,
  permissions: {
    canManageProjectSettings: true,
  },
  actionRights: {},
  ...custom,
});

describe('rendering', () => {
  let props: TestProps;
  let wrapper: ShallowWrapper;
  describe('if render prop is defined', () => {
    beforeEach(() => {
      props = createTestProps({ render: jest.fn() });
      shallow(<RestrictedByPermissions {...props} />)
        .find(ApplicationContext)
        .renderProp('render')(createApplicationContext())
        .find(Authorized)
        .renderProp('render')(true);
    });
    it('should call render prop with isAuthorized true', () => {
      expect(props.render).toHaveBeenCalledWith({ isAuthorized: true });
    });
  });
  describe('if children prop is defined and is a function', () => {
    beforeEach(() => {
      props = createTestProps({ children: jest.fn() });
      shallow(<RestrictedByPermissions {...props} />)
        .find(ApplicationContext)
        .renderProp('render')(createApplicationContext())
        .find(Authorized)
        .renderProp('render')(true);
    });
    it('should call children prop with isAuthorized true', () => {
      expect(props.children).toHaveBeenCalledWith({ isAuthorized: true });
    });
  });
  describe('if children prop is defined and is a react node', () => {
    describe('if isAuthorized is true', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(
          <RestrictedByPermissions {...props}>
            <div>{'Authorized'}</div>
          </RestrictedByPermissions>
        )
          .find(ApplicationContext)
          .renderProp('render')(createApplicationContext())
          .find(Authorized)
          .renderProp('render')(true);
      });
      it('should render children', () => {
        expect(wrapper).toHaveText('Authorized');
      });
    });
    describe('if isAuthorized is false', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(
          <RestrictedByPermissions {...props}>
            <div>{'Authorized'}</div>
          </RestrictedByPermissions>
        )
          .find(ApplicationContext)
          .renderProp('render')(createApplicationContext())
          .find(Authorized)
          .renderProp('render')(false);
      });
      it('should render null', () => {
        expect(wrapper.type()).toBe(null);
      });
    });
    describe('if unautorizedComponent is defined', () => {
      const Unauthorized = () => <div>{'Unauthorized'}</div>;
      describe('if isAuthorized is false', () => {
        beforeEach(() => {
          props = createTestProps({
            unauthorizedComponent: Unauthorized,
          });
          wrapper = shallow(
            <RestrictedByPermissions {...props}>
              <div>{'Authorized'}</div>
            </RestrictedByPermissions>
          )
            .find(ApplicationContext)
            .renderProp('render')(createApplicationContext())
            .find(Authorized)
            .renderProp('render')(false);
        });
        it('should render unauthorizedComponent', () => {
          expect(wrapper).toRender(Unauthorized);
        });
      });
    });
  });
});
