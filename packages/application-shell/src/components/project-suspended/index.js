import Loadable from 'react-loadable';
import AsyncChunkLoader from '../async-chunk-loader';

const ProjectSuspended = Loadable({
  loader: () =>
    import('./project-suspended' /* webpackChunkName: "project-suspended" */),
  loading: AsyncChunkLoader,
});

export { ProjectSuspended as default };
