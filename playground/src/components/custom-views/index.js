import { lazy } from 'react';

export const CustomPanelDemo = lazy(() =>
  import('./custom-panel-demo' /* webpackChunkName: "custom-panel-demo" */)
);
