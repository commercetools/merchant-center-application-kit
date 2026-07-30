---
name: prometheus-monitoring-migration
description: >
  Migrate Prometheus monitoring (alerts, recording rules, ServiceMonitors) in Kubernetes/Helm environments.
  Use this skill when the user wants to: move alert or recording rules between repos (e.g. from a centralized
  k8s-gitops repo into per-service Helm charts), set up ServiceMonitors with relabeling, migrate label selectors
  (like switching from `job="kubernetes-pods"` to `service_discovery_job`), analyze dependencies between recording
  rules and alert rules, plan safe deployment ordering, or lint Prometheus rules with pint. Also trigger when
  the user mentions PrometheusRule CRDs, Prometheus Operator monitoring setup, or golden-signals recording rules.
disable-model-invocation: false
allowed-tools: Bash, Grep, Glob, Read, Edit
scope:
  - prometheus
  - kubernetes
  - migration
---

# Prometheus Monitoring Migration

Guide for migrating Prometheus monitoring configuration in Kubernetes environments using Helm charts, ServiceMonitors, and the Prometheus Operator.

## Out of scope

- Prometheus server configuration (prometheus.yml, federation, remote write)
- Grafana dashboard JSON — this skill covers the metrics pipeline, not visualization
- Non-Kubernetes deployments (e.g. bare-metal Prometheus, Docker Compose)

## Core concepts

### Prometheus Operator CRDs

Two CRDs matter:

- **PrometheusRule** — defines recording rules and alert rules. Deployed per service via Helm.
- **ServiceMonitor** — tells Prometheus which services to scrape and how to relabel metrics.

### Label flow

```
Pod metrics (scraped via ServiceMonitor)
  → relabeling adds labels (kubernetes_namespace, service_discovery_job, release)
  → recording rules aggregate raw metrics, carrying labels via `sum by (...)`
  → alert rules query either raw metrics or recording rule outputs
```

Understanding this chain is critical: changing a label in relabeling affects recording rule outputs, which in turn affects alert rule queries.

### service_discovery_job vs job

- `job` is often a static label (e.g. `job="kubernetes-pods"`) added via relabeling for backward compatibility
- `service_discovery_job` is derived from `__meta_kubernetes_namespace / __meta_kubernetes_service_name`, producing values like `<namespace>/<service-name>`
- `service_discovery_job` is more specific and eliminates the need for synthetic static labels

## Migration playbook

### Phase 1: Set up ServiceMonitors

Create a ServiceMonitor template per service in the Helm chart:

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: { { .Chart.Name } }
  labels: { { - include "default-labels" . | nindent 4 } }
spec:
  selector:
    matchLabels:
      app: <service-name>
      release: { { .Release.Name } }
  endpoints:
    - port: { { .Values.metricsPortName } }
      path: /
      relabelings:
        - action: replace
          sourceLabels: [namespace]
          targetLabel: kubernetes_namespace
        - sourceLabels:
            [__meta_kubernetes_namespace, __meta_kubernetes_service_name]
          separator: /
          targetLabel: service_discovery_job
          action: replace
        - sourceLabels: [__meta_kubernetes_pod_label_release]
          targetLabel: release
          action: replace
```

If backward compatibility is needed temporarily, also add:

```yaml
- targetLabel: job
  replacement: kubernetes-pods
  action: replace
```

This static `job` relabeling is a bridge — it keeps existing recording rules and alerts working while you migrate them.

### Phase 2: Migrate alert rules into Helm charts

1. **Identify rules to migrate** — list all alert rules in the centralized repo that reference the service's metrics
2. **Create rule files** — place them in `k8s/<service>/rules/<concern>.yaml` using this structure:

```yaml
groups:
  - name: <service>-<concern>
    partial_response_strategy: abort
    rules:
      - alert: AlertName
        expr: <promql>
        for: <duration>
        labels:
          severity: critical|warning
          team: <team-name>
          service: <service-name>
        annotations:
          summary: 'Short description'
          description: 'Detailed description with {{ $value }}'
          runbook: 'https://...'
          dashboardUrl: 'https://...'
```

3. **Template the PrometheusRule** — the Helm template globs all rule files:

```yaml
{{- if .Values.alerting.enabled }}
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: {{ .Chart.Name }}
  labels:
    {{- include "default-labels" . | nindent 4 }}
spec:
  groups:
  {{- range $path, $_ := .Files.Glob "rules/*.yaml" }}
  {{- range ($.Files.Get $path | fromYaml).groups }}
    - {{ . | toYaml | indent 6 | trim }}
  {{- end }}
  {{- end }}
{{- end }}
```

4. **Remove migrated rules from the centralized repo** — only after the Helm chart rules are deployed and verified

### Phase 3: Migrate labels (job → service_discovery_job)

This is the most delicate phase. The dependency chain must be respected.

#### Step 1: Map the dependency graph

For each alert rule, determine whether it queries:

- **A recording rule output** (e.g. `<prefix>_event_loop_lag:nodejs_eventloop_lag_p99_seconds`) — the recording rule already scopes to the right namespace/service, so dropping `job` from the alert filter is safe
- **A raw metric** (e.g. `nodejs_undici_pool_pending`) — needs an explicit `service_discovery_job` filter to replace `job`

#### Step 2: Update recording rules

For recording rules that use `job="kubernetes-pods"` in their filter:

- Drop `job="kubernetes-pods"` from the filter expression (keep `kubernetes_namespace` and `release`)
- Replace `job` with `service_discovery_job` in `sum by (...)` clauses

```yaml
# Before
- record: <prefix>_total_requests:http_request_duration_seconds_count:rate5m
  expr: sum by (job, release, status_code, method, path) (rate(http_request_duration_seconds_count{job="kubernetes-pods", kubernetes_namespace="<namespace>"}[5m]))

# After
- record: <prefix>_total_requests:http_request_duration_seconds_count:rate5m
  expr: sum by (service_discovery_job, release, status_code, method, path) (rate(http_request_duration_seconds_count{kubernetes_namespace="<namespace>"}[5m]))
```

For rules without aggregation (just a filter):

```yaml
# Before
- record: <prefix>_event_loop_lag:nodejs_eventloop_lag_p99_seconds
  expr: nodejs_eventloop_lag_p99_seconds{job="kubernetes-pods", kubernetes_namespace="<namespace>", release="<release>"}

# After
- record: <prefix>_event_loop_lag:nodejs_eventloop_lag_p99_seconds
  expr: nodejs_eventloop_lag_p99_seconds{kubernetes_namespace="<namespace>", release="<release>"}
```

Do NOT change rules that use a different `job` value (e.g. `job="kubernetes-service-endpoints"` for kube-state-metrics). These are from a different scrape source.

**Why `service_discovery_job` appears in `sum by` but NOT as a filter:**

Raw metrics don't inherently have `service_discovery_job` — Prometheus attaches it during scrape via ServiceMonitor relabeling. The old `job="kubernetes-pods"` filter was used to scope metrics to the ServiceMonitor scrape. After migration:

- **Scoping** is handled by `kubernetes_namespace` + `release`, which are already sufficiently unique
- Adding `service_discovery_job="<namespace>/..."` as a filter would work but hardcodes the namespace/service-name pair redundantly
- `service_discovery_job` is kept in `sum by` so the recording rule **output preserves it as a label dimension** for downstream consumers (dashboards, alerts)

In short: `service_discovery_job` in `sum by` = grouping key on the output. `kubernetes_namespace` + `release` in `{...}` = scoping filter on the input. They serve different purposes.

#### Step 3: Update alert rules

- **Alert rules querying recording rule outputs**: drop `{job="kubernetes-pods"}` filter entirely — the recording rule already scopes correctly
- **Alert rules querying raw metrics**: replace `job="kubernetes-pods"` with `service_discovery_job="<namespace>/<service>"`
- **`sum by` / `max by` clauses**: replace `job` with `service_discovery_job` where present, or drop it if the dimension is no longer needed

Watch for label mismatches in ratio calculations: if the numerator comes from a recording rule and the denominator from a raw metric (or vice versa), the `by` clause dimensions must match on both sides.

#### Step 3.5: Sweep for remaining references

Before removing the static relabeling, grep the entire k8s directory for any remaining `job="kubernetes-pods"` references. File lists in migration plans often miss rules that aren't part of the main golden-signals/alert categories (e.g. `request-forwarding-pools.yaml`, SLO rules, custom dashboards).

Search all rule files under `k8s/` for `job="kubernetes-pods"` (use the Grep tool, not bash grep).

Any hits must be migrated before proceeding — they will break silently once the static relabeling is removed.

#### Step 4: Remove static job relabeling

Only after all recording rules and alert rules have been updated and deployed:

```yaml
# Remove this block from ServiceMonitor relabelings:
- targetLabel: job
  replacement: kubernetes-pods
  action: replace
```

### Deployment ordering

This ordering prevents breakage:

1. **Deploy updated recording rules and alert rules** — while the static `job` relabeling still exists, both old and new label names work
2. **Verify** — check that alerts and recording rules still evaluate correctly
3. **Deploy ServiceMonitor changes** (remove static `job`) — safe because nothing depends on it anymore

### Cross-repo coordination

When rules live in a centralized repo (e.g. k8s-gitops) and are being migrated to per-service Helm charts:

1. **Deploy new rules in the per-service chart first** — Prometheus unions duplicate metric names, so both old and new rules can coexist temporarily
2. **Verify new rules produce correct data** — check recording rule outputs in Thanos/Prometheus
3. **Remove old rules from k8s-gitops** — only after step 2 is confirmed
4. **Never remove from k8s-gitops first** — this creates a gap where no rules exist

## Linting with pint

Use [pint](https://github.com/cloudflare/pint) to validate Prometheus rules.

### Configuration (`.pint.hcl`)

```hcl
parser {
  include = ["k8s/.*/rules/.*\\.yaml$"]
  relaxed = ["k8s/.*/rules/.*\\.yaml$"]
}

rule {
  match { kind = "alerting" }

  annotation "summary"  { severity = "bug"; required = true }
  annotation "runbook"  { severity = "bug"; required = true }
  label "severity"      { severity = "bug"; required = true }
  label "team"          { severity = "bug"; required = true }
  label "service"       { severity = "bug"; required = true }
}
```

### CI integration

```yaml
# CircleCI example — check https://github.com/cloudflare/pint/releases for latest version
lint_prometheus_rules:
  docker:
    - image: cimg/base:2024.07
  steps:
    - checkout
    - run:
        name: Install pint
        command: |
          PINT_VERSION=v0.73.7  # update as needed
          curl -sL "https://github.com/cloudflare/pint/releases/download/${PINT_VERSION}/pint-${PINT_VERSION#v}-linux-amd64.tar.gz" | tar xz
          sudo mv pint-linux-amd64 /usr/local/bin/pint
    - run:
        name: Lint Prometheus rules
        command: pint lint --min-severity info k8s/*/rules/*.yaml
```

### Suppressing specific checks

Use inline comments when pint flags something intentionally:

```yaml
# pint disable promql/selector
expr: some_recording_rule_output{status_code=~"5.."}
```

This is common for recording rule outputs where pint can't verify the source metric exists.

## Common pitfalls

### Missing `release` label on ServiceMonitor-scraped metrics

ServiceMonitors do NOT automatically carry pod labels to scraped metrics. The old `kubernetes-pods` pod-based service discovery had relabelings that mapped `__meta_kubernetes_pod_label_release` → `release`. Without explicit relabeling in the ServiceMonitor, recording rules that filter on `release="<release>"` will silently return no data.

**Fix:** Always include this relabeling in ServiceMonitors:

```yaml
- sourceLabels: [__meta_kubernetes_pod_label_release]
  targetLabel: release
  action: replace
```

### Label mismatch in binary operations (division)

When an alert divides two metrics (e.g. error rate = errors / total), both sides must have matching label dimensions in their `sum by` clause. If the numerator comes from a recording rule with `service_discovery_job` and the denominator from an external source without it, the division produces empty results.

**Fix:** Drop the mismatched label from `sum by`:

```yaml
# Bad — labels won't match if sources differ
sum by (service_discovery_job, method, path) (errors) / sum by (service_discovery_job, method, path) (total)

# Good — use only labels guaranteed to exist on both sides
sum by (method, path) (errors) / sum by (method, path) (total)
```

### Prometheus operator not scraping a ServiceMonitor

A ServiceMonitor resource can exist in the cluster but Prometheus may not create a scrape target for it. If `serviceMonitorSelector: {}` is configured (matches all), the operator should pick it up. If it doesn't:

1. Check operator logs: `kubectl logs -n monitoring -l app.kubernetes.io/name=prometheus-operator`
2. Compare the deployed ServiceMonitor YAML with a working one from the same namespace
3. Verify the Endpoints object has the expected port name: `kubectl get endpoints <name> -n <ns> -o yaml`
4. Delete and recreate to force re-reconciliation: `kubectl delete servicemonitor <name> -n <ns>`

### Decomposing cross-cutting recording rules

When migrating recording rules from a centralized repo into per-service charts, decompose them by adding a `release` filter per service. The same metric name can exist across multiple PrometheusRule CRDs — Prometheus unions the series (same metric name, different label values).

```yaml
# In service-a chart:
- record: total_requests:http_request_duration_seconds_count:rate5m
  expr: sum by (...) (rate(http_request_duration_seconds_count{release="service-a", ...}[5m]))

# In service-b chart (same metric name, different release filter):
- record: total_requests:http_request_duration_seconds_count:rate5m
  expr: sum by (...) (rate(http_request_duration_seconds_count{release="service-b", ...}[5m]))
```

Dashboard queries like `sum by (release)(total_requests:...)` continue working — they aggregate across the unioned series.

## Checklist

When migrating monitoring:

- [ ] ServiceMonitors created with correct relabeling
- [ ] Alert rules moved to `k8s/<service>/rules/` with required labels and annotations
- [ ] PrometheusRule template created in `k8s/<service>/templates/`
- [ ] `alerting.enabled` flag in values.yaml
- [ ] Recording rule dependency graph mapped
- [ ] Recording rules updated (filter + `sum by` clauses)
- [ ] Alert rules updated (filter + `by` clauses)
- [ ] Static `job` relabeling removed from ServiceMonitors (last step)
- [ ] pint linting passes
- [ ] Deployment ordering documented
- [ ] Dashboards checked for label references (may need `service_discovery_job` adjustments)
