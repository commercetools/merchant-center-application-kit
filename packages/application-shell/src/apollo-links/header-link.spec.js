import { ApolloLink, execute, Observable } from 'apollo-link';
import gql from 'graphql-tag';
import waitFor from 'wait-for-observables';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import {
  getCorrelationId,
  selectProjectKeyFromUrl,
  selectTeamIdFromLocalStorage,
  selectUserId,
} from '../utils';
import headerLink from './header-link';

jest.mock('../utils/', () => ({
  getCorrelationId: jest.fn(() => 'test-correlation-id'),
  selectProjectKeyFromUrl: jest.fn(() => 'project-1'),
  selectTeamIdFromLocalStorage: jest.fn(() => 'team-1'),
  selectUserId: jest.fn(() => 'user-1'),
}));

describe('headerLink', () => {
  it('should be an instance of ApolloLink', () => {
    expect(headerLink).toBeInstanceOf(ApolloLink);
  });
});

const query = gql`
  {
    sample {
      id
    }
  }
`;

describe('with valid target', () => {
  let context;
  let debugLink;
  let link;
  let terminatingLinkStub;

  beforeEach(async () => {
    debugLink = new ApolloLink((operation, forward) => {
      context = operation.getContext();

      return forward(operation);
    });

    terminatingLinkStub = jest.fn(() => Observable.of({}));

    link = ApolloLink.from([headerLink, debugLink, terminatingLinkStub]);

    await waitFor(
      execute(link, {
        query,
        variables: { target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND },
      })
    );
  });

  it('should set headers matching snapshot', () => {
    expect(context).toMatchSnapshot();
  });

  it('should allow specifying `X-Project-Key`-Header', () => {
    expect(context.headers).toEqual(
      expect.objectContaining({
        'X-Project-Key': 'project-1',
      })
    );
  });

  it('should allow specifying `X-Team-Id`-Header', () => {
    expect(context.headers).toEqual(
      expect.objectContaining({
        'X-Team-Id': 'team-1',
      })
    );
  });

  it('should allow specifying `X-Graphql-Target`-Header', () => {
    expect(context.headers).toEqual(
      expect.objectContaining({
        'X-Graphql-Target': GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
      })
    );
  });

  it('should include `mc` in the `X-Correlation-Id`-Header', () => {
    expect(context.headers).toEqual(
      expect.objectContaining({
        'X-Correlation-Id': 'test-correlation-id',
      })
    );
  });

  it('should pass "userId" param to "getCorrelationId"', () => {
    expect(getCorrelationId).toHaveBeenCalledWith({ userId: 'user-1' });
  });

  describe('with project key in variables', () => {
    const projectKey = 'test-project-key';

    beforeEach(async () => {
      await waitFor(
        execute(link, {
          query,
          variables: {
            target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
            projectKey,
          },
        })
      );
    });

    it('should set headers matching snapshot', () => {
      expect(context).toMatchSnapshot();
    });

    it('should set `X-Project-Key`-Header', () => {
      expect(context.headers).toEqual(
        expect.objectContaining({
          'X-Project-Key': projectKey,
        })
      );
    });
  });

  describe('with team id in variables', () => {
    const teamId = 'test-team-id';

    beforeEach(async () => {
      await waitFor(
        execute(link, {
          query,
          variables: {
            target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
            teamId,
          },
        })
      );
    });

    it('should set headers matching snapshot', () => {
      expect(context).toMatchSnapshot();
    });

    it('should set `X-Team-Id`-Header', () => {
      expect(context.headers).toEqual(
        expect.objectContaining({
          'X-Team-Id': teamId,
        })
      );
    });
  });

  describe('with empty header values', () => {
    const teamId = null;
    const projectKey = undefined;

    beforeEach(async () => {
      selectProjectKeyFromUrl.mockReturnValueOnce(null);
      selectTeamIdFromLocalStorage.mockReturnValueOnce(null);

      await waitFor(
        execute(link, {
          query,
          variables: {
            target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
            teamId,
            projectKey,
          },
        })
      );
    });

    it('should remove the empty header values', () => {
      expect(context.headers).not.toHaveProperty('X-Team-Id');
      expect(context.headers).not.toHaveProperty('X-Project-Key');
      expect(context.headers).toHaveProperty('X-Correlation-Id');
    });
  });
});
