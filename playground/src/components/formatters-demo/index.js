import { lazy } from 'react';

const FormattersDemo = lazy(
  () => import('./formatters-demo' /* webpackChunkName: "formatters-demo" */)
);

export default FormattersDemo;
