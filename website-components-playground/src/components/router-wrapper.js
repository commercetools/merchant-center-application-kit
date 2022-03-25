import { BrowserRouter, StaticRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const RouterWrapper = (props) => {
  const isBrowser = typeof window !== 'undefined';
  // Some pages are rendered using SSR. Therefore, we need to use the `StaticRouter` instead of the normal `BrowserRouter`.
  const Router = isBrowser ? BrowserRouter : StaticRouter;
  return <Router>{props.children}</Router>;
};
RouterWrapper.displayName = 'RouterWrapper';
RouterWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RouterWrapper;
