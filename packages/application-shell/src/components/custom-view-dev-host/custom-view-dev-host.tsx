import { type ReactNode, useState } from 'react';
import { Route, Router, Switch, useRouteMatch } from 'react-router-dom';
import history from '@commercetools-frontend/browser-history';
import type { ApplicationWindow } from '@commercetools-frontend/constants';
import type { TAsyncLocaleDataProps } from '@commercetools-frontend/i18n';
import Constraints from '@commercetools-uikit/constraints';
import PrimaryButton from '@commercetools-uikit/primary-button';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import ApplicationShell from '../application-shell';
import CustomViewLoader from '../custom-view-loader';

declare let window: ApplicationWindow;

type TLocalCustomViewLauncherProps = {
  environment: ApplicationWindow['app'];
};

const LocalCustomViewLauncher = (props: TLocalCustomViewLauncherProps) => {
  const [shouldRenderCustomView, setShouldRenderCustomView] = useState(false);
  // We expect this in development to be defined.
  const customViewConfig = props.environment.__DEVELOPMENT__?.customViewConfig!;

  return (
    <main>
      <Constraints.Horizontal max="scale">
        <Spacings.Inset scale="xl">
          <Spacings.Stack scale="xl">
            <Text.Headline as="h1">Custom View loader</Text.Headline>

            <Spacings.Stack scale="l">
              <Spacings.Stack scale="m">
                <Text.Body>
                  This page simulates the rendering of your Custom View as if it
                  was within a page in the Merchant Center:
                  <br />
                  Based on your <i>custom-view-config</i> file, these are the
                  settings that will be used:
                </Text.Body>
                <ul>
                  <Spacings.Stack scale="s">
                    <li>
                      Custom View ID: <b>{customViewConfig.id}</b>
                    </li>
                    <li>
                      Custom View permissions:{' '}
                      <b>
                        {customViewConfig.permissions
                          .map(
                            (permission) =>
                              `(${
                                permission.name
                              }: ${permission.oAuthScopes.join(', ')})`
                          )
                          .join(', ')}
                      </b>
                    </li>
                    <li>
                      Custom View locators:{' '}
                      <b>{customViewConfig.locators.join(', ')}</b>
                    </li>
                    <li>
                      Custom View type: <b>{customViewConfig.type}</b>
                    </li>
                    <li>
                      Custom View size:{' '}
                      <b>{customViewConfig.typeSettings?.size}</b>
                    </li>
                  </Spacings.Stack>
                </ul>
              </Spacings.Stack>
              <Constraints.Horizontal max={10}>
                <PrimaryButton
                  label="Open the Custom View"
                  onClick={() => setShouldRenderCustomView(true)}
                />
              </Constraints.Horizontal>
            </Spacings.Stack>
          </Spacings.Stack>

          {shouldRenderCustomView && (
            <CustomViewLoader
              customView={customViewConfig}
              hostUrl={props.environment.__DEVELOPMENT__?.customViewHostUrl}
              onClose={() => setShouldRenderCustomView(false)}
            />
          )}
        </Spacings.Inset>
      </Constraints.Horizontal>
    </main>
  );
};

export type TCustomViewDevHost = {
  applicationMessages: TAsyncLocaleDataProps['applicationMessages'];
  children: ReactNode;
};

const SimulatedIframeRoute = (props: Pick<TCustomViewDevHost, 'children'>) => {
  const routeMatch = useRouteMatch();
  console.info(
    `ℹ️ Rendering a Custom View as it would be rendered within an iframe`,
    routeMatch.url
  );
  return <>{props.children}</>;
};

const CustomViewDevHost = (props: TCustomViewDevHost) => {
  return (
    <Router history={history}>
      <Switch>
        {/* Simulate the rendering of the Custom View as if it would be served
        from a different host via an iframe. */}
        <Route path="/custom-views/:customViewId/projects/:projectKey">
          <SimulatedIframeRoute>{props.children}</SimulatedIframeRoute>
        </Route>

        <Route>
          <ApplicationShell
            environment={window.app}
            applicationMessages={props.applicationMessages}
          >
            <LocalCustomViewLauncher environment={window.app} />
          </ApplicationShell>
        </Route>
      </Switch>
    </Router>
  );
};

CustomViewDevHost.displayName = 'CustomViewDevHost';

export default CustomViewDevHost;
