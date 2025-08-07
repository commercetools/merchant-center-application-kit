import { ReactNode } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { PageUnauthorized } from '@commercetools-frontend/application-components';

type TProtectedRouteProps = {
  condition: boolean;
  fallback?: React.ReactNode;
} & RouteProps;

const ProtectedRoute: React.FC<TProtectedRouteProps> = ({
  condition,
  fallback = <PageUnauthorized />,
  children,
  ...routeProps
}) => {
  return condition ? (
    <Route {...routeProps}>{children}</Route>
  ) : (
    <>{fallback}</>
  );
};

export { ProtectedRoute, type TProtectedRouteProps };

export type TProtectedProps = {
  condition: boolean;
  children: ReactNode;
  fallback?: ReactNode;
};

export function Protected(props: TProtectedProps) {
  return props.condition ? (
    <>{props.children}</>
  ) : (
    <>{props.fallback || <PageUnauthorized />}</>
  );
}
