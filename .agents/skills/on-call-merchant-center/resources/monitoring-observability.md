# Monitoring and Observability

Source. Fetch for full detail:
https://commercetools.atlassian.net/wiki/spaces/MC/pages/1499496462/Monitoring+and+Observability

Four tools. A rough order of use during an incident. Grafana to see it. LogScale
to dig in. Checkly for uptime. Sentry for frontend errors.

## Alert routing

- LogScale (Humio) alerts route through **PagerDuty**.
- Checkly alerts route through **PagerDuty**.
- Sentry has a **PagerDuty** integration.
- The `merchant-center-alerts` humio-package routes to **incident.io** (see
  [[logscale-queries]]).

## Grafana. See it first

- Login with Google. Explore custom PromQL against Prometheus.
- Folder **Merchant Center Multi Cloud** holds all Frontend and API dashboards.
- **Golden Signals** is the central entry dashboard. Use it first. UID
  `c29b8f14-7e8d-4440-94d4-35d397620110`
  (`.../d/c29b8f14-7e8d-4440-94d4-35d397620110/merchant-center-monitoring`). It
  links out to smaller detailed dashboards.
- General dashboards. Kubernetes resource usage (`iNhLXpNSz`). CTP Big Monitor
  (`ehempQCik`).
- Grafana tells you something is wrong, for example a 5xx increase. Then move to
  LogScale. See [[grafana-metrics]] for pulling live numbers via the MCP.

## LogScale (Humio). Dig into logs

- Access `cloud.humio.com`. Sign in with your email at the bottom.
- Use the **`gcp-eu`** view (`cloud.humio.com/ctp-eu/search`). Despite the name it
  holds logs for all platform environments in region EU across GCP and AWS, plus
  AU.
- Central MC dashboard.
  `cloud.humio.com/ctp-eu/dashboards/merchant-center/merchant-center/Merchant Center`.
  Watch spikes, exponential request increases, and the status code pane.
- Saved searches are in the top menu. Shared dashboards are found by searching
  "Merchant Center". Alerts are visible in the UI.
- All of it is code in `humio-packages`. See [[logscale-queries]] and
  [[logscale-syntax]].
- Typical tasks. Trace a request by correlation id across services. Narrow to a
  deployment or Pod. Inspect error messages. Group messages over time.

## Checkly. Uptime

- Login with Okta. Browser checks with Playwright against MC apps. API checks for
  availability. Provisioned from `commercetools/checkly`.
- Checks are grouped by environment. A failed browser check gives a **trace** like
  a Chrome DevTools recording. Use it to debug.
- Example checks. "Merchant Center Backend Uptime". "Merchant Center Frontend
  Login".
- Edit a check inline only for debugging. The next deploy from
  `commercetools/checkly` overwrites it. You can **mute** a check to stop alerts or
  **deactivate** it to stop runs.
- Checks are stable. Re-running rarely fixes a failure. Find the root cause.
- Checkly also runs the post deployment checks. See [[deployment-pipelines]].

## Sentry. Frontend runtime errors

- Login with Okta. Support also uses it. It tracks browser runtime errors for MC
  users. Spike protection and a PagerDuty integration are configured.
- Start at the prioritized issues list. Unresolved, high or medium.
  `commercetools.sentry.io`. Some errors are not ours to fix, like aborted
  requests.
- An issue detail shows a stack trace mapped to code through source maps uploaded
  after a production deploy. An event is one occurrence. Event count hints at
  importance.
- Data is anonymized. No PII. You can still investigate affected projects.
