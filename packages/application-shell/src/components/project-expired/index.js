import Loadable from 'react-loadable';
import AsyncChunkLoader from '../async-chunk-loader';

const ProjectExpired = Loadable({
  loader: () =>
    import('./project-expired' /* webpackChunkName: "project-expired" */),
  loading: AsyncChunkLoader,
});

export { ProjectExpired as default };
