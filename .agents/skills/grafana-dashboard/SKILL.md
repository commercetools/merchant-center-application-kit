---
name: grafana-dashboard
description: Create and edit monitoring dashboard JSON for import. Use when building dashboards, adding panels/widgets, or configuring metric queries and visualizations.
disable-model-invocation: false
argument-hint: '--team [--service]'
allowed-tools: Bash, Grep, Glob, Read, Edit, Write
scope:
  - grafana
  - monitoring
---

# Monitoring Dashboards

Create or modify Grafana dashboard JSON for import. When Grafana MCP is available, use it to list datasources, discover metrics, validate queries, or inspect existing dashboards.

Expect most metrics to be available via the **Prometheus** datasource: relevant metrics from cloud providers (e.g. GCP Monitoring, AWS CloudWatch) are exported into Prometheus. After import, metric names may differ slightly from the original cloud naming, verify or discover actual names when building queries.

## Arguments

- `--team` (required): Owner team for the dashboard. Set as dashboard tag (e.g. `cloud-tools`).
- `--service` (optional): When the dashboard is for a specific service only, pass the service name. Set as dashboard tag (e.g. `istio`).

Beyond these, the user describes the dashboard they want (metrics, services, time range) or provides existing dashboard JSON to modify.

## Process

1. **Clarify scope** — Identify metrics, datasource(s), and time range. Use Grafana MCP to list datasources, fetch datasource details (including scrape interval when exposed), and run test queries when available. For Prometheus panels: pick one matching Prometheus datasource and verify that the metrics you plan to use exist (e.g. via MCP Prometheus metric metadata or a minimal query) before defining queries.
2. **Propose outline** — Define sections and panels (titles, panel types, what each shows). Include dashboard description and per-panel descriptions so the dashboard is discoverable by AI (see [AI and incident discoverability](#ai-and-incident-discoverability)).
3. **Define queries** — Write exact PromQL/LogQL (or datasource-specific) per panel, with aggregation windows and filters.
4. **Emit JSON only when requested** — Prefer outline + queries; output full or patched dashboard JSON only if the user asks for it.
5. **Validate before handoff** — When delivering dashboard JSON, ensure the output is **valid JSON** (e.g. parse it to catch syntax errors) before delivery.

## Output Format

- **New dashboard:** Brief outline (sections + panels), exact queries per panel, minimal JSON only when requested.
- **Modify existing:** Patch-style description of changes; provide updated JSON only when requested.

## Style Guidance

### Always use units on the y-axis

Every metric should have appropriate units. Prefer built-in canonical units over custom labels to enable automatic unit conversion and consistent formatting.

Use per-unit naming for rates (e.g., requests per second, tokens per minute).

Common unit examples:

- Time: `nanosecond`, `microsecond`, `millisecond`, `second`, `minute`, `hour`
- Data: `bit`, `byte`, `kibibyte`, `mebibyte`, `gibibyte`
- Rates: combine any unit with per-unit:
  - `"unit_name": "request", "per_unit_name": "second"`
- Ratio: `fraction` (0–1), `percent` (0–100)
- Count: `request`, `error`, `token`, `connection`

### Prefer distribution metrics with real percentiles

Use histogram or summary-based percentiles (`p50`, `p95`, `p99`) where available. Avoid approximating percentiles from averages.

### Put error rates next to volume

Show error rate and request rate together to correlate failures with load.

### Use consistent naming

Use clear, metric-first panel titles: `Request rate`, `Error rate`, `Latency p95`, `CPU usage`.

### Set sensible time ranges

Default panels to meaningful windows (e.g., `last 1h` for real-time, `last 7d` for trends). Call out when the chosen range impacts query semantics.

### Refresh

Disable automatic dashboard refresh by default to avoid unnecessary query load on metric backends. In dashboard JSON, omit the `refresh` field or set `"refresh": ""`. Only add a refresh interval (e.g. `"60s"`) when the user explicitly needs live-updating views.

## Guidelines

### Ownership and tags

Set the following in the dashboard JSON `tags` array or in Grafana's dashboard settings. These tags also drive **AI discoverability**: tools like Incident.io AI SRE can filter dashboards by team, service, or environment.

- **Owner (team)** — Required. Use it as a tag. Otherwise infer or ask.
- **Service** — When the dashboard is for a specific service only, add it as a tag (e.g. `istio`).
- **Supported cloud providers** — When the dashboard targets specific clouds, add individual tags such as `gcp`, `aws`. Can usually be inferred from datasource name.
- **Supported env type** — When the dashboard targets specific environments, add individual tags such as `prod`, `stag`, `dev`. Can usually be inferred from datasource name.

### Panel construction

- Prefer time series panels for rates and latency, stat panels for single-value KPIs.
- Keep panel math simple; if you must combine series, label them clearly.
- Use thresholds sparingly and only when tied to an SLO or known limit.

### Query construction

- **Scope selectors** — Never use unscoped ("naked") selectors. Where possible, add label matchers (e.g. `job`) so the query only targets the intended job. Note: some metrics (e.g. from certain exporters or cloud providers) do not have a `job` label; in those exceptional cases it's ok to skip it for now. Unscoped selectors can pull in metrics from unrelated sources with the same metric name and break dashboards or alerts. Example: use `rate(errors_total{job="my-job"}[$__rate_interval])` instead of `rate(errors_total[$__rate_interval])`. See [PromLabs: Avoid these 6 mistakes](https://promlabs.com/blog/2022/12/11/avoid-these-6-mistakes-when-getting-started-with-prometheus/) (Mistake 3).
- **Rate only on counters** — Use `rate()`, `increase()`, and `irate()` only with **counter** metrics (cumulative, only goes up). Use `deriv()` only with **gauge** metrics. Using `rate()` on a gauge produces wrong values (downward moves are misread as resets); using `deriv()` on a counter is also wrong. See [PromLabs: Avoid these 6 mistakes](https://promlabs.com/blog/2022/12/11/avoid-these-6-mistakes-when-getting-started-with-prometheus/) (Mistake 6).
- Always specify the aggregation window for rates. For Prometheus, use `$__rate_interval` with `rate()` and `increase()` (not `$__interval` or a fixed value). `$__rate_interval` is at least four times the scrape interval and avoids gaps or inaccuracies in results. See [Grafana: Use `$__rate_interval`](https://grafana.com/docs/grafana/latest/datasources/prometheus/template-variables/#use-__rate_interval).
- **Scrape interval** — Our standard Prometheus metrics scrape frequency is **60s**. All datasources of the same type use the same scrape frequency, so discover it once per type (e.g. from any one Prometheus datasource via Grafana MCP) when building dashboards; no need to check each datasource used on the dashboard. Use 60s as the default when the datasource does not expose it.
- Avoid mixing counters and gauges in the same graph.
- Include filters for environment/cluster/service; expose them as dashboard variables when the same filter applies to multiple panels.

### Datasource variable

When the same dashboard is used across multiple Prometheus instances (e.g. per environment), add a **datasource** template variable so users can switch. Relevant cloud provider metrics (e.g. GCP load balancer) are expected to be exported to Prometheus. Scope the variable with a regex: if no specific cloud provider is mentioned, use `^Prometheus (GCP|AWS) .*` to include all commercetools standard API envs; for a single cloud use `^Prometheus GCP.*` or `^Prometheus AWS.*`. Use the variable in every panel as the datasource override (e.g. `$datasource`).

## AI and incident discoverability

Make dashboards and panels easy for AI tools (e.g. Incident.io AI SRE, MCP dashboard search) to find and recommend. Discovery relies on **searchable text** (title, description), **tags**, and **consistent naming**.

### Dashboard-level

- **Description** — Set the dashboard `description` field. Include in one short sentence: what the dashboard shows, which service/area it covers, and when to use it (e.g. _"Request rate, errors, and latency for the Checkout API. Use during checkout-related incidents or SLO reviews."_). This text is searchable and helps AI match dashboards to incidents or questions.
- **Tags** — Besides team and service (see [Ownership and tags](#ownership-and-tags)), add tags that support discovery:
  - Include the **service name** (or component) as a tag so tools can filter by affected service.
  - Optionally add domain tags (e.g. `checkout`, `auth`, `payments`) if your incident taxonomy uses them.
  - Avoid vague or decorative tags; prefer tags that an AI could use to filter (e.g. by team, service, env, cloud).

### Panel-level

- **Panel description** — Populate each panel’s `description` field. Use one line on _what_ the panel shows and, for incident-relevant panels, _when to look_ or a one-line runbook hint (e.g. _"Error rate by status. Check when users report 5xx; if spike, check deployment and dependencies."_). These descriptions appear in dashboard summaries and help AI suggest the right panel for a given incident or question.
- **Searchable titles** — Keep panel titles metric- and intent-clear (e.g. `Request rate`, `Error rate`, `Latency p95`, `SLO burn rate`). Use terms that match how people describe incidents (errors, latency, timeouts, saturation) so keyword and semantic search can surface the right panels.
- **Stable panel titles** — Avoid changing panel titles unnecessarily; stable names improve deeplinks and AI references (e.g. "open the _Error rate_ panel on dashboard X").

Example panel description in dashboard JSON:

```json
"description": "Error rate by status code. Check when users report 5xx; if spike, verify deployment and downstream dependencies."
```

### Summary for AI use cases

| What                    | Purpose                                                      |
| ----------------------- | ------------------------------------------------------------ |
| Dashboard `description` | One-sentence scope and "when to use"; searchable.            |
| Dashboard `tags`        | Team, service, env, cloud (and optional domain); filterable. |
| Panel `description`     | What the panel shows + when to check / runbook hint.         |
| Panel title             | Clear, metric-first, incident-vocabulary friendly.           |

Example Prometheus rate query using `$__rate_interval`:

```promql
sum(rate(http_requests_total{job="$service"}[$__rate_interval])) by (status)
```

Example unit configuration for a request-rate panel (canonical units):

```json
"unit_name": "request",
"per_unit_name": "second"
```
