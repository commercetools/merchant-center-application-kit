import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { themesOverrides } from '@commercetools-frontend/application-components';
import { ThemeProvider } from '@commercetools-uikit/design-system';
import Application from './application';

const container = document.getElementById('app');
const root = createRoot(container as Element);
root.render(
  <Suspense fallback={'Loading...'}>
    <>
      <ThemeProvider theme="default" themeOverrides={themesOverrides.default} />
      <Application />
    </>
  </Suspense>
);
