import React from 'react';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { ApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  hasSomePermissions,
  hasEveryPermissions,
  hasEveryActionRight,
  getInvalidPermissions,
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
type TActionRight = {
  [key: string]: boolean;
};
type TActionRights = {
  [key: string]: TActionRight;
};

const defaultProps = {
  shouldMatchSomePermissions: false,
};
type DefaultProps = typeof defaultProps;
type Props = {
  shouldMatchSomePermissions?: boolean;
  demandedPermissions: TPermissionName[];
  demandedActionRights?: TDemandedActionRight[];
  actualPermissions: TPermissions | null;
  actualActionRights: TActionRights | null;
  render: (isAuthorized: boolean) => React.ReactNode;
  children?: never;
} & DefaultProps;

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

  return (
    <React.Fragment>
      {props.render(hasDemandedPermissions && hasDemandedActionRights)}
    </React.Fragment>
  );
};
Authorized.displayName = 'Authorized';
Authorized.defaultProps = defaultProps;

type TInjectAuthorizedOptions = {
  shouldMatchSomePermissions?: boolean;
  actionRights?: TDemandedActionRight[];
};
const injectAuthorized = <
  OwnProps extends { isAuthorized?: boolean },
  InjectedProps extends OwnProps & { [key: string]: boolean }
>(
  demandedPermissions: TPermissionName[],
  options: TInjectAuthorizedOptions = {},
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
          actualPermissions={applicationContext.permissions}
          actualActionRights={applicationContext.actionRights}
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
