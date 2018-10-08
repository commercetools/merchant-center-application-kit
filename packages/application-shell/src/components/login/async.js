import Loadable from 'react-loadable';
import AsyncChunkLoader from '../async-chunk-loader';

export default Loadable({
  loader: () => import('./login' /* webpackChunkName: "login" */),
  loading: AsyncChunkLoader,
});
