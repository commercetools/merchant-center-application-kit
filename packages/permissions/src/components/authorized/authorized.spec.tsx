import React from 'react';
import { shallow } from 'enzyme';
import Authorized from './authorized';

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
// Data fences
type TDataFenceGroupedByPermission = {
  // E.g. { canManageOrders: { values: [] } }
  [key: string]: { values: string[] } | null;
};
type TDataFenceGroupedByResourceType = {
  // E.g. { orders: {...} }
  [key: string]: TDataFenceGroupedByPermission | null;
};
type TDataFenceType = 'store';
// NOTE: we currently can't use Mapped Types as the babel transfomer does not
// understand them yet: https://github.com/milesj/babel-plugin-typescript-to-proptypes/issues/23
// type TDataFences = {
//   // E.g. { store: {...} }
//   [key in TDataFenceType]: TDataFenceGroupedByResourceType;
// };
type TDataFences = {
  // E.g. { store: {...} }
  store?: TDataFenceGroupedByResourceType;
};
type TDemandedDataFence = {
  group: string;
  name: string;
  type: TDataFenceType;
};
type TSelectDataFenceData = (dataFenceWithType: {
  type: TDataFenceType;
}) => string[] | null;

type TestProps = {
  shouldMatchSomePermissions: boolean;
  demandedPermissions: TPermissionName[];
  demandedActionRights?: TDemandedActionRight[];
  demandedDataFences?: TDemandedDataFence[];
  actualPermissions: TPermissions | null;
  actualActionRights: TActionRights | null;
  actualDataFences: TDataFences | null;
  selectDataFenceData?: TSelectDataFenceData;
  render: jest.Mock;
};

const createTestProps = (custom: Partial<TestProps>) => ({
  shouldMatchSomePermissions: false,
  demandedPermissions: ['ViewProducts', 'ViewOrders'],
  actualPermissions: {
    canViewProducts: true,
    canViewOrders: true,
  },
  actualActionRights: {
    products: {
      canEditPrices: true,
    },
  },
  actualDataFences: null,
  render: jest.fn(),
  ...custom,
});

describe('rendering', () => {
  let props: TestProps;
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
  describe('if action rights', () => {
    describe('if can view products', () => {
      describe('if can not publish products on products group', () => {
        beforeEach(() => {
          props = createTestProps({
            shouldMatchSomePermissions: true,
            demandedActionRights: [
              { group: 'products', name: 'PublishProducts' },
            ],
          });
          shallow(<Authorized {...props} />);
        });
        it('should pass isAuthorized as "false"', () => {
          expect(props.render).toHaveBeenCalledWith(false);
        });
      });
      describe('if can edit prices on products group', () => {
        beforeEach(() => {
          props = createTestProps({
            shouldMatchSomePermissions: true,
            demandedActionRights: [{ group: 'products', name: 'EditPrices' }],
          });
          shallow(<Authorized {...props} />);
        });
        it('should pass isAuthorized as "true"', () => {
          expect(props.render).toHaveBeenCalledWith(true);
        });
      });
      describe('if can edit prices on orders group', () => {
        beforeEach(() => {
          props = createTestProps({
            shouldMatchSomePermissions: true,
            demandedActionRights: [{ group: 'orders', name: 'EditPrices' }],
          });
          shallow(<Authorized {...props} />);
        });
        it('should pass isAuthorized as "false"', () => {
          expect(props.render).toHaveBeenCalledWith(false);
        });
      });
    });
  });

  describe('dataFence to view orders on specific store', () => {
    describe('with general permission', () => {
      describe('when general permissions is manage', () => {
        beforeEach(() => {
          props = createTestProps({
            demandedPermissions: ['ManageOrders'],
            actualDataFences: {
              store: {
                orders: {
                  canViewOrders: {
                    values: ['store-1'],
                  },
                },
              },
            },
            actualPermissions: {
              canManageOrders: true,
            },
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
          shallow(<Authorized {...props} />);
        });
        it('should indicate as authorized', () => {
          expect(props.render).toHaveBeenCalledWith(true);
        });
      });
      describe('when general permissions is view', () => {
        describe('when data fence permission is manage', () => {
          beforeEach(() => {
            props = createTestProps({
              demandedPermissions: ['ViewOrders'],
              actualDataFences: {
                store: {
                  orders: {
                    canViewOrders: {
                      values: ['store-1'],
                    },
                  },
                },
              },
              actualPermissions: {
                canViewOrders: true,
                canManageOrders: false,
              },
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
            shallow(<Authorized {...props} />);
          });
          it('should indicate as authorized', () => {
            expect(props.render).toHaveBeenCalledWith(true);
          });
        });
      });
    });

    describe('if cannot view or manage orders', () => {
      describe('has demanded dataFence to MANAGE orders on the specific store', () => {
        beforeEach(() => {
          props = createTestProps({
            actualDataFences: {
              store: {
                orders: {
                  canViewOrders: {
                    values: ['store-1'],
                  },
                },
              },
            },
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
            actualPermissions: null,
            actualActionRights: null,
          });
          shallow(<Authorized {...props} />);
        });
        it('should pass isAuthorized as "false"', () => {
          expect(props.render).toHaveBeenCalledWith(false);
        });
      });

      describe('has demanded dataFence to VIEW orders on the specific store', () => {
        beforeEach(() => {
          props = createTestProps({
            actualDataFences: {
              store: {
                orders: {
                  canViewOrders: {
                    values: ['store-1'],
                  },
                },
              },
            },
            actualPermissions: {
              canViewOrders: false,
              canManageOrders: false,
              canViewProducts: true,
            },
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
          shallow(<Authorized {...props} />);
        });
        it('should pass isAuthorized as "true"', () => {
          expect(props.render).toHaveBeenCalledWith(true);
        });
      });

      describe('has demanded dataFence to VIEW or MANAGE orders on the specific store', () => {
        beforeEach(() => {
          props = {
            ...props,
            ...createTestProps({
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
            }),
          };
          shallow(<Authorized {...props} />);
        });
        it('should pass isAuthorized as "true"', () => {
          expect(props.render).toHaveBeenCalledWith(true);
        });
      });
    });
  });
});
