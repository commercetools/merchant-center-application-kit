# Glossary

Use precise wording for Merchant Center components. Mixing them up sends the
responder to the wrong service. Extend this file as the system grows.

## Components

| Term                       | What it is                                                                                                                                                                                                                                                |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `merchant-center-proxy`    | A frontend proxy. It sits in front of the Google Storage or S3 buckets that serve the Merchant Center frontend assets. A proxy incident is a frontend delivery problem. It is not an API problem.                                                         |
| `merchant-center-gateway`  | The gateway and router to upstream services such as pim search, platform, and agents. The same component is also called `merchant-center-backend` (release `mc-backend`) and the **Merchant Center API**. The `MerchantCenterAPIErrors` alert keys on it. |
| `merchant-center-settings` | Built on Prisma with a SQL database. Stores Custom Applications, Views, and a user's My View settings. Runs a CloudSQL Auth Proxy sidecar in GCP so its Pod shows two containers.                                                                         |

## Aliases

- **Merchant Center API**, `merchant-center-gateway`, and `merchant-center-backend`
  (release `mc-backend`) are three names for the same component.

## Related

- `Identity`. The single sign-on service on top of Ory. See
  [[identity-architecture]].
- For the full component map see [[architecture-overview]].

Extend this file as new component names appear.
