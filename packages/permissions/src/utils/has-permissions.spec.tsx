import {
  hasPermission,
  hasActionRight,
  hasEveryActionRight,
  hasEveryPermissions,
  hasSomePermissions,
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
    it('should return true', () => {
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
      it('should return true', () => {
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
      it('should return false', () => {
        expect(hasPermission(demandedPermission, actualPermissions)).toBe(
          false
        );
      });
    });
  });
});

describe('hasEveryPermission', () => {
  it('should return true if every demanded permission match', () => {
    expect(
      hasEveryPermissions(['ViewProducts', 'ManageOrders'], {
        canViewProducts: true,
        canManageOrders: true,
      })
    ).toBe(true);
  });
  it('should return false if at least one demanded permission does not match', () => {
    expect(
      hasEveryPermissions(['ViewProducts', 'ManageOrders'], {
        canViewProducts: true,
        canViewOrders: true,
      })
    ).toBe(false);
  });
});

describe('hasSomePermissions', () => {
  it('should return true if at least one demanded permission matches', () => {
    expect(
      hasSomePermissions(['ViewProducts', 'ManageOrders'], {
        canViewProducts: true,
        canViewOrders: true,
      })
    ).toBe(true);
  });
  it('should return false if none of the demanded permissions match', () => {
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
    it('should return true', () => {
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
      it('should return false', () => {
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
      it('should return false', () => {
        expect(hasActionRight(demandedActionRight, actualActionRights)).toBe(
          false
        );
      });
    });
  });
});

describe('hasEveryActionRight', () => {
  it('should return true if every demanded action rights match', () => {
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
  it('should return false if at least one demanded action rights do not match', () => {
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
