import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { ApplicationContextProvider } from '@commercetools-frontend/application-shell-connectors';
import branchOnPermissions from './branch-on-permissions';

const AuthorizedComponent = () => <div>{'Authorized'}</div>;
const UnauthorizedComponent = () => <div>{'Not authorized'}</div>;

const renderWithPermissions = (demandedPermissions: string[]) => {
  const Wrapped = branchOnPermissions(
    demandedPermissions,
    UnauthorizedComponent
  )(AuthorizedComponent);
  return render(
    <ApplicationContextProvider
      user={{
        id: 'u1',
        email: 'foo@bar.com',
        firstName: 'foo',
        lastName: 'bar',
        language: 'en',
        numberFormat: 'en',
        defaultProjectKey: undefined,
        timeZone: undefined,
        projects: {
          total: 1,
          results: [
            {
              key: 'p1',
              name: 'P1 ',
              expiry: { isActive: false },
              suspension: { isActive: false },
            },
          ],
        },
        gravatarHash: 'xxx',
        launchdarklyTrackingGroup: 'commercetools',
        launchdarklyTrackingSubgroup: 'dev',
        launchdarklyTrackingId: '111',
        launchdarklyTrackingTeam: undefined,
        launchdarklyTrackingTenant: 'gcp-eu',
      }}
      project={{
        key: 'foo-1',
        version: 1,
        name: 'Foo 1',
        countries: ['us'],
        currencies: ['USD'],
        languages: ['en'],
        owner: { id: 'o1' },
        initialized: true,
        expiry: {
          isActive: true,
          daysLeft: undefined,
        },
        suspension: {
          isActive: true,
          reason: undefined,
        },
        allAppliedPermissions: [{ name: 'canViewProducts', value: true }],
        allAppliedActionRights: [
          {
            group: 'products',
            name: 'canEditPrices',
            value: false,
          },
        ],
        allAppliedDataFences: [],
        allAppliedMenuVisibilities: [],
      }}
      projectDataLocale="en"
      environment={{
        revision: '1',
        applicationName: 'my-app',
        frontendHost: 'localhost:3001',
        mcApiUrl: 'https://mc-api.commercetools.com',
        location: 'eu',
        env: 'development',
        cdnUrl: 'http://localhost:3001',
        servedByProxy: false,
      }}
    >
      <Wrapped />
    </ApplicationContextProvider>
  );
};

describe('rendering', () => {
  describe('when permissions match', () => {
    it('should render component', async () => {
      const { getByText } = renderWithPermissions(['ViewProducts']);
      await waitForElement(() => getByText('Authorized'));
    });
  });
});
