import { BrowserRouter, StaticRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const isBrowser = typeof window !== 'undefined';
// During Gatsby's build time browser API is not available and BrowserRouter can't be used. For that step StaticRouter has to be plugged in.
const Router = isBrowser ? BrowserRouter : StaticRouter;

const RouterWrapper = (props) => {
  return <Router>{props.children}</Router>;
};
RouterWrapper.displayName = 'RouterWrapper';
RouterWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RouterWrapper;
