import React from 'react';
import { shallow } from 'enzyme';
import warning from 'warning';
import { ViewProducts, ViewOrders } from '../../constants';
import Authorized from './authorized';

jest.mock('warning', () => jest.fn());

const createTestProps = custom => ({
  shouldMatchSomePermissions: false,
  demandedPermissions: [ViewProducts, ViewOrders],
  actualPermissions: {
    canViewProducts: true,
    canViewOrders: true,
  },
  render: jest.fn(),
  ...custom,
});

describe('rendering', () => {
  let props;
  describe('if should match SOME permissions', () => {
    describe('if can view products', () => {
      beforeEach(() => {
        props = createTestProps({
          shouldMatchSomePermissions: true,
        });
        shallow(<Authorized {...props} />);
      });
      it('should pass isAuthorized as "true"', () => {
        expect(props.render).toHaveBeenCalledWith(true);
      });
    });
    describe('if cannot view products but can view orders', () => {
      beforeEach(() => {
        props = createTestProps({
          shouldMatchSomePermissions: true,
          actualPermissions: {
            canViewProducts: false,
            canViewOrders: true,
          },
        });
        shallow(<Authorized {...props} />);
      });
      it('should pass isAuthorized as "true"', () => {
        expect(props.render).toHaveBeenCalledWith(true);
      });
    });
    describe('if cannot view either products nor orders', () => {
      beforeEach(() => {
        props = createTestProps({
          shouldMatchSomePermissions: true,
          actualPermissions: {
            canViewProducts: false,
            canViewOrders: false,
          },
        });
        shallow(<Authorized {...props} />);
      });
      it('should pass isAuthorized as "false"', () => {
        expect(props.render).toHaveBeenCalledWith(false);
      });
    });
  });
  describe('if should match ALL permissions', () => {
    describe('if can view products and view orders', () => {
      beforeEach(() => {
        props = createTestProps({
          shouldMatchSomePermissions: false,
        });
        shallow(<Authorized {...props} />);
      });
      it('should pass isAuthorized as "true"', () => {
        expect(props.render).toHaveBeenCalledWith(true);
      });
    });
    describe('if cannot view products but can view orders', () => {
      beforeEach(() => {
        props = createTestProps({
          shouldMatchSomePermissions: false,
          actualPermissions: {
            canViewProducts: false,
            canViewOrders: true,
          },
        });
        shallow(<Authorized {...props} />);
      });
      it('should pass isAuthorized as "false"', () => {
        expect(props.render).toHaveBeenCalledWith(false);
      });
    });
    describe('if cannot view either products nor orders', () => {
      beforeEach(() => {
        props = createTestProps({
          shouldMatchSomePermissions: false,
          actualPermissions: {
            canViewProducts: false,
            canViewOrders: false,
          },
        });
        shallow(<Authorized {...props} />);
      });
      it('should pass isAuthorized as "false"', () => {
        expect(props.render).toHaveBeenCalledWith(false);
      });
    });
  });
  describe('when demandedPermissions is a list of values with the deprecated format', () => {
    describe('if should match SOME permissions', () => {
      describe('if can manage products', () => {
        beforeEach(() => {
          props = createTestProps({
            shouldMatchSomePermissions: true,
            demandedPermissions: [
              { mode: 'view', resource: 'products' },
              { mode: 'view', resource: 'orders' },
            ],
            actualPermissions: {
              canManageProducts: true,
              canViewOrders: true,
            },
          });
          shallow(<Authorized {...props} />);
        });
        it('should pass isAuthorized as "true"', () => {
          expect(props.render).toHaveBeenCalledWith(true);
        });
      });
    });
  });
});

describe('deprecations', () => {
  let props;
  let wrapper;
  describe('permissions shape', () => {
    describe('if demandedPermissions has the deprecated shape { mode, resource }', () => {
      describe('when component updates', () => {
        beforeEach(() => {
          props = createTestProps({
            demandedPermissions: [
              { mode: 'view', resource: 'products' },
              { mode: 'view', resource: 'orders' },
            ],
          });
          wrapper = shallow(<Authorized {...props} />);
          wrapper.instance().componentDidUpdate();
        });
        it('should log warning', () => {
          expect(warning).toBeCalledWith(
            expect.any(Boolean),
            expect.stringContaining(
              'The permission format with "{ mode, resource }" has been deprecated. Please use the constant values from the "@commercetools-frontend/permissions" package.'
            )
          );
        });
      });
    });
  });
});
