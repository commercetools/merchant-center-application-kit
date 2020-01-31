import {
  hasPermission,
  hasActionRight,
  hasEveryActionRight,
  hasEveryPermissions,
  hasSomePermissions,
  hasSomeDataFence,
  getImpliedPermissions,
} from './has-permissions';

type TPermissionName = string;
type TPermissions = {
  [key: string]: boolean;
};
type TActionRightName = string;
type TActionRightGroup = string;
type TDemandedActionRight = {
  group: TActionRightGroup;
  name: TActionRightName;
};
type TActionRight = {
  [key: string]: boolean;
};
type TActionRights = {
  [key: string]: TActionRight;
};

describe('hasPermission', () => {
  let demandedPermission: TPermissionName;
  let actualPermissions: TPermissions | null;
  describe('when the user has the demanded permission', () => {
    beforeEach(() => {
      demandedPermission = 'ManageProducts';
      actualPermissions = { canManageProducts: true };
    });
    it('should indicate the permission the permission matches', () => {
      expect(hasPermission(demandedPermission, actualPermissions)).toBe(true);
    });
  });
  describe('when a view permission is demanded', () => {
    beforeEach(() => {
      demandedPermission = 'ViewProducts';
    });
    describe('when the user has the manage permission for same resource', () => {
      beforeEach(() => {
        actualPermissions = {
          canViewProducts: false,
          canManageProducts: true,
        };
      });
      it('should indicate the permission the permission matches', () => {
        expect(hasPermission(demandedPermission, actualPermissions)).toBe(true);
      });
    });
    describe('when the user has no matching permission', () => {
      beforeEach(() => {
        actualPermissions = {
          canViewProducts: false,
          canManageProducts: false,
          canManageProjectSettings: false,
        };
      });
      it('should indicate that the permission does not match', () => {
        expect(hasPermission(demandedPermission, actualPermissions)).toBe(
          false
        );
      });
    });
  });
  describe('when a manage permission is demanded', () => {
    beforeEach(() => {
      demandedPermission = 'ManageProducts';
    });
    describe('when the user has the manage permission for same resource', () => {
      beforeEach(() => {
        actualPermissions = {
          canManageProducts: true,
        };
      });
      it('should indicate the permission the permission matches', () => {
        expect(hasPermission(demandedPermission, actualPermissions)).toBe(true);
      });
    });
    describe('when the user has view permission for the same resource', () => {
      beforeEach(() => {
        actualPermissions = {
          canViewProducts: false,
          canManageProjectSettings: false,
        };
      });
      it('should indicate that the permission does not match', () => {
        expect(hasPermission(demandedPermission, actualPermissions)).toBe(
          false
        );
      });
    });
  });
});

describe('hasEveryPermission', () => {
  it('should indicate the permission the permission matches if every demanded permission match', () => {
    expect(
      hasEveryPermissions(['ViewProducts', 'ManageOrders'], {
        canViewProducts: true,
        canManageOrders: true,
      })
    ).toBe(true);
  });
  it('should indicate that the permission does not match if at least one demanded permission does not match', () => {
    expect(
      hasEveryPermissions(['ViewProducts', 'ManageOrders'], {
        canViewProducts: true,
        canViewOrders: true,
      })
    ).toBe(false);
  });
});

describe('hasSomePermissions', () => {
  it('should indicate the permission the permission matches if at least one demanded permission matches', () => {
    expect(
      hasSomePermissions(['ViewProducts', 'ManageOrders'], {
        canViewProducts: true,
        canViewOrders: true,
      })
    ).toBe(true);
  });
  it('should indicate that the permission does not match if none of the demanded permissions match', () => {
    expect(
      hasSomePermissions(['ViewCustomers'], {
        canViewProducts: true,
        canViewOrders: true,
      })
    ).toBe(false);
  });
});

describe('hasActionRight', () => {
  let demandedActionRight: TDemandedActionRight;
  let actualActionRights: TActionRights | null;

  describe('when the user has the demanded action right', () => {
    beforeEach(() => {
      demandedActionRight = { group: 'products', name: 'EditPrices' };
      actualActionRights = { products: { canEditPrices: true } };
    });
    it('should indicate the permission the permission matches', () => {
      expect(hasActionRight(demandedActionRight, actualActionRights)).toBe(
        true
      );
    });
  });
  describe('when the user does not have the demanded action right', () => {
    describe('with the action right group', () => {
      beforeEach(() => {
        demandedActionRight = { group: 'products', name: 'PublishProducts' };
        actualActionRights = { products: { canEditPrices: true } };
      });
      it('should indicate that the permission does not match', () => {
        expect(hasActionRight(demandedActionRight, actualActionRights)).toBe(
          false
        );
      });
    });
    describe('without the action right group', () => {
      beforeEach(() => {
        demandedActionRight = { group: 'orders', name: 'EditPrices' };
        actualActionRights = { products: { canEditPrices: true } };
      });
      it('should indicate that the permission does not match', () => {
        expect(hasActionRight(demandedActionRight, actualActionRights)).toBe(
          false
        );
      });
    });
  });
});

describe('hasEveryActionRight', () => {
  it('should indicate the permission the permission matches if every demanded action rights match', () => {
    expect(
      hasEveryActionRight(
        [
          { group: 'orders', name: 'EditPrices' },
          { group: 'products', name: 'PublishProducts' },
        ],
        {
          orders: {
            canEditPrices: true,
          },
          products: {
            canPublishProducts: true,
          },
        }
      )
    ).toBe(true);
  });
  it('should indicate that the permission does not match if at least one demanded action rights do not match', () => {
    expect(
      hasEveryActionRight(
        [
          { group: 'orders', name: 'EditPrices' },
          { group: 'products', name: 'PublishProducts' },
        ],
        {
          orders: {
            canEditPrices: true,
          },
          products: {
            canEditPrices: true,
          },
        }
      )
    ).toBe(false);
  });
});

describe('hasSomeDataFence', () => {
  describe('user has not data fence permissions', () => {
    it('should indicate that the permission does not match', () => {
      expect(
        hasSomeDataFence({
          actualPermissions: null,
          actualDataFences: null,
          demandedDataFences: [
            {
              type: 'store',
              group: 'orders',
              name: 'ViewOrders',
            },
          ],
          selectDataFenceData: () => ['store-1'],
        })
      ).toBe(false);
    });
  });

  describe('no demanded data fence exists in actual data fences', () => {
    it('should indicate that the data fence does not match', () => {
      expect(
        hasSomeDataFence({
          actualPermissions: null,
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
          selectDataFenceData: () => ['store-1'],
        })
      ).toBe(false);
    });
  });
  describe('some demanded data fences exist in actual data fences', () => {
    it('should indicate that the data fence matches', () => {
      expect(
        hasSomeDataFence({
          actualPermissions: null,
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
              name: 'ViewOrders',
            },
            {
              type: 'store',
              group: 'orders',
              name: 'ManageOrders',
            },
          ],
          selectDataFenceData: () => ['store-1'],
        })
      ).toBe(true);
    });
  });
  describe('all demanded data fences exist in actual data fences', () => {
    it('should indicate that the data fence matches', () => {
      expect(
        hasSomeDataFence({
          actualPermissions: null,
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
              name: 'ViewOrders',
            },
          ],
          selectDataFenceData: () => ['store-1'],
        })
      ).toBe(true);
    });
  });
  describe('no value from demanded data fence exists in actual data fence values', () => {
    it('should indicate that the data fence does not match', () => {
      expect(
        hasSomeDataFence({
          actualPermissions: null,
          actualDataFences: {
            store: {
              orders: {
                canManageOrders: {
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
          selectDataFenceData: () => ['store-2'],
        })
      ).toBe(false);
    });
  });
  describe('some values from demanded data fence exist in actual data fence values', () => {
    it('should indicate that the data fence matches', () => {
      const hasDF = hasSomeDataFence({
        actualPermissions: null,
        actualDataFences: {
          store: {
            customers: {
              canManageCustomers: {
                values: ['store-1'],
              },
            },
          },
        },
        demandedDataFences: [
          {
            type: 'store',
            group: 'customers',
            name: 'ManageCustomers',
          },
        ],
        selectDataFenceData: () => ['store-1', 'store-2'],
      });
      expect(hasDF).toBe(true);
    });
  });
  describe('all values from demanded data fence exist in actual data fence values', () => {
    it('should indicate that the data fence matches', () => {
      expect(
        hasSomeDataFence({
          actualPermissions: null,
          actualDataFences: {
            store: {
              orders: {
                canManageOrders: {
                  values: ['store-1', 'store-2'],
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
          selectDataFenceData: () => ['store-1', 'store-2'],
        })
      ).toBe(true);
    });
  });
});
describe('getImpliedPermissions', () => {
  describe('when demanded permissions contain implied permissions', () => {
    it('indicate that the demanded permissions contain implied permissions', () => {
      expect(getImpliedPermissions(['ManageOrders', 'ViewOrders'])).toEqual(
        expect.arrayContaining(['ViewOrders'])
      );

      expect(
        getImpliedPermissions([
          'ManageOrders',
          'ManageCustomerGroups',
          'ViewCustomers',
          'ViewOrders',
        ])
      ).toEqual(expect.arrayContaining(['ViewOrders']));
    });
  });
  describe('when demanded permissions contain no implied permissions', () => {
    it('indicate that the demanded permissions contain no implied permissions', () => {
      expect(
        getImpliedPermissions(['ManageOrders', 'ViewCustomers'])
      ).toHaveLength(0);
      expect(
        getImpliedPermissions([
          'ManageOrders',
          'ViewCustomersGroups',
          'ManageProjectSettings',
        ])
      ).toHaveLength(0);
    });
  });
});
