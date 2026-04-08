# @commercetools-backend/loggers

## Purpose

Opinionated JSON-capable loggers and Express access-log middleware for Node.js backend services, built on Winston.

## Key Context

- `createApplicationLogger` creates a Winston logger instance with optional JSON formatting.
- `createAccessLoggerMiddleware` wraps `express-winston` to produce structured access logs for HTTP requests.
- `rewriteFieldsFormatter` is a custom Winston format for renaming/transforming log fields.

## How To Work Here

Follow root monorepo commands. Run tests scoped to this package:

```sh
pnpm --filter @commercetools-backend/loggers run test
```
