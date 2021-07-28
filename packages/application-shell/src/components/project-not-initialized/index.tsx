import { lazy } from 'react';

const ProjectNotInitialized = lazy(
  () =>
    import(
      './project-not-initialized' /* webpackChunkName: "project-not-initialized" */
    )
);

export default ProjectNotInitialized;
