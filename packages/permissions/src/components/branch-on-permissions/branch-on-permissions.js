import React from 'react';
import PropTypes from 'prop-types';
import getDisplayName from '../../utils/get-display-name';
import { injectAuthorized } from '../authorized';

const branchOnPermissions = (
  demandedPermissions,
  FallbackComponent,
  options
) => Component => {
  const WrappedComponent = props => {
    if (props.isAuthorized) {
      return <Component {...props} />;
    }
    if (FallbackComponent) {
      return <FallbackComponent />;
    }
    return null;
  };
  WrappedComponent.displayName = `branchOnPermissions(${getDisplayName(
    Component
  )})`;
  WrappedComponent.propTypes = {
    isAuthorized: PropTypes.bool.isRequired,
  };
  return injectAuthorized(demandedPermissions, options)(WrappedComponent);
};

export default branchOnPermissions;
