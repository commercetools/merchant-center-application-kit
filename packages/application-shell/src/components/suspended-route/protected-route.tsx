import { Route, RouteProps } from "react-router-dom";
import { PageUnauthorized } from "@commercetools-frontend/application-components";

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
