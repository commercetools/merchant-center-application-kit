import { useIsAuthorized } from '@commercetools-frontend/permissions';

const CreateButton = () => {
  const canManage = useIsAuthorized({
    demandedPermissions: ['ManageAvengers'],
  });
  return (
    <PrimaryButton
      isDisabled={!canManage}
      // ...
    />
  );
};
