import { lazy } from 'react';

const ProjectSuspended = lazy(
  () =>
    import('./project-suspended' /* webpackChunkName: "project-suspended" */)
);

export default ProjectSuspended;
