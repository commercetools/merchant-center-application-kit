import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  hasSomePermissions,
  hasEveryPermissions,
} from '../../utils/has-permissions';

type TPermissionName = string;
type TPermissions = {
  [key: string]: boolean;
};

// Forward-compatibility with React Hooks 🎉
const useIsAuthorized = ({
  demandedPermissions,
  shouldMatchSomePermissions = false,
}: {
  demandedPermissions: TPermissionName[];
  shouldMatchSomePermissions: boolean;
}) => {
  const actualPermissions = useApplicationContext<TPermissions | null>(
    applicationContext => applicationContext.permissions
  );

  const isAuthorized = shouldMatchSomePermissions
    ? hasSomePermissions(demandedPermissions, actualPermissions)
    : hasEveryPermissions(demandedPermissions, actualPermissions);

  return isAuthorized;
};

export default useIsAuthorized;
