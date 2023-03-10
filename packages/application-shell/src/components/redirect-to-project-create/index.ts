import { lazy } from 'react';

const RedirectToProjectCreate = lazy(
  () =>
    import(
      './redirect-to-project-create' /* webpackChunkName: "redirect-to-project-create" */
    )
);

export default RedirectToProjectCreate;
