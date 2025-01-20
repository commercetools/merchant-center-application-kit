import { StrictMode, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  PortalsContainer,
  themesOverrides,
} from '@commercetools-frontend/application-components';
import { ThemeProvider } from '@commercetools-uikit/design-system';
import Application from './application';

type TStrictModeEnablementProps = {
  enableReactStrictMode?: boolean;
  children?: ReactNode;
};

const StrictModeEnablement = (props: TStrictModeEnablementProps) => {
  if (props.enableReactStrictMode) {
    // @ts-ignore
    window.__REACT_STRICT_MODE__ = true;
    return <StrictMode>{props.children}</StrictMode>;
  } else {
    return <>{props.children}</>;
  }
};

const Main = () => {
  return (
    <StrictModeEnablement>
      <ThemeProvider theme="default" themeOverrides={themesOverrides.default} />
      <PortalsContainer />
      <Application />
    </StrictModeEnablement>
  );
};

const container = document.getElementById('app');
const root = createRoot(container as Element);
root.render(<Main />);
