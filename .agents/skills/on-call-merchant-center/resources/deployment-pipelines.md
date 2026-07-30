# Deployment pipelines (CircleCI)

Source. Fetch for full detail and screenshots:
https://commercetools.atlassian.net/wiki/spaces/MC/pages/1542258944/Deployment+pipelines+in+CircleCI

## Pipeline shape

Pipelines depend on the repo. `merchant-center-frontend` is the most complex. Then
`merchant-center-services`. Then the rest. A pipeline looks big because it repeats
itself once per application or service.

Job name abbreviations:

- `b_a-*` build_application
- `d_s_a-*` deploy_staging_application
- `d_p_a-*` deploy_production_application
- `can_d_p_a-*` can_deploy_production_application. This is the approval gate.

Frontend on `main`. Setup with Vault. Build and deploy to staging. E2E tests plus
an approval gate. Production deploy to all environments and a LinearB release
marker.

Services on `main`. Setup with Vault and kubegen. Build Docker images. Deploy to
all staging. Gated approval per cloud vendor one at a time. Production deploy to
all clouds. Each service and environment is its own job so they run in parallel.
Helm deploys take longer than static asset uploads.

## Deployment train

Automated deploys run daily. Around 12 CET for European teams. Around 8 PM CET for
US teams. The train uses the CircleCI API to approve the approval step on the
latest `main` pipeline. It runs through CircleCI triggers plus a `deployment-cli`.
Jobs approved by the CLI show a CircleCI avatar not a person.

**Incident tie-in.** If a symptom started near a train time, a train deploy is a
prime suspect. See [[glossary]] and the recent-changes step in the skill.

## Manual deployment

A deploy outside the train. Open the latest `main` workflow of the repo and click
the approval job (`can_d_p_a-*`). The next job runs the production deploy. This is
the same gate the train approves through the API.

## Inspecting deployed versions

Every environment and service exposes `GET /versions`. This is the fastest way to
confirm what is live and whether it just changed.

- Frontend, GCP EU. https://mc.europe-west1.gcp.commercetools.com/versions
- APIs, GCP EU. https://mc-api.europe-west1.gcp.commercetools.com/versions
  The MC API (the gateway or backend) aggregates versions of all services into one
  response.

Swap the host for the affected environment. See the environment list in
[[runbook-sources]].

## Post deployment checks

The Merchant Center uses **Checkly**. Checks tagged `deployment` run right after a
deploy from CircleCI (the `checkly_post_deployment_checks` orb command). A failed
check stops the pipeline and posts a Slack notification. Checks also run
periodically. Results live in Checkly Test Sessions.

**Incident tie-in.** A failed post deployment check is an early degradation
signal. Look in Checkly Test Sessions filtered to failed.

## Debugging a failed pipeline

1. Read the failed job output.
2. Open the Tests or Artifacts tab. Artifacts hold screenshots and videos.
3. Open the HTML report at `cypress/reports/html/index.html`. Easier than the
   CircleCI UI.
4. Rerun or rerun failed only. For pipelines with approval gates on `main` you must
   Cancel Workflow first.
5. Last resort. Rerun with SSH to inspect the job runtime. Always cancel the SSH
   job when done. It bills credits for 60 to 90 minutes.
