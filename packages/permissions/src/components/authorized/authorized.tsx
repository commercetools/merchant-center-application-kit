import React from 'react';
import invariant from 'tiny-invariant';
import { TPermissions, TPermissionName } from '../../types';
import { ApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  hasSomePermissions,
  hasEveryPermissions,
  getInvalidPermissions,
} from '../../utils/has-permissions';
import getDisplayName from '../../utils/get-display-name';

const defaultProps = {
  shouldMatchSomePermissions: false,
};
type DefaultProps = typeof defaultProps;
type Props = {
  shouldMatchSomePermissions?: boolean;
  demandedPermissions: TPermissionName[];
  actualPermissions: TPermissions | null;
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
  invariant(
    !(namesOfNonConfiguredPermissions.length > 0),
    `@commercetools-frontend/permissions/Authorized: Invalid prop "demandedPermissions" supplied. The permission(s) ${namesOfNonConfiguredPermissions.toString()} is/are not configured through "actualPermissions"`
  );

  const isAuthorized = props.shouldMatchSomePermissions
    ? hasSomePermissions(props.demandedPermissions, props.actualPermissions)
    : hasEveryPermissions(props.demandedPermissions, props.actualPermissions);

  return <React.Fragment>{props.render(isAuthorized)}</React.Fragment>;
};
Authorized.displayName = 'Authorized';
Authorized.defaultProps = defaultProps;

const injectAuthorized = <
  OwnProps extends { isAuthorized?: boolean },
  InjectedProps extends OwnProps & { [key: string]: boolean }
>(
  demandedPermissions: TPermissionName[],
  options: { shouldMatchSomePermissions?: boolean } = {},
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
          actualPermissions={applicationContext.permissions}
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
