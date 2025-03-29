import { createRoot } from 'react-dom/client';
import {
  PortalsContainer,
  themesOverrides,
} from '@commercetools-frontend/application-components';
import { ThemeProvider } from '@commercetools-uikit/design-system';
import Application from './application';

const Main = () => {
  return (
    <>
      <ThemeProvider theme="default" themeOverrides={themesOverrides.default} />
      <PortalsContainer />
      <Application />
    </>
  );
};

const container = document.getElementById('app');
const root = createRoot(container as Element);
root.render(<Main />);
