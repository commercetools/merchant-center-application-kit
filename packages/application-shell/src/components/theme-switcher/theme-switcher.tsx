import { lazy } from 'react';
import { themesOverrides } from '@commercetools-frontend/application-components';
import { ThemeProvider } from '@commercetools-uikit/design-system';

const NewColoursSchemaAnnouncementDialog = lazy(
  () => import('./new-colors-schema-announcement-dialog')
);

const ThemeSwitcher = () => {
  const theme = 'default';
  return (
    <>
      <ThemeProvider theme={theme} themeOverrides={themesOverrides[theme]} />
      <NewColoursSchemaAnnouncementDialog />
    </>
  );
};

export default ThemeSwitcher;
