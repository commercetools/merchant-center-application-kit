import { useState, lazy } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { STORAGE_KEYS } from '@commercetools-frontend/constants';

const SsoMigrationNotificationDialog = lazy(
  () => import('./sso-migration-notification-dialog')
);

type TAdditionalEnvironmentValues = {
  disableSsoMigrationNotification: boolean;
};
type TSelectedEnvironmentValues = boolean | undefined;

const useDisableSsoMigrationNotification = () => {
  const disableSsoMigrationAnnouncement = useApplicationContext<
    TSelectedEnvironmentValues,
    TAdditionalEnvironmentValues
  >((context) => context.environment.disableSsoMigrationNotification);

  return Boolean(disableSsoMigrationAnnouncement);
};

const SsoMigrationNotification = () => {
  const isSsoMigrationNotificationDisabled =
    useDisableSsoMigrationNotification();

  const [
    hasUserSeenSsoMigrationNotification,
    setHasUserSeenSsoMigrationNotification,
  ] = useState(
    window.localStorage.getItem(
      STORAGE_KEYS.IS_SSO_MIGRATION_NOTIFICATION_CLOSED
    ) === 'true'
  );

  const handleCloseDialog = () => {
    window.localStorage.setItem(
      STORAGE_KEYS.IS_SSO_MIGRATION_NOTIFICATION_CLOSED,
      'true'
    );
    setHasUserSeenSsoMigrationNotification(true);
  };

  return (
    <>
      {!isSsoMigrationNotificationDisabled &&
      !hasUserSeenSsoMigrationNotification ? (
        <SsoMigrationNotificationDialog onClose={handleCloseDialog} />
      ) : null}
    </>
  );
};

export default SsoMigrationNotification;
