import type { TProviderProps } from '@commercetools-frontend/application-shell-connectors';

import { Children, ReactNode } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import invariant from 'tiny-invariant';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import { PageUnauthorized } from '@commercetools-frontend/application-components';
import { entryPointUriPathToPermissionKeys } from '@commercetools-frontend/application-config/ssr';
import RouteCatchAll from '../route-catch-all';

type TApplicationEntryPointProps = {
  environment: TProviderProps<{}>['environment'];
  disableRoutePermissionCheck?: boolean;
  render?: () => JSX.Element;
  children?: ReactNode;
};

const ApplicationRouteWithPermissionCheck = (
  props: TApplicationEntryPointProps
) => {
  const permissionKeys = entryPointUriPathToPermissionKeys(
    props.environment.entryPointUriPath
  );
  // Require View permission to render the application.
  const canView = useIsAuthorized({
    demandedPermissions: [permissionKeys.View],
  });

  if (canView) {
    return <>{Children.only<ReactNode>(props.children)}</>;
  }
  return <PageUnauthorized />;
};

const ApplicationRoute = (props: TApplicationEntryPointProps) => {
  if (props.disableRoutePermissionCheck) {
    return <>{Children.only<ReactNode>(props.children)}</>;
  }

  return <ApplicationRouteWithPermissionCheck {...props} />;
};

const ApplicationEntryPoint = (props: TApplicationEntryPointProps) => {
  // If the `children` prop is used (instead of the `render` prop),
  // we pre-configure the application entry point routes to avoid
  // users to do so on their own.
  if (props.children) {
    const entryPointUriPath = props.environment.entryPointUriPath;
    return (
      <Switch>
        {
          // For development, it's useful to redirect to the actual
          // application routes when you open the browser at http://localhost:3001
          process.env.NODE_ENV === 'production' ? null : (
            <Redirect
              exact={true}
              from="/:projectKey"
              to={`/:projectKey/${entryPointUriPath}`}
            />
          )
        }
        <Route path={`/:projectKey/${entryPointUriPath}`}>
          <ApplicationRoute {...props} />
        </Route>
        {/* Catch-all route */}
        <RouteCatchAll />
      </Switch>
    );
  }

  // We still support the `render` prop, for backwards compatibility
  // and for having more control in certain cases (mostly to some of our internal apps).
  if (props.render && typeof props.render === 'function') {
    return <>{props.render()}</>;
  }

  // The `render` prop function is still required (backwards compatibility).
  invariant(
    !props.render,
    '@commercetools-frontend/application-shell: Missing required function prop "render".'
  );
  return null;
};

export default ApplicationEntryPoint;
