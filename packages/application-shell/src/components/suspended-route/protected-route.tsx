import { Route, RouteProps } from 'react-router-dom';
import { PageUnauthorized } from '@commercetools-frontend/application-components';

type TProtectedRouteProps = {
  condition: boolean;
} & RouteProps;

const ProtectedRoute: React.FC<TProtectedRouteProps> = ({
  condition,
  children,
  ...routeProps
}) => {
  return condition ? (
    <Route {...routeProps}>{children}</Route>
  ) : (
    <PageUnauthorized />
  );
};

export { ProtectedRoute, type TProtectedRouteProps };
