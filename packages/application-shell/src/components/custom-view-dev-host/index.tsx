import { lazy } from 'react';

const CustomViewDevHost = lazy(
  () =>
    import(
      './custom-view-dev-host' /* webpackChunkName: "custom-view-dev-host" */
    )
);

export default CustomViewDevHost;
