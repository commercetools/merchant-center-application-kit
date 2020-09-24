export type TGroupedByPermission = {
  // E.g. { canManageOrders: { values: [] } }
  [key: string]: { values: string[] } | null;
};
export type TGroupedByResourceType = {
  // E.g. { orders: {...} }
  [key: string]: TGroupedByPermission | null;
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
export type TDataFenceType = 'store';
export type TStoreDataFences = Partial<
  Record<TDataFenceType, TGroupedByResourceType>
>;

export type TAppliedStoreDataFencesGraphql = {
  __typename: 'StoreDataFence';
  name: string;
  value: string;
  group: string;
  type: string;
}[];
