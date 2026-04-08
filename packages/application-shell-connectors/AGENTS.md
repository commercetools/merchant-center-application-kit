# application-shell-connectors

## Purpose

Provides Apollo Client configuration, GraphQL hooks (`useMcQuery`, `useMcLazyQuery`, `useMcMutation`), the `ApplicationContext` React context, and HTTP client utilities that all Merchant Center customizations use to communicate with commercetools APIs.

## Key Context

- **Apollo link chain**: Configured in `src/configure-apollo.ts` with a specific link order — `headerLink` (sets auth/correlation headers) -> `errorLink` -> `loggerLink` (conditional) -> `tokenRetryLink` -> `httpLink`. The order matters; see comments in source.
- **Custom Apollo links**: `src/apollo-links/` contains `header-link` (injects `X-Graphql-Target`, auth token, correlation ID), `error-link` (maps GraphQL errors to Redux notifications), and `token-retry-link` (handles OIDC token refresh on 401).
- **ApplicationContext**: `src/components/application-context/` provides React context for user, project, environment, and permissions data. This is the primary way custom apps access runtime metadata.
- **Two preconstruct entry points**: `./index.ts` (main API) and `./test-utils/index.ts` (mock factories for `ProjectExtensionImageRegex` queries).
- **GraphQL files**: Contains `.mc.graphql` and `.settings.graphql` files. Generated types live in `src/types/generated/`.

## How To Work Here

Root workflows apply. After modifying `.graphql` files, run the matching codegen command to regenerate `src/types/generated/`.

## Gotchas

- `application-shell` re-exports most of this package's public API. Changes to exported symbols here can break the shell's re-export surface.
- The Apollo link order in `configure-apollo.ts` is load-bearing — reordering links will break authentication, error handling, or retry behavior.
