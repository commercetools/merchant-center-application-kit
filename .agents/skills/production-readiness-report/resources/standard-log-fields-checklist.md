# Standard Log Fields Checklist

Source reference:

- https://commercetools.atlassian.net/wiki/spaces/CLT/pages/111392689/Standard+Log+Management+Fields

Use this checklist to pre-fill and validate the question:
"Does the logging follow the standard fields?"

## 1) Evidence Rules

- Prove compliance from code/config artifacts, not only documentation.
- Check logger initialization, middleware, serializers, and emitted log statements.
- If an internal logging library is used, inspect that library repository implementation in GitHub and capture evidence paths.
- Record evidence as direct links (repository code links and/or documentation links) for each compliance claim.

## 2) Required General Standard Fields

Validate presence/mapping for:

- `timestamp`
- `severity`
- `message`
- `duration` (when durations are logged)
- `trace_id` / `span_id` (when tracing is used)
- `correlation_id` (when request correlation applies)

## 3) HTTP Fields (When HTTP Access Logs Exist)

Validate relevant fields:

- `client_ip`, `destination_ip`
- `client_port`, `destination_port`
- `received_bytes`, `sent_bytes`
- `status_code`, `method`, `url`, `host`, `version`
- `request_content_type`, `response_content_type`
- `transfer_encoding`, `content_encoding`, `accept_encoding`

## 4) Evaluation Result

- `Pass`: standard fields are directly emitted/mapped and code evidence is present.
- `Partial`: partial field coverage or mapping exists but is incomplete.
- `Fail`: required field set is absent or inconsistent.
- `Unknown`: insufficient evidence in repository or referenced library code.
