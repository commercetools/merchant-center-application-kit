import type { TProviderProps } from '@commercetools-frontend/application-shell-connectors';

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import invariant from 'tiny-invariant';
import RouteCatchAll from '../route-catch-all';

type Props<AdditionalEnvironmentProperties extends {}> = {
  environment: TProviderProps<AdditionalEnvironmentProperties>['environment'];
  render?: () => JSX.Element;
  children?: React.ReactNode;
};

const ApplicationEntryPoint = <AdditionalEnvironmentProperties extends {}>(
  props: Props<AdditionalEnvironmentProperties>
) => {
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
          {props.children}
        </Route>
        {/* Catch-all route */}
        <RouteCatchAll />
      </Switch>
    );
  }

  // We still support the `render` prop, for backwards compatibility
  // and for having more control in certain cases (mostly to some of our internal apps).
  if (props.render) {
    return <>{props.render()}</>;
  }

  // The `render` props is still required (backwards compatibility).
  invariant(
    !props.render,
    '@commercetools-frontend/application-shell: Missing required prop "render".'
  );
  return null;
};

export default ApplicationEntryPoint;
