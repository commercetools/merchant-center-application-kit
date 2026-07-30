# Architecture of the Merchant Center APIs

Source. Fetch for full detail and diagrams:
https://commercetools.atlassian.net/wiki/spaces/MC/pages/1541996899/Architecture+of+our+APIs

The Merchant Center owns three APIs. It also relies on APIs owned by other teams
(Import and Export, Audit Log, general CoCo APIs, Connect).

## The three Merchant Center APIs

| API                        | Role                                                                                                                                                                                                                                                                                         |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `merchant-center-proxy`    | The API the browser talks to for static assets and for the Merchant Center menu, including installed Custom Applications.                                                                                                                                                                    |
| `merchant-center-gateway`  | Authentication and authorization. Routes requests to other APIs like Audit Log and the CoCo API. Acts as a Backend for Frontend (BFF) for the current user, accessible projects, password requests, and project creation. Also called `merchant-center-backend` and the Merchant Center API. |
| `merchant-center-settings` | Built on Prisma with a SQL database. Persistent storage for Custom Applications, Views, and a user's My View settings.                                                                                                                                                                       |

The browser talks to both the proxy and the gateway. It never talks to Audit Log
or CoCo directly. Most of these APIs speak GraphQL. The aggregated menu, the
current user, and My View are all GraphQL queries.

## Authentication and authorization

- **Authentication** verifies who you are. A user logs in with email and
  password. Credentials are verified by `POST /login` on a CoCo API.
- On success the `merchant-center-gateway` issues a JWT called the
  `mcAccessToken`. It is sent on every request.
- The flow is **stateless**. No session data is stored. Not in
  `merchant-center-settings` or anywhere else. Everything the gateway needs is in
  the JWT.

The `mcAccessToken` JWT carries:

- `sub`. The user UUID.
- `iss`. The issuing environment (the MC API URL).
- `aud`. The environment the token is for. Checked so a token is not reused
  across environments.
- `exp`. Session validity.
- `token`. The encrypted CoCo token.
- `tokenContext`. Encrypted JSON metadata.

**Authorization** is permissions plus OAuth scopes:

- Permissions are assigned to teams and granted to users in those teams. A user
  in multiple teams gets the union of permissions.
- OAuth scopes grant API level access to a resource like orders. Scopes are
  inferred from permissions. They are requested when the CoCo token is issued.
- Each user has one CoCo token at a time with its scopes baked in. The gateway
  can issue a token for any user and project based on that user's permissions.
  The token rides inside the JWT `token` claim encrypted.

Where the gateway's responsibility ends. The gateway does not enforce
resource level access. It proxies the request with the CoCo token to the
downstream API. That downstream API (CoCo, or Audit Log by introspection)
inspects the token and decides if the request is authorized.

## How the gateway proxies

The gateway is the door to internal and external APIs. It integrates over HTTP
and GraphQL.

- **HTTP proxy** uses a URL segment. `.../proxy/import` sends the request to the
  Import API. The `proxy` segment triggers proxying. The next segment names the
  target service.
- **GraphQL** is preferred. The target is carried in the `x-graphql-target`
  header. Values include `ctp` and `mc` for the MC API internal schema.

Proxy targets include Import and Export, Audit Log, CoCo, and Connect. See the
source page for the full diagram.

## Useful during an incident

- A gateway or MC API error is an auth, routing, or downstream proxy problem.
- A proxy error is a static asset or menu delivery problem. See
  [[glossary]].
- Login failures involve the CoCo `POST /login` and the gateway issuing the JWT.
  Ory and Identity sit in the login path too. See [[identity-architecture]].
- Settings issues point at the SQL database behind `merchant-center-settings`.
