import isNil from 'lodash/isNil';
import { TPermissionName, TPermissions } from '../types';
import { permissions } from '../constants';

// Build the permission key from the definition to match it to the format coming
// from the API.
const toCanCase = (permissionName: TPermissionName) => `can${permissionName}`;

// Check that the user permissions match EXACTLY the required permission.
// The shapes of the arguments are:
// - demandedPermission:
//     'ViewProducts'
// - actualPermissions:
//     { canViewProducts: true, canManageOrders: false }
const hasExactPermission = (
  demandedPermission: TPermissionName,
  actualPermissions: TPermissions
) => actualPermissions[toCanCase(demandedPermission)];

// Check that the user permissions match the required MANAGE permission.
// The shapes of the arguments are:
// - demandedPermission:
//     'ViewProducts'
// - actualPermissions:
//     { canViewProducts: true, canManageOrders: false }
const hasManagePermission = (
  demandedPermission: TPermissionName,
  actualPermissions: TPermissions
) =>
  demandedPermission.startsWith('View') &&
  actualPermissions[toCanCase(demandedPermission.replace('View', 'Manage'))];

// Check that the user permissions match the required MANAGE_PROJECT permission.
// The shapes of the arguments are:
// - actualPermissions:
//     { canViewProducts: true, canManageOrders: false }
const hasManageProjectPermission = (actualPermissions: TPermissions) =>
  actualPermissions[toCanCase(permissions.ManageProject)];

// Check the user permissions using one of the defined matchers.
// The shapes of the arguments are:
// - demandedPermission:
//     'ViewProducts'
// - actualPermissions:
//     { canViewProducts: true, canManageOrders: false }
// NOTE: in case the `actualPermissions` are not defined, fall back to an empty object.
// This might be the case when the permissions for a user/project could not be loaded
// (e.g. project not found).
export const hasPermission = (
  demandedPermission: TPermissionName,
  actualPermissions: TPermissions | null
) =>
  // First checking the existence of the exact permission
  hasExactPermission(demandedPermission, actualPermissions || {}) ||
  // Then checking if a manage permission is present superposing/implying a
  // view persmission
  hasManagePermission(demandedPermission, actualPermissions || {}) ||
  // To finally check for a manage project permission which trumps all
  hasManageProjectPermission(actualPermissions || {});

// Check that the user permissions match EVERY one of the required permissions.
// The shapes of the arguments are:
// - demandedPermissions:
//     ['ViewProducts', 'ManageOrders']
// - actualPermissions:
//     { canViewProducts: true, canManageOrders: false }
export const hasEveryPermissions = (
  demandedPermissions: TPermissionName[],
  actualPermissions: TPermissions | null
) =>
  demandedPermissions.every((permission: TPermissionName) =>
    hasPermission(permission, actualPermissions)
  );

// Check that the user permissions match SOME one of the required permissions.
// The shapes of the arguments are:
// - demandedPermissions:
//     ['ViewProducts', 'ManageOrders']
// - actualPermissions:
//     { canViewProducts: true, canManageOrders: false }
export const hasSomePermissions = (
  demandedPermissions: TPermissionName[],
  actualPermissions: TPermissions | null
) =>
  demandedPermissions.some((permission: TPermissionName) =>
    hasPermission(permission, actualPermissions)
  );

// Returns an Array<String> of unconfigured (not passed as `demandedPermissions`) permissions.
// The shapes of the arguments are:
// - demandedPermissions:
//     ['ViewProducts', 'ManageOrders']
// - actualPermissions:
//     { canViewProducts: true, canManageOrders: false }
export const getInvalidPermissions = (
  demandedPermissions: TPermissionName[],
  actualPermissions: TPermissions
) => {
  // Given `ManageProject` is present no other permissions needs to be set and can be invalid.
  // This is also often used in test scenarios where not all exact permissions are being passed.
  if (hasManageProjectPermission(actualPermissions)) return [];
  // Otherwise all demanded permissions need to be present as an actual permission.
  return demandedPermissions.filter((demandedPermission: TPermissionName) =>
    isNil(actualPermissions[toCanCase(demandedPermission)])
  );
};
