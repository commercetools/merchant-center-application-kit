import React from 'react';
import invariant from 'tiny-invariant';
import { TPermissions, TPermissionName } from '../../types';
import isNil from 'lodash/isNil';
import { withApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import Authorized from '../authorized';

const getHasChildren = (children: React.ReactNode) =>
  React.Children.count(children) > 0;

type TRenderProp = (props: { isAuthorized: boolean }) => React.ReactNode;
type Props = {
  shouldMatchSomePermissions?: boolean;
  permissions: TPermissionName[];
  unauthorizedComponent?: React.ComponentType;
  children?: TRenderProp;
  render?: TRenderProp;
};
type InjectedProps = {
  applicationContext: {
    permissions: TPermissions | null;
  };
};

export class RestrictedByPermissions extends React.Component<
  Props & InjectedProps
> {
  static displayName = 'RestrictedByPermissions';

  render() {
    invariant(
      !(
        typeof this.props.children === 'function' &&
        !isNil(this.props.unauthorizedComponent)
      ),
      '@commercetools-frontend/permissions/RestrictedByPermissions: You provided both `children` and `unauthorizedComponent`. Please provide only one of them.'
    );

    return (
      <Authorized
        shouldMatchSomePermissions={this.props.shouldMatchSomePermissions}
        demandedPermissions={this.props.permissions}
        actualPermissions={this.props.applicationContext.permissions}
        render={(isAuthorized: boolean) => {
          if (typeof this.props.children === 'function')
            return this.props.children({
              isAuthorized,
            });
          if (typeof this.props.render === 'function')
            return this.props.render({
              isAuthorized,
            });

          if (isAuthorized) {
            if (this.props.children && getHasChildren(this.props.children))
              return React.Children.only(this.props.children);
          } else if (!isAuthorized) {
            if (this.props.unauthorizedComponent) {
              return React.createElement(this.props.unauthorizedComponent);
            }
          }

          return null;
        }}
      />
    );
  }
}

export default withApplicationContext<Props, InjectedProps>()(
  RestrictedByPermissions
);
