import {
  Maybe,
  TFetchProjectQuery,
  TStoreDataFence,
} from '../../types/generated/mc';

/**
 * NOTE:
 *
 * Permissions and menu visibilities are being fetched though the `allAppliedPermissions`
 * and the `allAppliedMenuVisibilities` which both return an array of `{ name: string, value: boolean }`.
 * This gives more flexibility to introduce new values to apps without having to release
 * the merchant-center-app-kit by adding/exposing them from the mc-be (our proxy service).
 *
 * The application below however expects both permissions an menu visibilities to be of the shape
 * `[name: string]: boolean` which is what the shape above is mapped into here. This object shape is easier
 * to work with in application level code (while be a non breaking change to other packages) as you can just
 * do `canViewProducts`.
 *
 * This function considering its concern belongs into the `permissions` package. However,
 * for now it doesn't have to be shared and as a result can be co-located with
 * the fetching logic. Given this mapping needs to be used elsewere feel free
 * to move this over to `permissions` and export it there.
 */
export const normalizeAllAppliedPermissions = (
  project: TFetchProjectQuery['project']
) => {
  if (!project) return null;
  const allAppliedPermissions = project.allAppliedPermissions;
  if (!allAppliedPermissions || allAppliedPermissions.length === 0) {
    return null;
  }
  return allAppliedPermissions.reduce((transformedAllApplied, allApplied) => {
    if (!allApplied) return transformedAllApplied;
    return {
      ...transformedAllApplied,
      [allApplied.name]: allApplied.value,
    };
  }, {});
};

export const normalizeAllAppliedMenuVisibilities = (
  project: TFetchProjectQuery['project']
) => {
  if (!project) return null;
  const allAppliedMenuVisibilities = project.allAppliedMenuVisibilities;
  if (!allAppliedMenuVisibilities || allAppliedMenuVisibilities.length === 0) {
    return null;
  }
  return allAppliedMenuVisibilities.reduce(
    (transformedAllApplied, allApplied) => {
      if (!allApplied) return transformedAllApplied;
      return {
        ...transformedAllApplied,
        [allApplied.name]: allApplied.value,
      };
    },
    {}
  );
};

type TActionRight = {
  [key: string]: boolean;
};
type NormalizedActionRights = {
  [key: string]: TActionRight;
};

export const normalizeAllAppliedActionRights = (
  project: TFetchProjectQuery['project']
) => {
  if (!project) return null;
  const allAppliedActionRights = project.allAppliedActionRights;
  if (!allAppliedActionRights || allAppliedActionRights.length === 0) {
    return null;
  }
  return allAppliedActionRights.reduce<NormalizedActionRights>(
    (transformedAllApplied, allApplied) => {
      if (!allApplied) return transformedAllApplied;
      const previousAllAppliedGroup = transformedAllApplied[allApplied.group];
      return {
        ...transformedAllApplied,
        [allApplied.group]: {
          ...previousAllAppliedGroup,
          [allApplied.name]: allApplied.value,
        },
      };
    },
    {}
  );
};

type NormalizedGroupedByPermission = {
  // E.g. { canManageOrders: { values: [] } }
  [key: string]: { values: string[] } | null;
};
type NormalizedGroupedByResourceType = {
  // E.g. { orders: {...} }
  [key: string]: NormalizedGroupedByPermission | null;
};
/**
 * dataFence: {
 *   store: {
 *     orders: {
 *       canManageOrders: { values: ['usa', 'germany'] },
 *       canViewOrders: { values: ['canada'] },
 *     }
 *   }
 * }
 */
type NormalizedStoresGroupByResourceType = {
  [key: string]: TStoreDataFence[];
};

const normalizeAppliedDataFencesForStoresByResourceType = (
  dataFences: Maybe<TStoreDataFence>[]
) => {
  const groupedByResourceType = dataFences.reduce<
    NormalizedStoresGroupByResourceType
  >((previousGroupsOfSameType, appliedDataFence) => {
    if (!appliedDataFence) return previousGroupsOfSameType;
    const previousGroup = previousGroupsOfSameType[appliedDataFence.group];
    return {
      ...previousGroupsOfSameType,
      [appliedDataFence.group]: [...(previousGroup || []), appliedDataFence],
    };
  }, {});
  return Object.entries(groupedByResourceType).reduce<
    NormalizedGroupedByResourceType
  >((previousGroupedByResourceType, [resourceType, dataFences]) => {
    const groupByDataFenceName = dataFences.reduce<
      NormalizedGroupedByPermission
    >((nextDataFenceValues, dataFence) => {
      const dataFenceByName = nextDataFenceValues[dataFence.name] || {
        values: [],
      };
      return {
        ...nextDataFenceValues,
        [dataFence.name]: {
          ...dataFenceByName,
          values: [...dataFenceByName.values, dataFence.value],
        },
      };
    }, {});
    return {
      ...previousGroupedByResourceType,
      [resourceType]: groupByDataFenceName,
    };
  }, {});
};

// input:
// [
//   {
//     type: 'store',
//     name: 'canManageOrders',
//     value: 'usa',
//     group: 'orders',
//   },
//   {
//     type: 'store',
//     name: 'canManageOrders',
//     value: 'germany',
//     group: 'orders',
//   },
//   {
//     type: 'store',
//     name: 'canViewOrders',
//     value: 'canada',
//     group: 'orders',
//   },
// ]
// output:
// {
//   store: {
//     orders: {
//       canManageOrders: { values: ['usa', 'germany'] },
//       canViewOrders: { values: ['canada'] },
//     }
//   }
// }

type NormalizedGroupByType = {
  [key: string]: Maybe<TStoreDataFence>[];
};

export const normalizeAllAppliedDataFences = (
  project: TFetchProjectQuery['project']
) => {
  if (!project) return null;
  const allAppliedDataFences = project.allAppliedDataFences;
  if (!allAppliedDataFences || allAppliedDataFences.length === 0) {
    return null;
  }
  const groupedByType = allAppliedDataFences.reduce<NormalizedGroupByType>(
    (previousGroupsOfSameType, appliedDataFence) => {
      if (!appliedDataFence) return previousGroupsOfSameType;
      const previousGroup = previousGroupsOfSameType[appliedDataFence.type];
      return {
        ...previousGroupsOfSameType,
        [appliedDataFence.type]: [...(previousGroup || []), appliedDataFence],
      };
    },
    {}
  );
  const normalizedDataFences = {
    ...('store' in groupedByType
      ? {
          store: normalizeAppliedDataFencesForStoresByResourceType(
            groupedByType.store
          ),
        }
      : {}),
  };
  return Object.keys(normalizedDataFences).length > 0
    ? normalizedDataFences
    : null;
};
