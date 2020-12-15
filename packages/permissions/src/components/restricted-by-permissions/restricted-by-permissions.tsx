import type {
  TNormalizedPermissions,
  TNormalizedActionRights,
  TNormalizedDataFences,
} from '@commercetools-frontend/application-shell-connectors';

import React from 'react';
import invariant from 'tiny-invariant';
import isNil from 'lodash/isNil';
import Authorized from '../authorized';

const getHasChildren = (children: React.ReactNode) =>
  React.Children.count(children) > 0;

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
type TRenderProp = (props: { isAuthorized: boolean }) => React.ReactNode;

type Props = {
  shouldMatchSomePermissions?: boolean;
  permissions: TPermissionName[];
  actionRights?: TDemandedActionRight[];
  dataFences?: TDemandedDataFence[];
  selectDataFenceData?: TSelectDataFenceData;
  unauthorizedComponent?: React.ComponentType;
  projectPermissions?: TProjectPermissions;
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
    <Authorized
      shouldMatchSomePermissions={props.shouldMatchSomePermissions}
      demandedPermissions={props.permissions}
      demandedActionRights={props.actionRights}
      demandedDataFences={props.dataFences}
      selectDataFenceData={props.selectDataFenceData}
      projectPermissions={props.projectPermissions}
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
  );
};
RestrictedByPermissions.displayName = 'RestrictedByPermissions';

export default RestrictedByPermissions;
