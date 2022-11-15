import ReactDOM from 'react-dom';
import { useState } from 'react';
import { css, Global } from '@emotion/react';
import {
  customProperties,
  ThemeProvider,
} from '@commercetools-uikit/design-system';
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

  return (
    <>
      <ThemeProvider
        theme={selectedTheme}
        themeOverrides={themesOverrides[selectedTheme]}
      />
      <ThemeSwitcher
        selectedTheme={selectedTheme}
        onThemeChange={(newTheme) => updateTheme(newTheme)}
      />
      <Global
        styles={css`
          *,
          *::before,
          *::after {
            box-sizing: inherit;
          }

          html,
          body {
            color: ${customProperties.colorSolid};
            font-family: ${customProperties.fontFamilyDefault};
            font-size: 13px;
            margin: 0;
            padding: 0;
            height: 100vh;
          }

          html {
            box-sizing: border-box;
          }
        `}
      />
      <PortalsContainer />
      <Application />
    </>
  );
};

ReactDOM.render(<Main />, document.getElementById('app'));
