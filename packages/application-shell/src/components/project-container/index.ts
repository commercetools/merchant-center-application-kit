import { lazy } from 'react';

const ProjectContainer = lazy(
  () =>
    import('./project-container' /* webpackChunkName: "project-container" */)
);

export default ProjectContainer;
