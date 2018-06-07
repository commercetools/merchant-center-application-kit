import React from 'react';
import { shallow } from 'enzyme';
import Authorized from '../authorized';
import { RestrictedByPermissions } from './restricted-by-permissions';

const createTestProps = custom => ({
  shouldMatchSomePermissions: false,
  permissions: [
    { mode: 'view', resource: 'products' },
    { mode: 'view', resource: 'orders' },
  ],
  userPermissions: {
    canViewProducts: true,
    canViewOrders: true,
  },
  ...custom,
});

describe('rendering', () => {
  let props;
  let wrapper;
  describe('if render prop is defined', () => {
    beforeEach(() => {
      props = createTestProps({ render: jest.fn() });
      shallow(<RestrictedByPermissions {...props} />)
        .find(Authorized)
        .renderProp('render', true);
    });
    it('should call render prop with isAuthorized true', () => {
      expect(props.render).toHaveBeenCalledWith({ isAuthorized: true });
    });
  });
  describe('if children prop is defined and is a function', () => {
    beforeEach(() => {
      props = createTestProps({ children: jest.fn() });
      shallow(<RestrictedByPermissions {...props} />)
        .find(Authorized)
        .renderProp('render', true);
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
          .find(Authorized)
          .renderProp('render', true);
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
          .find(Authorized)
          .renderProp('render', false);
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
            .find(Authorized)
            .renderProp('render', false);
        });
        it('should render unauthorizedComponent', () => {
          expect(wrapper).toRender(Unauthorized);
        });
      });
    });
  });
});
