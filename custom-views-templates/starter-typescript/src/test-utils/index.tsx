import { graphql } from 'msw';
import { mapResourceAccessToAppliedPermissions } from '@commercetools-frontend/application-shell/test-utils';

export const getDefaultCustomViewServerMocks = () => [
  graphql.query('AmILoggedIn', (_req, res, ctx) => {
    return res(
      ctx.data({
        amILoggedIn: {
          hasRequiredPermissions: true,
        },
      })
    );
  }),
  graphql.query('FetchLoggedInUser', (_req, res, ctx) => {
    return res(
      ctx.data({
        user: {
          id: '123456890',
          email: 'none@nowhere.com',
          firstName: 'No',
          lastName: 'Ne',
          language: 'en',
          numberFormat: 'en',
          timeZone: 'Europe/Berlin',
          launchdarklyTrackingId: '0987654321',
          launchdarklyTrackingSubgroup: 'default',
          launchdarklyTrackingTeam: [],
          launchdarklyTrackingTenant: 'ctp-eu',
          defaultProjectKey: 'my-project',
          businessRole: 'Architect',
          projects: {
            total: 1,
            results: [
              {
                key: 'my-project',
                name: 'My Project',
                suspension: {
                  isActive: false,
                  reason: '',
                },
                expiry: {
                  isActive: false,
                  daysLeft: 90,
                },
              },
            ],
          },
          createdAt: '',
          gravatarHash: '',
          launchdarklyTrackingGroup: '',
          idTokenUserInfo: {
            iss: 'issuer',
            sub: 'subject',
            aud: 'audience',
            exp: 123456789,
            iat: 987654321,
            email: 'p.good@nowhere.com',
            name: 'Paul Good',
            additionalClaims: '{"oid":"1234-dfdshjk-1232"}',
          },
        },
      })
    );
  }),
  graphql.query('FetchProject', (_req, res, ctx) => {
    return res(
      ctx.data({
        project: {
          key: 'my-project',
          version: 1,
          name: 'My Project',
          countries: ['DE'],
          currencies: ['EUR'],
          languages: ['en'],
          owner: {
            id: '123456890',
            email: 'none@nowhere.com',
            name: 'No Ne',
          },
          initialized: true,
          expiry: {
            isActive: false,
            daysLeft: 90,
          },
          suspension: {
            isActive: false,
            reason: '',
          },
          allAppliedPermissions: mapResourceAccessToAppliedPermissions([
            // TODO: replace with the permissions required by your custom view
            'View12345',
          ]),
          allAppliedActionRights: [],
          allAppliedDataFences: [],
          allPermissionsForAllApplications: [],
          sampleDataImportDataset: {},
          total: 1,
          results: [],
        },
      })
    );
  }),
];
