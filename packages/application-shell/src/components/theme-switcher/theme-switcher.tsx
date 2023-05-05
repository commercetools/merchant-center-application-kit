import { useState, lazy } from 'react';
import { useFeatureToggle } from '@flopflip/react-broadcast';
import { themesOverrides } from '@commercetools-frontend/application-components';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { ThemeProvider } from '@commercetools-uikit/design-system';
import { STORAGE_KEYS } from '../../constants';
import { UI_REDESIGN } from '../../feature-toggles';

const NewDesignReleaseInfoDialog = lazy(
  () => import('./new-design-release-info-dialog')
);

type TAdditionalEnvironmentValues = { disableRedesignAnnouncement: boolean };
type TSelectedEnvironmentValues = boolean | undefined;
function useDisableRedesignAnnouncement() {
  const disableRedesignAnnouncement = useApplicationContext<
    TSelectedEnvironmentValues,
    TAdditionalEnvironmentValues
  >((context) => context.environment.disableRedesignAnnouncement);

  return Boolean(disableRedesignAnnouncement);
}

const ThemeSwitcher = () => {
  const isNewThemeEnabled = useFeatureToggle(UI_REDESIGN);
  const isRedesignAnnouncementDisabled = useDisableRedesignAnnouncement();
  const theme = isNewThemeEnabled ? 'test' : 'default';
  const [
    hasUserSeenNewDesignReleaseNotificationDialog,
    setHasUserSeenNewDesignReleaseNotificationDialog,
  ] = useState(
    window.localStorage.getItem(
      STORAGE_KEYS.IS_NEW_DESIGN_RELEASE_NOTIFICATION_CLOSED
    ) === 'true'
  );

  const handleCloseDialog = () => {
    window.localStorage.setItem(
      STORAGE_KEYS.IS_NEW_DESIGN_RELEASE_NOTIFICATION_CLOSED,
      'true'
    );
    setHasUserSeenNewDesignReleaseNotificationDialog(true);
  };

  return (
    <>
      <ThemeProvider theme={theme} themeOverrides={themesOverrides[theme]} />
      {!isRedesignAnnouncementDisabled &&
      !hasUserSeenNewDesignReleaseNotificationDialog &&
      isNewThemeEnabled ? (
        <NewDesignReleaseInfoDialog onClose={handleCloseDialog} />
      ) : null}
    </>
  );
};

export default ThemeSwitcher;
