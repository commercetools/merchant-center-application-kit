import PropTypes from 'prop-types';
import { Suspense } from 'react';
import { Route } from 'react-router-dom';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

const SuspendedRoute = (props) => (
  <Route {...props}>
    <Suspense fallback={<LoadingSpinner />}>{props.children}</Suspense>
  </Route>
);

SuspendedRoute.displayName = 'SuspendedRoute';
SuspendedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SuspendedRoute;
