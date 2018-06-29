import Loadable from 'react-loadable';
import AsyncChunkLoader from '../async-chunk-loader';

export default Loadable({
  loader: () =>
    import('./login-sso-callback' /* webpackChunkName: "login-sso-callback" */),
  loading: AsyncChunkLoader,
});
