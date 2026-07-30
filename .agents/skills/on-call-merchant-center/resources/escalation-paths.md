# Escalation paths (incident.io)

Find the right escalation path and current on-call for a service, so the engineer
can trigger it. Data comes from the incident.io catalog through the `incident-io`
MCP. See also [[incident-process]].

Requires the **incident-io MCP**. If it is not connected, name the likely path
from the known mapping below and tell the engineer to escalate in Slack.

## Process

1. **Identify the service.** Map the symptom to a service using [[glossary]] and
   [[architecture-overview]].
2. **Look up the service.** `catalog_entry_list(catalog_type_id: 'Custom["Service"]',
search: "<service>")`. Read the `Escalation Path` attribute. Service entries
   have aliases like `merchant-center-gateway` or `merchant-center-proxy` so search
   works on the code name.
3. **Fall back if empty.** Not every service has the attribute set. If it is blank
   use the owning **Team's** escalation path (the Team catalog entry has one) or
   the Merchant Center path **`EP003`**.
4. **Show who is on call.** `escalation_path_show(<id>)`. It resolves the ladder to
   the current on-call, the ack windows, and any priority branches.
5. **Trigger.** The MCP does not create escalations. Trigger in Slack with
   `/inc escalate` or in the incident.io app. Hand the engineer the path name, the
   short id, and who is on call now. This stays a human action. It pages people.

## Known mapping

- Merchant Center path. **`EP003`** named "Merchant Center". Two levels. Priority
  conditional. Urgent acks in 15 minutes. Non urgent in 30 then 45 minutes.
- Most MC frontend apps reference `EP003`.
- The core services owned by Bots (`merchant-center-services-backend` which is the
  gateway, `-proxy`, `-settings`) may not have the attribute set. Fall back to
  `EP003` or the Bots team path.
- The alert channel for MC services is `#mc-monitoring`.

## Tools used (read only)

`catalog_type_list`, `catalog_entry_list`, `catalog_entry_show`,
`escalation_path_list`, `escalation_path_show`, `escalation_show`, `schedule_show`.
