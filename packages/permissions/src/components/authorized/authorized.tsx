import { ComponentType, ReactNode } from 'react';
import type {
  TNormalizedPermissions,
  TNormalizedActionRights,
  TNormalizedDataFences,
} from '@commercetools-frontend/application-shell-connectors';

import useIsAuthorized from '../../hooks/use-is-authorized';
import getDisplayName from '../../utils/get-display-name';

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
type TProjectPermissions = {
  permissions: TNormalizedPermissions | null;
  actionRights: TNormalizedActionRights | null;
  dataFences: TNormalizedDataFences | null;
};

type Props = {
  demandedPermissions: TPermissionName[];
  demandedActionRights?: TDemandedActionRight[];
  demandedDataFences?: TDemandedDataFence[];
  shouldMatchSomePermissions?: boolean;
  selectDataFenceData?: TSelectDataFenceData;
  projectPermissions?: TProjectPermissions;
  render: (isAuthorized: boolean) => ReactNode;
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

  return <>{props.render(isAuthorized)}</>;
};
Authorized.displayName = 'Authorized';
Authorized.defaultProps = defaultProps;

type TInjectAuthorizedOptions<OwnProps extends {}> = {
  shouldMatchSomePermissions?: boolean;
  actionRights?: TDemandedActionRight[];
  dataFences?: TDemandedDataFence[];

  getSelectDataFenceData?: (ownProps: OwnProps) => TSelectDataFenceData;
};

const injectAuthorized =
  <
    OwnProps extends {
      isAuthorized?: boolean;
    },
    InjectedProps extends OwnProps & { [key: string]: boolean }
  >(
    demandedPermissions: TPermissionName[],
    options: TInjectAuthorizedOptions<OwnProps> = {},
    propName = 'isAuthorized'
  ) =>
  (
    Component: ComponentType<OwnProps>
  ): ComponentType<OwnProps & InjectedProps> => {
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
