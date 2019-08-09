import isNil from 'lodash/isNil';
// import get from 'lodash/get';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';

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

type TDataFenceGroupedByPermission = {
  // E.g. { canManageOrders: { values: [] } }
  [key: string]: { values: string[] };
};
type TDataFenceGroupedByResourceType = {
  // E.g. { orders: {...} }
  [key: string]: TDataFenceGroupedByPermission;
};
type TDataFences = {
  // E.g. { store: {...} }
  [key: string]: TDataFenceGroupedByResourceType;
};
type TDataFenceType = 'store';
type TActualDataFence = {
  name: string;
  dataFenceValue: { values: string[] };
};
type TDemandedDataFence = {
  group: string;
  name: string;
  type: TDataFenceType;
};

type TSelectDataFenceDataByType = (dataFenceWithType: {
  type: TDataFenceType;
}) => string[] | null;

type TOptionsForAppliedDataFence = {
  demandedDataFences: TDemandedDataFence[];
  actualDataFences: TDataFences;
  actualPermissions: TPermissions;
  selectDataFenceDataByType: TSelectDataFenceDataByType;
};

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
  // Then checking if a manage permission is inferred as a view permission
  hasManagePermission(demandedPermission, actualPermissions || {});

// Check the user action rights using one of the defined matchers.
// The shapes of the arguments are:
// - demandedActionRight:
//     '{ group: 'products', name: 'editPrices' }'
// - actualActionRights:
//     { orders: { canEditPrices: false }, products: { canEditPrices: true } }
export const hasActionRight = (
  demandedActionRight: TDemandedActionRight,
  actualActionRights: TActionRights | null
) => {
  const actionRightGroup =
    actualActionRights && actualActionRights[demandedActionRight.group];

  return Boolean(
    actionRightGroup && actionRightGroup[toCanCase(demandedActionRight.name)]
  );
};

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

// Check that the user action rights match EVERY one of the required action rights.
// The shapes of the arguments are:
// - demandedActionRights:
//     [
//       { group: 'products', name: 'editPrices' },
//       { group: 'products', name: 'publishProducts' },
//     ]
// - actualActionRights:
//     { products: { canEditPrices: true, canPublishProducts: true } }
export const hasEveryActionRight = (
  demandedActionRights: TDemandedActionRight[],
  actualActionRights: TActionRights | null
) =>
  demandedActionRights.every((actionRight: TDemandedActionRight) =>
    hasActionRight(actionRight, actualActionRights)
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

// Returns an Array<String> of unconfigured (not passed as `actualPermissions`) permissions.
// The shapes of the arguments are:
// - demandedPermissions:
//     ['ViewProducts', 'ManageOrders']
// - actualPermissions:
//     { canViewProducts: true, canManageOrders: false }
export const getInvalidPermissions = (
  demandedPermissions: TPermissionName[],
  actualPermissions: TPermissions
) => {
  // All demanded permissions need to be present as an actual permission.
  return demandedPermissions.filter((demandedPermission: TPermissionName) =>
    isNil(actualPermissions[toCanCase(demandedPermission)])
  );
};

const hasDemandedDataFenceByType = (options: {
  actualDataFence: TActualDataFence;
  demandedDataFence: TDemandedDataFence;
  selectDataFenceDataByType: TSelectDataFenceDataByType;
}): boolean => {
  const hasDemandedPermission = hasPermission(options.demandedDataFence.name, {
    [options.actualDataFence.name]: true,
  });
  if (!hasDemandedPermission) return false;

  const selectedDataFenceData = options.selectDataFenceDataByType({
    type: options.demandedDataFence.type,
  });

  if (!selectedDataFenceData) {
    reportErrorToSentry(
      new Error(`missing mapper for type "${options.demandedDataFence.type}"`),
      { extra: options.demandedDataFence.type }
    );
    return false;
  }

  return selectedDataFenceData.every(value =>
    options.actualDataFence.dataFenceValue.values.includes(value)
  );
};

export const createHasAppliedDataFence = (
  options: TOptionsForAppliedDataFence
) =>
  options.demandedDataFences.every(
    (demandedDataFence: TDemandedDataFence): boolean => {
      // First check that the demanded dataFence is enforced on `projectPermissions`
      const hasDemandedProjectPermission = hasPermission(
        demandedDataFence.name,
        options.actualPermissions
      );
      // Given that dataFence structure on `applicationContext`, we get the value by a path
      // e.g given dataFence with { store: { orders: { canManageOrders: { values: } } } }
      // we read the dataFence by the [type] and [group]
      // dataFence[type][group] = dataFence.store.group
      // with value = there is a dataFence to apply, overrules `hasDemandedProjectPermissions`
      // without value = there is no dataFence to apply, overruled by `hasDemandedProjectPermissions`

      const actualDataFenceByPermissionGroup =
        options.actualDataFences[demandedDataFence.type][
          demandedDataFence.group
        ];
      // { canManageOrders: { values: [] }}
      if (actualDataFenceByPermissionGroup) {
        const hasDemandedDataFence = Object.entries(
          actualDataFenceByPermissionGroup
        ).every(([name, value]): boolean => {
          return hasDemandedDataFenceByType({
            actualDataFence: { name, dataFenceValue: value },
            demandedDataFence,
            selectDataFenceDataByType: options.selectDataFenceDataByType,
          });
        });
        return hasDemandedProjectPermission || hasDemandedDataFence;
      }

      return hasDemandedProjectPermission;
    }
  );
