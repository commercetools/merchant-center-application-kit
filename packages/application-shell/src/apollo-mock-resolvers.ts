import { entryPointUriPathToResourceAccesses } from '@commercetools-frontend/application-config/ssr';

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

export const mockResolvers = {
  Query: {
    allCustomViewsInstallationsByLocator: () => {
      return [
        { id: Date.now().toString(), customView: customView1 },
        { id: Date.now().toString(), customView: customView2 },
      ];
    },
  },
};
