import { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@commercetools-uikit/design-system';
import { themesOverrides } from '@commercetools-frontend/application-components';
import Application from './application';

const theme = process.env.NODE_ENV === 'production' ? 'default' : 'test';

ReactDOM.render(
  <Suspense fallback={'Loading...'}>
    <>
      <ThemeProvider theme={theme} themeOverrides={themesOverrides[theme]} />
      <Application />
    </>
  </Suspense>,
  document.getElementById('app')
);
