import ReactDOM from 'react-dom';
import { useState } from 'react';
import { ThemeProvider } from '@commercetools-uikit/design-system';
import {
  PortalsContainer,
  themesOverrides,
} from '@commercetools-frontend/application-components';
import Application from './application';
import ThemeSwitcher, {
  ThemeName,
} from './components/theme-switcher/theme-switcher';

const Main = () => {
  const [selectedTheme, updateTheme] = useState<ThemeName>('default');
  const isLocalEnvironment = process.env.NODE_ENV === 'development';

  return (
    <>
      <ThemeProvider
        theme={selectedTheme}
        themeOverrides={themesOverrides[selectedTheme]}
      />
      {isLocalEnvironment ? (
        <ThemeSwitcher
          selectedTheme={selectedTheme}
          onThemeChange={(newTheme) => updateTheme(newTheme)}
        />
      ) : null}
      <PortalsContainer />
      <Application />
    </>
  );
};

ReactDOM.render(<Main />, document.getElementById('app'));
