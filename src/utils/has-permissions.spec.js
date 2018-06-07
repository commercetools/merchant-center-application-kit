import {
  buildPermissionKey,
  hasPermission,
  hasEveryPermissions,
  hasSomePermissions,
} from './has-permissions';

describe('buildPermissionKey', () => {
  it('should return a camel case permission name', () => {
    expect(buildPermissionKey({ mode: 'view', resource: 'products' })).toBe(
      'canViewProducts'
    );
  });
});

// This includes
// * hasExactPermission
// * hasManagePermission
// * hasManageProjectPermission
describe('hasPermission', () => {
  describe('when the user has the demanded permission', () => {
    const demandedPermission = { mode: 'foo', resource: 'bar' };
    const actualPermissions = { canFooBar: true };
    it('should return true', () => {
      expect(hasPermission(demandedPermission, actualPermissions)).toBe(true);
    });
  });
  describe('when a view permission is demanded', () => {
    const demandedPermission = { mode: 'view', resource: 'products' };
    describe('when the user has the manage permission for same resource', () => {
      const actualPermissions = {
        canViewProducts: false,
        canManageProducts: true,
      };
      it('should return true', () => {
        expect(hasPermission(demandedPermission, actualPermissions)).toBe(true);
      });
    });
    describe('when the user has the manage project permission', () => {
      const actualPermissions = {
        canViewProducts: false,
        canManageProducts: false,
        canManageProject: true,
      };
      it('should return true', () => {
        expect(hasPermission(demandedPermission, actualPermissions)).toBe(true);
      });
    });
    describe('when the user has no permission', () => {
      const actualPermissions = {
        canViewProducts: false,
        canManageProducts: false,
        canManageProject: false,
      };
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
      hasEveryPermissions({ canViewProducts: true, canManageOrders: true }, [
        { mode: 'view', resource: 'products' },
        { mode: 'manage', resource: 'orders' },
      ])
    ).toBe(true);
  });
  it('should return false if at least one demanded permission does not match', () => {
    expect(
      hasEveryPermissions({ canViewProducts: true, canViewOrders: true }, [
        { mode: 'view', resource: 'products' },
        { mode: 'manage', resource: 'orders' },
      ])
    ).toBe(false);
  });
});

describe('hasSomePermissions', () => {
  it('should return true if at least one demanded permission matches', () => {
    expect(
      hasSomePermissions({ canViewProducts: true, canViewOrders: true }, [
        { mode: 'view', resource: 'products' },
        { mode: 'manage', resource: 'orders' },
      ])
    ).toBe(true);
  });
  it('should return false if none of the demanded permissions match', () => {
    expect(
      hasSomePermissions({ canViewProducts: true, canViewOrders: true }, [
        { mode: 'view', resource: 'customers' },
      ])
    ).toBe(false);
  });
});
