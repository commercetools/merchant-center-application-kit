import { ApolloLink, execute, Observable } from 'apollo-link';
import gql from 'graphql-tag';
import waitFor from 'wait-for-observables';
import { STORAGE_KEYS as CORE_STORAGE_KEYS } from '@commercetools-local/constants';
import { createSetTokenLink } from './set-token-link';

const query = gql`
  {
    sample {
      id
    }
  }
`;

describe('with `x-set-token-header` target', () => {
  let setTokenLinkConfig;
  let setTokenLink;
  let link;
  let terminatingLinkStub;

  beforeEach(async () => {
    setTokenLinkConfig = {
      storage: { put: jest.fn() },
    };

    setTokenLink = createSetTokenLink(setTokenLinkConfig);

    terminatingLinkStub = new ApolloLink(operation => {
      operation.setContext({
        response: {
          headers: { get: jest.fn(() => 'token') },
        },
      });

      return Observable.of({});
    });

    link = ApolloLink.from([setTokenLink, terminatingLinkStub]);

    await waitFor(
      execute(link, {
        query,
      })
    );
  });

  it('should set the token', () => {
    expect(setTokenLinkConfig.storage.put).toHaveBeenCalledWith(
      CORE_STORAGE_KEYS.TOKEN,
      'token'
    );
  });
});
