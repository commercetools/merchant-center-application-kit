import camelCase from 'lodash.camelcase';

// Build the permission key from the definition to match it to the format coming
// from the API.
export const buildPermissionKey = permission =>
  // NOTE: spaces are intentional, in order for the camelCase function to know
  // which letters to make uppercase
  camelCase(`can ${permission.mode} ${permission.resource}`);

// Check that the user permissions match EXACTLY the required permission.
export const hasExactPermission = (demandedPermission, actualPermissions) =>
  actualPermissions[buildPermissionKey(demandedPermission)];

// Check that the user permissions match the required MANAGE permission.
export const hasManagePermission = (demandedPermission, actualPermissions) =>
  demandedPermission.mode === 'view' &&
  actualPermissions[
    buildPermissionKey({
      mode: 'manage',
      resource: demandedPermission.resource,
    })
  ];

// Check that the user permissions match the required MANAGE_PROJECT permission.
export const hasManageProjectPermission = actualPermissions =>
  actualPermissions[
    buildPermissionKey({ mode: 'manage', resource: 'project' })
  ];

// Check the user permissions using one of the defined matchers.
export const hasPermission = (demandedPermission, actualPermissions) =>
  // First checking the existence of the exact permission
  hasExactPermission(demandedPermission, actualPermissions) ||
  // Then checking if a manage permission is present superposing/implying a
  // view persmission
  hasManagePermission(demandedPermission, actualPermissions) ||
  // To finally check for a manage project permission which trumps all
  hasManageProjectPermission(actualPermissions);

// Check that the user permissions match EVERY one of the required permissions.
export const hasEveryPermissions = (actualPermissions, demandedPermissions) =>
  demandedPermissions.every(permission =>
    hasPermission(permission, actualPermissions)
  );

// Check that the user permissions match SOME one of the required permissions.
export const hasSomePermissions = (actualPermissions, demandedPermissions) =>
  demandedPermissions.some(permission =>
    hasPermission(permission, actualPermissions)
  );
