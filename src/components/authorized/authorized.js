import React from 'react';
import PropTypes from 'prop-types';
import { wrapDisplayName } from 'recompose';
import { GetUserPermissions } from '@commercetools-frontend/application-shell-connectors';
import {
  hasSomePermissions,
  hasEveryPermissions,
} from '../../utils/has-permissions';

class Authorized extends React.Component {
  static displayName = 'Authorized';
  static propTypes = {
    shouldMatchSomePermissions: PropTypes.bool,
    demandedPermissions: PropTypes.arrayOf(
      PropTypes.shape({
        mode: PropTypes.string.isRequired,
        resource: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    actualPermissions: PropTypes.objectOf(PropTypes.bool).isRequired,
    render: PropTypes.func,
  };
  static defaultProps = {
    shouldMatchSomePermissions: false,
  };

  render() {
    const isAuthorized = this.props.shouldMatchSomePermissions
      ? hasSomePermissions(
          this.props.actualPermissions,
          this.props.demandedPermissions
        )
      : hasEveryPermissions(
          this.props.actualPermissions,
          this.props.demandedPermissions
        );
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
