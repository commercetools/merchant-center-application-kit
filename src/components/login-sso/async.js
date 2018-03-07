import Loadable from 'react-loadable';
import ApplicationLoader from '../application-loader';

export default Loadable({
  loader: () => import('./login-sso' /* webpackChunkName: "login-sso" */),
  loading: ApplicationLoader,
});
