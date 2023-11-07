import type { ReactNode } from 'react';
import { ApolloClient, type NormalizedCacheObject } from '@apollo/client';
import type { RenderResult } from '@testing-library/react';
import {
  CustomViewContextProvider,
  type TProviderProps,
} from '@commercetools-frontend/application-shell-connectors';
import {
  CUSTOM_VIEW_HOST_ENTRY_POINT_URI_PATH,
  type CustomViewData,
} from '@commercetools-frontend/constants';
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
  projectAllAppliedPermissions?: { name: string; value: boolean }[];
  customViewHostUrl?: string;
  customViewConfig?: Partial<CustomViewData>;
  apolloClient?: ApolloClient<NormalizedCacheObject>;
  environment: Partial<TProviderProps<{}>['environment']>;
  user: Partial<TProviderProps<{}>['user']>;
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
      apolloClient: props.apolloClient,
      locale: props.locale,
      project: {
        key: props.projectKey,
        allAppliedPermissions: props.projectAllAppliedPermissions || [],
      },
      environment: {
        ...(props.environment || {}),
        entryPointUriPath: CUSTOM_VIEW_HOST_ENTRY_POINT_URI_PATH,
      },
      user: props.user,
    }
  );
};
