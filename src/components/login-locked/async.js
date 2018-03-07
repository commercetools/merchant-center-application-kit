import Loadable from 'react-loadable';
import ApplicationLoader from '../application-loader';

export default Loadable({
  loader: () => import('./login-locked' /* webpackChunkName: "login-locked" */),
  loading: ApplicationLoader,
});
