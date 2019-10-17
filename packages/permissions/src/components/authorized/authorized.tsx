import React from 'react';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { ApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  hasSomePermissions,
  hasEveryPermissions,
  hasEveryActionRight,
  getInvalidPermissions,
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
  // Check first for data fences
  if (
    props.actualDataFences &&
    props.demandedDataFences &&
    props.demandedDataFences.length > 0
  ) {
    if (!props.selectDataFenceData) {
      reportErrorToSentry(
        new Error(
          `@commercetools-frontend/permissions/Authorized: Missing data fences selector "selectDataFenceData".`
        )
      );
      return <React.Fragment>{props.render(false)}</React.Fragment>;
    }
    return (
      <React.Fragment>
        {props.render(
          hasAppliedDataFence({
            demandedDataFences: props.demandedDataFences,
            actualDataFences: props.actualDataFences,
            selectDataFenceData: props.selectDataFenceData,
            actualPermissions: props.actualPermissions,
            demandedPermissions: props.demandedPermissions,
          })
        )}
      </React.Fragment>
    );
  }

  // If no data fences have been provided, fall back to normal permissions + action rights.
  if (!props.actualPermissions)
    return <React.Fragment>{props.render(false)}</React.Fragment>;

  const namesOfNonConfiguredPermissions = getInvalidPermissions(
    props.demandedPermissions,
    props.actualPermissions
  );

  if (namesOfNonConfiguredPermissions.length > 0)
    reportErrorToSentry(
      new Error(
        `@commercetools-frontend/permissions/Authorized: Invalid prop "demandedPermissions" supplied. The permission(s) ${namesOfNonConfiguredPermissions.toString()} is/are not configured through "actualPermissions".`
      ),
      { extra: namesOfNonConfiguredPermissions }
    );

  const hasDemandedPermissions = props.shouldMatchSomePermissions
    ? hasSomePermissions(props.demandedPermissions, props.actualPermissions)
    : hasEveryPermissions(props.demandedPermissions, props.actualPermissions);

  const hasDemandedActionRights = hasEveryActionRight(
    props.demandedActionRights || [],
    props.actualActionRights
  );

  return (
    <React.Fragment>
      {props.render(hasDemandedPermissions && hasDemandedActionRights)}
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
