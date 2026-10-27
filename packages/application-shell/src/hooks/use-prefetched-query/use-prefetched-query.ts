import { useEffect, useMemo, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import type { DocumentNode } from 'graphql';
import { selectTeamIdFromStorage } from '@commercetools-frontend/application-shell-connectors';
import type { ApplicationWindow } from '@commercetools-frontend/constants';
import {
  findPrefetchUrl,
  isPrefetchUrlConsumed,
  readPrefetchedData,
} from '../../utils/prefetched-query';

declare let window: ApplicationWindow;

type TUsePrefetchedQueryOptions<TVariables> = {
  path: string;
  params?: Record<string, string | undefined>;
  query: DocumentNode;
  variables?: TVariables;
  skip?: boolean;
};

// Writes the result prefetched by the proxy to the Apollo cache. The query
// must be skipped while `isPending` is `true`, then it reads from the cache.
// Without a usable prefetched result, the query runs as usual.
function usePrefetchedQuery<TVariables>(
  options: TUsePrefetchedQueryOptions<TVariables>
) {
  const apolloClient = useApolloClient();
  const params = {
    ...options.params,
    applicationId: window.app.applicationIdentifier,
  };
  const paramsKey = JSON.stringify(params);
  const url = useMemo(() => {
    // The prefetch request can't send the active team (`x-team-id`), so its
    // permissions would not match the ones of the regular query.
    if (options.skip || selectTeamIdFromStorage()) {
      return undefined;
    }
    const prefetchUrl = findPrefetchUrl(options.path, params);
    return prefetchUrl && !isPrefetchUrlConsumed(prefetchUrl)
      ? prefetchUrl
      : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.skip, options.path, paramsKey]);
  const [settledUrl, setSettledUrl] = useState<string>();

  useEffect(() => {
    if (!url) {
      return;
    }
    let isMounted = true;
    readPrefetchedData(url, options.query).then((data) => {
      if (data) {
        try {
          apolloClient.writeQuery({
            query: options.query,
            variables: options.variables,
            data,
          });
        } catch {
          // The query falls back to a network request.
        }
      }
      if (isMounted) {
        setSettledUrl(url);
      }
    });
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { isPending: Boolean(url) && settledUrl !== url };
}

export default usePrefetchedQuery;
