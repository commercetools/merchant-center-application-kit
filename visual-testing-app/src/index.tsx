import ReactDOM from 'react-dom';
import { PortalsContainer } from '@commercetools-frontend/application-components';
import { ThemeProvider } from '@commercetools-uikit/design-system';
import Application from './application';

ReactDOM.render(
  <>
    <ThemeProvider />
    <PortalsContainer />
    <Application />
  </>,
  document.getElementById('app')
);
