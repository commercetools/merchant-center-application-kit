import React from 'react';
import useIsAuthorized from '../../hooks/use-is-authorized';
import getDisplayName from '../../utils/get-display-name';

// Permissions
type TPermissionName = string;
type TPermissions = {
  [key: string]: boolean;
};
// Action rights
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
// Data fences
type TDataFenceGroupedByPermission = {
  // E.g. { canManageOrders: { values: [] } }
  [key: string]: { values: string[] } | null;
};
type TDataFenceGroupedByResourceType = {
  // E.g. { orders: {...} }
  [key: string]: TDataFenceGroupedByPermission | null;
};
type TDataFenceType = 'store';
type TDataFences = Partial<
  Record<TDataFenceType, TDataFenceGroupedByResourceType>
>;
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
type TProjectPermissions = {
  permissions: TPermissions;
  actionRights: TActionRights;
  dataFences: TDataFences;
};

type Props = {
  demandedPermissions: TPermissionName[];
  demandedActionRights?: TDemandedActionRight[];
  demandedDataFences?: TDemandedDataFence[];
  shouldMatchSomePermissions?: boolean;
  selectDataFenceData?: TSelectDataFenceData;
  projectPermissions?: TProjectPermissions;
  render: (isAuthorized: boolean) => React.ReactNode;
  children?: never;
};
const defaultProps: Pick<Props, 'shouldMatchSomePermissions'> = {
  shouldMatchSomePermissions: false,
};

const Authorized = (props: Props) => {
  const isAuthorized = useIsAuthorized({
    demandedPermissions: props.demandedPermissions,
    demandedActionRights: props.demandedActionRights,
    demandedDataFences: props.demandedDataFences,
    selectDataFenceData: props.selectDataFenceData,
    shouldMatchSomePermissions: props.shouldMatchSomePermissions,
    projectPermissions: props.projectPermissions,
  });

  return <React.Fragment>{props.render(isAuthorized)}</React.Fragment>;
};
Authorized.displayName = 'Authorized';
Authorized.defaultProps = defaultProps;

type TInjectAuthorizedOptions<OwnProps extends {}> = {
  shouldMatchSomePermissions?: boolean;
  actionRights?: TDemandedActionRight[];
  dataFences?: TDemandedDataFence[];

  getSelectDataFenceData?: (ownProps: OwnProps) => TSelectDataFenceData;
};

const injectAuthorized = <
  OwnProps extends {
    isAuthorized?: boolean;
  },
  InjectedProps extends OwnProps & { [key: string]: boolean }
>(
  demandedPermissions: TPermissionName[],
  options: TInjectAuthorizedOptions<OwnProps> = {},
  propName = 'isAuthorized'
) => (
  Component: React.ComponentType<OwnProps>
): React.ComponentType<OwnProps & InjectedProps> => {
  const WrappedComponent = (props: OwnProps) => (
    <Authorized
      shouldMatchSomePermissions={options.shouldMatchSomePermissions}
      demandedPermissions={demandedPermissions}
      demandedActionRights={options.actionRights}
      demandedDataFences={options.dataFences}
      selectDataFenceData={
        options.getSelectDataFenceData && options.getSelectDataFenceData(props)
      }
      render={(isAuthorized) => (
        <Component {...props} {...{ [propName]: isAuthorized }} />
      )}
    />
  );
  WrappedComponent.displayName = `withUserPermissions(${getDisplayName<OwnProps>(
    Component
  )})`;
  return WrappedComponent;
};

export default Authorized;
export { injectAuthorized };
