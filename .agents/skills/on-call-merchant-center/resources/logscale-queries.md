# Curated LogScale queries — `humio-packages` catalog

commercetools keeps its saved LogScale queries, dashboards, and alert
definitions in the **`commercetools/humio-packages`** GitHub repo. These are the
queries to offer as concrete diagnostic answers for a symptom. Prefer them over
hand-writing a query — they encode the right fields and exclusions.

- Repo: `commercetools/humio-packages` (private — use `gh`, not WebFetch)
- LogScale org / repository: `ctp-eu` at `https://cloud.humio.com/ctp-eu`

## Package → service map

| Service                                     | Package path                                      |
| ------------------------------------------- | ------------------------------------------------- |
| Identity                                    | `packages/bots/identity`                          |
| Merchant Center Services / Proxy / Frontend | `packages/merchant-center/merchant-center`        |
| MC alerts (the firing alerts)               | `packages/merchant-center/merchant-center-alerts` |
| MC custom applications / subscriptions      | `packages/merchant-center/shield`                 |

Each package has `queries/`, `dashboards/`, and (for alerts) `alerts/`. Query
YAMLs carry `name`, `queryString`, `labels`, and a default `timeInterval`.

### Fetch the live set (freshness)

```bash
# list a package's queries
gh api repos/commercetools/humio-packages/contents/packages/bots/identity/queries \
  --jq '.[].name'
# fetch one query's exact text
gh api "repos/commercetools/humio-packages/contents/packages/bots/identity/queries/Identity-Errors.yaml" \
  -H "Accept: application/vnd.github.raw"
```

Fetch the exact `queryString` live before presenting it, so you never show a
stale query. The catalog below is a fast reference, not the source of truth.

## commercetools log field conventions

| Field                                              | Use                                                                                        |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `#environment`                                     | `prod` (Identity queries use this)                                                         |
| `#cloud_provider.account`                          | environment/account selector; parameterized as `?account` (e.g. `*-production-*`)          |
| `#cloud_provider.service`                          | `k8s` or `loadbalancer`                                                                    |
| `kubernetes.pod_namespace`                         | `identity`, `merchant-center`                                                              |
| `kubernetes.container_name`                        | `identity`, `merchant-center-backend`, `merchant-center-proxy`; exclude `vault-agent-init` |
| `logLevel`                                         | `error` for error queries                                                                  |
| `http.status_code`                                 | `>= 500` for server errors                                                                 |
| `http.url`, `meta.req.pathname`                    | request routing                                                                            |
| `duration`                                         | request duration in **seconds** (`> 5`, `> 10` for slow)                                   |
| `meta.errorMessage`, `meta.res.payload`, `message` | error/message text (regex-friendly)                                                        |

`?account` is a runtime parameter — substitute the concrete LogScale account for
the environment (see _Environments_ in `runbook-sources.md`, e.g.
`ctp-production-eu`, `ctp-aws-production-us`); `*-production-*` matches all prod
accounts at once.

## Identity queries (`packages/bots/identity/queries`)

| Name                        | Diagnoses                 | queryString                                                                                                              |
| --------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Identity - Errors           | error rate                | `#environment = prod \| "#cloud_provider.service" = k8s \| "kubernetes.container_name" = "identity" \| logLevel = error` |
| Identity - API requests     | request volume/inspection | `… identity \| message = /\/api/`                                                                                        |
| Identity - All requests     | all identity logs         | `#environment = prod \| … container_name = "identity"`                                                                   |
| Identity - Ory API requests | Ory-related failures      | `… identity \| message = /\[Ory\]/`                                                                                      |

## Merchant Center queries (`packages/merchant-center/merchant-center/queries`)

| Name                                                                 | Diagnoses                 | Notes                                                                                    |
| -------------------------------------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------- |
| Merchant Center API                                                  | backend baseline          | `#cloud_provider.account=?account \| service=k8s \| container="merchant-center-backend"` |
| Merchant Center API - Slow responses                                 | backend latency           | `container="merchant-center-backend" \| duration > 5 \| groupBy(meta.req.pathname …)`    |
| Merchant Center API Slow search responses                            | slow PIM/order search     | `duration > 5` on `meta.req.pathname = "/proxy/pim-*" OR "/proxy/order-*"`               |
| Merchant Center Load Balancer - Errors                               | LB 5xx (error rate)       | `service=loadbalancer \| http.status_code >= 500 \| url ~ mc-api/mc`                     |
| Merchant Center Load Balancers Slow responses                        | LB latency                | `service=loadbalancer \| duration > 10` on mc-api/mc                                     |
| Merchant Center Proxy                                                | proxy baseline            | `container="merchant-center-proxy"`                                                      |
| Merchant Center Slow responses                                       | slow responses            | backend `duration` grouped by path                                                       |
| MerchantCenterAPI-Toprojects / -Toprequests / -Requestsbyapplication | traffic breakdown         | who/what is driving load                                                                 |
| MerchantCenter\*UndiciAgentSettings, Deprecations                    | config/deprecation checks | secondary                                                                                |

## Dashboards

| Package         | Dashboard file                                                                                       | Note                                     |
| --------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Identity        | `dashboards/IdentityMonitoring.yaml`                                                                 | golden-signals widgets, `?account` param |
| Merchant Center | `dashboards/MerchantCenter.yaml`, `MerchantCenterProxy.yaml`, `MerchantCenterServicesErrors.yaml`, … | per-area dashboards                      |

These are the LogScale-native dashboards; the Grafana standing dashboards live in
`runbook-sources.md`.

## Alerts (`packages/merchant-center/merchant-center-alerts/alerts`)

These are the **definitions of the alerts that page you** — the `queryString` is
what fired. Use them to map an incoming alert name to the query behind it, then
to the runbook. Files include: `MerchantCenterAPIErrors`,
`MerchantCenterSignatureErrors`, `MerchantCenterDatabaseConnectivity`,
`MerchantCenterProxyGoogleStorageErrors`,
`MerchantCenterRefreshingSigningKeysFromVaultErrors`,
`MerchantCenterCredentialsRotation{Postgres,SigningKeys}`. Alerts route to
`incident.io`.

## Build a runnable search URL

Turn a `queryString` into a one-click search the engineer can open:

```
https://cloud.humio.com/ctp-eu/search?query=<URL-encoded queryString>&start=15m&live=false&tz=Europe/Berlin
```

Set `start` to the incident window and substitute `?account` with the affected
environment. Presenting the URL + the raw query text is the diagnostic "answer";
executing it against the LogScale API (which needs a token) is out of scope for
this skill.
