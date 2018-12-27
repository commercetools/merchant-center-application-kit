import { permissions } from '../constants';
import {
  hasPermission,
  hasEveryPermissions,
  hasSomePermissions,
  getInvalidPermissions,
} from './has-permissions';

describe('hasPermission', () => {
  let demandedPermission;
  let actualPermissions;
  describe('when the user has the demanded permission', () => {
    beforeEach(() => {
      demandedPermission = permissions.ManageProducts;
      actualPermissions = { canManageProducts: true };
    });
    it('should return true', () => {
      expect(hasPermission(demandedPermission, actualPermissions)).toBe(true);
    });
  });
  describe('when a view permission is demanded', () => {
    beforeEach(() => {
      demandedPermission = permissions.ViewProducts;
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
          canManageProject: true,
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
          canManageProject: false,
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
      hasEveryPermissions(
        [permissions.ViewProducts, permissions.ManageOrders],
        {
          canViewProducts: true,
          canManageOrders: true,
        }
      )
    ).toBe(true);
  });
  it('should return false if at least one demanded permission does not match', () => {
    expect(
      hasEveryPermissions(
        [permissions.ViewProducts, permissions.ManageOrders],
        {
          canViewProducts: true,
          canViewOrders: true,
        }
      )
    ).toBe(false);
  });
});

describe('hasSomePermissions', () => {
  it('should return true if at least one demanded permission matches', () => {
    expect(
      hasSomePermissions([permissions.ViewProducts, permissions.ManageOrders], {
        canViewProducts: true,
        canViewOrders: true,
      })
    ).toBe(true);
  });
  it('should return false if none of the demanded permissions match', () => {
    expect(
      hasSomePermissions([permissions.ViewCustomers], {
        canViewProducts: true,
        canViewOrders: true,
      })
    ).toBe(false);
  });
});

describe('getInvalidPermissions', () => {
  describe('given all permissions are configured (passed as `actualPermissions`)', () => {
    it('should return no unconfigured permissions', () => {
      expect(
        getInvalidPermissions(['ManageOrders'], { canManageOrders: true })
      ).toHaveLength(0);
    });
  });

  describe('given some permissions are not configured (not passed as `actualPermissions`)', () => {
    it('should return unconfigured permissions', () => {
      expect(
        getInvalidPermissions(['ManageOrders', 'ViewStars'], {
          canManageOrders: true,
        })
      ).toEqual(expect.arrayContaining(['ViewStars']));
    });
  });
});
