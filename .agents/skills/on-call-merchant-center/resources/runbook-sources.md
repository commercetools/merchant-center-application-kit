# Runbook sources & matching reference

This is the authoritative reference for the `on-call-merchant-center` skill. Update this file
when runbooks move or a new service gets its own index. The skill logic in
`SKILL.md` reads from here so it stays stable while these details change.

## Confluence access

- **Site:** `commercetools.atlassian.net`
- **cloudId:** `c6e52965-84b2-4904-af8d-211cbb69dc2c`
- If a call fails with an auth/context error, refresh with
  `mcp__claude_ai_Atlassian__getAccessibleAtlassianResources` and reuse the
  returned id.
- Tool prefix. These names use `mcp__claude_ai_Atlassian__`. Swap to
  `mcp__claude_ai_Atlassian_Rovo__` if that is your Atlassian MCP. Same method
  names.

## Index pages

Enumerate both every run with
`mcp__claude_ai_Atlassian__getConfluencePageDescendants` (`depth: 2`,
`limit: 100`). Never body-fetch these — they time out.

| Index page                    | ID           | Space  | Shape        | Where runbooks sit                  |
| ----------------------------- | ------------ | ------ | ------------ | ----------------------------------- |
| Runbooks (Identity)           | `2346221739` | shield | Flat         | depth 1                             |
| Run books and their scenarios | `82001544`   | MC     | Hierarchical | depth 2 (under `N. Category` pages) |

The hierarchical index also embeds the Identity index (an `embed` descendant) —
ignore it, the Identity index is already enumerated on its own.

## Standing Grafana dashboards

These are the always-on golden-signals dashboards (Latency, Traffic, Errors,
Saturation + Kubernetes pod resources). Surface the one matching the incident's
service in every summary as the fastest first look — even when the runbook does
not link it. Set `var-cloud` and the time range to the incident before sharing.

| Service                             | Dashboard                  | UID                                    | URL                                                                                                                                                                                  |
| ----------------------------------- | -------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Identity                            | Identity Monitoring        | `d979b0d4-fe59-4860-b07d-970849284c44` | https://grafana.sre.europe-west1.gcp.commercetools.com/d/d979b0d4-fe59-4860-b07d-970849284c44/identity-monitoring?orgId=1&from=now-6h&to=now&timezone=utc&var-cloud=000000049        |
| Merchant Center Services / Frontend | Merchant Center Monitoring | `c29b8f14-7e8d-4440-94d4-35d397620110` | https://grafana.sre.europe-west1.gcp.commercetools.com/d/c29b8f14-7e8d-4440-94d4-35d397620110/merchant-center-monitoring?orgId=1&from=now-6h&to=now&timezone=utc&var-cloud=000000049 |

`var-cloud=000000049` selects a specific cloud/region — change it to the affected
environment.

## Environments

Determine the affected environment early (from the alert payload's
`cloud`/`environment`/`account` label, or by asking the engineer) and thread it
into dashboards, live metric queries, and log queries before handing them over.

The environment maps to a single **cloud id**, used in three places: the
dashboard `var-cloud=<id>` URL parameter, the Grafana Prometheus **datasource
UID** (for live metrics via the MCP — see `grafana-metrics.md`), and — for logs —
the LogScale `?account` / `#cloud_provider.account` selector.

| Environment          | cloud id / Prometheus datasource UID | LogScale account (`#cloud_provider.account`) |
| -------------------- | ------------------------------------ | -------------------------------------------- |
| GCP Production EU    | `000000049`                          | `ctp-production-eu`                          |
| GCP Production US    | `000000050`                          | `ctp-production-us`                          |
| GCP Production AU    | `000000113`                          | `ctp-production-au`                          |
| GCP Staging EU       | `000000048`                          | `ctp-staging`                                |
| AWS Production EU    | `000000084`                          | `ctp-aws-production-eu`                      |
| AWS Production US    | `000000111`                          | `ctp-aws-production-us`                      |
| AWS Staging EU       | `ee9umpes0zqbkf`                     | `ctp-aws-staging-eu`                         |
| GCP Performance Test | `ZqnysFQ4z`                          | `ctp-gcp-performance-test`                   |

Refresh ids with `grafana_list_datasources(type=prometheus)` if one looks stale.
For LogScale substitute the account above for `?account`; `*-production-*` matches
all prod accounts at once. Identity log queries key on `#environment = prod`
instead. If you cannot map the environment, keep the placeholder and tell the
engineer to set the cloud picker — do not guess.

## Dependencies & upstream status

When triaging, decide "is it us or upstream?" and surface the relevant status
page as a checklist item (link it — do not scrape). Choose by:

- **Cloud of the affected environment:** AWS envs →
  https://health.aws.amazon.com/health/status ; GCP envs →
  https://status.cloud.google.com
- **Identity / login / SSO / Ory signals:** https://status.ory.com/ — Ory is the
  IAM vendor, and the MC error-rate runbooks branch on "is it Ory?".

MC depends on Ory, Identity, MongoDB, Postgres, Vault, and GCS. A healthy MC next
to a red dependency points the investigation upstream fast.

## Runbook taxonomy

Runbooks follow a strong naming convention. Use it to classify candidates:

- **`Diagnostic: <Service> <Signal>`** — the **symptom / alert entry points**.
  These are what an alert maps to. Titles track Prometheus alert names closely.
  Examples: _Diagnostic: Merchant Center Services Requests Elevated Error Rate_,
  _Diagnostic: Identity Nodejs Event Loop Lag_, _Diagnostic: Identity API
  Requests Elevated Latency_.
- **`Action: <Remediation>`** — the **fixes** a Diagnostic links to. Examples:
  _Action: Roll back deployment for Identity_, _Action: Manually scale replicas
  of Identity with HPA active_, _Action: Manually increase … Pods memory limit_.
- **Legacy titles** (only in the hierarchical index, mostly under `1. Frontend`,
  `3. Security`, `4. CI/CD`) are free-form, e.g. _Some Merchant Center API
  requests fail with HTTP 502_, _Application does not load and error "[React
  intl] …"_. Match these on keywords when the modern `Diagnostic:`/`Action:`
  naming is absent for that service.

Skip category container pages (`0. Prerequisites`, `1. Frontend`, …) and
reference docs (_Merchant Center Secrets Inventory_).

## Service vocabulary

Map symptom wording to the service, which narrows the index/category to search:

| Service                      | Index / category                  | Triggers in the symptom                                                                |
| ---------------------------- | --------------------------------- | -------------------------------------------------------------------------------------- |
| **Identity**                 | Runbooks (Identity) `2346221739`  | login, sign-in, SSO, OIDC, Ory, JIT-migration, "unlink user", session                  |
| **Merchant Center Services** | `82001544` → `2. Services & APIs` | MC Services, backend, proxy, API 502, subscriptions, dead-letter queue                 |
| **MC Frontend / Proxy**      | `82001544` → `1. Frontend`        | frontend app, "does not load", React intl, CloudFront cache, deploy/rollback of an app |

## Service repositories

For recent-changes correlation, prefer the `Github repo` field in the matched
runbook's metadata table. Use this map as the fallback, and to correlate before a
runbook is chosen. All under the `commercetools` org.

| Service                          | Repositories                                                                                                                                            |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Identity                         | `commercetools/identity`                                                                                                                                |
| Merchant Center Services + Proxy | `commercetools/merchant-center-services` (the Proxy lives here too)                                                                                     |
| MC Frontend                      | `commercetools/merchant-center-frontend`, `commercetools/merchant-center-prices`, `commercetools/merchant-center-operations`, `commercetools/audit-log` |

A merged PR or release shows what shipped to the _repo_, not necessarily what
_deployed to the affected environment_ — treat it as a lead to confirm.

## Signal vocabulary

Map symptom wording to the signal (pairs with the service to find the Diagnostic):

| Signal                                  | Triggers in the symptom                                  |
| --------------------------------------- | -------------------------------------------------------- |
| Elevated Error Rate                     | error rate, 5xx, 500s, elevated errors, failing requests |
| Elevated Latency                        | latency, slow, p95/p99, timeouts                         |
| Nodejs Event Loop Lag                   | event loop, lag, CPU pegged, blocked event loop          |
| Pod Elevated Number Of Restarts         | restarts, crashloop, restarting pods                     |
| Memory Pressure / increase memory limit | memory, OOM, OOMKilled, memory pressure                  |
| Login Check Failed                      | login check, synthetic probe, login synthetic            |
| 502 / load balancer                     | 502, bad gateway, load balancer errors                   |
| Ory / Ory Network unavailable           | Ory, IAM vendor, Ory network                             |

## What to extract when summarizing a runbook

Runbooks are a metadata table + `### Steps`. Pull out:

- **Metadata table:** Owner, Service, Github repo, Status, **Approximate
  Runtime**, **Prerequisites** (tools needed — often Grafana / Humio / kubectl).
- **Grafana** — the standing dashboard for the service (above) plus any dashboard
  linked in the steps.
- **Humio / LogScale** queries — appear as a `cloud.humio.com/ctp-eu/search?…`
  link _and_ a fenced code block with the raw query. Surface both.
- Linked **`Action:`** runbooks (remediations) and sibling **`Diagnostic:`**
  pages the runbook defers to. In the markdown body these can appear as
  `<custom data-type="smartlink" …>` nodes or plain Confluence links — resolve
  them to titles + URLs.
