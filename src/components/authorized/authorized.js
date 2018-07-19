import React from 'react';
import PropTypes from 'prop-types';
import { wrapDisplayName } from 'recompose';
import memoizeOne from 'memoize-one';
import { GetUserPermissions } from '@commercetools-frontend/application-shell-connectors';
import {
  hasSomePermissions,
  hasEveryPermissions,
} from '../../utils/has-permissions';
import * as permissionKeys from '../../constants';
import { toPermissionShape } from '../../utils/transforms';

const ensurePermissionsShape = memoizeOne(permissions =>
  permissions.map(
    permission =>
      typeof permission === 'string'
        ? toPermissionShape(permission)
        : permission
  )
);

class Authorized extends React.Component {
  static displayName = 'Authorized';
  static propTypes = {
    shouldMatchSomePermissions: PropTypes.bool,
    demandedPermissions: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.oneOf(Object.keys(permissionKeys)),
        PropTypes.shape({
          mode: PropTypes.string.isRequired,
          resource: PropTypes.string.isRequired,
        }),
      ]).isRequired
    ).isRequired,
    actualPermissions: PropTypes.objectOf(PropTypes.bool).isRequired,
    render: PropTypes.func,
  };
  static defaultProps = {
    shouldMatchSomePermissions: false,
  };

  render() {
    const demandedPermissions = ensurePermissionsShape(
      this.props.demandedPermissions
    );
    const isAuthorized = this.props.shouldMatchSomePermissions
      ? hasSomePermissions(this.props.actualPermissions, demandedPermissions)
      : hasEveryPermissions(this.props.actualPermissions, demandedPermissions);
    return this.props.render(isAuthorized);
  }
}

const injectAuthorized = (
  demandedPermissions,
  options = {},
  propName = 'isAuthorized'
) => Component => {
  const WrappedComponent = props => (
    <GetUserPermissions
      render={userPermissions => (
        <Authorized
          shouldMatchSomePermissions={options.shouldMatchSomePermissions}
          demandedPermissions={demandedPermissions}
          actualPermissions={userPermissions}
          render={isAuthorized => (
            <Component {...props} {...{ [propName]: isAuthorized }} />
          )}
        />
      )}
    />
  );
  WrappedComponent.displayName = wrapDisplayName(
    Component,
    'withUserPermissions'
  );
  return WrappedComponent;
};

export default Authorized;
export { injectAuthorized };
