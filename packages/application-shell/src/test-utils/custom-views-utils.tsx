import { type ReactNode } from 'react';
import { type RenderResult } from '@testing-library/react';
import { CustomViewContextProvider } from '@commercetools-frontend/application-shell-connectors/src/components/custom-view-context';
import type { CustomViewData } from '@commercetools-frontend/constants';
import { TCustomViewType } from '../types/generated/settings';
import { renderApp } from './test-utils';

const testCustomViewData: CustomViewData = {
  id: 'custom-view-id',
  defaultLabel: 'My View',
  labelAllLocales: [],
  url: 'https://my-view.com',
  type: TCustomViewType.CustomPanel,
  locators: ['products.product_details.general'],
  permissions: [
    {
      name: 'view',
      oAuthScopes: ['view_products'],
    },
  ],
};

type TRenderCustomViewParams = {
  locale: string;
  projectKey?: string;
  customViewHostUrl?: string;
  customViewConfig?: Partial<CustomViewData>;
  children: ReactNode;
};

export const renderCustomView = (
  props: TRenderCustomViewParams
): RenderResult => {
  return renderApp(
    <CustomViewContextProvider
      hostUrl={
        props.customViewHostUrl ??
        'https://mc.ct.com/my-project/products/product-id-1'
      }
      customViewConfig={{ ...testCustomViewData, ...props.customViewConfig }}
    >
      {props.children}
    </CustomViewContextProvider>,
    {
      locale: props.locale,
      project: {
        key: props.projectKey,
      },
    }
  );
};
