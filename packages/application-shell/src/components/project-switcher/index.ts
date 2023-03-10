import { lazy } from 'react';

const ProjectSwitcher = lazy(
  () => import('./project-switcher' /* webpackChunkName: "project-switcher" */)
);

export default ProjectSwitcher;
