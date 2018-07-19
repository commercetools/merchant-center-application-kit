import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash.isnil';
import { withUserPermissions } from '@commercetools-frontend/application-shell-connectors';
import * as permissionKeys from '../../constants';
import Authorized from '../authorized';

const getHasChildren = children => React.Children.count(children) > 0;

export class RestrictedByPermissions extends React.Component {
  static displayName = 'RestrictedByPermissions';
  static propTypes = {
    shouldMatchSomePermissions: PropTypes.bool,
    permissions: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.oneOf(Object.keys(permissionKeys)),
        PropTypes.shape({
          mode: PropTypes.string.isRequired,
          resource: PropTypes.string.isRequired,
        }),
      ]).isRequired
    ).isRequired,

    unauthorizedComponent(props, propName, componentName, ...rest) {
      if (!isNil(props[propName]) && typeof props.children === 'function') {
        return new Error(
          `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Do not pass \`children\` as a function and \`unauthorizedComponent\`.`
        );
      }

      return PropTypes.func(props, propName, componentName, ...rest);
    },
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    render: PropTypes.func,

    // Injected
    userPermissions: PropTypes.objectOf(PropTypes.bool).isRequired,
  };

  render() {
    return (
      <Authorized
        shouldMatchSomePermissions={this.props.shouldMatchSomePermissions}
        demandedPermissions={this.props.permissions}
        actualPermissions={this.props.userPermissions}
        render={isAuthorized => {
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

export default withUserPermissions()(RestrictedByPermissions);
