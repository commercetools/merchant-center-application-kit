import React from 'react';
import PropTypes from 'prop-types';
import { renderApp } from '@commercetools-frontend/application-shell/test-utils';
import { permissions } from '../../constants';
import useIsAuthorized from './use-is-authorized';

const TestComponent = props => {
  const isAuthorized = useIsAuthorized({
    demandedPermissions: props.demandedPermissions,
    shouldMatchSomePermissions: props.shouldMatchSomePermissions,
  });
  return (
    <ul>
      <li>Is authorized: {isAuthorized ? 'Yes' : 'No'}</li>
    </ul>
  );
};
TestComponent.propTypes = {
  shouldMatchSomePermissions: PropTypes.bool,
  demandedPermissions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const render = ({
  demandedPermissions,
  shouldMatchSomePermissions,
  actualPermissions,
}) =>
  renderApp(
    <TestComponent
      demandedPermissions={demandedPermissions}
      shouldMatchSomePermissions={shouldMatchSomePermissions}
    />,
    {
      permissions: actualPermissions,
    }
  );

describe('when only one permission matches', () => {
  describe('when it should match some permission', () => {
    it('should indicate being authorized', () => {
      const { queryByText } = render({
        demandedPermissions: [
          permissions.ManageCustomers,
          permissions.ManageOrders,
        ],
        actualPermissions: {
          canManageCustomers: true,
        },
        shouldMatchSomePermissions: true,
      });

      expect(queryByText('Is authorized: Yes')).toBeInTheDocument();
    });
  });
  describe('when it should not match some permission', () => {
    describe('when `ManageProject` permission is set', () => {
      it('should indicate being authorized', () => {
        const { queryByText } = render({
          demandedPermissions: [
            permissions.ManageCustomers,
            permissions.ManageProject,
          ],
          shouldMatchSomePermissions: false,
        });

        expect(queryByText('Is authorized: Yes')).toBeInTheDocument();
      });
    });
    describe('when `ManageProject` permission is not set', () => {
      it('should indicate being not authorized', () => {
        const { queryByText } = render({
          actualPermissions: {
            canManageCustomers: true,
          },
          demandedPermissions: [
            permissions.ManageCustomers,
            permissions.ManageProject,
          ],
          shouldMatchSomePermissions: false,
        });

        expect(queryByText('Is authorized: No')).toBeInTheDocument();
      });
    });
  });
});
