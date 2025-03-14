import { ComponentType } from 'react';
import getDisplayName from '../../utils/get-display-name';
import Authorized from '../authorized';

// Permissions
type TPermissionName = string;
// Action rights
type TActionRightName = string;
type TActionRightGroup = string;
type TDemandedActionRight = {
  group: TActionRightGroup;
  name: TActionRightName;
};
// Data fences
type TDemandedDataFence = {
  group: string;
  name: string;
  type: string;
};
type TSelectDataFenceData = (
  demandedDataFenceWithActualValues: TDemandedDataFence & {
    actualDataFenceValues: string[];
  }
) => string[] | null;

type TOptions<OwnProps extends {}> = {
  shouldMatchSomePermissions?: boolean;
  actionRights?: TDemandedActionRight[];
  dataFences?: TDemandedDataFence[];
  getSelectDataFenceData?: (ownProps: OwnProps) => TSelectDataFenceData;
};

const branchOnPermissions =
  <OwnProps extends {}>(
    demandedPermissions: TPermissionName[],
    FallbackComponent: ComponentType<unknown>,
    options: TOptions<OwnProps> = {
      shouldMatchSomePermissions: false,
    }
  ) =>
  (Component: ComponentType<OwnProps>): ComponentType<OwnProps> => {
    const WrappedComponent = (props: OwnProps) => (
      <Authorized
        shouldMatchSomePermissions={options.shouldMatchSomePermissions}
        demandedPermissions={demandedPermissions}
        demandedActionRights={options.actionRights}
        demandedDataFences={options.dataFences}
        selectDataFenceData={
          options.getSelectDataFenceData &&
          options.getSelectDataFenceData(props)
        }
        render={(isAuthorized) => {
          if (isAuthorized) {
            // @ts-ignore: relates to https://github.com/emotion-js/emotion/issues/3245
            return <Component {...props} />;
          }
          if (FallbackComponent) {
            return <FallbackComponent />;
          }
          return <></>;
        }}
      />
    );
    WrappedComponent.displayName = `branchOnPermissions(${getDisplayName<OwnProps>(
      Component
    )})`;
    return WrappedComponent;
  };

export default branchOnPermissions;
