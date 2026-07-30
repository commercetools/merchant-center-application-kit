# A day in the rotation and rules of play

Source. Fetch for the full text:
https://commercetools.atlassian.net/wiki/spaces/MC/pages/1681358858/A+Day+in+the+Rotation+and+Rules+of+Play

On-call, your first duty is being available for incidents and improving
observability. Not your team's tasks.

## Shift and handover

- Shift starts 10:00 CET. Ends 10:00 CET on the last day. incident.io routes pages
  to your phone.
- Hand over with the previous on-call around 9:00 CET.
- Be able to respond from your work computer within 30 minutes.
- Have the PagerDuty and incident.io apps installed and configured.
- Announce appointments and set a rotation override if you will be away.

## Slack channels

- `#on-fire`. All incidents start here.
- `#incident-communication`, `#operations`, `#backend-conversation`.
- `#support-coco`. Follow along. Reach support through incident.io during an
  incident.
- `#mc-frontline-dev` and `#mc-frontline-dev-internal`. Talk to other on-calls.
- `#mc-monitoring`. Daily deployment reporting.

## What triggers an incident

- Support raises one from a customer ticket. You are paged. Assume the Incident
  Manager role immediately.
- Observability triggers one (Checkly, Alert Manager). Evaluate first. Decline a
  false positive. Accept if there is customer or business impact and assume
  Incident Manager.
- On accept, Support assumes the Incident Communicator role.

## Roles during an incident

- You are the **Incident Manager**. Investigate, resolve, escalate for help.
- Support is the **Incident Communicator**.
- Roles are assumed in incident.io through Slack or the web.
- In the incident channel type `/inc` to see commands.
- Escalate to other rotations (SRE, Backend, Connect) through incident.io.
- Follow the incident process. Document high priority incidents like a security
  breach with an incident report.

## In-hours tasks when there is no incident

Should:

- Be the first responder for Merchant Center services.
- Improve observability. Watch daily deploys in `#mc-monitoring`. Fix failing
  deploys. Skip flaky tests and tell the owning team.
- Review dependency PRs labeled `🤖 Type: Dependencies` on
  `merchant-center-frontend`, `merchant-center-services`, and `test-data`.
- Merge the daily Transifex PR `chore(i18n): publish changes from transifex`.

Can. Attend your team daily and retro but leave at once for an incident. Help fix
high priority bugs through pairing or review.

Should not. Work team or support tickets. Do team code reviews unless blocked. Be
unavailable for long without an override.

## Weekend only shift

Only respond to active incidents. No in-hours notifications like
`MerchantCenterBackendAvailabilityLow`, `MerchantCenterBackendHighLatency`, or E2E
tests. No in-hours tasks. Enjoy the weekend.
