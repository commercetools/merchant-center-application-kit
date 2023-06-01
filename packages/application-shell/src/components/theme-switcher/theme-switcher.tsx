import { useState, lazy } from 'react';
import { themesOverrides } from '@commercetools-frontend/application-components';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { ThemeProvider } from '@commercetools-uikit/design-system';
import { STORAGE_KEYS } from '../../constants';

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
