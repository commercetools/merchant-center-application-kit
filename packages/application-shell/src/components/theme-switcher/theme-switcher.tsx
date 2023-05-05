import { useState } from 'react';
import { useFeatureToggle } from '@flopflip/react-broadcast';
import { themesOverrides } from '@commercetools-frontend/application-components';
import { ThemeProvider } from '@commercetools-uikit/design-system';
import { STORAGE_KEYS } from '../../constants';
import { UI_REDESIGN } from '../../feature-toggles';
import NewDesignReleaseInfoDialog from './new-design-release-info-dialog';

const ThemeSwitcher = () => {
  const isNewThemeEnabled = useFeatureToggle(UI_REDESIGN);
  const theme = isNewThemeEnabled ? 'test' : 'default';
  const [isOpen, setIsOpen] = useState(true);
  const handleCloseDialog = () => {
    window.localStorage.setItem(
      STORAGE_KEYS.IS_NEW_DESIGN_RELEASE_NOTIFICATION_DIALOG,
      'false'
    );
    setIsOpen(false);
  };

  return (
    <>
      <ThemeProvider theme={theme} themeOverrides={themesOverrides[theme]} />
      {isNewThemeEnabled &&
      window.localStorage.getItem(
        STORAGE_KEYS.IS_NEW_DESIGN_RELEASE_NOTIFICATION_DIALOG
      ) === 'true' ? (
        <NewDesignReleaseInfoDialog
          onClose={handleCloseDialog}
          isOpen={isOpen}
        />
      ) : null}
    </>
  );
};

export default ThemeSwitcher;
