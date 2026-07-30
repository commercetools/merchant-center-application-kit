# Production Readiness Questionnaire

This is the local questionnaire source for `production-readiness-report`.

Replace and maintain this file with your current team-approved questionnaire.

## Context

- `CTX-01` What is the purpose of this application?
- `CTX-02` Does the service have SLOs? If not, what are the high-level expectations from consumers?
- `CTX-03` What is the Service Quality Group tier (or equivalent tiering) for this service?

## Monitoring

- `MON-01` Do we monitor the Golden Signals (latency, traffic volume, errors, saturation)?
- `MON-02` Do we monitor Golden Signals for critical dependencies and data stores?
- `MON-03` Are any other dependencies performance monitored?
- `MON-04` Are all logged exceptions actionable?
- `MON-05` Does logging follow the standard log management fields?
- `MON-06` Is it known what average and peak traffic will look like?
- `MON-07` What observability tools does this application use (metrics, logs, traces)?
- `MON-08` How do readiness/liveness probes work for this service?

## Alerting

- `ALT-01` Are there paging alerts for this service? Which ones?
- `ALT-02` Are there non-paging alerts for this service? Which ones?

## Runbooks

- `RUN-01` Do all major alerts link to a runbook for diagnosis/remediation?
- `RUN-02` List all runbooks relevant to this service.

## Operations

- `OPS-01` In case of a complete outage, what is the customer impact?
- `OPS-02` Will the service be supported by an on-call rotation? Which one and why?
- `OPS-03` What is the scaling policy?
- `OPS-04` Can traffic source be identified across different external/internal endpoints?
- `OPS-05` Are there rate limits?
- `OPS-06` What is the fairness mechanism for multi-tenancy?
- `OPS-07` Can excess callers be identified and controlled?
- `OPS-08` Are engineers in the team knowledgeable about the technologies used by the service?

## Load Testing

- `LDT-01` Have we load-tested the service to validate SLOs?
- `LDT-02` What resources are needed to run the service within SLOs?
- `LDT-03` Have we performed chaos tests against the system?
- `LDT-04` Can the service identify load-test traffic in production (if applicable)?

## Deployment

- `DEP-01` What tests verify the service is working after deployment?
- `DEP-02` Is there a canary phase (or equivalent risk-reduction phase) during deployment?
- `DEP-03` Is the deployment process documented and understood by on-call?
- `DEP-04` How long does deployment typically take?
- `DEP-05` How long does rollback typically take?
- `DEP-06` How is deployment observed, and can dashboards distinguish versions/releases?
- `DEP-07` What is the current automated test coverage, and which critical paths are not covered?

## Failure Modes

- `FLM-01` What are known failure modes of the application?
- `FLM-02` Have we tested these failure modes?
- `FLM-03` Are there non-critical features that can be disabled under excessive load?
- `FLM-04` Are there external caches? What happens if they fail?
- `FLM-05` Are there internal caches? How are consistency and size bounds managed?
- `FLM-06` What are dependency timeouts and why were those values chosen?
- `FLM-07` Do we have resilience patterns (retries, backoffs, circuit breakers, fallbacks)?
- `FLM-08` Are there connection pools to dependencies? How are they configured?

## Data Management

- `DAT-01` Are there backups and a restore runbook? Has restoration been tested?
- `DAT-02` How long does recovery typically take?
- `DAT-03` Can datastore upgrades happen without downtime?

## Security

- `SEC-01` Are there unresolved Critical or High vulnerabilities?
- `SEC-02` Are any vulnerabilities over SLA, and is there a committed remediation plan?
- `SEC-03` Are public endpoints/load balancers protected by WAF/Armor where applicable?
- `SEC-04` Are TLS connections restricted to TLS 1.2/1.3 where applicable?
- `SEC-05` Have security one-off tasks/checklists been completed?
- `SEC-06` Are team handles for security notifications up to date?
