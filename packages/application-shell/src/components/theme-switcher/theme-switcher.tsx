import { themesOverrides } from '@commercetools-frontend/application-components';
import { ThemeProvider } from '@commercetools-uikit/design-system';

const ThemeSwitcher = () => {
  // This helps decoupling app-kit update from ui-kit update
  // TODO: Remove after ui-kit redesign cleanup has been done
  const theme = 'test';

  return (
    <>
      <ThemeProvider theme={theme} themeOverrides={themesOverrides.default} />
    </>
  );
};

export default ThemeSwitcher;
