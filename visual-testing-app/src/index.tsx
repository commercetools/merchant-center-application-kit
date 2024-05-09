import ReactDOM from 'react-dom';
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

ReactDOM.render(<Main />, document.getElementById('app'));
