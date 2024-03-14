import { useState, lazy } from 'react';
import { useFeatureToggle } from '@flopflip/react-broadcast';
import { themesOverrides } from '@commercetools-frontend/application-components';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { featureFlags } from '@commercetools-frontend/constants';
import { ThemeProvider } from '@commercetools-uikit/design-system';
import { STORAGE_KEYS } from '../../constants';

const NewColoursSchemaAnnouncementModal = lazy(
  () => import('./new-colors-schema-announcement-modal')
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
  const isRecolouringThemeEnabled = useFeatureToggle(featureFlags.RECOLOURING);
  const theme = isRecolouringThemeEnabled ? 'recolouring' : 'default';

  const isRedesignAnnouncementDisabled = useDisableRedesignAnnouncement();
  const [
    hasUserSeenNewDesignReleaseNotificationModal,
    setHasUserSeenNewDesignReleaseNotificationModal,
  ] = useState(
    window.localStorage.getItem(
      STORAGE_KEYS.IS_NEW_DESIGN_NOTIFICATION_CLOSED
    ) === 'true'
  );

  const handleCloseModal = () => {
    window.localStorage.setItem(
      STORAGE_KEYS.IS_NEW_DESIGN_NOTIFICATION_CLOSED,
      'true'
    );
    setHasUserSeenNewDesignReleaseNotificationModal(true);
  };

  return (
    <>
      <ThemeProvider theme={theme} themeOverrides={themesOverrides[theme]} />
      {!isRedesignAnnouncementDisabled &&
      !hasUserSeenNewDesignReleaseNotificationModal &&
      isRecolouringThemeEnabled ? (
        <NewColoursSchemaAnnouncementModal onClose={handleCloseModal} />
      ) : null}
    </>
  );
};

export default ThemeSwitcher;
