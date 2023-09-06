import { ReactNode, useState } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { CustomViewLoader } from '@commercetools-frontend/application-components';
import { type TApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import history from '@commercetools-frontend/browser-history';
import { type TAsyncLocaleDataProps } from '@commercetools-frontend/i18n';
import Constraints from '@commercetools-uikit/constraints';
import PrimaryButton from '@commercetools-uikit/primary-button';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import {
  TCustomView,
  TCustomViewSize,
  TCustomViewStatus,
  TCustomViewType,
} from '../../types/generated/settings';
import ApplicationShell from '../application-shell';

const defaultCustomViewConfig: TCustomView = {
  createdAt: '',
  defaultLabel: '',
  id: Date.now().toString(),
  installedBy: [],
  labelAllLocales: {},
  locators: [],
  owner: {
    createdAt: '',
    id: '',
    organizationId: '',
    updatedAt: '',
  },
  ownerId: '',
  permissions: [],
  status: TCustomViewStatus.Draft,
  type: TCustomViewType.CustomPanel,
  typeSettings: {
    size: TCustomViewSize.Small,
  },
  updatedAt: '',
  url: '',
};

const getCustomViewConfig = (customConfig: Partial<TCustomView>) => ({
  ...defaultCustomViewConfig,
  ...customConfig,
});

type TLocalCustomViewLauncherProps = {
  environment: TApplicationContext<{}>['environment'];
};

const LocalCustomViewLauncher = (props: TLocalCustomViewLauncherProps) => {
  const [shouldRenderCustomView, setShouldRenderCustomView] = useState(false);

  const customViewConfig = getCustomViewConfig({
    id: props.environment.customViewId,
    type: props.environment.__DEVELOPMENT__?.customViewType as TCustomViewType,
    typeSettings: props.environment.__DEVELOPMENT__?.customViewTypeSettings,
  });

  return (
    <main>
      <Constraints.Horizontal max="scale">
        <Spacings.Inset scale="xl">
          <Spacings.Stack scale="xl">
            <Text.Headline as="h1">Custom View loader</Text.Headline>

            <Spacings.Stack scale="l">
              <Spacings.Stack scale="m">
                <Text.Body>
                  This page simulates the Merchant Center context so you can run
                  your Custom View locally.
                  <br />
                  Based on your <i>custom-view-config</i> file, these are the
                  settings that will be used:
                </Text.Body>
                <ul>
                  <Spacings.Stack scale="s">
                    <li>
                      Custom View type: <b>{customViewConfig.type}</b>
                    </li>
                    <li>
                      Custom View size:{' '}
                      <b>{customViewConfig.typeSettings?.size}</b>
                    </li>
                    <li>
                      Emulated Host application URL:{' '}
                      <b>
                        {props.environment.customViewHostUrl || 'not defined'}
                      </b>
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
              hostUrl={props.environment.customViewHostUrl}
              onClose={() => setShouldRenderCustomView(false)}
            />
          )}
        </Spacings.Inset>
      </Constraints.Horizontal>
    </main>
  );
};

type TCustomViewDevHost = {
  environment: TApplicationContext<{}>['environment'];
  applicationMessages: TAsyncLocaleDataProps['applicationMessages'];
  children: ReactNode;
};

const CustomViewDevHost = (props: TCustomViewDevHost) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/custom-views/:id/projects/:projectKey">
          {props.children}
        </Route>

        <Route>
          <ApplicationShell
            environment={props.environment}
            applicationMessages={props.applicationMessages}
          >
            <LocalCustomViewLauncher environment={props.environment} />
          </ApplicationShell>
        </Route>
      </Switch>
    </Router>
  );
};

CustomViewDevHost.displayName = 'CustomViewDevHost';

export default CustomViewDevHost;
