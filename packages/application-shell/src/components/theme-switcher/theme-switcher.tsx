import { useEffect } from 'react';
import { themesOverrides } from '@commercetools-frontend/application-components';
import { ThemeProvider } from '@commercetools-uikit/design-system';
import { STORAGE_KEYS } from '../../constants';

const ThemeSwitcher = () => {
  // This helps decoupling app-kit update from ui-kit update
  // TODO: Remove after ui-kit redesign cleanup has been done
  const theme = 'test';

  useEffect(() => {
    // Clean up the local storage so we don't keep the previous value forever
    window.localStorage.removeItem(
      STORAGE_KEYS.IS_NEW_DESIGN_RELEASE_NOTIFICATION_CLOSED
    );
  }, []);

  return (
    <>
      <ThemeProvider theme={theme} themeOverrides={themesOverrides.default} />
    </>
  );
};

export default ThemeSwitcher;
