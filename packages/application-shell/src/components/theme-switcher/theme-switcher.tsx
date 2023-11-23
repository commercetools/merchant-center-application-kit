import { themesOverrides } from '@commercetools-frontend/application-components';
import { ThemeProvider } from '@commercetools-uikit/design-system';

const ThemeSwitcher = () => {
  return (
    <>
      <ThemeProvider theme="default" themeOverrides={themesOverrides.default} />
    </>
  );
};

export default ThemeSwitcher;
