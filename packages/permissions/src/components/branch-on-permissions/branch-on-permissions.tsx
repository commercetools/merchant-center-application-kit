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
type TDataFenceType = 'store';
type TDemandedDataFence = {
  group: string;
  name: string;
  type: TDataFenceType;
};
type TSelectDataFenceDataByType = (dataFenceWithType: {
  type: TDataFenceType;
}) => string[] | null;

type TOptions<OwnProps extends {}> = {
  shouldMatchSomePermissions?: boolean;
  actionRights?: TDemandedActionRight[];
  dataFences?: TDemandedDataFence[];
  getSelectDataFenceDataByType?: (
    ownProps: OwnProps
  ) => TSelectDataFenceDataByType;
};

const branchOnPermissions = <OwnProps extends {}>(
  demandedPermissions: TPermissionName[],
  FallbackComponent: React.ComponentType<unknown>,
  options: TOptions<OwnProps> = {
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
          actualPermissions={applicationContext.permissions}
          actualActionRights={applicationContext.actionRights}
          actualDataFences={applicationContext.dataFences}
          demandedPermissions={demandedPermissions}
          demandedActionRights={options.actionRights}
          demandedDataFences={options.dataFences}
          selectDataFenceDataByType={
            options.getSelectDataFenceDataByType &&
            options.getSelectDataFenceDataByType(props)
          }
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
