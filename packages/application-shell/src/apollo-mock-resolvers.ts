import { entryPointUriPathToResourceAccesses } from '@commercetools-frontend/application-config/ssr';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const customViewId1 = '290f83df-d86d-417c-ab24-41697e33483c';
export const customView1 = {
  id: customViewId1,
  defaultLabel: 'Custom View A',
  labelAllLocales: [],
  url: `http://localhost:3001/custom-view/${customViewId1}`,
  type: 'CustomPanel',
  typeSettings: {
    size: 'SMALL',
  },
  locators: ['products.product_details.general'],
  permissions: [
    {
      name: entryPointUriPathToResourceAccesses(customViewId1).view,
      oAuthScopes: ['view_products'],
    },
  ],
};

const customViewId2 = 'fa4f5d0c-3ca4-47d5-afec-cee9a1f18313';
export const customView2 = {
  id: customViewId2,
  defaultLabel: 'Custom View B',
  labelAllLocales: [],
  url: `http://localhost:3001/custom-view/${customViewId2}`,
  type: 'CustomPanel',
  typeSettings: {
    size: 'SMALL',
  },
  locators: ['products.product_details.general'],
  permissions: [
    {
      name: entryPointUriPathToResourceAccesses(customViewId2).view,
      oAuthScopes: ['view_products'],
    },
  ],
};

const customViewId3 = 'fa4f5d0c-3ca4-47d5-afec-cee9a1f18313';
export const customView3 = {
  id: customViewId3,
  defaultLabel: 'Custom View C',
  labelAllLocales: [],
  url: `http://localhost:3001/custom-view/${customViewId3}`,
  type: 'CustomPanel',
  typeSettings: {
    size: 'SMALL',
  },
  locators: ['products.product_details.variants'],
  permissions: [
    {
      name: entryPointUriPathToResourceAccesses(customViewId3).view,
      oAuthScopes: ['view_products'],
    },
  ],
};
const allMockedCustomViews = [customView1, customView2, customView3];

export const mockResolvers = {
  Query: {
    allCustomViewsInstallationsByLocator: async (
      _: unknown,
      args: { locator: string }
    ) => {
      await wait(1000);
      return allMockedCustomViews
        .filter((customView) => customView.locators.includes(args.locator))
        .map((customView) => ({
          id: Date.now().toString(),
          customView,
        }));
    },
  },
};
