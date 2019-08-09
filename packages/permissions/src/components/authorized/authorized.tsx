import React from 'react';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { ApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  hasSomePermissions,
  hasEveryPermissions,
  hasEveryActionRight,
  getInvalidPermissions,
  createHasAppliedDataFence,
} from '../../utils/has-permissions';
import getDisplayName from '../../utils/get-display-name';

type TPermissions = {
  [key: string]: boolean;
};
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
type TActionRight = {
  [key: string]: boolean;
};
type TActionRights = {
  [key: string]: TActionRight;
};
type TDataFenceGroupedByPermission = {
  // E.g. { canManageOrders: { values: [] } }
  [key: string]: { values: string[] };
};
type TDataFenceGroupedByResourceType = {
  // E.g. { orders: {...} }
  [key: string]: TDataFenceGroupedByPermission;
};
type TDataFences = {
  // E.g. { store: {...} }
  [key: string]: TDataFenceGroupedByResourceType;
};
type TSelectDataFenceDataByType = (dataFenceWithType: {
  type: TDataFenceType;
}) => string[] | null;

type Props = {
  shouldMatchSomePermissions?: boolean;
  demandedPermissions: TPermissionName[];
  demandedActionRights?: TDemandedActionRight[];
  demandedDataFences?: TDemandedDataFence[];
  selectDataFenceDataByType?: TSelectDataFenceDataByType;
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

  if (
    props.actualDataFences &&
    props.demandedDataFences &&
    props.demandedDataFences.length > 0
  ) {
    if (!props.selectDataFenceDataByType) {
      console.error('DataFences are demanded but no selector provided');
      return <React.Fragment>{props.render(false)}</React.Fragment>;
    }
    return (
      <React.Fragment>
        {props.render(
          createHasAppliedDataFence({
            actualPermissions: props.actualPermissions,
            demandedDataFences: props.demandedDataFences,
            actualDataFences: props.actualDataFences,
            selectDataFenceDataByType: props.selectDataFenceDataByType,
          })
        )}
      </React.Fragment>
    );
  }

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

  getSelectDataFenceDataByType?: (
    ownProps: OwnProps
  ) => TSelectDataFenceDataByType;
};

const injectAuthorized = <
  OwnProps extends {
    isAuthorized?: boolean;
  },
  InjectedProps extends OwnProps & { [key: string]: boolean }
>(
  demandedPermissions: TPermissionName[],
  options: TInjectAuthorizedOptions<OwnProps> = {},
  propName: string = 'isAuthorized'
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
          selectDataFenceDataByType={
            options.getSelectDataFenceDataByType &&
            options.getSelectDataFenceDataByType(props)
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
