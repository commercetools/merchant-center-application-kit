import { lazy } from 'react';

const ProjectNotFound = lazy(
  () =>
    import('./project-not-found' /* webpackChunkName: "project-not-found" */)
);

export default ProjectNotFound;
