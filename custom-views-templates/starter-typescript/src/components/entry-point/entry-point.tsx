import { lazy } from 'react';
import {
  CustomViewDevHost,
  CustomViewShell,
  setupGlobalErrorListener,
  TCustomViewSize,
} from '@commercetools-frontend/application-shell';
import type { ApplicationWindow } from '@commercetools-frontend/constants';
import { type TAsyncLocaleDataProps } from '@commercetools-frontend/i18n';
import loadMessages from '../../load-messages';

declare let window: ApplicationWindow;

// Here we split up the main (app) bundle with the actual application business logic.
// Splitting by route is usually recommended and you can potentially have a splitting
// point for each route. More info at https://reactjs.org/docs/code-splitting.html
const AsyncApplicationRoutes = lazy(
  () => import('../../routes' /* webpackChunkName: "routes" */)
);

// Ensure to setup the global error listener before any React component renders
// in order to catch possible errors on rendering/mounting.
setupGlobalErrorListener();

const environment = {
  ...window.app,
  customViewId: window.app.customViewId || Date.now().toString(),
  entryPointUriPath: window.app.customViewId || Date.now().toString(),
};

type TCustomViewMainProps = {
  customViewId: string;
  messages: TAsyncLocaleDataProps['applicationMessages'];
};

const CustomViewMain = (props: TCustomViewMainProps) => (
  <CustomViewShell customViewId={props.customViewId} messages={props.messages}>
    <AsyncApplicationRoutes />
  </CustomViewShell>
);

const EntryPoint = () => {
  if (process.env.NODE_ENV === 'development') {
    return (
      <CustomViewDevHost
        environment={environment}
        applicationMessages={loadMessages}
        customViewSettings={{
          size: TCustomViewSize.Large,
        }}
      >
        <CustomViewMain
          customViewId={environment.customViewId}
          messages={loadMessages}
        />
      </CustomViewDevHost>
    );
  }
  return (
    <CustomViewMain
      customViewId={environment.customViewId}
      messages={loadMessages}
    />
  );
};

EntryPoint.displayName = 'EntryPoint';

export default EntryPoint;
