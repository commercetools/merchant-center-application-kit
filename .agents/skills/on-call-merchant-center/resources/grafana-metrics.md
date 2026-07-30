# Live severity via the Grafana MCP (`agatha-mcp`)

Optional but high-value: confirm _how bad_ an incident is with real numbers rather
than only linking a dashboard. **Guard on availability** — if the `agatha-mcp`
Grafana tools are not connected for the person running the skill, skip this and
fall back to the standing dashboard link from the runbook summary.

## Principle: reuse curated panel queries

Do not hand-write PromQL. The standing dashboards already hold the right
recording-rule query per signal (e.g. error rate bakes in the alert threshold).
Pull the panel's query and run it against the affected environment.

## Standing dashboards

| Service                                       | Dashboard UID                          |
| --------------------------------------------- | -------------------------------------- |
| Identity                                      | `d979b0d4-fe59-4860-b07d-970849284c44` |
| Merchant Center (Services / Proxy / Frontend) | `c29b8f14-7e8d-4440-94d4-35d397620110` |

## Workflow

1. `grafana_get_dashboard_panel_queries(uid=<dashboard>)` — returns panels with
   `title`, `query`, and `datasource` (usually `${cloud}`, a template variable).
2. Pick the panel whose **title matches the signal**:

   | Signal         | Panel title contains                              |
   | -------------- | ------------------------------------------------- |
   | error rate     | "Error Rate …" (bakes in `> 0.05` = 5% threshold) |
   | errors (count) | "Total … Errors"                                  |
   | latency        | "Latencies [p95]"                                 |
   | event-loop lag | "Event loop lag"                                  |
   | pod restarts   | "Pod starts"                                      |
   | memory         | "memory … limit" / "Heap usage"                   |
   | LB 5xx         | "LB Requests Failures 5xx"                        |

3. `grafana_query_prometheus` with `datasourceUid` = the environment's **cloud id**
   (from _Environments_ in `runbook-sources.md`; it substitutes the dashboard's
   `${cloud}`):
   - `queryType=instant`, `endTime=now` → the current value.
   - `queryType=range`, `startTime=now-1h`, `stepSeconds=60` → the trend and
     roughly when it left baseline.
4. Interpret: the current value, whether it breaches the alert threshold, and when
   it departed baseline. A visual helps —
   `grafana_get_panel_image(dashboardUid=…, panelId=…, variables={"cloud":"<id>"}, timeRange={from:"now-1h", to:"now"})`.

## Guardrails

- If a query errors or returns no data, **say so** — never invent a number. "No
  data" is itself a signal (wrong region/datasource, or the metric stopped
  reporting).
- Keep ranges short — this runs during an incident, not a capacity study.
- Match the panel to the signal by title at runtime; don't hardcode recording-rule
  names, they change as dashboards evolve.
