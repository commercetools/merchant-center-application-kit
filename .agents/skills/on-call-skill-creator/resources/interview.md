# Interview

Ask these to gather the per rotation inputs. Offer the default. Skip anything the
[[ingestion-playbook]] can auto-discover. Keep it short. An owner should finish in
a few minutes.

Use `AskUserQuestion` where the answer is a choice. Use plain prompts where the
answer is a URL, an id, or free text.

## Identity

1. **Rotation title.** The display name. Example Merchant Center. Default is the
   titlecased rotation argument.
2. **Persona.** A name and a one line vibe for the soul. Example Dobby, helpful and
   calm. Default is a generated friendly name.
3. **Scope tag.** The owning team tag, for example `mc-foundation-team`. Plus
   `monitoring`. Default is `monitoring` only.

## Runbooks

4. **Index pages.** One or more Confluence page URLs that link the runbooks. You
   will map the taxonomy from them.

## Services

5. **Services and repos.** The services in scope and their GitHub repos. Offer to
   derive repos from the runbook `Github repo` field first.
6. **Aliases.** Any code names or aliases used for a service.

## Observability

7. **Standing dashboards.** Grafana dashboard UIDs for the golden signals. Offer to
   search Grafana by the team folder.
8. **Log package.** The `humio-packages` path for this rotation, for example
   `packages/<team>`.

## Escalation

9. **Escalation.** The incident.io Service catalog names, or a default escalation
   path short id. Offer to look it up from the Service catalog.

## Knowledge

10. **Architecture and training docs.** Confluence pages to ingest into topic
    resources. Optional.
11. **Rotation rules.** The page describing the rotation, shifts, and channels.
    Optional.

## Triggering and validation

12. **Alert phrasings.** A handful of real alert names or symptom phrasings. These
    seed the description so the skill triggers.
13. **Ground truth.** 3 to 5 real incidents or alerts with the runbook you would
    open. Used to validate the generated skill.

## Environment defaults

The Confluence `cloudId` and the environment table are usually the same across
commercetools rotations. Auto-discover them. Only ask if discovery fails.
