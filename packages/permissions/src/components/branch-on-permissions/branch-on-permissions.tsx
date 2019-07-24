import React from 'react';
import { ApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import getDisplayName from '../../utils/get-display-name';
import Authorized from '../authorized';

type TPermissionName = string;
type TActionRightName = string;
type TActionRightGroup = string;
type TDemandedActionRight = {
  group: TActionRightGroup;
  name: TActionRightName;
};
type TOptions = {
  shouldMatchSomePermissions?: boolean;
  actionRights?: TDemandedActionRight[];
};

const branchOnPermissions = <OwnProps extends {}>(
  demandedPermissions: TPermissionName[],
  FallbackComponent: React.ComponentType<unknown>,
  options: TOptions = {
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
          demandedActionRights={options.actionRights}
          actualPermissions={applicationContext.permissions}
          actualActionRights={applicationContext.actionRights}
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
