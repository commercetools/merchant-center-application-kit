import React from 'react';

const ProjectSuspended = React.lazy(
  import('./project-suspended' /* webpackChunkName: "project-suspended" */)
);

export { ProjectSuspended as default };
