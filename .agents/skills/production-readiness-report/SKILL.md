---
name: production-readiness-report
description: Analyze a repository and pre-fill a local production-readiness questionnaire using evidence from charts/manifests, deployment/config files, dependencies, and reliability patterns. Use before go-live or readiness reviews.
disable-model-invocation: false
argument-hint: '<service-or-system> [--repo-root <path>] [--output <path>] [--comment]'
allowed-tools: Bash, Grep, Glob, Read, WebFetch
scope:
  - readiness
  - review
---

# Production Readiness Report

Run a structured production-readiness check by analyzing a code repository and pre-filling the questionnaire as far as evidence allows. Inspect Helm charts, deployment configuration, CI/CD definitions, dependencies, and reliability patterns to produce a human-editable draft report.

## Arguments

- `service-or-system` (required): Service, repository, or system identifier being reviewed
- `--repo-root <path>` (optional): Repository root to analyze (default: current working directory)
- `--output <path>` (optional): Output file for the report (default: `production-readiness-report.md`)
- `--comment` (optional): Post the final assessment to the active PR as a comment

## Core Rules

1. **Questionnaire is mandatory.** Load it only from the fixed path resolution in this skill; if not readable, stop with an error.
2. **This skill is evidence collection only.** Do not rate answers and do not generate recommendations.
3. **Every answer must be link-backed.** Use direct code/doc/dashboard links with line-level references whenever possible; avoid unsupported claims.
4. **Preserve structure and format.** Keep original section/question order and use header-based Question/Answer blocks (no tables).
5. **Show data quality in title color only using inline LaTeX.** Amber for incomplete data, red for cannot answer, no color for successful answers.
6. **Process section by section.** Complete one section at a time to keep context bounded.
7. **Use strongest available evidence source.** Prefer repository config; if missing, check library defaults; if still missing, run Confluence fallback searches before concluding insufficient evidence.
8. **Record gaps explicitly.** Missing data or unverifiable claims must be documented in `Notes for Human Editor`.
9. **Use Grafana verification when available.** If Grafana tools are available, search dashboards and validate alert-related metrics from dashboard/panel queries.
10. **Run tool preflight before analysis.** Check Confluence and Grafana tool availability first, and warn the user if either is unavailable.
11. **Detect repository shape before analysis.** Determine whether the target is a monorepo or single-service repository.
12. **Confirm monorepo scope with user.** If monorepo, ask whether to review one service or all services before continuing.

## Process

### 1. Parse Inputs and Set Defaults

- Read `service-or-system`
- Resolve optional flags
- Set `REPO_ROOT` default to current directory
- Set `OUTPUT_FILE` default to `production-readiness-report.md`

### 1.0 Detect Repository Shape and Confirm Scope

Before any questionnaire/evidence work:

- Detect whether `REPO_ROOT` appears to be:
  - a **single-service repository**, or
  - a **monorepo** with multiple service/application directories.

Monorepo indicators can include multiple deployable service folders, multiple independent build/test configs, workspace files, or multiple chart/app roots.

If monorepo is detected:

- List the detected services/applications (with paths) in the scoping prompt.
- Pause and confirm scope with the user:
  - review a specific service only, or
  - review all services.
- Do not continue until scope is confirmed.
- Use the confirmed scope as the analysis target and state it in the report `Scope` section.

### 1.1 Tool Availability Preflight

Before loading questionnaire or analyzing evidence:

- Check whether Confluence tools are available.
- Check whether Grafana tools are available.

If either toolset is unavailable:

- Warn the user immediately that Confluence and Grafana access are required for a higher-quality report.
- Continue the report generation with available sources, but explicitly note reduced evidence quality in the draft.

### 2. Load the Current Questionnaire

Resolve the questionnaire path in this exact order:

1. `resources/production-readiness-questionnaire.md` (relative to this skill directory)
2. `.claude/skills/production-readiness-report/resources/production-readiness-questionnaire.md` (relative to repository root)
3. `.cursor/skills/production-readiness-report/resources/production-readiness-questionnaire.md` (relative to repository root)

Set `QUESTIONNAIRE_PATH` to the first existing path and read it.

Before proceeding, explicitly verify that `QUESTIONNAIRE_PATH` exists and is readable.

This local file is the source of truth used by the skill at runtime.

Refresh workflow (maintainers):

- Fetch the latest questionnaire from your team-approved source.
- Update `resources/production-readiness-questionnaire.md` with the latest question set.

### 3. Normalize Questions into Entries

Convert the questionnaire into structured entries with stable identifiers:

- `id`: short key (`PRR-001`, `PRR-002`, ...)
- `section`: questionnaire section name
- `question`: exact question text
- `answer`: evidence-backed draft answer
- `evidence`: list of concrete references
- `notes`: context for human editor

### 3.1 Questionnaire Source

Read all questions and section names from:

- `resources/production-readiness-questionnaire.md`

### 4. Analyze Repository and Gather Evidence

Analyze `REPO_ROOT` first, then map findings to questionnaire answers.

### 4.0 Section-by-Section Execution

Process sections sequentially:

1. Load one section and its questions.
2. Gather evidence only for that section.
3. Draft answers for that section.
4. Append section output to the report.
5. Move to the next section.

Do not load/analyze all sections at once.

#### 4.1 Helm and Kubernetes Deployment Analysis

Inspect Helm and K8s manifests, including:

- `Chart.yaml`, `values.yaml`, `values-*.yaml`, templates in `templates/`
- workload rollout/deployment objects and deployment strategy details
- analysis templates/steps, canary/stable service configuration
- readiness/liveness/startup probes
- resource requests/limits, autoscaling, PDB, disruption settings
- ingress/service exposure and TLS configuration

#### 4.2 Configuration and Operations Artifacts

Inspect operational and platform configuration:

- CI/CD pipelines (prioritize `.circleci/config.yml` and `.github/workflows/*.yml` / GitHub Actions; use other systems only if those are not present)
- alerting/monitoring config (Prometheus rules, SLO files, dashboards as code)
- runbooks and docs (`runbook`, `playbook`, `incident`, `on-call`, `README`)
- backup/restore and disaster recovery documents
- logging setup and field mappings (logger config, middleware, serializers)

#### 4.2.1 Runbook Verification via Confluence

For runbook-related questions:

- If Confluence tools are available, verify runbooks in Confluence (page existence, title relevance, and reachable links).
- Start from links found in repository/docs/alerts, then search Confluence with terms derived from service name, alert name, and runbook intent.
- If direct links are missing, use targeted Confluence search that matches the question context (for example runbook label + service/team keywords).
- Record Confluence page links as evidence.
- If Confluence validation is not possible, explicitly note that tool/access was unavailable and list what was attempted.

#### 4.2.2 Grafana Dashboard and Alert Metric Verification

For monitoring/alert/SLO questions:

- If Grafana tools are available, search for relevant dashboards (service name, alert name, metric name).
- Retrieve panel queries and validate that alert-related metrics exist and match expected dimensions/windows where possible.
- Use panel/query evidence as supporting references.
- If Grafana tools are not available, note that explicitly and continue with repository/Confluence evidence.

Logging validation source:

- `resources/standard-log-fields-checklist.md`
- `https://commercetools.atlassian.net/wiki/spaces/CLT/pages/111392689/Standard+Log+Management+Fields`

#### 4.3 Dependency and Reliability Pattern Analysis

Inspect dependency manifests and infer reliability patterns:

- language/package files (`package.json`, `go.mod`, `pom.xml`, `requirements*.txt`, etc.)
- infrastructure dependencies (datastores, queues, cache, external APIs)
- patterns indicating retries, backoff, circuit breaking, timeouts, connection pooling
- rate limiting, fairness, traffic isolation, or multi-tenancy controls
- load/chaos test assets (`k6`, `locust`, `chaos`, `stress`, performance suites)

#### 4.3.2 Test Coverage Collection (`DEP-07`)

For the test coverage question:

- Attempt to collect a numeric coverage percentage by executing tests with coverage first.
- Primary approach:
  1. Detect the project test command and coverage command from repository scripts/config.
  2. Run tests with coverage enabled.
  3. Parse resulting coverage output/artifacts to extract the percentage.
- If tests cannot be run (missing dependencies, unsupported runtime, excessive runtime, or failing setup), fall back to passive evidence sources in this order:
  1. Coverage report artifacts/files in repo (for example `coverage.xml`, `lcov.info`, `coverage-summary.json`, Cobertura/Jacoco outputs).
  2. CI workflow outputs/artifacts (CircleCI or GitHub Actions logs/artifacts with coverage).
  3. Coverage badges or documented coverage values in README/docs.
- If multiple values are found, report the most recent source and mention others in notes.
- Include line-anchored evidence links whenever possible.
- If test execution was attempted, include the exact command run and outcome in evidence/notes.
- If no percentage can be found, state that explicitly and list what command/artifact is needed to produce it.

#### 4.3.1 Configuration Defaults Fallback

For configuration-related questions:

- First, search service/repository configuration (manifests, env vars, values files, app config).
- If configuration is not explicitly set, identify which library/framework provides the behavior.
- Inspect the library source (or official docs when source is unavailable) to find the default value/behavior.
- Record evidence links to the exact default definition (code constant, option struct default, docs page).
- In the answer, explicitly state whether the value is:
  - explicitly configured by the service, or
  - inherited from library defaults.

#### 4.4 Answering Policy (Best-Effort Pre-Fill)

For each question:

- Fill with the best answer supported by evidence found in repository artifacts.
- If evidence is incomplete, provide the best current answer and explicitly list what is missing.
- If no reliable evidence exists, leave answer as `Insufficient evidence from repository` and list required follow-up evidence.
- Never claim runtime behavior unless backed by config, tests, docs, or links.
- Include at least one clickable/linkable reference per compliance claim (repo file link, document URL, dashboard URL).
- For code evidence, include precise line references whenever possible (single line or line range).
- For configuration answers, include whether value comes from explicit config or library default.
- For SLO questions (`CTX-02` and related monitoring questions), if explicit SLO definitions are absent but alert rules are present, derive **implicit SLOs** from alert thresholds and timing windows.
- When using implicit SLOs, calculate numeric SLO targets (for example `99.9%` and "3 nines", `99.99%` and "4 nines") instead of descriptive statements only.
- Mark inferred values explicitly and include exact alert rule links, threshold values, window durations, and calculation steps.
- Use `resources/slo-calculation.md` as the default derivation method for implicit SLO calculations.
- If local evidence is missing, run Confluence fallback searches before concluding unresolved.
- Set the question title color based on data quality rules:
  - Amber title: some evidence exists but data is incomplete (use inline LaTeX, for example `$\color{orange}{\text{...}}$`).
  - Red title: cannot answer from available evidence (use inline LaTeX, for example `$\color{red}{\text{...}}$`).
  - Plain title: question answered with sufficient evidence.

#### 4.4.3 Confluence Fallback Search (When Local Evidence Is Missing)

When repository and library-default evidence are insufficient:

- Use Confluence search tools to look for supporting evidence before moving on.
- Run multiple searches with equivalent terms for the same question (at least 3 variants).
- Build equivalent terms from:
  - service/system name variants
  - question keywords and synonyms
  - domain terms (runbook, SLO, alert, on-call, backup, rollback, etc.)
- Prefer specific page retrieval after search hits are found, and extract direct evidence links.
- Record attempted search terms and result links in `Notes for Human Editor`.
- Only mark as unresolved after these searches are attempted.

#### 4.4.2 Implicit SLO Derivation from Alerts

When explicit SLO definitions are not found:

- Read and follow `resources/slo-calculation.md`.
- Use its formulas/assumptions to derive implied SLO, error budget, burn-rate context, and budget consumption.

- Inspect alert rules for error-rate, latency, availability, and burn-rate conditions.
- Extract the measurable target implied by each rule (for example error-rate limit) and its evaluation window.
- Convert those into explicit inferred SLO values:
  - availability/error budget percentage (for example `99.95%`)
  - "nines" representation (for example `3 nines`, `4 nines`)
  - corresponding error budget percentage (for example `0.05%`)
- Keep inferred SLOs separate from explicit SLOs and label each as `Inferred from alerts`.
- Provide evidence links to each source alert rule and timer/window expression used.

#### 4.4.1 Special Rule for `MON-05`

For `MON-05` ("Does logging follow the standard log management fields?"), structure the answer with explicit field coverage:

- **Fields Present:** list every detected standard field and where it is produced/mapped.
- **Fields Missing:** list every expected standard field not found.
- **Field Mapping Details:** include aliases/transformations (for example `time -> timestamp`) and where that mapping is defined.
- **Source of Value:** for each field, state whether it is explicitly configured or inherited from library defaults.
- **Evidence Links:** include direct links for each present/missing/mapped claim.

Do not provide a generic summary for `MON-05`; always provide full present/missing field breakdown.

### 5. Produce the Draft Report

Create a markdown report with this structure:

```markdown
# Production Readiness Check Draft: <service-or-system>

## Draft Status

**Status:** Draft - requires human review and editing
**Reviewed On:** <UTC timestamp>
**Questionnaire Source:** <url or file path>

## Scope

- Repository analyzed: <repo-root>
- Coverage notes: <what was inspected>

## Questions and Proposed Answers

### <Section Name 1>

#### <QUESTION-ID> - <Original Question Text>

**Answer:** <proposed answer>
**Evidence Links:**

- <repo-file-link#L123-L140>
- <repo-file-link#L220>
  **Notes for Human Editor:** <notes>

<!-- For DEP-07 use this expanded answer body -->

**Answer:**

- **Coverage Percentage:** `<value>%` (or `Not found`)
- **Coverage Scope:** <unit/instructions if available, e.g. lines/branches/files>
- **Source:** <coverage file, CI run, or badge/doc source>

<!-- For MON-05 use this expanded answer body -->

**Answer:**

- **Fields Present:**
  - `<field-name>` — <where/how found>
- **Fields Missing:**
  - `<field-name>` — <expected but not found>
- **Field Mapping Details:**
  - `<source-field> -> <standard-field>` — <where mapping is defined>
- **Source of Value:**
  - `<field-name>` — explicit config | library default

<!-- For SLO questions (for example CTX-02) when explicit SLOs are missing -->

**Answer:**

- **Explicit SLOs Found:** <yes/no>
- **Inferred SLOs from Alerts:**
  - `<slo-dimension>` — `<slo-percentage>` (`<nines>`) — error budget `<error-budget-percentage>` over window `<duration>` (`Inferred from alerts`)
- **Derivation Inputs:**
  - Alert: `<alert name>` — threshold `<value>` — window `<duration>`
- **Calculation:**
  - `<show formula and numeric conversion from threshold/window to SLO percentage and nines; reference method from resources/slo-calculation.md>`

#### $\color{orange}{\text{<QUESTION-ID> - <Original Question Text>}}$

**Answer:** <best current answer with missing data called out>
**Evidence Links:**

- <repo-file-link#L123-L140>
  **Notes for Human Editor:** <what data is missing and where to get it>

#### $\color{red}{\text{<QUESTION-ID> - <Original Question Text>}}$

**Answer:** Insufficient evidence from repository
**Evidence Links:**

- <optional partial link with line reference if available>
  **Notes for Human Editor:** <why it cannot be answered and what external source is required>

### <Section Name 2>

#### <QUESTION-ID> - <Original Question Text>

**Answer:** <proposed answer>
**Evidence Links:**

- <repo-file-link#L88-L96>
  **Notes for Human Editor:** <notes>
```

Write to `--output` path (or default path).

### 6. Post to PR (Optional)

Only if `--comment` is provided:

1. Detect active PR context with `gh pr view`
2. Post a concise comment containing:
   - Draft generated notice
   - Link/path to full draft report
   - Request for human review/edit

## Output Format

Always return:

1. Draft generation status
2. Count of questions with evidence vs questions needing more evidence
3. Path to generated draft report
4. Explicit note that recommendations are handled by `production-readiness-review`

## Guidelines

### Question Fidelity

- Preserve the exact wording of questionnaire items
- Do not merge/split questions unless the source explicitly groups them
- Keep section names unchanged
- Keep section order and question order unchanged

### Evidence Quality

- Prefer primary artifacts (manifests, pipeline configs, alert definitions)
- If evidence is verbal or inferred, label it explicitly and lower confidence
- Avoid "looks good" statements without references
- For logging field compliance, require code-level proof; if an internal library is used, verify its implementation in GitHub.
- Use link-based evidence (repository URL or document URL), not plain text claims.
- Prefer links with line anchors/ranges for repository evidence whenever available.

### Repository-First Expectation

- Start with repository analysis before asking follow-up questions
- Prioritize Helm and deployment config as primary truth for runtime behavior
- Use dependencies and reliability code patterns to pre-fill operational answers
- Ask the user only for gaps that cannot be inferred from repository evidence

### Handling Missing Questionnaire File

- If neither of these paths exists, stop immediately with an error:
  - `resources/production-readiness-questionnaire.md`
  - `.claude/skills/production-readiness-report/resources/production-readiness-questionnaire.md`
  - `.cursor/skills/production-readiness-report/resources/production-readiness-questionnaire.md`
- Do not proceed with synthetic questions.
- Do not ask the user to provide questionnaire content manually.

## Examples

```bash
# Analyze current repository with local questionnaire source
/production-readiness-report checkout-service --repo-root .
```

```bash
# Analyze a specific repository path and write custom report path
/production-readiness-report checkout-service --repo-root ../my-service --output ./reports/checkout-prr.md
```

```bash
# Run report generation and post summary to PR
/production-readiness-report checkout-service --repo-root . --comment
```
