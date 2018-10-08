import Loadable from 'react-loadable';
import AsyncChunkLoader from '../async-chunk-loader';

const ProjectNotFound = Loadable({
  loader: () =>
    import('./project-not-found' /* webpackChunkName: "project-not-found" */),
  loading: AsyncChunkLoader,
});

export { ProjectNotFound as default };
