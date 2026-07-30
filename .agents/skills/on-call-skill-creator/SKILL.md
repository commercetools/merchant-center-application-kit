---
name: on-call-skill-creator
description: Create a new on-call assistant skill for a rotation or team, modelled on the Merchant Center one. Use this whenever a team wants their own on-call skill, or someone says "create an on-call skill", "scaffold on-call for <team>", "adopt the Merchant Center on-call skill for us", or "make on-call-<rotation>". It interviews you, ingests your runbooks, dashboards, logs, and escalation setup, and generates a ready `on-call-<rotation>` skill. Trigger even when the user only names their rotation and asks for on-call help tooling.
disable-model-invocation: false
argument-hint: '<rotation-name>'
allowed-tools: Read, Write, Edit, Bash
scope:
  - knowledge
  - monitoring
---

# On-Call Skill Creator

Scaffold a new `on-call-<rotation>` skill by interviewing the owner and ingesting
their sources. The reference implementation is `on-call-merchant-center`. This
skill generalises it so any rotation can adopt the same shape.

You produce a new skill under `skills/on-call-<rotation>/` with a filled
`SKILL.md`, a `README.md`, and `resources/`. Then you register it, lint it, and
hand triggering off to `skill-creator`.

## The idea: invariant vs per-rotation

Most of an on-call skill is the same across rotations. The workflow, the safety
rules, the incident process, the LogScale language, the observability stack. That
part lives in `resources/templates/` and `resources/shared/` and you copy it.

What changes per rotation is a small set of inputs. Runbook indexes, dashboards,
environments, the log package, service repos, escalation, and a persona. You
gather those in the interview and by auto-discovery, then fill the placeholders.

Ask only for what you cannot discover.

## Required

Same stack as the generated skills. The `atlassian` MCP (Confluence), the
`agatha-mcp` Grafana MCP, the `incident-io` MCP, and authenticated `gh`. This
skill also needs `Write` and `Edit` to generate files. It runs read only `gh` and
MCP reads. It never runs operational commands.

## Process

### 1. Parse the rotation

Take the rotation name from `$ARGUMENTS`. Derive the skill name `on-call-<rotation>`
in kebab case. Confirm it with the user.

### 2. Interview

Read `resources/interview.md` and run the interview. Collect the per-rotation
inputs. Rotation title, persona name and vibe, runbook index pages, services and
repos, standing dashboards, the log package, escalation defaults, knowledge docs,
the rotation rules page, alert phrasings, the scope tag, and 3 to 5 real incidents
for validation. Offer defaults. Skip anything you can auto-discover in step 3.

### 3. Auto-discover

Read `resources/ingestion-playbook.md`. Reduce the interview by discovering:

- Environments. `grafana_list_datasources(type=prometheus)` builds the env to
  cloud id table.
- Runbook taxonomy. Read the index descendants and detect `Diagnostic:` and
  `Action:` naming.
- Service to repo. Prefer the `Github repo` field in runbook metadata.

### 4. Ingest sources

Follow the playbook for each input:

- Runbooks. `getConfluencePageDescendants` on the index pages. Metadata only.
- Dashboards. `grafana_get_dashboard_panel_queries` for the signal to panel map.
- Escalation. The incident.io Service catalog `Escalation Path` attribute.
- Knowledge docs. Fetch child pages and distill each into a topic resource with a
  source link.

### 5. Assemble the skill

Create `skills/on-call-<rotation>/`. Fill and copy each template into the new
skill. `SKILL.md.template` and `README.md.template` go to the root. The rest go
into the new skill's `resources/`.

- `resources/templates/SKILL.md.template` → the new `SKILL.md`
- `resources/templates/README.md.template` → the new `README.md`
- `resources/templates/runbook-sources.md.template` → `runbook-sources.md`
- `resources/templates/grafana-metrics.md.template` → `grafana-metrics.md`
- `resources/templates/logscale-queries.md.template` → `logscale-queries.md`
- `resources/templates/glossary.md.template` → `glossary.md`
- `resources/templates/escalation-paths.md.template` → `escalation-paths.md`
- `resources/templates/rotation-and-rules.md.template` → `rotation-and-rules.md`

Copy verbatim:

- `resources/shared/incident-process.md` → `incident-process.md`
- `resources/shared/logscale-syntax.md` → `logscale-syntax.md`

Generate `architecture-*.md` files from the ingested knowledge docs, one topic per
file, each with its source link. Build an `architecture-overview.md` that indexes
every resource. Replace every `{{PLACEHOLDER}}`. Leave none behind.

### 6. Fill the soul

The `SKILL.md.template` carries the persona section. Fill `{{PERSONA}}` and
`{{PERSONA_VIBE}}`. Keep the safety rules verbatim. Every generated skill is a
guide not an operator. It suggests `kubectl`, `helm`, and `vault`. It never runs
them.

### 7. Register and lint

Add the new skill to the root `README.md` table and to `skills/README.md`. Run
`./scripts/lint-skills.sh skills/on-call-<rotation>`. Fix any error.

### 8. Validate

Spot check against the 3 to 5 real incidents from the interview. For each, confirm
the skill would reach the right runbook and query. Report the result honestly. Do
not claim a match you did not verify.

### 9. Hand off

Offer to run `skill-creator` for the description triggering loop. Offer to open a
PR. Do not push to `main`.

## Placeholders

Fill every one. Source in brackets.

| Placeholder                              | Meaning                                                   |
| ---------------------------------------- | --------------------------------------------------------- |
| `{{ROTATION}}`                           | kebab name, e.g. `merchant-center` [arg]                  |
| `{{ROTATION_TITLE}}`                     | display name, e.g. Merchant Center [interview]            |
| `{{PERSONA}}` / `{{PERSONA_VIBE}}`       | soul name and one line [interview]                        |
| `{{RUNBOOK_INDEXES}}`                    | index pages table [interview + descendants]               |
| `{{CLOUD_ID}}`                           | Confluence cloudId [getAccessibleAtlassianResources]      |
| `{{ENV_TABLE}}`                          | env to cloud id to log account [grafana_list_datasources] |
| `{{SERVICE_VOCAB}}` / `{{SIGNAL_VOCAB}}` | matching vocab [ingest]                                   |
| `{{SERVICE_REPOS}}`                      | service to repo map [runbook metadata + interview]        |
| `{{DASHBOARDS}}`                         | standing dashboard UIDs [interview + Grafana search]      |
| `{{LOGSCALE_PACKAGE}}`                   | humio-packages path [interview]                           |
| `{{ESCALATION_DEFAULT}}`                 | default escalation path [incident.io]                     |
| `{{ALERT_PHRASINGS}}`                    | trigger phrases for the description [interview]           |
| `{{SCOPE_TAGS}}`                         | scope, usually `monitoring` and a team tag [interview]    |

## Guardrails

- This skill writes files. It never runs operational commands. Read only `gh` and
  MCP reads only.
- The generated skill inherits the safety rules. Read only. Suggests operational
  commands, never runs them. Prompt free allowlist documented in its README.
- Do not ship a generated skill without the human review and the incident spot
  check in step 8.

## Examples

```bash
# Scaffold an on-call skill for the Frontend Platform rotation
/on-call-skill-creator frontend-platform

# Adopt it for Checkout
/on-call-skill-creator checkout
```
