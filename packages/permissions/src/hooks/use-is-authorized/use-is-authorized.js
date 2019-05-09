import React from 'react';
import { Context } from '@commercetools-frontend/application-shell-connectors';
import {
  hasSomePermissions,
  hasEveryPermissions,
} from '../../utils/has-permissions';

// Forward-compatibility with React Hooks 🎉
const useIsAuthorized = React.useContext
  ? ({ demandedPermissions, shouldMatchSomePermissions = false }) => {
      const applicationContext = React.useContext(Context);
      const actualPermissions = applicationContext.permissions;

      const isAuthorized = shouldMatchSomePermissions
        ? hasSomePermissions(demandedPermissions, actualPermissions)
        : hasEveryPermissions(demandedPermissions, actualPermissions);

      return isAuthorized;
    }
  : () => {
      throw new Error(
        `React hooks do not seem to be available yet in the installed React version "${
          React.version
        }". Please check the React Hooks documentation for more info: https://reactjs.org/hooks.`
      );
    };

export default useIsAuthorized;
