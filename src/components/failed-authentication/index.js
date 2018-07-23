import Loadable from 'react-loadable';
import AsyncChunkLoader from '../async-chunk-loader';

const FailedAuthentication = Loadable({
  loader: () =>
    import('./failed-authentication' /* webpackChunkName: "failed-authentication" */),
  loading: AsyncChunkLoader,
});

export { FailedAuthentication as default };
