import React from 'react';
import PropTypes from 'prop-types';
import { wrapDisplayName } from 'recompose';
import { defaultMemoize } from 'reselect';
import warning from 'warning';
import camelCase from 'lodash.camelcase';
import upperFirst from 'lodash.upperfirst';
import { GetUserPermissions } from '@commercetools-frontend/application-shell-connectors';
import {
  hasSomePermissions,
  hasEveryPermissions,
} from '../../utils/has-permissions';
import { permissions } from '../../constants';

const ensurePermissionsKeyShape = defaultMemoize(demandedPermissions =>
  demandedPermissions.map(
    permission =>
      typeof permission === 'string'
        ? permission
        : upperFirst(camelCase(`${permission.mode} ${permission.resource}`))
  )
);

class Authorized extends React.Component {
  static displayName = 'Authorized';
  static propTypes = {
    shouldMatchSomePermissions: PropTypes.bool,
    demandedPermissions: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.oneOf(Object.values(permissions)),
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
  hasAlreadyLoggedDeprecationWarning = false;
  componentDidUpdate() {
    if (this.hasAlreadyLoggedDeprecationWarning) return;
    const hasDemandedPermissionsWithDeprecatedFormat = this.props.demandedPermissions.some(
      permission => typeof permission !== 'string'
    );
    const shouldSkipWarning =
      process.env.NODE_ENV === 'production' ||
      !hasDemandedPermissionsWithDeprecatedFormat;
    warning(
      shouldSkipWarning,
      'The permission format with "{ mode, resource }" has been deprecated. Please use the constant values from the "@commercetools-frontend/permissions" package.'
    );
    if (!shouldSkipWarning) this.hasAlreadyLoggedDeprecationWarning = true;
  }
  render() {
    const demandedPermissions = ensurePermissionsKeyShape(
      this.props.demandedPermissions
    );
    const isAuthorized = this.props.shouldMatchSomePermissions
      ? hasSomePermissions(demandedPermissions, this.props.actualPermissions)
      : hasEveryPermissions(demandedPermissions, this.props.actualPermissions);
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
