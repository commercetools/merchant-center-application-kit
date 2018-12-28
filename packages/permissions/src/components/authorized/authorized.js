import React from 'react';
import PropTypes from 'prop-types';
import { wrapDisplayName } from 'recompose';
import { ApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  hasSomePermissions,
  hasEveryPermissions,
  getInvalidPermissions,
} from '../../utils/has-permissions';

class Authorized extends React.Component {
  static displayName = 'Authorized';
  static propTypes = {
    shouldMatchSomePermissions: PropTypes.bool,
    /**
     * This custom prop-types verifies that any permission passed as
     * `demandedPermissions` actually exists on the `actualPermissions`.
     *
     * This was previously achieved through a validation via the constants (`Object.keys(permissions)`).
     * This was deemded to not be flexible enough to introduce new permissions as they have to be
     * added to the constants and released each time.
     */
    demandedPermissions(props, propName, componentName) {
      const namesOfNonConfiguredPermissions = getInvalidPermissions(
        props.demandedPermissions,
        props.actualPermissions
      );

      if (namesOfNonConfiguredPermissions.length > 0) {
        return new Error(
          `Invalid prop \`${propName}\` supplied to \`${componentName}\`. The permission(s) ${namesOfNonConfiguredPermissions.toString()} is/are not configured through \`actualPermissions\`.`
        );
      }

      // Legacy shape of permissions
      return null;
    },
    actualPermissions: PropTypes.objectOf(PropTypes.bool).isRequired,
    render: PropTypes.func,
  };
  static defaultProps = {
    shouldMatchSomePermissions: false,
  };
  render() {
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

const injectAuthorized = (
  demandedPermissions,
  options = {},
  propName = 'isAuthorized'
) => Component => {
  const WrappedComponent = props => (
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
  WrappedComponent.displayName = wrapDisplayName(
    Component,
    'withUserPermissions'
  );
  return WrappedComponent;
};

export default Authorized;
export { injectAuthorized };
