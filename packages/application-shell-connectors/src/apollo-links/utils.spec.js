import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { getDoesGraphQLTargetSupportTokenRetry } from './utils';

describe('supported GraphQL targets', () => {
  it('should support the `ctp` GraphQL target', () => {
    expect(
      getDoesGraphQLTargetSupportTokenRetry({
        headers: { 'X-Graphql-Target': GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM },
      })
    ).toBe(true);
  });

  it('should support the `administration` GraphQL target', () => {
    expect(
      getDoesGraphQLTargetSupportTokenRetry({
        headers: { 'X-Graphql-Target': GRAPHQL_TARGETS.ADMINISTRATION_SERVICE },
      })
    ).toBe(true);
  });

  it('should not support the `dashboard service` GraphQL target', () => {
    expect(
      getDoesGraphQLTargetSupportTokenRetry({
        headers: { 'X-Graphql-Target': GRAPHQL_TARGETS.DASHBOARD_SERVICE },
      })
    ).toBe(false);
  });

  it('should not support the `change history` GraphQL target', () => {
    expect(
      getDoesGraphQLTargetSupportTokenRetry({
        headers: { 'X-Graphql-Target': GRAPHQL_TARGETS.CHANGE_HISTORY },
      })
    ).toBe(false);
  });

  it('should not support the `settings service` GraphQL target', () => {
    expect(
      getDoesGraphQLTargetSupportTokenRetry({
        headers: { 'X-Graphql-Target': GRAPHQL_TARGETS.SETTINGS_SERVICE },
      })
    ).toBe(true);
  });

  it('should support the `merchant center backend service` GraphQL target', () => {
    expect(
      getDoesGraphQLTargetSupportTokenRetry({
        headers: {
          'X-Graphql-Target': GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
        },
      })
    ).toBe(true);
  });
});
