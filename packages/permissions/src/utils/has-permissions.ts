import upperFirst from 'lodash/upperFirst';
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
  type: string;
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
  actualPermissions: TPermissions | null;
  demandedDataFences: TDemandedDataFence[];
  actualDataFences: TDataFences | null;
  selectDataFenceData?: TSelectDataFenceData;
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

const getIsViewPermission = (demandedPermission: TPermissionName) =>
  demandedPermission.startsWith('View');

// Check that the user permissions match the required MANAGE permission.
// The shapes of the arguments are:
// - demandedPermission:
//     'ViewProducts'
// - actualPermissions:
//     { canViewProducts: true, canManageOrders: false }
const doesManagePermissionInferViewPermission = (
  demandedPermission: TPermissionName,
  actualPermissions: TPermissions
) => {
  const isDemandedPermissionViewPermission = getIsViewPermission(
    demandedPermission
  );
  const isViewPermissionInferredByManagePermission = Boolean(
    actualPermissions[toCanCase(demandedPermission.replace('View', 'Manage'))]
  );

  return (
    isDemandedPermissionViewPermission &&
    isViewPermissionInferredByManagePermission
  );
};

// Check if the demanded permissions contain any unnecessary
// implied permissions.
// E.g. ViewCustomerGroup is implied by ManageCustomerGroup.
export const getImpliedPermissions = (
  permissions: TPermissionName[]
): TPermissionName[] => {
  const viewPermissions = permissions.filter(permission =>
    permission.startsWith('View')
  );
  const impliedPermissions = viewPermissions.filter(viewPermission =>
    permissions.includes(viewPermission.replace('View', 'Manage'))
  );

  return impliedPermissions;
};

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
  // Then checking if a view permission is inferred as a manage permission
  doesManagePermissionInferViewPermission(
    demandedPermission,
    actualPermissions || {}
  );

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

type TGetHasDemandedDataFenceOptions = {
  actualDataFence: TActualDataFence;
  demandedDataFence: TDemandedDataFence;
  selectDataFenceData?: TSelectDataFenceData;
};
const getHasDemandedDataFence = (
  options: TGetHasDemandedDataFenceOptions
): boolean => {
  if (!options.selectDataFenceData) return false;

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

  // it is enough to only have a subset of demanded dataFence data belonging to actual dataFence values
  return selectedDataFenceData.some(value =>
    options.actualDataFence.dataFenceValue.values.includes(value)
  );
};

const getDataFenceByTypeAndGroup = (
  actualDataFences: TDataFences | null,
  demandedDataFenceType: string,
  demandedDataFenceGroup: string
) => {
  if (!actualDataFences) return null;

  if (demandedDataFenceType in actualDataFences) {
    switch (demandedDataFenceType) {
      case 'store': {
        const actualDataFence = actualDataFences[demandedDataFenceType];
        if (actualDataFence && demandedDataFenceGroup in actualDataFence) {
          return actualDataFence[demandedDataFenceGroup];
        }
        break;
      }
      default:
        break;
    }
  }
  return null;
};

const getIsPermissionOverwritingDataFence = (
  actualPermissions: TPermissions | null,
  demandedDataFence: TDemandedDataFence
) => {
  if (!actualPermissions) return false;

  /**
   * NOTE:
   *    A data fence relates, exists in relation to a general permission.
   *    This relation is constructed by the group of the data fence.
   *
   *    Given the user already has manage access on the data fence's group
   *     Then the data fence is overruled by it.
   *    Given the user _does not_ have manage access on the data fence's group
   *     Then the data fence itself takes precedence
   */
  const demandedPermissionByDataFence = `Manage${upperFirst(
    demandedDataFence.group
  )}`;

  if (hasExactPermission(demandedPermissionByDataFence, actualPermissions))
    return true;

  return false;
};

export const hasSomeDataFence = (options: TOptionsForAppliedDataFence) => {
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
      const actualDataFenceByTypeAndGroup = getDataFenceByTypeAndGroup(
        options.actualDataFences,
        demandedDataFence.type,
        demandedDataFence.group
      );

      if (!actualDataFenceByTypeAndGroup) return false;

      // we try to find if the demanded dataFence is available inside the actual datafences
      const specificActualDataFence = Object.entries(
        actualDataFenceByTypeAndGroup
      ).find(
        ([dataFenceName, dataFenceValue]) =>
          dataFenceValue && dataFenceName === toCanCase(demandedDataFence.name)
      );

      if (!specificActualDataFence) return false;

      const [dataFenceName, dataFenceValue] = specificActualDataFence;
      const actualDataFence = {
        name: dataFenceName,
        // we do the type casting because at this point we are sure that
        // specificActualDataFence.dataFenceValue is not null
        dataFenceValue: dataFenceValue as TActualDataFence['dataFenceValue'],
      };

      const isPermissionOverwritingDataFence = getIsPermissionOverwritingDataFence(
        options.actualPermissions,
        demandedDataFence
      );

      const hasDemandedDataFence = getHasDemandedDataFence({
        actualDataFence,
        demandedDataFence,
        selectDataFenceData: options.selectDataFenceData,
      });

      return !isPermissionOverwritingDataFence && hasDemandedDataFence;
    }
  );
};
