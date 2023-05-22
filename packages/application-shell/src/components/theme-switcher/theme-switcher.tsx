import { useState, lazy } from 'react';
import { themesOverrides } from '@commercetools-frontend/application-components';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { ThemeProvider } from '@commercetools-uikit/design-system';
import { STORAGE_KEYS } from '../../constants';

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
  // This helps decoupling app-kit update from ui-kit update
  // TODO: Remove after ui-kit redesign cleanup has been done
  const theme = 'test';
  const isRedesignAnnouncementDisabled = useDisableRedesignAnnouncement();

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
      <ThemeProvider theme={theme} themeOverrides={themesOverrides.default} />
      {!isRedesignAnnouncementDisabled &&
      !hasUserSeenNewDesignReleaseNotificationDialog ? (
        <NewDesignReleaseInfoDialog onClose={handleCloseDialog} />
      ) : null}
    </>
  );
};

export default ThemeSwitcher;
