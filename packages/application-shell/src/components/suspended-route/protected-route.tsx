import { Route as LegacyRoute, RouteProps } from 'react-router-dom';
import { CompatRoute as Route } from 'react-router-dom-v5-compat';
import { PageUnauthorized } from '@commercetools-frontend/application-components';

type TProtectedRouteProps = {
  condition: boolean;
  fallback?: React.ReactNode;
  element?: React.ReactNode;
  compat?: boolean;
} & RouteProps;

const ProtectedRoute: React.FC<TProtectedRouteProps> = ({
  condition,
  fallback = <PageUnauthorized />,
  children,
  compat = false,
  ...routeProps
}) => {
  const RouteComponent = compat ? Route : LegacyRoute;
  return condition ? (
    <RouteComponent {...routeProps}>{children}</RouteComponent>
  ) : (
    <>{fallback}</>
  );
};

export { ProtectedRoute, type TProtectedRouteProps };
