import type { TFetchProjectQuery } from '../../types/generated/mc';

import {
  normalizeAllAppliedActionRights,
  normalizeAllAppliedMenuVisibilities,
  normalizeAllAppliedPermissions,
  normalizeAllAppliedDataFences,
} from './normalizers';

const createTestProject = (
  custom: Partial<TFetchProjectQuery['project']> = {}
): TFetchProjectQuery['project'] => ({
  key: 'foo-1',
  version: 1,
  name: 'Foo 1',
  countries: ['us'],
  currencies: ['USD'],
  languages: ['en'],
  allAppliedPermissions: [],
  allAppliedActionRights: [],
  allAppliedDataFences: [],
  allAppliedMenuVisibilities: [],
  // Fields that should not be exposed
  initialized: true,
  expiry: {
    isActive: false,
    daysLeft: undefined,
  },
  suspension: {
    isActive: false,
    reason: undefined,
  },
  owner: { id: 'o1' },
  ...custom,
});

describe('normalizeAllAppliedPermissions', () => {
  const project = createTestProject({
    allAppliedPermissions: [
      {
        name: 'canManageProjectSettings',
        value: true,
      },
    ],
  });

  it('should normalize permissions', () => {
    expect(normalizeAllAppliedPermissions(project)).toEqual(
      expect.objectContaining({
        canManageProjectSettings: true,
      })
    );
  });
});
describe('normalizeAllAppliedActionRights', () => {
  const project = createTestProject({
    allAppliedActionRights: [
      {
        group: 'products',
        name: 'canEditPrices',
        value: true,
      },
    ],
  });

  it('should normalize action rights', () => {
    expect(normalizeAllAppliedActionRights(project)).toEqual(
      expect.objectContaining({
        products: { canEditPrices: true },
      })
    );
  });
});
describe('normalizeAllAppliedMenuVisibilities', () => {
  const project = createTestProject({
    allAppliedMenuVisibilities: [
      {
        name: 'hideDashboard',
        value: true,
      },
    ],
  });

  it('should normalize menu visibilities', () => {
    expect(normalizeAllAppliedMenuVisibilities(project)).toEqual(
      expect.objectContaining({
        hideDashboard: true,
      })
    );
  });
});
describe('normalizeAllAppliedDataFences', () => {
  describe('with store types', () => {
    const project = createTestProject({
      allAppliedDataFences: [
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
      ],
    });
    it('should normalized the data fences of type "store"', () => {
      expect(normalizeAllAppliedDataFences(project)).toEqual({
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
