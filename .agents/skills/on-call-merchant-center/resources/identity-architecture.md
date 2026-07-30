# Identity Architecture

Source. Fetch for full detail and diagrams:
https://commercetools.atlassian.net/wiki/spaces/MC/pages/1498742827/Identity+Architecture
Deeper source material lives in the `shield` space (Identity).

Identity gives commercetools business users one single sign-on account across
products. It is covered by the Merchant Center on-call rotation.

## Ory is the Identity Provider

- Ory is the IAM stack. We use **Ory Network**, the managed solution. Zero infra
  to maintain on our side.
- Ory exposes two API kinds. **Admin** APIs manage settings, identities, OAuth
  clients. **Public** APIs manage user auth flows like login, signup, recovery.
- Domains:
  - `identity.commercetools.com` is the CT Identity service.
  - `auth.identity.commercetools.com` is the Ory API.
- Identity data model in Ory. `email` is the unique id. Plus `firstName`,
  `lastName`, `businessRole`. Public metadata holds `accountIdentifiers` and
  `roles`.
- Auth methods. Password and Enterprise SSO through third party providers.
- On-call for an Ory incident. Rely on Ory support through a ticket. Same pattern
  as Google Cloud or Mongo Atlas support. See the _Action: Open a support ticket
  to Ory_ runbook.

## The Identity service

- Our app on top of Ory. Implements the UI flows and pages. Abstracts Ory.
- Built with Next.js. Server side logic for security. Deployed on Kubernetes with
  Helm through CircleCI, like Merchant Center.
- **Stateless.** Ory stores the data.
- Pages. `/login`, `/signup`, `/signup/new`, `/settings`, `/settings/sso`,
  `/settings/sso/roles`, `/recovery`, `/consent`, `/error`.

## Global Server Load Balancing

- One global entry point `identity.commercetools.com` for all regions.
- The global LB does **geolocation routing** to the closest region and
  **failover routing** to healthy regions.
- Deployed in GCP EU, GCP US, GCP AU. A user in Mexico whose closest region GCP
  US is unhealthy is routed to another healthy region like GCP AU.
- Stateless plus GSLB gives easy failover even across clouds.

## Sessions

- On login Ory issues a session cookie at the TLD `commercetools.com`. Tools
  under that TLD can read it. That is the single sign-on.
- A business tool like Merchant Center also has its own session. Short TTL.
  Refreshed while the Identity session stays valid. Validation is cheap through
  Ory edge sessions.
- Enterprise SSO users also have a session in the third party provider.

## User flows

- Common flows. Login via password. Login via SSO. Signup.
- Flows are redirects between Identity, Ory, and third party providers. A flow
  started from a business tool carries a `returnTo` parameter so the user lands
  back in the right place.
- Merchant Center integrates with Identity to check the Identity session, keep a
  valid MC session, ensure a Core user exists on signup, and request signup
  emails.

## Identity API

- HTTP API to manage identity data. An abstraction over Ory admin APIs.
- It is the only service with access to the Ory admin APIs. Granular access via
  OAuth scopes.
- Merchant Center creates identities and updates metadata. Monster creates SSO
  Organizations.

## Useful during an incident

- Login failing. Check the Identity session, Ory availability at
  `auth.identity.commercetools.com`, the `returnTo` redirects, and for SSO users
  the SSO Organization config.
- 502s reaching Merchant Center. Ory API failures show up as MC load balancer
  502s. See the Identity Ory 502 diagnostic runbook and the Ory status page in
  [[runbook-sources]].
- Regional problem. GSLB should route around an unhealthy region. Confirm which
  region the user hits.
- Ory outage is upstream. Open the Ory support ticket. Do not expect a code fix
  on our side.
