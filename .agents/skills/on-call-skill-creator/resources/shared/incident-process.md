# Responding to an incident

Source. Fetch for the full phase by phase detail:
https://commercetools.atlassian.net/wiki/spaces/S/pages/110791196/Responding+to+an+incident

The org wide incident process. As the on-call who got the alert you are the
Incident Manager by default. For a major incident get help. See also
[[rotation-and-rules]].

## Roles

| Role                      | Who                     | Responsibility                                                                                                                                                                                             |
| ------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Incident Manager**      | The on-call by default  | Runs the incident. Pulls people in, assigns roles, sends people to bed. Keeps calm and keeps people organized. Ensures a Communicator is assigned. Owns the follow ups. Can hand the role to someone else. |
| **Incident Communicator** | Support team            | Owns customer communication and the status page (status.io). Must have status.io and service desk access and be trained.                                                                                   |
| **Task Force**            | Chosen by the Manager   | An analysis team and an execution team.                                                                                                                                                                    |
| **Escalation Manager**    | Engaged past thresholds | Leads direct customer communication. Coordinates with C-level and customer sponsors. Not involved in resolving. Self assigns with `/inc role`.                                                             |

The Manager can also be part of the task force for a minor incident.

## Getting help and permissions

If you need cloud or database help, ensure someone on the response team has the
right access. Otherwise page:

- Database access. Scala BE and SRE.
- Cloud admin console including VW. SRE.
- Production Kubernetes contexts. Scala BE and SRE.
- AWS or GCP tickets. SRE.
- Atlas tickets. Scala BE and SRE.
- Rackspace. SRE or Support.

Find area owners via the CoCo Groups and Teams page. Call people through
incident.io. To find the escalation path and current on-call for a service, see
[[escalation-paths]].

## Phases

**Setup.** Announce in `#on-fire`. Type `/incident`. Enter a description, the type
(Customer Facing, Internal, or Security), and impacted features. Accept the
Incident Manager role. Build the task force and call them via incident.io. The
Communicator evaluates impact, tags project keys, and if more than one customer is
impacted publishes the first status page update within 15 minutes.

**Analyze and solve.** The Manager updates the Communicator every 30 minutes and
finds a follow up Manager after 4 hours of work. The Communicator updates the
status page every 30 minutes and sets it to monitoring for at least 30 minutes
once fixed. The Task Force analysis team investigates logs and metrics and hands
corrective actions to the execution team. Execution applies fixes with the
**four eyes principle**. Share your screen. Report every 30 minutes.

**Clean up and documenting.** Produce an incident report within one business day.
Roll back workarounds. Name the related teams and involve the owning team. The
Communicator resolves the incident on the status page.

**Reviewing.** Hold a post mortem within one business week. An RCA is always
required. Tech Leads review incidents monthly.

## Senior management

A senior manager joining the call either lurks explicitly or takes over as
Incident Manager by explicit agreement. If not ready to take over, do not join the
incident call.
