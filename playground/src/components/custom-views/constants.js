import { entryPointUriPathToResourceAccesses } from '@commercetools-frontend/application-shell/ssr';

export const CUSTOM_VIEW_ID = '290f83df-d86d-417c-ab24-41697e33483c';

const permissionKeys = entryPointUriPathToResourceAccesses(CUSTOM_VIEW_ID);

export const DEMO_CUSTOM_VIEW = {
  id: CUSTOM_VIEW_ID,
  defaultLabel: 'Demo Custom View',
  labelAllLocales: [],
  url: `http://localhost:3001/custom-view/${CUSTOM_VIEW_ID}`,
  type: 'CustomPanel',
  typeSettings: {
    size: 'SMALL',
  },
  locators: ['products.product_details.general'],
  permissions: [
    {
      name: permissionKeys.view,
      oAuthScopes: ['view_products'],
    },
  ],
};
