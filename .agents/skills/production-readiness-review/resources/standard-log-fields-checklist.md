# Standard Log Fields Checklist

Source reference:

- https://commercetools.atlassian.net/wiki/spaces/CLT/pages/111392689/Standard+Log+Management+Fields

Use this checklist to verify logging compliance with code evidence.

## 1) Evidence Rules

- Confirm fields from logger configuration, middleware, serializers, or emitted log statements in code.
- Prefer repository evidence over documentation claims.
- If an internal logging library is used, inspect that library implementation in GitHub and record the relevant files/functions.
- Do not mark compliant if evidence is only indirect.
- Record evidence as links (code URL and/or document URL) for every compliance decision.

## 2) Required General Standard Fields

Verify these standard fields are present or reliably mapped:

- `timestamp` (ISO 8601 UTC)
- `severity` (syslog-compatible levels)
- `message`
- `duration` (seconds) where operation/request duration is logged
- `trace_id` and `span_id` when tracing is used
- `correlation_id` when request correlation is applicable

## 3) HTTP Standard Fields (When Service Emits HTTP Access Logs)

Validate relevant HTTP fields when applicable:

- `client_ip`, `destination_ip`
- `client_port`, `destination_port`
- `received_bytes`, `sent_bytes`
- `status_code`, `method`, `url`, `host`, `version`
- `request_content_type`, `response_content_type`
- `transfer_encoding`, `content_encoding`, `accept_encoding`

## 4) Kubernetes / Platform Expectations

- Application logs are structured JSON where possible.
- If native service logs cannot follow standard fields directly, field mapping/alias strategy is documented and implemented.
- For commercetools platform context, validate relevant `ctp.*` fields when used (e.g. `project_key`, `organization`, `api_endpoint`, `client_id`).

## 5) Review Outcome

- **Must**: Missing `timestamp` / `severity` / `message`, or no code evidence for declared compliance.
- **Should**: Missing trace/correlation context or incomplete HTTP field coverage for services with HTTP traffic.
- **May**: Non-blocking naming/consistency improvements where aliasing already guarantees query consistency.
