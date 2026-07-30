# Security and Infrastructure

Source. Fetch for full detail:
https://commercetools.atlassian.net/wiki/spaces/MC/pages/1499463684/Security+and+Infrastructure

Services run on Kubernetes. Secrets come from Vault. This is the practical subset
for on-call.

**Dobby never runs the commands on this page.** Not `kubectl`, `helm`, `vault`,
`voltage`, `kubegen`, or cloud CLIs. It prints them for a human to run.

## Kubernetes facts that matter

- Namespaces. Merchant Center runs in `merchant-center`. CoCo APIs run in
  `platform`.
- The three MC services and their releases seen in `kubectl get pods`:
  - `mc-proxy` runs `merchant-center-proxy`. One container per Pod.
  - `merchant-center-backend` is the gateway and MC API. One container per Pod.
  - `merchant-center-settings`. Two containers per Pod. The second is the CloudSQL
    Auth Proxy sidecar in GCP.
- Every Pod has an **init container** that injects Vault secrets on startup. It is
  `vault-agent-init`. This is the container the LogScale queries exclude.
- Most MC deployments use an **HPA** (Horizontal Pod Autoscaler) on memory and
  CPU. Manual scaling is undone by the HPA.

## kubectl for diagnosis

Read only inspection:

```
kubectl -n merchant-center get pods
kubectl -n merchant-center get deployments
kubectl -n merchant-center describe pod <pod>
kubectl -n merchant-center logs <pod> [-c <container>]
```

`describe` ends with an `Events` section. Useful for why a Pod will not start.

Change actions (these mutate production, keep a human in the loop):

```
kubectl -n merchant-center rollout restart deployments/merchant-center-backend
kubectl -n merchant-center scale --replicas 4 deployments/merchant-center-backend
kubectl -n merchant-center edit deployments/merchant-center-backend
```

- `rollout restart` is the common way to pick up new Vault credentials without a CI
  deploy.
- `scale` targets the Deployment not Pods. The HPA may scale it back.
- `edit` is a temporary in-incident fix. Helm overrides it on the next deploy. Use
  the four eyes principle.

Cluster access is granted by the **kubegen** CLI.

## Helm

Each service has a chart under `./k8s`. Release names are `mc-backend`,
`mc-proxy`, and `mc-settings`.

```
helm --namespace merchant-center list --all
helm --namespace merchant-center rollback mc-backend <revision>
```

- `helm upgrade --install` runs in CI. You rarely run it by hand.
- `helm rollback` reverts a release. Use it when a release is stuck or a bad
  release must go back. See the roll back runbook.
- Never `helm uninstall` a live service.

## Access (RBAC)

Access is granted to Google groups.

- `fe@commercetools.com`. View `merchant-center`, `merchant-center-preview`,
  `platform`.
- `fe-editor@commercetools.com`. Also manage, edit, delete resources.
- `fe-admin@commercetools.com`. Also port-forward `platform`.
- The Merchant Center On-Call group gets its own access.

## Vault

Vault holds application credentials. Not Kubernetes Secrets.

- KV secrets engine. Versioned. Two environments. Staging and production.
- The **Voltage** CLI is the abstraction to inspect and manage secrets per repo.
- Access is by Google group policy. `fe-editor` can access
  `merchant-center-services` secrets.
- Secret metadata carries `lastRotation`, `maxTTL`, `mustRotate`, `owner`, `risk`,
  and a `rotationRunbook`.
- A secret is versioned so you can **roll back to a previous version** after a bad
  rotation. See the Vault rollback runbook.
- Vault also grants services access without static credentials. For example
  CircleCI gets a token to upload assets to a bucket.

Inspect a Kubernetes Secret if ever needed:

```
kubectl get secret <name> -o yaml
echo "<value>" | base64 --decode
```

## Service accounts

We prefer IAM auth via service accounts over static credentials. A Kubernetes
ServiceAccount is bound to a cloud service account. Example. `merchant-center-settings`
binds to a GCP service account with `roles/cloudsql.client` so the CloudSQL Auth
Proxy can reach the database.

## Config

Environment specific config is mounted via a ConfigMap. The MC API feature flags
are a `features.yaml` mounted into the Pod and loaded on startup. See the long
running feature flag runbook.
