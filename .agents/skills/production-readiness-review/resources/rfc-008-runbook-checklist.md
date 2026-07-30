# RFC-008 Runbook Checklist

Source reference:

- https://commercetools.atlassian.net/wiki/spaces/S/pages/835584030/RFC+008+Runbook+template

Use this checklist to evaluate runbook quality during production-readiness review.

Evidence requirement:

- Every compliance decision must include links to supporting code/documents (alert definitions, runbook pages, dashboards, repository files).

## 1) Alert Linkage Expectations

- Paging alerts link to a diagnostic runbook.
- Major symptom-based non-paging alerts also link to a diagnostic runbook.
- Diagnostic runbooks link to action runbooks when operator actions are required.
- If an alert has no runbook link, mark as a gap.

## 2) Required Runbook Metadata (Top Table)

Each runbook should include:

- Owner (team)
- Service (ideally linked to service quality page)
- Github repo (linked)
- Status (Draft / In-Review / Ready)
- Approximate Runtime (required for action runbooks; optional for diagnostic runbooks)
- Description
- Intended Audience (internal or external)
- Prerequisites (tools/access needed)

## 3) Taxonomy and Discoverability

- Runbook has Confluence label `runbook`.
- Title indicates runbook type:
  - `Action: ...`
  - `Diagnostic: ...`

## 4) Step Quality

- Steps are concise and unambiguous.
- Compound steps are split (avoid multiple actions in one step).
- Diagnostic conditions are concrete and measurable.
  - Good: "P99 latency > 1s for 5 minutes"
  - Bad: "Latency is high"
- Relevant Humio/log query links are provided where log investigation is required.
- Action steps point to action runbooks when applicable.

## 5) Operational Usability

- The runbook can be executed by the intended audience, especially under incident pressure.
- Preconditions and safety notes are explicit.
- Expected outcomes / verification checks are included after actions.

## 6) Review Outcomes

When reviewing runbooks, classify findings:

- **Must**: Missing alert link, missing owner/status, unclear or unsafe remediation steps.
- **Should**: Missing measurable thresholds, weak diagnostics, missing query/dashboard links.
- **May**: Formatting and readability improvements that do not block safe operation.
