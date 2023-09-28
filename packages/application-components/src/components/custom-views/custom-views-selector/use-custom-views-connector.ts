import { useEffect, useState } from 'react';
import { entryPointUriPathToResourceAccesses } from '@commercetools-frontend/application-config/ssr';
import { TCustomView } from '../../../types/generated/settings';

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
  locators: ['products.product-details.general'],
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
  locators: ['products.product-details.general'],
  permissions: [
    {
      name: entryPointUriPathToResourceAccesses(customViewId2).view,
      oAuthScopes: ['view_products'],
    },
  ],
};
const customViewsStore = [customView1, customView2];

type TUseCustomViewsFetcherParams = {
  customViewLocatorCode?: string;
};
type TUseCustomViewsFetcher = (props: TUseCustomViewsFetcherParams) => {
  customViews: TCustomView[];
  error?: Error;
  loading: boolean;
};

export const useCustomViewsConnector: TUseCustomViewsFetcher = ({
  customViewLocatorCode,
}) => {
  const [customViews, setCustomViews] = useState<TCustomView[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error] = useState<Error | undefined>(undefined);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // @ts-ignore
      setCustomViews(
        customViewsStore.filter((customView) =>
          customView.locators.includes(customViewLocatorCode || '')
        )
      );
      setLoading(false);
    }, 1000);
  }, [customViewLocatorCode]);

  return {
    // @ts-ignore
    customViews,
    error,
    loading,
  };
};
