import React from 'react';
import invariant from 'tiny-invariant';
import { TPermissionName } from '../../types';
import isNil from 'lodash/isNil';
import { ApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import Authorized from '../authorized';

const getHasChildren = (children: React.ReactNode) =>
  React.Children.count(children) > 0;

type TRenderProp = (props: { isAuthorized: boolean }) => React.ReactNode;
type Props = {
  shouldMatchSomePermissions?: boolean;
  permissions: TPermissionName[];
  unauthorizedComponent?: React.ComponentType;
  render?: TRenderProp;
  children?: TRenderProp | React.ReactNode;
};

const RestrictedByPermissions = (props: Props) => {
  invariant(
    !(
      typeof props.children === 'function' &&
      !isNil(props.unauthorizedComponent)
    ),
    '@commercetools-frontend/permissions/RestrictedByPermissions: You provided both `children` and `unauthorizedComponent`. Please provide only one of them.'
  );

  return (
    <ApplicationContext
      render={applicationContext => (
        <Authorized
          shouldMatchSomePermissions={props.shouldMatchSomePermissions}
          demandedPermissions={props.permissions}
          actualPermissions={applicationContext.permissions}
          render={(isAuthorized: boolean) => {
            if (typeof props.children === 'function')
              return props.children({
                isAuthorized,
              });
            if (typeof props.render === 'function')
              return props.render({
                isAuthorized,
              });

            if (isAuthorized) {
              if (props.children && getHasChildren(props.children))
                return React.Children.only(props.children);
            } else if (!isAuthorized) {
              if (props.unauthorizedComponent) {
                return React.createElement(props.unauthorizedComponent);
              }
            }

            return null;
          }}
        />
      )}
    />
  );
};
RestrictedByPermissions.displayName = 'RestrictedByPermissions';

export default RestrictedByPermissions;
