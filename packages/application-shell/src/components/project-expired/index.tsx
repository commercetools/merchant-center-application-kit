import { lazy } from 'react';

const ProjectExpired = lazy(
  () => import('./project-expired' /* webpackChunkName: "project-expired" */)
);

export default ProjectExpired;
