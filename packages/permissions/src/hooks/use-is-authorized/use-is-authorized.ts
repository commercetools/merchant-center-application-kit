import React from 'react';
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
  if (!React.useContext)
    throw new Error(
      `React hooks do not seem to be available yet in the installed React version "${React.version}". Please check the React Hooks documentation for more info: https://reactjs.org/hooks.`
    );

  const actualPermissions = useApplicationContext<TPermissions | null>(
    applicationContext => applicationContext.permissions
  );

  const isAuthorized = shouldMatchSomePermissions
    ? hasSomePermissions(demandedPermissions, actualPermissions)
    : hasEveryPermissions(demandedPermissions, actualPermissions);

  return isAuthorized;
};

export default useIsAuthorized;
