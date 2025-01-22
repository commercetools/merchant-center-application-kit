import { lazy } from 'react';
import type { ApplicationWindow } from '@commercetools-frontend/constants';

declare let window: ApplicationWindow;

const CustomViewSelector = lazy(() => {
  if (typeof window !== 'undefined' && typeof window.app !== 'undefined') {
    return import(
      './custom-views-selector' /* webpackChunkName: "custom-views-selector" */
    );
  }
  return Promise.resolve({ default: () => null });
});

export default CustomViewSelector;
