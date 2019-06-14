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
type RenderProp = (isAuthorized: boolean) => React.ReactNode;
type Props = {
  shouldMatchSomePermissions?: boolean;
  demandedPermissions: TPermissionName[];
  actualPermissions: TPermissions;
  render: RenderProp;
  children?: never;
} & DefaultProps;

class Authorized extends React.Component<Props> {
  static displayName = 'Authorized';
  static defaultProps = defaultProps;
  render() {
    const namesOfNonConfiguredPermissions = getInvalidPermissions(
      this.props.demandedPermissions,
      this.props.actualPermissions
    );
    invariant(
      !(namesOfNonConfiguredPermissions.length > 0),
      '@commercetools-frontend/permissions/Authorized: Invalid prop `demandedPermissions` supplied. The permission(s) ${namesOfNonConfiguredPermissions.toString()} is/are not configured through `actualPermissions`.'
    );

    const isAuthorized = this.props.shouldMatchSomePermissions
      ? hasSomePermissions(
          this.props.demandedPermissions,
          this.props.actualPermissions
        )
      : hasEveryPermissions(
          this.props.demandedPermissions,
          this.props.actualPermissions
        );

    return this.props.render(isAuthorized);
  }
}

type InjectedProps = {
  [propName: string]: boolean;
};
const injectAuthorized = <Props extends {}>(
  demandedPermissions: TPermissionName[],
  options: { shouldMatchSomePermissions?: boolean } = {},
  propName = 'isAuthorized'
) => (
  Component: React.ComponentType<Props>
): React.ComponentType<Props & InjectedProps> => {
  const WrappedComponent = (props: Props) => (
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
  WrappedComponent.displayName = `withUserPermissions(${getDisplayName(
    Component
  )})`;
  return WrappedComponent;
};

export default Authorized;
export { injectAuthorized };
