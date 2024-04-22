import { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { themesOverrides } from '@commercetools-frontend/application-components';
import { ThemeProvider } from '@commercetools-uikit/design-system';
import Application from './application';

ReactDOM.render(
  <Suspense fallback={'Loading...'}>
    <>
      <ThemeProvider theme="default" themeOverrides={themesOverrides.default} />
      <Application />
    </>
  </Suspense>,
  document.getElementById('app')
);
