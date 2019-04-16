import React from 'react';

const ProjectNotInitialized = React.lazy(() =>
  import(
    './project-not-initialized' /* webpackChunkName: "project-not-initialzied" */
  )
);

export { ProjectNotInitialized as default };
