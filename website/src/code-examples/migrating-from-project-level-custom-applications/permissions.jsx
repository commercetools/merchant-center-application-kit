import { useIsAuthorized } from '@commercetools-frontend/permissions';
import { PERMISSIONS } from '../../constants';

const MyComponent = () => {
  const canView = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.View],
  });
};
