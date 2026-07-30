# LogScale (Humio) query language — reference

CrowdStrike Falcon LogScale (formerly Humio) is commercetools' log platform.
This is a general primer so the skill can read, adapt, and explain queries.
Source: https://library.humio.com/data-analysis/syntax.html

## Pipeline model

Queries are a left-to-right pipeline, stages joined by `|`:

```
<initial filter> | <function> | <function> | ...
```

The initial filter narrows the event set (cheap, uses the index); each pipe
transforms or aggregates what the previous stage produced. A leading `|` (as in
many of the packaged queries) is allowed and simply starts the pipeline with a
filter stage.

## Fields and tags

- **Regular field:** `fieldname` — a key/value on the event.
- **Tag field:** `#fieldname` — set at ingest, indexed, cheapest to filter on
  (e.g. `#environment`, `#cloud_provider.account`, `#cloud_provider.service`).
- Quote field names containing dots or special chars: `"kubernetes.container_name"`.

## Filtering and operators

| Form                            | Meaning                                                |
| ------------------------------- | ------------------------------------------------------ |
| `field = value`                 | equals (supports `*` wildcards, e.g. `*-production-*`) |
| `field != value`                | not equals                                             |
| `field >= n` / `>` / `<=` / `<` | numeric comparison                                     |
| `field = /regex/`               | regex match on the field                               |
| bare word (`error`)             | free-text search across the event                      |
| `AND` / `OR` / `NOT`            | boolean combine; group with parentheses                |

Examples:

```
http.status_code >= 500
message = /\/api/
("http.url" = /mc-api/ OR "http.url" = /mc\./)
"meta.errorMessage" != "*socket*"
```

## Common functions

| Function                                   | Purpose                                |
| ------------------------------------------ | -------------------------------------- |
| `groupBy([f1, f2], function=…)`            | group and aggregate; the workhorse     |
| `count(as=name)`                           | count events                           |
| `sort(field, order=desc)`                  | order results                          |
| `head(n)` / `tail(n)`                      | first / last n                         |
| `select([...])` / `table([...])`           | choose columns to show                 |
| `top(field)`                               | most frequent values                   |
| `timeChart(function=…)`                    | bucket a metric over time (for charts) |
| `percentile("field", percentiles=[50,95])` | latency percentiles                    |
| `collect([...], limit=n)`                  | gather field values per group          |

Example (slow responses grouped by path):

```
"#cloud_provider.service" = k8s
| "kubernetes.container_name" = "merchant-center-backend"
| duration > 5
| groupBy("meta.req.pathname", function=[count(as=count), collect(fields=["meta.req.pathname","duration"], limit=10)], limit=10)
| sort(duration)
```

## Query parameters

`?name` is a runtime parameter the user fills in (in the UI, dashboard, or the
search URL). The packaged queries parameterize the environment as
`#cloud_provider.account = ?account`. When presenting such a query, tell the
engineer to set `?account` to the affected environment (or substitute a concrete
value like `*-production-*`).

## Field assignment, comments

- New field: `field := expression` (e.g. `latency := end - start`).
- Comments: `// single line` and `/* block */`.

## Time

Queries carry a default interval (`timeInterval.start`, e.g. `15m`, `6h`). In the
search UI or URL the time range is separate from the query text — set it to the
incident window.
