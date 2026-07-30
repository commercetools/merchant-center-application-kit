---
name: production-readiness-review
description: Review a completed production-readiness report and produce prioritized recommendations based on the expectations matrix in this skill. Use after running /production-readiness-report to get actionable next steps.
disable-model-invocation: false
argument-hint: '<readiness-report-path> [--repo-root <path>] [--output <path>] [--comment]'
allowed-tools: Bash, Grep, Glob, Read, WebFetch
scope:
  - readiness
  - review
---

# Production Readiness Review Recommendations

Review a completed production-readiness report and produce actionable recommendations. Use the expectations matrix in this skill as the baseline, evaluate answer quality and evidence strength, and output a prioritized remediation plan.

## Arguments

- `readiness-report-path` (required): Path to the completed readiness report/checklist to review
- `--repo-root <path>` (optional): Repository root for follow-up evidence checks (default: current directory)
- `--output <path>` (optional): Output file for recommendations (default: `production-readiness-recommendations.md`)
- `--comment` (optional): Post an executive summary to the active PR as a comment

## Core Rules

1. **Review against expectations, not opinions.** Use the questionnaire expectation matrix below.
2. **Verify answers against evidence.** Each report answer must be checked against its cited evidence links.
3. **Evidence quality matters.** Weak, missing, or non-supporting evidence downgrades confidence and should produce recommendations.
4. **Prioritize by risk.** Critical gaps first, then high-risk operational gaps.
5. **Recommendations must be actionable.** Each recommendation includes owner, action, and expected outcome.
6. **Log field compliance must be code-proven.** If logging is provided via an internal library, inspect that library implementation in GitHub before marking compliant.
7. **Compliance requires links.** Any compliance judgment must include direct links to code or documents.
8. **This is the recommendation skill.** Recommendations and prioritization are produced here, not in `production-readiness-report`.

## Process

### 1. Load Inputs

- Read `readiness-report-path`
- Set `REPO_ROOT` (default current directory)
- Set `OUTPUT_FILE` (default `production-readiness-recommendations.md`)
- Validate that the input report preserves questionnaire structure:
  - sections from the questionnaire are present
  - each question appears under its original section
  - each question has a proposed answer and evidence links

### 2. Evaluate the Existing Report

For each question in the readiness report:

- Validate answer completeness and internal consistency.
- Open/check the listed evidence links where possible.
- Verify the cited evidence actually supports the specific claim in the answer.
- Flag broken links, inaccessible links, or links that do not substantiate the claim.
- Validate evidence quality (`High`/`Medium`/`Low`) after verification.
- Compare against expectations
- Verify compliance claims are backed by links to code or documents
- Classify gap:
  - `Control Gap`: missing control (e.g. no alerting, no runbook)
  - `Evidence Gap`: control likely exists but not proven
  - `Maturity Gap`: control exists but incomplete

### 2.1 Runbook Validation Standard

Use the local checklist at:

- `resources/rfc-008-runbook-checklist.md`

Keep a reference to the source guideline:

- `https://commercetools.atlassian.net/wiki/spaces/S/pages/835584030/RFC+008+Runbook+template`

Validation requirements:

- Every paging alert and every major non-paging symptom alert should link to a diagnostic runbook.
- Diagnostic runbooks should link to action runbooks where remediation actions are needed.
- Runbooks must be checked against the local RFC-008 checklist and any missing required elements become recommendations.
- If Confluence tools are available, verify runbook pages directly in Confluence and add those links as evidence.
- Use question-specific search terms (service, alert, runbook intent) when direct links are absent.

### 2.2 Logging Field Validation Standard

Use the local checklist at:

- `resources/standard-log-fields-checklist.md`

Keep a reference to the source guideline:

- `https://commercetools.atlassian.net/wiki/spaces/CLT/pages/111392689/Standard+Log+Management+Fields`

Validation requirements:

- Logging compliance must be validated from code/config evidence (logger setup, emitted fields, middleware, serializers).
- If logs are emitted via an internal shared library, find that library repository and verify field mapping in its implementation.
- If evidence exists only in docs but not in code, classify as `Evidence Gap`.
- If required standard fields are missing, classify as `Control Gap`.

### 3. Score Readiness Quality

Compute review result:

- **High Risk**: any unmet critical expectation or unresolved security/on-call/runbook blockers
- **Medium Risk**: high-severity items partial/unknown, weak evidence on core controls
- **Low Risk**: critical/high expectations mostly met with strong evidence

### 4. Generate Recommendations

Create recommendations grouped by priority:

- **Must**: blockers to production safety; required before go-live
- **Should**: important reliability and observability gaps; target in current/next sprint
- **May**: maturity and optimization improvements; plan as capacity allows

Each recommendation must include:

- `priority`
- `question_id` / question text
- `problem`
- `recommendation`
- `owner` (suggested team role)

## Output Format

```markdown
# Production Readiness Review Recommendations

## Review Summary

- **Input report:** <path>
- **Risk rating:** High | Medium | Low
- **Decision confidence:** High | Medium | Low

## Top Risks

- <risk 1>
- <risk 2>

## Prioritized Recommendations

| Priority | Question | Gap Type    | Recommendation | Owner         | Evidence Needed           | Evidence Links                                   | Timeframe         |
| -------- | -------- | ----------- | -------------- | ------------- | ------------------------- | ------------------------------------------------ | ----------------- |
| Must     | ...      | Control Gap | ...            | Platform Team | Runbook linked from alert | `https://github.com/org/repo/path/to/alert-rule` | Before production |

## Section-by-Section Notes

### Monitoring

- <what is good>
- <what is missing>

### Alerting

- ...

## Quick Wins

- [ ] <short action with high impact>
- [ ] <short action with high impact>
```

### Optional PR Comment

If `--comment` is provided, post:

- overall risk rating
- top 3 recommendations
- link/path to full recommendations file

## Questionnaire Expectations Matrix

Use this matrix to assess whether each question is satisfactorily answered.

### Context

- **Purpose of application**: clear business/operational purpose, scope, and why reliability matters.
- **SLOs / expectations**: explicit SLO targets or measurable consumer expectations with source references.
- **Service Quality Group tier**: tier identified and reflected in required controls.

### Monitoring

- **Golden Signals monitored**: latency, traffic, errors, saturation explicitly covered.
- **Symptom-first monitoring**: user-impact symptoms (errors, latency, failed requests, failed reconciliations) are prioritized over resource-only signals.
- **Data store golden signals**: dependencies/datastore monitoring strategy explicit or justified as N/A.
- **Dependency performance monitoring**: key dependencies have performance telemetry.
- **Logged exceptions actionable**: errors include enough context and response path.
- **Logging standard fields declared**: standard fields are emitted/mapped in code and validated with `resources/standard-log-fields-checklist.md`.
  - For `MON-05`, verify the report includes a full "Fields Present" and "Fields Missing" breakdown with mapping details and evidence links.
- **Average and peak traffic known**: baseline and peak expectations documented or estimated with rationale.
- **Observability tools listed**: metrics/logs/traces tooling clearly identified.
- **Readiness/liveness probes**: probe behavior and failure semantics documented in manifests/docs.

### Alerting

- **Paging alerts are symptom-based**: page on-call for user-impacting symptoms and service degradation, not for raw resource metrics alone.
- **Non-paging alerts are symptom-focused**: warnings should indicate likely impact progression and guide preventive action.
- **Saturation-only alerts are discouraged**: CPU/memory saturation without symptom correlation should not be primary paging criteria.

### Runbooks

- **Alerts link to runbooks**: each major alert class has a diagnosis/remediation runbook, especially paging alerts.
- **Runbooks follow RFC-008 expectations**: validate structure and metadata using `resources/rfc-008-runbook-checklist.md`.
- **Runbooks listed**: canonical runbook list exists and is discoverable.

### Operations

- **Outage impact**: customer impact and degraded-mode behavior clearly defined.
- **On-call support**: explicit owning rotation and support model.
- **Scaling policy**: horizontal/vertical scaling strategy and constraints documented.
- **Traffic source identification**: request origin attribution path exists where relevant.
- **Rate limits**: limits known/configured and operationally understood.
- **Fairness for multi-tenancy**: fairness/isolation behavior documented and acceptable.
- **Excess callers identification/control**: detection and mitigation approach exists.
- **Team knowledge**: operational knowledge distributed across the team.

### Load testing

- **Load tested to SLOs**: repeatable load tests validate expected capacity.
- **Resources within SLOs**: resource envelope documented with evidence.
- **Chaos tests performed**: resilience tests executed or clearly planned.
- **Load test traffic identification**: non-production/prod test traffic handling defined when relevant.

### Deployment

- **Verification tests**: deployment validation tests are automated and meaningful.
- **Canary phase**: canary or equivalent staged risk-reduction strategy justified.
- **Deployment process documented**: on-call can execute/understand deployment path.
- **Deployment duration known**: expected deployment time measured and tracked.
- **Rollback duration known**: rollback time measured and acceptable.
- **Deployment observability by version**: ability to observe release behavior/version impact.

### Failure Modes

- **Known failure modes documented**: realistic failure catalog exists.
- **Failure modes tested**: critical failure scenarios tested or time-bound plan exists.
- **Disable non-critical features under load**: degradation strategy exists when relevant.
- **External caches behavior**: cache failure impact and fallback understood.
- **Internal caches behavior**: consistency and size/risk characteristics documented.
- **Dependency timeouts**: timeout values documented with rationale.
- **Resilience patterns**: retries/backoff/circuit-breakers/fallbacks intentionally configured.
- **Connection pools**: pooling behavior/configuration understood and tuned.

### Data Management

- **Backups and restore runbook**: backup strategy + tested restore playbook.
- **Recovery runbook duration**: expected recovery time known and acceptable.
- **Datastore upgrade without downtime**: upgrade strategy and risk understood.

### Security

- **No unresolved critical/high vulnerabilities**: tracked and below SLA or actively remediated.
- **Over-SLA vulnerabilities have plan**: committed remediation ownership/dates.
- **Public endpoints protected (WAF/Armor)**: enforced where endpoints exist.
- **TLS restricted to 1.2/1.3**: compliant or justified N/A.
- **SCP one-off tasks complete**: ownership/labeling/secrets hygiene tasks completed.
- **Slack team handles up-to-date**: security notifications route to active owners.

## Guidelines

- Prefer concise, high-signal recommendations over long narrative.
- If evidence is missing, recommend how to generate that evidence.
- Do not duplicate unchanged checklist rows; focus on gaps and risk.
- Flag contradictions between sections as explicit findings.
- Every finding should include link-based evidence where possible (code/doc URL).

## Examples

```bash
/production-readiness-review ./production-readiness-report.md
```

```bash
/production-readiness-review ./reports/checkout-prr.md --repo-root ../checkout-service --output ./reports/checkout-recommendations.md
```

```bash
/production-readiness-review ./production-readiness-report.md --comment
```
