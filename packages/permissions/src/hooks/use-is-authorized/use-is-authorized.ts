import React from 'react';
import { TPermissionName, TPermissionValue, TPermissions } from '../../types';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  hasSomePermissions,
  hasEveryPermissions,
} from '../../utils/has-permissions';

type SelectedApplicationContext = {
  permissions: TPermissions;
};
// Forward-compatibility with React Hooks 🎉
const useIsAuthorized = ({
  demandedPermissions,
  shouldMatchSomePermissions = false,
}: {
  demandedPermissions: TPermissionName[];
  shouldMatchSomePermissions: boolean;
}): Error | TPermissionValue => {
  if (!React.useContext)
    throw new Error(
      `React hooks do not seem to be available yet in the installed React version "${React.version}". Please check the React Hooks documentation for more info: https://reactjs.org/hooks.`
    );

  const actualPermissions = useApplicationContext<SelectedApplicationContext>(
    applicationContext => applicationContext.permissions
  );

  const isAuthorized = shouldMatchSomePermissions
    ? hasSomePermissions(demandedPermissions, actualPermissions)
    : hasEveryPermissions(demandedPermissions, actualPermissions);

  return isAuthorized;
};

export default useIsAuthorized;
