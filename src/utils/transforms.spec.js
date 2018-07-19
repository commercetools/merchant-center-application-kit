import { toPermissionShape } from './transforms';

describe('toPermissionShape', () => {
  describe('if argument is not a string', () => {
    it('should throw an Error', () => {
      expect(() => toPermissionShape([1, 2])).toThrowError(
        /Expected argument "1,2" to be a string but got object\./
      );
    });
  });
  describe('if argument is a string with a value different from the allowed permission keys', () => {
    it('should throw an Error', () => {
      expect(() => toPermissionShape('foo')).toThrowError(
        /Expected argument "foo" to be one of "ManageProject,ManageCustomers,ManageOrders,ManageProducts,ViewCustomers,ViewOrders,ViewProducts"/
      );
    });
  });
  describe('if argument is one of the allowed permission keys', () => {
    it('should return the transformed shape of the permission', () => {
      expect(toPermissionShape('ManageProducts')).toEqual({
        mode: 'manage',
        resource: 'products',
      });
    });
  });
});
