import { lazy } from 'react';
import { useFeatureToggle } from '@flopflip/react-broadcast';
import { themesOverrides } from '@commercetools-frontend/application-components';
import { featureFlags } from '@commercetools-frontend/constants';
import { ThemeProvider } from '@commercetools-uikit/design-system';

const NewColoursSchemaAnnouncementDialog = lazy(
  () => import('./new-colors-schema-announcement-dialog')
);

const ThemeSwitcher = () => {
  const isRecolouringThemeEnabled = useFeatureToggle(featureFlags.RECOLOURING);
  const theme = isRecolouringThemeEnabled ? 'recolouring' : 'default';

  return (
    <>
      <ThemeProvider theme={theme} themeOverrides={themesOverrides[theme]} />
      {isRecolouringThemeEnabled ? (
        <NewColoursSchemaAnnouncementDialog />
      ) : null}
    </>
  );
};

export default ThemeSwitcher;
