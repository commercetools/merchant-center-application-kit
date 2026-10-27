import type { DocumentNode, FieldNode, OperationDefinitionNode } from 'graphql';

// Endpoints of the Merchant Center proxy. For page navigations, the proxy adds
// a `<link rel="preload" as="fetch">` tag for each of them to the HTML.
export const PREFETCH_PATHS = {
  user: '/__prefetch/user',
  project: '/__prefetch/project',
} as const;

type TPrefetchResponse = {
  data?: Record<string, unknown> | null;
  errors?: unknown[];
};

const responsesByUrl = new Map<
  string,
  Promise<TPrefetchResponse | undefined>
>();
const consumedUrls = new Set<string>();

export const findPrefetchUrl = (
  path: string,
  params: Record<string, string | undefined>
): string | undefined => {
  if (typeof document === 'undefined') {
    return undefined;
  }
  const links = document.querySelectorAll<HTMLLinkElement>(
    'link[rel="preload"][as="fetch"]'
  );
  return Array.from(links)
    .map((link) => new URL(link.href, window.location.origin))
    .find(
      (url) =>
        url.origin === window.location.origin &&
        url.pathname === path &&
        Object.entries(params).every(
          ([name, value]) =>
            value !== undefined && url.searchParams.get(name) === value
        )
    )
    ?.toString();
};

export const isPrefetchUrlConsumed = (url: string) => consumedUrls.has(url);

const getRootFieldSelection = (document: DocumentNode) => {
  const operation = document.definitions.find(
    (definition): definition is OperationDefinitionNode =>
      definition.kind === 'OperationDefinition'
  );
  const rootField = operation?.selectionSet.selections.find(
    (selection): selection is FieldNode => selection.kind === 'Field'
  );
  if (!rootField) {
    return undefined;
  }
  return {
    name: (rootField.alias ?? rootField.name).value,
    fields: (rootField.selectionSet?.selections ?? [])
      .filter((selection): selection is FieldNode => selection.kind === 'Field')
      .map((field) => (field.alias ?? field.name).value),
  };
};

// A missing session returns HTTP 200 with an `UNAUTHENTICATED` error, so only
// a complete result of the query can be used.
const getIsCompleteResult = (
  response: TPrefetchResponse | undefined,
  document: DocumentNode
): response is { data: Record<string, unknown> } => {
  const rootField = getRootFieldSelection(document);
  if (!rootField || !response?.data || response.errors?.length) {
    return false;
  }
  const rootValue = response.data[rootField.name];
  if (!rootValue || typeof rootValue !== 'object') {
    return false;
  }
  return rootField.fields.every((field) => field in rootValue);
};

// Each URL is used only once: the data is from the page load and must not
// overwrite newer data later on.
export const readPrefetchedData = async <TData>(
  url: string,
  document: DocumentNode
): Promise<TData | undefined> => {
  let responsePromise = responsesByUrl.get(url);
  if (!responsePromise) {
    // No new network request: the browser reuses the preloaded response, as
    // long as the credentials match `crossorigin="use-credentials"`.
    responsePromise = fetch(url, { credentials: 'include' })
      .then((response) =>
        response.ok
          ? (response.json() as Promise<TPrefetchResponse>)
          : undefined
      )
      .catch(() => undefined);
    responsesByUrl.set(url, responsePromise);
  }
  const response = await responsePromise;
  consumedUrls.add(url);
  return getIsCompleteResult(response, document)
    ? (response.data as TData)
    : undefined;
};
