import React from 'react';

const ProjectNotFound = React.lazy(() =>
  import('./project-not-found' /* webpackChunkName: "project-not-found" */)
);

export { ProjectNotFound as default };
