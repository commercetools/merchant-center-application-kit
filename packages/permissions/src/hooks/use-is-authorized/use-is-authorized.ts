import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  hasSomePermissions,
  hasEveryPermissions,
  hasEveryActionRight,
} from '../../utils/has-permissions';

type TPermissionName = string;
type TPermissions = {
  [key: string]: boolean;
};

type TActionRight = {
  [key: string]: boolean;
};
type TActionRights = {
  [key: string]: TActionRight;
};

type TActionRightName = string;
type TActionRightGroup = string;
type TDemandedActionRight = {
  group: TActionRightGroup;
  name: TActionRightName;
};

// Forward-compatibility with React Hooks 🎉
const useIsAuthorized = ({
  demandedPermissions,
  demandedActionRights,
  shouldMatchSomePermissions = false,
}: {
  demandedPermissions: TPermissionName[];
  demandedActionRights?: TDemandedActionRight[];
  shouldMatchSomePermissions: boolean;
}) => {
  const actualPermissions = useApplicationContext<TPermissions | null>(
    applicationContext => applicationContext.permissions
  );
  const actualActionRights = useApplicationContext<TActionRights | null>(
    applicationContext => applicationContext.actionRights
  );
  const hasDemandedPermissions = shouldMatchSomePermissions
    ? hasSomePermissions(demandedPermissions, actualPermissions)
    : hasEveryPermissions(demandedPermissions, actualPermissions);

  const hasDemandedActionRights = hasEveryActionRight(
    demandedActionRights || [],
    actualActionRights
  );

  return hasDemandedPermissions && hasDemandedActionRights;
};

export default useIsAuthorized;
