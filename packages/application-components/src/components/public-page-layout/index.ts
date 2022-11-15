import { lazy } from 'react';

const PublicPageLayout = lazy(
  () =>
    import('./public-page-layout' /* webpackChunkName: "public-page-layout" */)
);

export default PublicPageLayout;
