import { useIsAuthorized } from '@commercetools-frontend/permissions';
import PrimaryButton from '@commercetools-uikit/primary-button';
import { PERMISSIONS } from '../constants';

const MyComponent = () => {
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });

  return (
    <div>
      <PrimaryButton label="Create channel" isDisabled={!canManage} />
    </div>
  );
};

MyComponent.displayName = 'MyComponent';

export default MyComponent;
