import { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@commercetools-uikit/design-system';
import Application from './application';

ReactDOM.render(
  <Suspense fallback={'Loading...'}>
    <>
      <ThemeProvider />
      <Application />
    </>
  </Suspense>,
  document.getElementById('app')
);
