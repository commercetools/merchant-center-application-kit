import isNil from 'lodash/isNil';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';

// Permissions
type TPermissionName = string;
type TPermissions = {
  [key: string]: boolean;
};
// Action rights
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

type TDemandedDataFenceWithValues = TDemandedDataFence & {
  actualDataFenceValues: string[];
};

type TSelectDataFenceData = (
  demandedDataFenceWithActualValues: TDemandedDataFenceWithValues
) => string[] | null;

type TActualDataFence = {
  name: string;
  dataFenceValue: { values: string[] };
};

type TOptionsForAppliedDataFence = {
  demandedDataFences: TDemandedDataFence[];
  actualDataFences: TDataFences;
  selectDataFenceData: TSelectDataFenceData;
  actualPermissions: TPermissions | null;
  demandedPermissions: TPermissionName[];
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

const hasDemandedDataFence = (options: {
  actualDataFence: TActualDataFence;
  demandedDataFence: TDemandedDataFence;
  selectDataFenceData: TSelectDataFenceData;
}): boolean => {
  const hasDemandedPermission = hasPermission(options.demandedDataFence.name, {
    [options.actualDataFence.name]: true,
  });

  if (!hasDemandedPermission) return false;

  const selectedDataFenceData = options.selectDataFenceData({
    type: options.demandedDataFence.type,
    group: options.demandedDataFence.group,
    name: options.demandedDataFence.name,
    actualDataFenceValues: options.actualDataFence.dataFenceValue.values,
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

const getDataFenceByPermissionGroup = (
  dataFences: TDataFences,
  storeKey: TDataFenceType,
  groupKey: string
) => {
  if (storeKey in dataFences) {
    const resourceType = dataFences[storeKey];
    if (resourceType && groupKey in resourceType) {
      return resourceType[groupKey];
    }
  }
  return null;
};

export const hasAppliedDataFence = (options: TOptionsForAppliedDataFence) => {
  // If user has `*Manage` as their `appliedPermission`, we bypass `dataFence`.
  const hasAppliedManagePermission = options.demandedPermissions.some(
    demandedPermission => {
      if (options.actualPermissions) {
        return hasManagePermission(
          demandedPermission,
          options.actualPermissions
        );
      }
      return false;
    }
  );
  if (hasAppliedManagePermission) return true;
  // Datafences applied should be combined with an OR, that is why we use
  // `some` and not `every`
  return options.demandedDataFences.some(
    (demandedDataFence: TDemandedDataFence) => {
      // Given that dataFence structure on `applicationContext`, we get the value by a path
      // e.g given dataFence with { store: { orders: { canManageOrders: { values: } } } }
      // we read the dataFence by the [type] and [group]
      // dataFence[type][group] = dataFence.store.group
      // with value = there is a dataFence to apply, overrules `hasDemandedProjectPermissions`
      // without value = there is no dataFence to apply, overruled by `hasDemandedProjectPermissions`
      const actualDataFenceByPermissionGroup = getDataFenceByPermissionGroup(
        options.actualDataFences,
        demandedDataFence.type,
        demandedDataFence.group
      );

      if (!actualDataFenceByPermissionGroup) return false;

      // we try to find if the demanded dataFence is available inside the actual datafences
      const specificActualDataFence = Object.entries(
        actualDataFenceByPermissionGroup
      ).find(
        ([dataFenceName, dataFenceValue]) =>
          dataFenceValue && dataFenceName === toCanCase(demandedDataFence.name)
      );

      if (!specificActualDataFence) return false;

      const [dataFenceName, dataFenceValue] = specificActualDataFence;
      return hasDemandedDataFence({
        actualDataFence: {
          name: dataFenceName,
          // we do the type casting because at this point we are sure that
          // specificActualDataFence.dataFenceValue is not null
          dataFenceValue: dataFenceValue as TActualDataFence['dataFenceValue'],
        },
        demandedDataFence,
        selectDataFenceData: options.selectDataFenceData,
      });
    }
  );
};
