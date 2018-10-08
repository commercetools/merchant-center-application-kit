import { ApolloLink, execute, Observable } from 'apollo-link';
import gql from 'graphql-tag';
import waitFor from 'wait-for-observables';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import headerLink from './header-link';

jest.mock('../utils/', () => ({
  getCorrelationId: () => 'test-correlation-id',
  selectProjectKeyFromUrl: () => 'project-1',
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

  it('should set `X-Project-Key`-Header', () => {
    expect(context.headers).toEqual(
      expect.objectContaining({
        'X-Project-Key': 'project-1',
      })
    );
  });

  it('should set `X-Graphql-Target`-Header', () => {
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
});
