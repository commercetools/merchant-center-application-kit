# Ingestion playbook

Proven recipes lifted from building `on-call-merchant-center`. Prefer
auto-discovery so the interview stays short. Fetch live. Do not invent data.

Atlassian tools may connect as `mcp__claude_ai_Atlassian__` or the Rovo variant
`mcp__claude_ai_Atlassian_Rovo__`. Use whichever is connected. Method names match.

## Confluence cloudId

Reuse the known commercetools cloudId. If a call fails with an auth error, call
`getAccessibleAtlassianResources` once and reuse the returned id.

## Runbook indexes

- Enumerate each index with `getConfluencePageDescendants`. Use `depth: 2` and a
  generous `limit`. Metadata only. Never body-fetch an index. They time out.
- Detect the taxonomy. Titles that start with `Diagnostic:` are the symptom entry
  points. Titles that start with `Action:` are remediations. If a rotation does not
  use this naming, keep leaf pages and match on keywords.
- Body-fetch only a single runbook when the skill later summarizes it. Retry once
  on timeout.

## Environments

- `grafana_list_datasources(type=prometheus)` returns the clouds. Build the env to
  cloud id table from the names. The cloud id is also the dashboard `var-cloud`
  value and the Prometheus datasource UID.
- LogScale accounts follow a pattern like `ctp-production-eu`. Confirm from a
  sample log or the team.

## Dashboards

- `grafana_get_dashboard_panel_queries(uid)` returns panels with title, query, and
  datasource. Build the signal to panel map by matching panel titles to signals.
- Prefer reusing these curated panel queries over hand written PromQL.

## Logs

- The curated queries live in `commercetools/humio-packages`. Read the rotation
  package with `gh`. List `queries`, `dashboards`, and `alerts`. Capture query
  names and `queryString` values.
- Note the alert routing. Some alerts route to PagerDuty, some to incident.io.

## Escalation

- The incident.io `Service` catalog entry has an `Escalation Path` attribute.
  `catalog_entry_list(catalog_type_id: 'Custom["Service"]', search: "<service>")`.
- If it is empty, fall back to the owning Team path or the rotation default path.
- The MCP identifies the path and current on-call. It does not trigger. Triggering
  is a human action in Slack.

## Service to repo

- Prefer the `Github repo` field in the runbook metadata table. Fall back to the
  interview map. Verify each repo exists with `gh repo view`.

## Architecture and training docs

- `getConfluencePageDescendants` on the training index to list child pages. Skip
  folders and interactive databases.
- Fetch each page. Distill it into a topic resource. Keep it short. Lead with what
  matters during an incident. Link the source page for depth. Do not paste the
  whole page.

## Recent changes

- Recent deploys come from `gh` on the service repo. Merged PRs and releases.
- Live versions come from the `GET /versions` endpoints if the rotation exposes
  them.
