# Merchant Center architecture overview

Source. The On-Call Trainings hub:
https://commercetools.atlassian.net/wiki/spaces/MC/pages/1401749539/On-Call+Trainings
Architecture parent:
https://commercetools.atlassian.net/wiki/spaces/MC/pages/1499332620/Merchant+Center+Architecture+and+Deployment+Pipelines

Use this as the map. Each area has its own resource with more depth and a source
link. Fetch the source pages mid-incident when you need diagrams.

## The system in one view

- **Frontend.** Many Single Page Applications combined into one. Served as static
  assets from Google Storage or S3 buckets. See [[architecture-frontends]].
- **The three MC APIs.**
  - `merchant-center-proxy`. Frontend proxy. Serves assets and the menu.
  - `merchant-center-gateway`. Auth, authorization, routing, BFF. Also called
    `merchant-center-backend` and the Merchant Center API.
  - `merchant-center-settings`. Prisma on a SQL database. Stores Custom
    Applications, Views, My View. See [[architecture-apis]] and [[glossary]].
- **Identity.** Single sign-on across commercetools tools. Our Next.js service on
  top of Ory. Globally load balanced. See [[identity-architecture]].
- **Upstream services** the gateway routes to. CoCo APIs, Import and Export, Audit
  Log, Connect.
- **Infrastructure.** Kubernetes with Helm. Secrets from Vault. Namespace
  `merchant-center`. See [[security-infrastructure]].
- **Delivery.** CircleCI pipelines and a daily deployment train. See
  [[deployment-pipelines]].
- **Observability.** Grafana, LogScale, Checkly, Sentry. See
  [[monitoring-observability]].

## How the pieces talk

- The browser talks to `merchant-center-proxy` for assets and the menu and to
  `merchant-center-gateway` for data. It never talks to CoCo or Audit Log
  directly.
- The gateway authenticates the user, issues the `mcAccessToken` JWT, and proxies
  requests to upstream services with the user's CoCo token. The downstream service
  enforces authorization by inspecting that token.
- Login runs through Identity and Ory. A valid Identity session at the
  `commercetools.com` TLD gives single sign-on. Merchant Center keeps its own
  short session validated against the Identity session.
- An Ory outage surfaces as load balancer 502s on Merchant Center.
- Most APIs speak GraphQL. The proxy target rides in the `x-graphql-target` header.

## Resource index

| Area                                      | Resource                     |
| ----------------------------------------- | ---------------------------- |
| Component naming                          | [[glossary]]                 |
| Frontends                                 | [[architecture-frontends]]   |
| APIs, auth, proxying                      | [[architecture-apis]]        |
| Identity and Ory                          | [[identity-architecture]]    |
| Kubernetes, Vault, access                 | [[security-infrastructure]]  |
| CircleCI, the train, versions             | [[deployment-pipelines]]     |
| Grafana, LogScale, Checkly, Sentry        | [[monitoring-observability]] |
| Runbook indexes, dashboards, environments | [[runbook-sources]]          |
| Grafana live metrics via MCP              | [[grafana-metrics]]          |
| Curated LogScale queries                  | [[logscale-queries]]         |
| LogScale query language                   | [[logscale-syntax]]          |
| On-call process and rules                 | [[rotation-and-rules]]       |
| Incident process and roles                | [[incident-process]]         |
| Escalation paths and on-call              | [[escalation-paths]]         |
