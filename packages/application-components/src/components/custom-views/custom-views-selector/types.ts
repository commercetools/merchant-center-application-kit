import type { CustomViewData } from '@commercetools-frontend/constants';

export type TCustomViewLocatorCodeLocationDescriptor = {
  pathname?: string;
  search?: string;
};
export type TCustomViewLocatorCode =
  | string
  | TCustomViewLocatorCodeLocationDescriptor;

export type TCustomViewSelectorProps = {
  onCustomViewsResolved?: (customViews: CustomViewData[]) => void;
  customViewLocatorCodes?: Record<string, TCustomViewLocatorCode>;
  margin?: string;
};
