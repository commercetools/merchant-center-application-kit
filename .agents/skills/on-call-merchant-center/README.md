# on-call-merchant-center

Helps an on-call engineer respond to a **Merchant Center** production symptom or
alert. It finds the right Confluence runbook. It confirms how bad the issue is
with live metrics. It checks what changed recently. It hands over the exact
LogScale queries to run. The output is a short checklist.

Think of it as a first responder. It runs the opening moves of every runbook for
you. Which runbook applies? How bad is it? Did something just ship? What should
you query?

## When to use it

Use it when you are on call for Merchant Center. It fits three cases.

- You get paged by an alert. This can be a raw alert name. It can be a Grafana
  payload. It can be an incident.io page.
- You have a symptom in plain language. For example "MC login fails for EU
  customers".
- You want to know which runbook covers the issue.

Command:

```
/on-call-merchant-center <symptom-or-alert>
```

Examples:

```
/on-call-merchant-center IdentityApiRequestsElevatedErrorRate cloud=ctp-production-eu
/on-call-merchant-center merchant center is slow for US customers and takes 8s to load projects
/on-call-merchant-center how do I roll back Merchant Center Services
```

## What it does

1. **Parses the input.** It reads the service. It reads the signal. It reads the
   environment. It uses alert payload labels when present. It opens a runbook link
   from the payload directly when one exists.
2. **Finds the runbook.** It enumerates the runbook indexes in Confluence. It
   ranks candidates against the symptom. You pick one.
3. **Summarizes the runbook.** It shows the steps relevant to this symptom. It
   keeps the decision branches intact.
4. **Confirms live severity.** It queries the Grafana MCP. It reports the current
   golden signal against the alert threshold and baseline.
5. **Correlates recent changes.** It lists recent deploys and merged PRs for the
   affected service.
6. **Surfaces LogScale queries.** It pulls the curated `humio-packages` queries
   for the symptom. It substitutes the environment. It gives you a search URL to
   run.

The output is a terse checklist. It flows from runbook to severity to "do now" to
"diagnose" to "fix" to related links.

## What it does NOT do

- It does not execute remediations. No rollbacks. No restarts. No scaling. It
  points you at the `Action:` runbook. A human decides and runs it.
- It does not run LogScale queries. It hands you the query text and a search URL.
  You run it in the LogScale UI.
- It does not cover Commerce Agents yet. They are not on call at this time.

## Prerequisites

| Requirement                         | Used for                                    | Notes                                                                                                       |
| ----------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Atlassian MCP** (`atlassian`)     | Reading Confluence runbooks                 | Required. Tools under `mcp__claude_ai_Atlassian__*` or `mcp__claude_ai_Atlassian_Rovo__*`.                  |
| **Grafana MCP** (`agatha-mcp`)      | Live severity metrics from Prometheus       | Expected. The skill falls back to a dashboard link when it is absent.                                       |
| **incident.io MCP** (`incident-io`) | Escalation path and on-call lookup          | Read only for the skill. It identifies the path and who is on call. Triggering happens in Slack or the app. |
| **`gh` CLI** authenticated          | Curated LogScale queries and recent changes | Needs access to `commercetools/humio-packages` and the service repos.                                       |
| **Confluence access**               | The `MC` and `shield` runbook spaces        | Same account the Atlassian MCP uses.                                                                        |
| **Grafana and LogScale access**     | Opening dashboards and running queries      | Grafana at `grafana.sre.europe-west1.gcp.commercetools.com`. LogScale at `cloud.humio.com/ctp-eu`.          |

The skill checks for the Grafana MCP and degrades gracefully. Missing `gh` access
only disables the recent changes step and the live query text.

Install and authenticate the MCP servers before your shift. In Claude Code you add
a server and sign in with `/mcp`. The `incident-io` server is required for
escalation path lookup. Without it the skill names the likely path from the known
mapping and asks you to escalate in Slack.

## Prime for fast response

An incident is the wrong time to click approve. Pre approve the read only tools
the skill uses. Then it runs without prompts.

Add this to your user settings at `~/.claude/settings.json`. Merge it into any
existing `permissions` block.

```json
{
  "permissions": {
    "allow": [
      "Read",
      "mcp__claude_ai_Atlassian__getConfluencePageDescendants",
      "mcp__claude_ai_Atlassian__getConfluencePage",
      "mcp__claude_ai_Atlassian__getAccessibleAtlassianResources",
      "mcp__claude_ai_Atlassian_Rovo__getConfluencePageDescendants",
      "mcp__claude_ai_Atlassian_Rovo__getConfluencePage",
      "mcp__claude_ai_Atlassian_Rovo__getAccessibleAtlassianResources",
      "mcp__agatha-mcp__grafana_get_dashboard_panel_queries",
      "mcp__agatha-mcp__grafana_query_prometheus",
      "mcp__agatha-mcp__grafana_get_dashboard_summary",
      "mcp__agatha-mcp__grafana_list_datasources",
      "mcp__agatha-mcp__grafana_get_panel_image",
      "mcp__incident-io__catalog_type_list",
      "mcp__incident-io__catalog_entry_list",
      "mcp__incident-io__catalog_entry_show",
      "mcp__incident-io__escalation_path_list",
      "mcp__incident-io__escalation_path_show",
      "mcp__incident-io__escalation_show",
      "mcp__incident-io__schedule_show",
      "Bash(gh api:*)",
      "Bash(gh pr list:*)",
      "Bash(gh release list:*)"
    ]
  }
}
```

Every entry is read only. Bash is scoped to `gh` reads. The list does not grant
plain `Bash`. It does not grant the whole Atlassian server. That server has write
tools. Read only keeps the skill fast and safe.

The Atlassian MCP may connect as `Atlassian` or `Atlassian Rovo`. Both prefixes
are listed so either name works. Drop the pair you do not use.

### Never run operational commands

Dobby suggests `kubectl`, `helm`, `vault`, `voltage`, `kubegen`, and cloud CLIs. It
never runs them. That is a rule in the skill. The allowlist also pre approves only
read only `gh`, so an operational command would prompt rather than run silently.

For a hard backstop add a deny list. Note this is **global**. It blocks the command
in every session, not only on-call. Add it only if you accept that.

```json
{
  "permissions": {
    "deny": [
      "Bash(kubectl:*)",
      "Bash(helm:*)",
      "Bash(vault:*)",
      "Bash(voltage:*)",
      "Bash(kubegen:*)",
      "Bash(gcloud:*)",
      "Bash(gsutil:*)",
      "Bash(aws:*)"
    ]
  }
}
```

## Scope

Services in scope:

- Merchant Center Services
- MC Frontend and Proxy
- Identity

Environments in scope are GCP and AWS. Both production and staging are covered.
See the environment table in `resources/runbook-sources.md`.

## Files

| File                                    | Purpose                                                                                 |
| --------------------------------------- | --------------------------------------------------------------------------------------- |
| `SKILL.md`                              | The skill definition and workflow.                                                      |
| `resources/runbook-sources.md`          | Runbook indexes. Standing dashboards. Environments. Service repos. Matching vocabulary. |
| `resources/glossary.md`                 | Precise wording for Merchant Center components. Proxy versus gateway.                   |
| `resources/architecture-overview.md`    | System map and index of the knowledge resources.                                        |
| `resources/architecture-frontends.md`   | Frontend SPAs, the proxy, buckets, the menu.                                            |
| `resources/architecture-apis.md`        | The three APIs, auth, the mcAccessToken, proxying.                                      |
| `resources/identity-architecture.md`    | Identity, Ory, sessions, login flows, global load balancing.                            |
| `resources/security-infrastructure.md`  | Kubernetes, kubectl, Helm, Vault, access.                                               |
| `resources/deployment-pipelines.md`     | CircleCI, the deployment train, the /versions endpoints.                                |
| `resources/monitoring-observability.md` | Grafana, LogScale, Checkly, Sentry. Alert routing.                                      |
| `resources/rotation-and-rules.md`       | On-call process. Shift, handover, incident roles, in-hours tasks.                       |
| `resources/incident-process.md`         | The org incident process. Roles, phases, escalation, permissions.                       |
| `resources/escalation-paths.md`         | Find the escalation path and on-call for a service via incident.io.                     |
| `resources/grafana-metrics.md`          | Live severity workflow via the Grafana MCP. How to map a signal to a panel.             |
| `resources/logscale-queries.md`         | The `humio-packages` query catalog. Field conventions. How to build a search URL.       |
| `resources/logscale-syntax.md`          | LogScale query language reference.                                                      |

## Maintenance

The runbook list is fetched live from Confluence on every run. New runbooks appear
automatically. Update `resources/runbook-sources.md` when the index pages change.
Also update it when dashboards or environments or service repos change. The skill
reads its identifiers and vocabulary from that file.
