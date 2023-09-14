import { lazy } from 'react';
import {
  CustomViewDevHost,
  CustomViewShell,
  setupGlobalErrorListener,
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

type TCustomViewMainProps = {
  customViewId: string;
  customViewHostUrl?: string;
  messages: TAsyncLocaleDataProps['applicationMessages'];
};

const CustomViewMain = (props: TCustomViewMainProps) => (
  <CustomViewShell
    customViewId={props.customViewId}
    customViewHostUrl={props.customViewHostUrl}
    messages={props.messages}
  >
    <AsyncApplicationRoutes />
  </CustomViewShell>
);

const EntryPoint = () => {
  if (process.env.NODE_ENV === 'development') {
    const customViewId = window.app.__DEVELOPMENT__?.customViewConfig?.id!;
    const customViewHostUrl = window.app.__DEVELOPMENT__?.customViewHostUrl!;

    return (
      <CustomViewDevHost
        customViewId={customViewId}
        customViewHostUrl={customViewHostUrl}
        applicationMessages={loadMessages}
      >
        <CustomViewMain
          customViewId={customViewId}
          customViewHostUrl={customViewHostUrl}
          messages={loadMessages}
        />
      </CustomViewDevHost>
    );
  }
  return (
    <CustomViewMain
      customViewId={window.app.applicationIdentifier}
      messages={loadMessages}
    />
  );
};

EntryPoint.displayName = 'EntryPoint';

export default EntryPoint;
