import React from 'react';

const ProjectNotInitialized = React.lazy(() =>
  import(
    './project-not-initialized' /* webpackChunkName: "project-not-initialized" */
  )
);

export { ProjectNotInitialized as default };
