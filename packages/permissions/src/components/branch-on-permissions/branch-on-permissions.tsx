import React from 'react';
import PropTypes from 'prop-types';
import { TPermissionName } from '../../types';
import getDisplayName from '../../utils/get-display-name';
import { injectAuthorized } from '../authorized';

type InjectedProps = {
  isAuthorized: boolean;
};

const branchOnPermissions = <Props extends {}>(
  demandedPermissions: TPermissionName[],
  FallbackComponent: React.ComponentType,
  options: { shouldMatchSomePermissions: boolean }
) => (Component: React.ComponentType<Props>) => {
  const WrappedComponent = (props: Props & InjectedProps) => {
    if (props.isAuthorized) {
      return <Component {...props} />;
    }
    if (FallbackComponent) {
      return <FallbackComponent />;
    }
    return null;
  };

  WrappedComponent.displayName = `branchOnPermissions(${getDisplayName<Props>(
    Component
  )})`;
  WrappedComponent.propTypes = {
    isAuthorized: PropTypes.bool.isRequired,
  };
  return injectAuthorized(demandedPermissions, options)(WrappedComponent);
};

export default branchOnPermissions;
