import Loadable from 'react-loadable';
import AsyncChunkLoader from '../async-chunk-loader';

export default Loadable({
  loader: () => import('./index' /* webpackChunkName: "login-sso" */),
  loading: AsyncChunkLoader,
});
