import {
  hasPermission,
  hasEveryPermissions,
  hasSomePermissions,
  getInvalidPermissions,
} from './has-permissions';

type TPermissionName = string;
type TPermissions = {
  [key: string]: boolean;
};

describe('hasPermission', () => {
  let demandedPermission: TPermissionName;
  let actualPermissions: TPermissions | null;
  describe('when the user has the demanded permission', () => {
    beforeEach(() => {
      demandedPermission = 'ManageOrders';
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
    describe('when the user has the manage project permission', () => {
      beforeEach(() => {
        actualPermissions = {
          canViewProducts: false,
          canManageProducts: false,
          canManageProjectSettings: true,
        };
      });
      it('should return true', () => {
        expect(hasPermission(demandedPermission, actualPermissions)).toBe(true);
      });
    });
    describe('when the user has no permission', () => {
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

describe('getInvalidPermissions', () => {
  describe('given all permissions are configured (passed as `actualPermissions`)', () => {
    it('should return no invalid permissions', () => {
      expect(
        getInvalidPermissions(['ManageOrders'], { canManageOrders: true })
      ).toHaveLength(0);
    });
  });

  describe('given some permissions are not configured (not passed as `actualPermissions`)', () => {
    it('should return invalid permissions', () => {
      expect(
        getInvalidPermissions(['ManageOrders', 'ViewStars'], {
          canManageOrders: true,
        })
      ).toEqual(expect.arrayContaining(['ViewStars']));
    });
  });
});
