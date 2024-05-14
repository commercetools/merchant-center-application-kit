import { themesOverrides } from '@commercetools-frontend/application-components';
import { ThemeProvider } from '@commercetools-uikit/design-system';

const ThemeSwitcher = () => {
  const theme = 'default';
  return (
    <>
      <ThemeProvider theme={theme} themeOverrides={themesOverrides[theme]} />
    </>
  );
};

export default ThemeSwitcher;
