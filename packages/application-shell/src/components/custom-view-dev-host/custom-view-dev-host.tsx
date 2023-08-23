import { ReactNode, useEffect, useState } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import {
  CustomViewLoader,
  PortalsContainer,
} from '@commercetools-frontend/application-components';
import {
  useApplicationContext,
  type TApplicationContext,
} from '@commercetools-frontend/application-shell-connectors';
import history from '@commercetools-frontend/browser-history';
import { type TAsyncLocaleDataProps } from '@commercetools-frontend/i18n';
import Constraints from '@commercetools-uikit/constraints';
import { ThemeProvider } from '@commercetools-uikit/design-system';
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

const customView: TCustomView = {
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

const LocalCustomViewLauncher = () => {
  const [shouldRenderCustomView, setShouldRenderCustomView] = useState(false);
  const [hostUrl, setHostUrl] = useState('');
  const context = useApplicationContext();

  console.log({ context });

  useEffect(() => {
    const loaderElement = document.getElementById('app-loader');
    if (loaderElement) {
      loaderElement.remove();
    }
  }, []);

  return (
    <main>
      <ThemeProvider theme="default" />
      <PortalsContainer />
      <Constraints.Horizontal max={12}>
        <Spacings.Inset scale="xl">
          <Spacings.Stack scale="xl">
            <Text.Headline as="h1">Custom View loader</Text.Headline>

            <Spacings.Stack scale="l">
              <Spacings.Stack scale="l">
                <TextField
                  title="Host URL"
                  isRequired
                  description="Type here the URL of the MC page where you want the extension to run"
                  placeholder="/<application_name>/<project_key>/<view_path>"
                  value={hostUrl}
                  onChange={(event) => setHostUrl(event.target.value)}
                />
                <PrimaryButton
                  label="Open the In-app Extension"
                  onClick={() => setShouldRenderCustomView(true)}
                />
              </Spacings.Stack>
            </Spacings.Stack>
          </Spacings.Stack>

          {shouldRenderCustomView && (
            <CustomViewLoader
              customView={customView}
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
        <Route path="/:projectKey/custom-view/:id">{props.children}</Route>

        <Route>
          <ApplicationShell
            environment={props.environment}
            applicationMessages={props.applicationMessages}
          >
            <LocalCustomViewLauncher />
          </ApplicationShell>
        </Route>
      </Switch>
    </Router>
  );
};

CustomViewDevHost.displayName = 'CustomViewDevHost';

export default CustomViewDevHost;
