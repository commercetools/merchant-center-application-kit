import { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { themesOverrides } from '@commercetools-frontend/application-components';
import { ThemeProvider } from '@commercetools-uikit/design-system';
import Application from './application';

ReactDOM.render(
  <Suspense fallback={'Loading...'}>
    <>
      <ThemeProvider themeOverrides={themesOverrides.recolouring} />
      <Application />
    </>
  </Suspense>,
  document.getElementById('app')
);
