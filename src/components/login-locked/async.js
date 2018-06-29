import Loadable from 'react-loadable';
import AsyncChunkLoader from '../async-chunk-loader';

export default Loadable({
  loader: () => import('./login-locked' /* webpackChunkName: "login-locked" */),
  loading: AsyncChunkLoader,
});
