import type {
  TAppliedPermission,
  TAppliedActionRight,
  TAppliedMenuVisibilities,
  TStoreDataFence,
} from '../../types/generated/mc';

// Menu visibilities
export type TMenuVisibilities = {
  [key: string]: boolean;
};

// Permissions
export type TPermissions = {
  [key: string]: boolean;
};

// Action rights
export type TActionRight = {
  [key: string]: boolean;
};
export type TActionRights = {
  [key: string]: TActionRight;
};

// Data fences
export type TDataFenceGroupedByPermission = {
  // E.g. { canManageOrders: { values: [] } }
  [key: string]: { values: string[] } | null;
};
export type TDataFenceGroupedByResourceType = {
  // E.g. { orders: {...} }
  [key: string]: TDataFenceGroupedByPermission | null;
};
export type TDataFenceStoresGroupByResourceType = {
  // E.g [ { group: 'orders', value: 'us', type: 'store', name: 'canManageOrders' } ]
  [key: string]: TStoreDataFence[];
};
export type TDataFenceType = 'store';
export type TDataFences = Partial<
  Record<TDataFenceType, TDataFenceGroupedByResourceType>
>;

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
  allAppliedPermissions?: TAppliedPermission[]
): TPermissions | null => {
  if (!allAppliedPermissions || allAppliedPermissions.length === 0) {
    return null;
  }
  return allAppliedPermissions.reduce<TPermissions>(
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

export const normalizeAllAppliedMenuVisibilities = (
  allAppliedMenuVisibilities?: TAppliedMenuVisibilities[]
): TMenuVisibilities | null => {
  if (!allAppliedMenuVisibilities || allAppliedMenuVisibilities.length === 0) {
    return null;
  }
  return allAppliedMenuVisibilities.reduce<TMenuVisibilities>(
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

export const normalizeAllAppliedActionRights = (
  allAppliedActionRights?: TAppliedActionRight[]
): TActionRights | null => {
  if (!allAppliedActionRights || allAppliedActionRights.length === 0) {
    return null;
  }
  return allAppliedActionRights.reduce<TActionRights>(
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

const normalizeAppliedDataFencesForStoresByResourceType = (
  dataFences: TStoreDataFence[]
): TDataFenceGroupedByResourceType => {
  const groupedByResourceType =
    dataFences.reduce<TDataFenceStoresGroupByResourceType>(
      (previousGroupsOfSameType, appliedDataFence) => {
        if (!appliedDataFence) return previousGroupsOfSameType;
        const previousGroup = previousGroupsOfSameType[appliedDataFence.group];
        return {
          ...previousGroupsOfSameType,
          [appliedDataFence.group]: [
            ...(previousGroup || []),
            appliedDataFence,
          ],
        };
      },
      {}
    );
  return Object.entries(
    groupedByResourceType
  ).reduce<TDataFenceGroupedByResourceType>(
    (previousGroupedByResourceType, [resourceType, dataFences]) => {
      const groupByDataFenceName =
        dataFences.reduce<TDataFenceGroupedByPermission>(
          (nextDataFenceValues, dataFence) => {
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
          },
          {}
        );
      return {
        ...previousGroupedByResourceType,
        [resourceType]: groupByDataFenceName,
      };
    },
    {}
  );
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

export const normalizeAllAppliedDataFences = (
  allAppliedDataFences?: TStoreDataFence[]
): TDataFences | null => {
  if (!allAppliedDataFences || allAppliedDataFences.length === 0) {
    return null;
  }
  const groupedByType =
    allAppliedDataFences.reduce<TDataFenceStoresGroupByResourceType>(
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

  if (Object.keys(normalizedDataFences).length > 0)
    return normalizedDataFences as TDataFences;

  return null;
};
