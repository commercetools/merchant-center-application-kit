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
import TextField from '@commercetools-uikit/text-field';
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
  typeSettings: customConfig.typeSettings,
});

type TLocalCustomViewLauncherProps = {
  customViewSettings?: TCustomView['typeSettings'];
};

const LocalCustomViewLauncher = (props: TLocalCustomViewLauncherProps) => {
  const [shouldRenderCustomView, setShouldRenderCustomView] = useState(false);
  const [hostUrl, setHostUrl] = useState('');

  const customViewConfig = getCustomViewConfig({
    typeSettings: props.customViewSettings,
  });

  return (
    <main>
      <Constraints.Horizontal max={12}>
        <Spacings.Inset scale="xl">
          <Spacings.Stack scale="xl">
            <Text.Headline as="h1">Custom View loader</Text.Headline>

            <Spacings.Stack scale="l">
              <Spacings.Stack scale="l">
                <TextField
                  title="Host URL"
                  isRequired
                  description="Type here the URL of the MC page where you want the custom view to be run from"
                  placeholder="/<application_name>/<project_key>/<view_path>"
                  value={hostUrl}
                  onChange={(event) => setHostUrl(event.target.value)}
                />
                <PrimaryButton
                  label="Open the Custom View"
                  onClick={() => setShouldRenderCustomView(true)}
                />
              </Spacings.Stack>
            </Spacings.Stack>
          </Spacings.Stack>

          {shouldRenderCustomView && (
            <CustomViewLoader
              customView={customViewConfig}
              hostUrl={hostUrl}
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
  customViewSettings?: TCustomView['typeSettings'];
  children: ReactNode;
};

const CustomViewDevHost = (props: TCustomViewDevHost) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/:projectKey/custom-view/:id">{props.children}</Route>

        <Route>
          <ApplicationShell
            environment={props.environment}
            applicationMessages={props.applicationMessages}
          >
            <LocalCustomViewLauncher
              customViewSettings={props.customViewSettings}
            />
          </ApplicationShell>
        </Route>
      </Switch>
    </Router>
  );
};

CustomViewDevHost.displayName = 'CustomViewDevHost';

export default CustomViewDevHost;
