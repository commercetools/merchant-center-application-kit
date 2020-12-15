import type {
  TAppliedPermission,
  TAppliedActionRight,
  TAppliedMenuVisibilities,
  TStoreDataFence,
} from '../../types/generated/mc';

import {
  normalizeAllAppliedActionRights,
  normalizeAllAppliedMenuVisibilities,
  normalizeAllAppliedPermissions,
  normalizeAllAppliedDataFences,
} from './normalizers';

describe('normalizeAllAppliedPermissions', () => {
  const allAppliedPermissions: TAppliedPermission[] = [
    {
      name: 'canManageProjectSettings',
      value: true,
    },
  ];
  it('should normalize permissions', () => {
    expect(normalizeAllAppliedPermissions(allAppliedPermissions)).toEqual(
      expect.objectContaining({
        canManageProjectSettings: true,
      })
    );
  });
});
describe('normalizeAllAppliedActionRights', () => {
  const allAppliedActionRights: TAppliedActionRight[] = [
    {
      group: 'products',
      name: 'canEditPrices',
      value: true,
    },
  ];
  it('should normalize action rights', () => {
    expect(normalizeAllAppliedActionRights(allAppliedActionRights)).toEqual(
      expect.objectContaining({
        products: { canEditPrices: true },
      })
    );
  });
});
describe('normalizeAllAppliedMenuVisibilities', () => {
  const allAppliedMenuVisibilities: TAppliedMenuVisibilities[] = [
    {
      name: 'hideDashboard',
      value: true,
    },
  ];
  it('should normalize menu visibilities', () => {
    expect(
      normalizeAllAppliedMenuVisibilities(allAppliedMenuVisibilities)
    ).toEqual(
      expect.objectContaining({
        hideDashboard: true,
      })
    );
  });
});
describe('normalizeAllAppliedDataFences', () => {
  describe('with store types', () => {
    const allAppliedDataFences: TStoreDataFence[] = [
      {
        __typename: 'StoreDataFence',
        value: 'usa',
        type: 'store',
        group: 'orders',
        name: 'canManageOrders',
      },
      {
        __typename: 'StoreDataFence',
        value: 'germany',
        type: 'store',
        group: 'orders',
        name: 'canManageOrders',
      },
      {
        __typename: 'StoreDataFence',
        value: 'canada',
        type: 'store',
        group: 'orders',
        name: 'canViewOrders',
      },
    ];
    it('should normalized the data fences of type "store"', () => {
      expect(normalizeAllAppliedDataFences(allAppliedDataFences)).toEqual({
        store: {
          orders: {
            canManageOrders: {
              values: ['usa', 'germany'],
            },
            canViewOrders: {
              values: ['canada'],
            },
          },
        },
      });
    });
  });
});
