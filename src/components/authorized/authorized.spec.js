import React from 'react';
import { shallow } from 'enzyme';
import Authorized from './authorized';

const createTestProps = custom => ({
  shouldMatchSomePermissions: false,
  demandedPermissions: [
    { mode: 'view', resource: 'products' },
    { mode: 'view', resource: 'orders' },
  ],
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
});
