import React from 'react';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { ApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  hasSomePermissions,
  hasEveryPermissions,
  hasEveryActionRight,
  hasAppliedDataFence,
} from '../../utils/has-permissions';
import getDisplayName from '../../utils/get-display-name';

// Permissions
type TPermissionName = string;
type TPermissions = {
  [key: string]: boolean;
};
// Action rights
type TActionRightName = string;
type TActionRightGroup = string;
type TDemandedActionRight = {
  group: TActionRightGroup;
  name: TActionRightName;
};
type TActionRight = {
  [key: string]: boolean;
};
type TActionRights = {
  [key: string]: TActionRight;
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
// NOTE: we currently can't use Mapped Types as the babel transfomer does not
// understand them yet: https://github.com/milesj/babel-plugin-typescript-to-proptypes/issues/23
// type TDataFences = {
//   // E.g. { store: {...} }
//   [key in TDataFenceType]: TDataFenceGroupedByResourceType;
// };
type TDataFences = {
  // E.g. { store: {...} }
  store?: TDataFenceGroupedByResourceType;
};
type TDemandedDataFence = {
  group: string;
  name: string;
  type: TDataFenceType;
};
type TSelectDataFenceData = (
  demandedDataFenceWithActualValues: TDemandedDataFence & {
    actualDataFenceValues: string[];
  }
) => string[] | null;

type Props = {
  shouldMatchSomePermissions?: boolean;
  demandedPermissions: TPermissionName[];
  demandedActionRights?: TDemandedActionRight[];
  demandedDataFences?: TDemandedDataFence[];
  selectDataFenceData?: TSelectDataFenceData;
  actualPermissions: TPermissions | null;
  actualActionRights: TActionRights | null;
  actualDataFences: TDataFences | null;
  render: (isAuthorized: boolean) => React.ReactNode;
  children?: never;
};
const defaultProps: Pick<Props, 'shouldMatchSomePermissions'> = {
  shouldMatchSomePermissions: false,
};

const Authorized = (props: Props) => {
  // if the user has no permissions and no dataFences assigned to them, they are not authorized
  if (!props.actualDataFences && !props.actualPermissions) {
    return <React.Fragment>{props.render(false)}</React.Fragment>;
  }

  let hasDemandedPermissions = false;
  let hasDemandedActionRights = false;
  let hasDemandedDataFences = false;

  if (props.demandedDataFences && props.demandedDataFences.length > 0) {
    if (!props.selectDataFenceData) {
      reportErrorToSentry(
        new Error(
          `@commercetools-frontend/permissions/Authorized: Missing data fences selector "selectDataFenceData".`
        )
      );
    }
    hasDemandedDataFences = hasAppliedDataFence({
      demandedDataFences: props.demandedDataFences,
      actualDataFences: props.actualDataFences,
      selectDataFenceData: props.selectDataFenceData,
      actualPermissions: props.actualPermissions,
      demandedPermissions: props.demandedPermissions,
    });
  }

  hasDemandedPermissions = props.shouldMatchSomePermissions
    ? hasSomePermissions(props.demandedPermissions, props.actualPermissions)
    : hasEveryPermissions(props.demandedPermissions, props.actualPermissions);

  hasDemandedActionRights = hasEveryActionRight(
    props.demandedActionRights || [],
    props.actualActionRights
  );

  return (
    <React.Fragment>
      {props.render(
        hasDemandedDataFences ||
          (hasDemandedPermissions && hasDemandedActionRights)
      )}
    </React.Fragment>
  );
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
    <ApplicationContext
      render={applicationContext => (
        <Authorized
          shouldMatchSomePermissions={options.shouldMatchSomePermissions}
          demandedPermissions={demandedPermissions}
          demandedActionRights={options.actionRights}
          demandedDataFences={options.dataFences}
          actualPermissions={applicationContext.permissions}
          actualActionRights={applicationContext.actionRights}
          actualDataFences={applicationContext.dataFences}
          selectDataFenceData={
            options.getSelectDataFenceData &&
            options.getSelectDataFenceData(props)
          }
          render={isAuthorized => (
            <Component {...props} {...{ [propName]: isAuthorized }} />
          )}
        />
      )}
    />
  );
  WrappedComponent.displayName = `withUserPermissions(${getDisplayName<
    OwnProps
  >(Component)})`;
  return WrappedComponent;
};

export default Authorized;
export { injectAuthorized };
