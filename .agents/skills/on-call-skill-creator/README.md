# on-call-skill-creator

Creates a new on-call assistant skill for a rotation or team. It is modelled on
`on-call-merchant-center`. You answer a short interview. It ingests your sources.
It writes a ready `on-call-<rotation>` skill.

## When to use it

A team wants their own on-call skill. Or someone says "create an on-call skill",
"scaffold on-call for our team", or "make on-call-<rotation>".

Command:

```
/on-call-skill-creator <rotation-name>
```

## What it does

1. Interviews you for the per rotation inputs.
2. Auto-discovers what it can. Environments, runbook taxonomy, service repos.
3. Ingests runbooks, dashboards, logs, escalation, and knowledge docs.
4. Generates `skills/on-call-<rotation>/` from templates.
5. Registers it, lints it, and validates against a few real incidents.
6. Hands the triggering loop to `skill-creator`. Offers a PR.

## Prerequisites

Same stack as the skills it produces. The `atlassian` MCP (Confluence), the
`agatha-mcp` Grafana MCP, the `incident-io` MCP, and authenticated `gh`. It also
uses `Write` and `Edit` to generate files. It runs read only `gh` and MCP reads.
It never runs operational commands.

## What it generates

An `on-call-<rotation>` skill with the same shape as the Merchant Center one. A
`SKILL.md` with the workflow and a persona, a `README.md`, and `resources/` for
runbook sources, glossary, dashboards, LogScale queries and syntax, escalation,
the incident process, rotation rules, and any architecture docs you provided.

## Files

| File                              | Purpose                                                                      |
| --------------------------------- | ---------------------------------------------------------------------------- |
| `SKILL.md`                        | The interview and assembly workflow.                                         |
| `resources/interview.md`          | The question set and defaults.                                               |
| `resources/ingestion-playbook.md` | The fetch and distill recipes and auto-discovery.                            |
| `resources/templates/`            | Placeholder versions of every generated file.                                |
| `resources/shared/`               | Files copied verbatim into each skill. Incident process and LogScale syntax. |

## Notes

- The reference implementation is `on-call-merchant-center`. Keep the two in sync.
  When you improve one, fold the change back into the templates here.
- A generated skill still needs human review and a real incident spot check before
  it ships.
