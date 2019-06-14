import React from 'react';
import { ApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { TPermissionName } from '../../types';
import getDisplayName from '../../utils/get-display-name';
import Authorized from '../authorized';

const branchOnPermissions = <OwnProps extends {}>(
  demandedPermissions: TPermissionName[],
  FallbackComponent: React.ComponentType<unknown>,
  options: { shouldMatchSomePermissions: boolean } = {
    shouldMatchSomePermissions: false,
  }
) => (
  Component: React.ComponentType<OwnProps>
): React.ComponentType<OwnProps> => {
  const WrappedComponent = (props: OwnProps) => (
    <ApplicationContext
      render={applicationContext => (
        <Authorized
          shouldMatchSomePermissions={options.shouldMatchSomePermissions}
          demandedPermissions={demandedPermissions}
          actualPermissions={applicationContext.permissions}
          render={isAuthorized => {
            if (isAuthorized) {
              return <Component {...props} />;
            }
            if (FallbackComponent) {
              return <FallbackComponent />;
            }
            return <React.Fragment></React.Fragment>;
          }}
        />
      )}
    />
  );
  WrappedComponent.displayName = `branchOnPermissions(${getDisplayName<
    OwnProps
  >(Component)})`;
  return WrappedComponent;
};

export default branchOnPermissions;
